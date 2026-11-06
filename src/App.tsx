import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Loader from "@/components/ui/Loader";
import Home from "@/pages/Home";

/* Pages other than home are code-split so the 3D bundle stays on "/" only. */
const Releases = lazy(() => import("@/pages/Releases"));
const ReleaseDetails = lazy(() => import("@/pages/ReleaseDetails"));
const Artists = lazy(() => import("@/pages/Artists"));
const ArtistDetails = lazy(() => import("@/pages/ArtistDetails"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const SearchPage = lazy(() => import("@/pages/Search"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  const location = useLocation();
  return (
    <div className="grain min-h-screen bg-bg text-ink">
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Suspense fallback={<Loader fullScreen />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/releases" element={<Releases />} />
              <Route path="/releases/:slug" element={<ReleaseDetails />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:slug" element={<ArtistDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
