import json
import os

filepath = "/Users/parsha/Downloads/rezaemotion/scratch/pagespeed_mobile.json"
if not os.path.exists(filepath):
    print("File not found.")
    exit(1)

with open(filepath, 'r') as f:
    data = json.load(f)

# Extract categories
categories = data.get('lighthouseResult', {}).get('categories', {})
print("--- SCORES ---")
for cat, val in categories.items():
    print(f"{val.get('title')}: {int(val.get('score', 0) * 100)}")

# Extract metrics
audits = data.get('lighthouseResult', {}).get('audits', {})
print("\n--- KEY METRICS ---")
metrics = [
    ('first-contentful-paint', 'First Contentful Paint'),
    ('largest-contentful-paint', 'Largest Contentful Paint'),
    ('speed-index', 'Speed Index'),
    ('total-blocking-time', 'Total Blocking Time'),
    ('cumulative-layout-shift', 'Cumulative Layout Shift'),
    ('interactive', 'Time to Interactive'),
    ('server-response-time', 'Initial Server Response Time (TTFB)')
]

for audit_id, label in metrics:
    audit = audits.get(audit_id, {})
    print(f"{label}: {audit.get('displayValue', 'N/A')} (Score: {int(audit.get('score', 0) * 100) if audit.get('score') is not None else 'N/A'})")

print("\n--- OPPORTUNITIES & DIAGNOSTICS ---")
opportunities = []
for audit_id, audit in audits.items():
    details = audit.get('details', {})
    if details.get('type') == 'opportunity':
        overall_savings = details.get('overallSavingsMs', 0)
        if overall_savings > 0:
            opportunities.append((audit.get('title'), overall_savings, audit.get('description')))

opportunities.sort(key=lambda x: x[1], reverse=True)
for title, savings, desc in opportunities[:10]:
    print(f"- {title}: estimated savings of {savings} ms")
    # print(f"  Description: {desc}")
