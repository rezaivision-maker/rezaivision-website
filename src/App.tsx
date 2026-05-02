/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Analytics } from "./components/Analytics";

// Critical: Home is loaded eagerly for fastest first paint
import Home from "./pages/Home";

// Lazy-loaded pages – each becomes its own chunk
const Services = lazy(() => import("./pages/Services"));
const CorporateVideo = lazy(() => import("./pages/CorporateVideo"));
const RecruitingVideo = lazy(() => import("./pages/RecruitingVideo"));
const SocialAds = lazy(() => import("./pages/SocialAds"));
const SocialRetainer = lazy(() => import("./pages/SocialRetainer"));
const PrivateEvents = lazy(() => import("./pages/PrivateEvents"));
const EventCoverage = lazy(() => import("./pages/EventCoverage"));
const MusicVideos = lazy(() => import("./pages/MusicVideos"));
const WeddingFilms = lazy(() => import("./pages/WeddingFilms"));
const Work = lazy(() => import("./pages/Work"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Equipment = lazy(() => import("./pages/Equipment"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Imprint = lazy(() => import("./pages/Imprint"));
const Privacy = lazy(() => import("./pages/Privacy"));
const AGB = lazy(() => import("./pages/AGB"));
const Success = lazy(() => import("./pages/Success"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const GlossaryIndex = lazy(() => import("./pages/Glossary"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Forbidden = lazy(() => import("./pages/Forbidden"));
const ServerError = lazy(() => import("./pages/ServerError"));
const Maintenance = lazy(() => import("./pages/Maintenance"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="leistungen" element={<Suspense fallback={<PageLoader />}><Services /></Suspense>} />
          <Route path="leistungen/unternehmensfilm" element={<Suspense fallback={<PageLoader />}><CorporateVideo /></Suspense>} />
          <Route path="leistungen/recruiting" element={<Suspense fallback={<PageLoader />}><RecruitingVideo /></Suspense>} />
          <Route path="leistungen/werbevideo" element={<Suspense fallback={<PageLoader />}><SocialAds /></Suspense>} />
          <Route path="leistungen/social-media" element={<Suspense fallback={<PageLoader />}><SocialRetainer /></Suspense>} />
          <Route path="reza-e-motion" element={<Suspense fallback={<PageLoader />}><PrivateEvents /></Suspense>} />
          <Route path="reza-e-motion/eventbegleitung" element={<Suspense fallback={<PageLoader />}><EventCoverage /></Suspense>} />
          <Route path="reza-e-motion/musikvideos" element={<Suspense fallback={<PageLoader />}><MusicVideos /></Suspense>} />
          <Route path="reza-e-motion/hochzeitsfilme" element={<Suspense fallback={<PageLoader />}><WeddingFilms /></Suspense>} />
          <Route path="referenzen" element={<Suspense fallback={<PageLoader />}><Work /></Suspense>} />
          <Route path="preise" element={<Suspense fallback={<PageLoader />}><Pricing /></Suspense>} />
          <Route path="ueber-uns" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="technik" element={<Suspense fallback={<PageLoader />}><Equipment /></Suspense>} />
          <Route path="faq" element={<Suspense fallback={<PageLoader />}><FAQ /></Suspense>} />
          <Route path="glossar" element={<Suspense fallback={<PageLoader />}><GlossaryIndex /></Suspense>} />
          <Route path="blog" element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>} />
          <Route path="blog/:slug" element={<Suspense fallback={<PageLoader />}><BlogPost /></Suspense>} />
          <Route path="kontakt" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
          <Route path="impressum" element={<Suspense fallback={<PageLoader />}><Imprint /></Suspense>} />
          <Route path="datenschutz" element={<Suspense fallback={<PageLoader />}><Privacy /></Suspense>} />
          <Route path="agb" element={<Suspense fallback={<PageLoader />}><AGB /></Suspense>} />
          <Route path="danke" element={<Suspense fallback={<PageLoader />}><Success /></Suspense>} />
          <Route path="admin" element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
          
          {/* Error Pages */}
          <Route path="403" element={<Suspense fallback={<PageLoader />}><Forbidden /></Suspense>} />
          <Route path="500" element={<Suspense fallback={<PageLoader />}><ServerError /></Suspense>} />
          <Route path="503" element={<Suspense fallback={<PageLoader />}><Maintenance /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
