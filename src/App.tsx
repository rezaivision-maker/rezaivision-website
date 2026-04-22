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
import Success from "./pages/Success";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import GlossaryIndex from "./pages/Glossary";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import ServerError from "./pages/ServerError";
import Maintenance from "./pages/Maintenance";
import { Analytics } from "./components/Analytics";

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="leistungen" element={<Services />} />
          <Route path="leistungen/unternehmensfilm" element={<CorporateVideo />} />
          <Route path="leistungen/recruiting" element={<RecruitingVideo />} />
          <Route path="leistungen/werbevideo" element={<SocialAds />} />
          <Route path="leistungen/social-media" element={<SocialRetainer />} />
          <Route path="reza-e-motion" element={<PrivateEvents />} />
          <Route path="reza-e-motion/eventbegleitung" element={<EventCoverage />} />
          <Route path="reza-e-motion/musikvideos" element={<MusicVideos />} />
          <Route path="reza-e-motion/hochzeitsfilme" element={<WeddingFilms />} />
          <Route path="referenzen" element={<Work />} />
          <Route path="preise" element={<Pricing />} />
          <Route path="ueber-uns" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="glossar" element={<GlossaryIndex />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="impressum" element={<Imprint />} />
          <Route path="datenschutz" element={<Privacy />} />
          <Route path="agb" element={<AGB />} />
          <Route path="danke" element={<Success />} />
          <Route path="admin" element={<AdminDashboard />} />
          
          {/* Error Pages */}
          <Route path="403" element={<Forbidden />} />
          <Route path="500" element={<ServerError />} />
          <Route path="503" element={<Maintenance />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
