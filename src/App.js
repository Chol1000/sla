import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import StudentLife from './pages/StudentLife';
import RegistrationNursery from './pages/RegistrationNursery';
import RegistrationPrimary from './pages/RegistrationPrimary';
import RegistrationSecondary from './pages/RegistrationSecondary';
import Support from './pages/Support';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="App">
      <Header isScrolled={loading} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/student-life/*" element={<StudentLife />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/registration/nursery" element={<RegistrationNursery />} />
              <Route path="/registration/primary" element={<RegistrationPrimary />} />
              <Route path="/registration/secondary" element={<RegistrationSecondary />} />
              <Route path="/support" element={<Support />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
            </Routes>
          </main>
          <Footer />
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