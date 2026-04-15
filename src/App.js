import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { highlightSearchTerm, clearHighlights } from './utils/highlightSearch';
import Header from './components/Header';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Careers from './pages/Careers';
import CareerDetail from './pages/CareerDetail';
import Founder from './pages/Founder';
import Faculty from './pages/Faculty';
import PTA from './pages/PTA';
import History from './pages/History';
import Anthem from './pages/Anthem';
import Campus from './pages/Campus';
import Library from './pages/Library';
import ScienceLab from './pages/ScienceLab';
import Technology from './pages/Technology';
import Examinations from './pages/Examinations';
import Subjects from './pages/Subjects';
import Curriculum from './pages/Curriculum';
import Nursery from './pages/Nursery';
import Primary from './pages/Primary';
import Secondary from './pages/Secondary';
import AdmissionsContact from './pages/AdmissionsContact';
import AdmissionsVisit from './pages/AdmissionsVisit';
import ImportantDates from './pages/ImportantDates';
import ApplicationProcess from './pages/ApplicationProcess';
import Requirements from './pages/Requirements';
import Fees from './pages/Fees';
import Sports from './pages/Sports';
import Clubs from './pages/Clubs';
import Arts from './pages/Arts';
import Alumni from './pages/Alumni';
import StudentLeadership from './pages/StudentLeadership';
import CommunityService from './pages/CommunityService';
import EventsActivities from './pages/EventsActivities';
import Counseling from './pages/Counseling';
import HealthWellness from './pages/HealthWellness';
import DiningServices from './pages/DiningServices';
import FAQ from './pages/FAQ';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import RegistrationStatus from './pages/RegistrationStatus';
import NotFound from './pages/NotFound';
import ScrollToTopBtn from './components/ScrollToTopBtn';

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear any lingering highlights from previous search
    clearHighlights();

    if (location.hash) {
      window.scrollTo(0, 0);
      const id = location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }

    // After page renders, highlight the search term if one was passed via state
    const term = location.state?.highlight;
    if (term) {
      setTimeout(() => highlightSearchTerm(term), 600);
    }

    if (document.readyState === 'complete') {
      setLoading(false);
      return;
    }

    setLoading(true);

    const handleLoad = () => setLoading(false);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [location.pathname, location.hash, location.state]);

  return (
    <div className="App">
      <TopBar />
      <Header isScrolled={loading} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <main key={location.pathname}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/student-life/leadership" element={<StudentLeadership />} />
              <Route path="/student-life/sports" element={<Sports />} />
              <Route path="/student-life/clubs" element={<Clubs />} />
              <Route path="/student-life/arts" element={<Arts />} />
              <Route path="/student-life/community-service" element={<CommunityService />} />
              <Route path="/student-life/events" element={<EventsActivities />} />
              <Route path="/student-life/counseling" element={<Counseling />} />
              <Route path="/student-life/health" element={<HealthWellness />} />
              <Route path="/student-life/dining" element={<DiningServices />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/support" element={<Support />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id/:slug" element={<BlogDetail />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:id/:slug" element={<CareerDetail />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/pta" element={<PTA />} />
              <Route path="/history" element={<History />} />
              <Route path="/anthem" element={<Anthem />} />
              <Route path="/campus" element={<Campus />} />
              <Route path="/library" element={<Library />} />
              <Route path="/science-labs" element={<ScienceLab />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/examinations" element={<Examinations />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/nursery" element={<Nursery />} />
              <Route path="/primary" element={<Primary />} />
              <Route path="/secondary" element={<Secondary />} />
              <Route path="/admissions/apply" element={<ApplicationProcess />} />
              <Route path="/admissions/requirements" element={<Requirements />} />
              <Route path="/admissions/fees" element={<Fees />} />
              <Route path="/admissions/contact" element={<AdmissionsContact />} />
              <Route path="/admissions/visit" element={<AdmissionsVisit />} />
              <Route path="/admissions/dates" element={<ImportantDates />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/admissions/status" element={<RegistrationStatus />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopBtn />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
}

export default App;