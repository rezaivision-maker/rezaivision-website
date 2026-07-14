# GitHub Actions Build Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the `npm run build` step (Google-Reviews-Fetch → `vite build` → Puppeteer-Prerendering → Sitemap-Submit → IndexNow) from the developer's local Mac into a GitHub Actions workflow, so pushing source changes alone is enough — the CI builds `dist/` and commits it back automatically, removing the "forgot to run `npm run build`" failure mode described in `CLAUDE.md`.

**Architecture:** A single GitHub Actions workflow triggers on every push to `main` (except when the push only touches `dist/**`). It installs Node + the Ubuntu system libraries Puppeteer's bundled Chromium needs, runs the exact same `npm run build` chain that already works locally, then commits `dist/` (and `src/data/googleReviews.json`, which the reviews-fetch step may update) back to `main` with `[skip ci]` in the message so the auto-commit doesn't re-trigger itself. Vercel's existing git integration deploys the new `dist/` exactly as it does today for a manual push — nothing about Vercel's config changes.

**Tech Stack:** GitHub Actions (`ubuntu-latest`), Node 24, existing `puppeteer` npm dependency (no `@sparticuz/chromium`, no change to how Chromium is obtained — only the missing Ubuntu system libraries are added, matching the exact root cause documented in `CLAUDE.md`).

## Global Constraints

- Do NOT modify `vercel.json` `buildCommand`/`outputDirectory` — Vercel must keep serving pre-built `dist/`, never build itself (`CLAUDE.md` rule #3).
- Do NOT introduce `@sparticuz/chromium` or `puppeteer-core` or any Vercel-side Puppeteer execution — Chromium still only ever runs locally-equivalent, now also in GitHub's own CI runner, never inside Vercel's build container (`CLAUDE.md` rule #1).
- Do NOT put real secrets in committed files — GitHub Actions secrets only, same principle as `CLAUDE.md` rule #12 for Vercel env vars.
- Keep the existing manual `npm run build` + local push workflow fully working — this plan is additive, not a replacement.
- One concern per commit, small verifiable steps (`CLAUDE.md` rule #7).

---

### Task 1: Make Puppeteer launch robust for a headless Ubuntu CI runner

**Files:**
- Modify: `scripts/prerender.js:122`

**Interfaces:**
- No new exports. Only changes the arguments passed to the existing `puppeteer.launch(...)` call already used by `prerender()`.

- [ ] **Step 1: Add `--no-sandbox` launch args**

In `scripts/prerender.js`, change line 122 from:

```javascript
  const browser = await puppeteer.launch({ headless: 'new' });
```

to:

```javascript
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
```

This flag is required because GitHub Actions' Ubuntu runners execute Chromium in a context where the default sandbox can't initialize (common, well-documented Puppeteer-in-CI requirement). It is harmless on macOS — the flag is simply a no-op restriction lift and does not change rendering output, so local builds on the developer's Mac keep working exactly as before.

- [ ] **Step 2: Verify locally**

Run: `npm run build`
Expected: Build completes exactly as before (same "Prerendering complete!" output), proving the added args don't break the local (macOS) path.

- [ ] **Step 3: Commit**

```bash
git add scripts/prerender.js
git commit -m "Prerender: add --no-sandbox args for CI compatibility"
```

---

### Task 2: Add the GitHub Actions workflow

**Files:**
- Create: `.github/workflows/build-and-deploy.yml`

**Interfaces:**
- Consumes: repo secrets `GOOGLE_PLACES_API_KEY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (added in Task 3). Consumes the existing `npm run build` script from `package.json:8` unchanged.
- Produces: on success, a new commit on `main` (author `github-actions[bot]`) containing the rebuilt `dist/` and (if changed) `src/data/googleReviews.json`, message containing `[skip ci]`.

- [ ] **Step 1: Create the workflow file**

Create `.github/workflows/build-and-deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
    paths-ignore:
      - 'dist/**'
  workflow_dispatch: {}

permissions:
  contents: write

concurrency:
  group: build-and-deploy
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm

      - name: Install system libraries for headless Chrome
        run: |
          sudo apt-get update
          sudo apt-get install -y --no-install-recommends \
            libnss3 libatk-bridge2.0-0 libx11-xcb1 libxcomposite1 \
            libxdamage1 libxrandr2 libgbm1 libpangocairo-1.0-0 \
            libasound2t64 libgtk-3-0

      - name: Install dependencies
        run: npm ci

      - name: Build (reviews fetch, vite build, prerender, sitemap, indexnow)
        env:
          GOOGLE_PLACES_API_KEY: ${{ secrets.GOOGLE_PLACES_API_KEY }}
          GOOGLE_SERVICE_ACCOUNT_EMAIL: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_EMAIL }}
          GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY }}
        run: npm run build

      - name: Commit dist/ if changed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add dist/ src/data/googleReviews.json
          if git diff --cached --quiet; then
            echo "Nothing changed — skipping commit."
          else
            git commit -m "chore: rebuild dist via CI [skip ci]"
            git push
          fi
