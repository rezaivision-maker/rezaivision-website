/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import CorporateVideo from "./pages/CorporateVideo";
import RecruitingVideo from "./pages/RecruitingVideo";
import SocialAds from "./pages/SocialAds";
import SocialRetainer from "./pages/SocialRetainer";
import PrivateEvents from "./pages/PrivateEvents";
import EventCoverage from "./pages/EventCoverage";
import MusicVideos from "./pages/MusicVideos";
import WeddingFilms from "./pages/WeddingFilms";
import Work from "./pages/Work";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Imprint from "./pages/Imprint";
import Privacy from "./pages/Privacy";
import AGB from "./pages/AGB";
import GlossaryIndex from "./pages/Glossary";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="leistungen" element={<Services />} />
          <Route path="leistungen/unternehmensfilm" element={<CorporateVideo />} />
          <Route path="leistungen/recruiting" element={<RecruitingVideo />} />
          <Route path="leistungen/werbevideo" element={<SocialAds />} />
          <Route path="leistungen/social-media" element={<SocialRetainer />} />
          <Route path="rezaemotion" element={<PrivateEvents />} />
          <Route path="rezaemotion/eventbegleitung" element={<EventCoverage />} />
          <Route path="rezaemotion/musikvideos" element={<MusicVideos />} />
          <Route path="rezaemotion/hochzeitsfilme" element={<WeddingFilms />} />
          <Route path="referenzen" element={<Work />} />
          <Route path="preise" element={<Pricing />} />
          <Route path="ueber-uns" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="glossar" element={<GlossaryIndex />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="impressum" element={<Imprint />} />
          <Route path="datenschutz" element={<Privacy />} />
          <Route path="agb" element={<AGB />} />
          <Route path="admin" element={<AdminDashboard />} />
          {/* Fallback for missing legal pages */}
          <Route path="*" element={<div className="min-h-[50vh] flex items-center justify-center text-2xl font-display">Seite in Bearbeitung</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