```

Notes for the implementer:
- `paths-ignore: dist/**` skips re-running when a push touches only `dist/` (e.g. a manual local build+push). The authoritative loop guard is `[skip ci]` in the auto-commit message — GitHub natively skips running any workflow for a commit whose message contains that marker, so the bot's own push never re-triggers this workflow even though it also touches `src/data/googleReviews.json` (outside `dist/**`).
- If `npm run build` fails (e.g. broken component), the job stops before the commit step — nothing gets pushed, `dist/` on `main` stays at its last good state, and GitHub emails the repo owner about the failed run by default. No extra notification step needed.
- `permissions: contents: write` is scoped to this workflow only; it does not require changing the repository-wide default workflow permissions (currently "read"), since an explicit `permissions:` block in a workflow file overrides that default for its own run.

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/build-and-deploy.yml
git commit -m "CI: add GitHub Actions workflow to automate npm run build + dist commit"
```

---

### Task 3: Add the required GitHub Actions secrets

**Files:** none (GitHub repo configuration only, via `gh` CLI — already authenticated with `repo` scope in this environment)

**Interfaces:** none — this task only populates the three secret names referenced by `.github/workflows/build-and-deploy.yml` from Task 2.

- [ ] **Step 1: Push each secret value directly from the local `.env` without printing it**

Run (each pipes the raw value straight into `gh secret set`, so the value itself never appears in any command output):

```bash
grep '^GOOGLE_PLACES_API_KEY=' .env | cut -d'=' -f2- | gh secret set GOOGLE_PLACES_API_KEY --repo rezaivision-maker/rezaivision-website
grep '^GOOGLE_SERVICE_ACCOUNT_EMAIL=' .env | cut -d'=' -f2- | gh secret set GOOGLE_SERVICE_ACCOUNT_EMAIL --repo rezaivision-maker/rezaivision-website
grep '^GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=' .env | cut -d'=' -f2- | gh secret set GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY --repo rezaivision-maker/rezaivision-website
```

Expected output after each: `✓ Set Actions secret GOOGLE_... for rezaivision-maker/rezaivision-website`

- [ ] **Step 2: Verify the secrets are registered (names only, no values are ever shown by GitHub)**

Run: `gh secret list --repo rezaivision-maker/rezaivision-website`
Expected: the three names `GOOGLE_PLACES_API_KEY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` listed with a recent "Updated" timestamp.

No git commit for this task — secrets are not repo files.

---

### Task 4: Document the new safety net in CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` (the "⚠️ WICHTIGSTE REGEL" section)

**Interfaces:** none — documentation only.

- [ ] **Step 1: Add a short note after the existing "WICHTIGSTE REGEL" block**

Insert immediately after the closing ` ``` ` of the existing `npm run build` / `git push` code block in the "⚠️ WICHTIGSTE REGEL" section:

```markdown
**Automatisches Sicherheitsnetz (seit 2026-07-14):** Ein GitHub-Actions-Workflow
(`.github/workflows/build-and-deploy.yml`) baut bei jedem Push auf `main`
zusätzlich automatisch `dist/` neu und committet es zurück, falls lokal
vergessen wurde, `npm run build` auszuführen. Das ersetzt die manuelle Regel
oben NICHT — lokal bauen bleibt der schnellere, bevorzugte Weg — aber falls
doch mal nur `src/`-Änderungen gepusht werden, holt CI das automatisch nach
(kein Datenverlust, kein „Google sieht alte Version"-Risiko mehr).
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "Docs: CLAUDE.md - GitHub Actions Build-Sicherheitsnetz dokumentieren"
```

---

### Task 5: End-to-end verification

**Files:** none

**Interfaces:** none — this task only exercises Tasks 1–4 together.

- [ ] **Step 1: Push everything and trigger the workflow manually first**

```bash
git push
gh workflow run build-and-deploy.yml --repo rezaivision-maker/rezaivision-website
```

- [ ] **Step 2: Watch the run**

```bash
gh run watch --repo rezaivision-maker/rezaivision-website
```

Expected: all steps green, ending with either "Nothing changed — skipping commit." (if `dist/` was already up to date from Task 2/4's own push) or a successful `git push` of a new `chore: rebuild dist via CI [skip ci]` commit.

- [ ] **Step 3: Confirm no infinite loop**

Run: `gh run list --repo rezaivision-maker/rezaivision-website --limit 5`
Expected: at most one additional run appears after the bot's own commit (there should be none triggered by the `[skip ci]` commit itself — if a second automated run appears for that exact commit, the loop guard failed and must be investigated before relying on this workflow).

- [ ] **Step 4: Confirm Vercel deployed the CI-built dist/**

Run: `gh api repos/rezaivision-maker/rezaivision-website/commits/main` to note the latest commit SHA, then check the Vercel dashboard (or `mcp__vercel__list_deployments` if available) that a deployment exists for that SHA with status "Ready".

- [ ] **Step 5: Do a real test — make a trivial `src/` change, push, and confirm CI builds without a local `npm run build`**

This is the actual proof the goal is met: pick any tiny non-visible text change in `src/`, commit and push it *without* running `npm run build` locally first, then repeat Steps 2–4 above and confirm `dist/` still ends up correctly rebuilt and deployed.
