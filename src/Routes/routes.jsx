import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import Navbar from '../components/Header/Navbar';
import HomepageMain from '../components/Pages/HomePageComponents/HomepageMain';
import Aboutpage from '../components/Pages/About Us/Aboutpage';
import ContactSection from '../components/Pages/Contact/ContactSection';
import BlogPage from '../components/Pages/Blogpage/BlogPage';
import ServicesPage from '../components/Pages/Services/frontend-development';
import BackendServicesPage from '../components/Pages/Services/backend-development';
import FullStackServicesPage from '../components/Pages/Services/full-stack';
import PortfolioPage from '../components/Pages/Portfoliopage/Portfoliopage';
import SocialMediaPage from '../components/Pages/Services/Socialmediapage';
import PPCPage from '../components/Pages/Services/Ppcpage';
import EmailMarketingPage from '../components/Pages/Services/email-marketing';
import ContentMarketingPage from '../components/Pages/Services/Contentmarketingpage';
import SEOPage from '../components/Pages/Services/seo';
import Footer from '../components/Footer/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import FloatingChatbot from '../components/FloatingChatbot';

function PageRoute() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/"                              element={<HomepageMain />} />
          <Route path="/contact"                       element={<ContactSection />} />
          <Route path="/about"                         element={<Aboutpage />} />
          <Route path="/services/frontend-development" element={<ServicesPage />} />
          <Route path="/services/backend-development"  element={<BackendServicesPage />} />
          <Route path="/services/full-stack"           element={<FullStackServicesPage />} />
          <Route path="/services/seo"                  element={<SEOPage />} />
          <Route path="/services/social-media"         element={<SocialMediaPage />} />
          <Route path="/services/ppc"                  element={<PPCPage />} />
          <Route path="/services/email-marketing"      element={<EmailMarketingPage />} />
          <Route path="/services/content-marketing"    element={<ContentMarketingPage />} />
          <Route path="/portfolio"                     element={<PortfolioPage />} />
          <Route path="/blog"                          element={<BlogPage />} />
        </Routes>
        <Footer />

        {/* Floating buttons — rendered on every page */}
        <FloatingWhatsApp
          phoneNumber="918098914008"
          message="Hello! I would like to know more about your services."
        />
        <FloatingChatbot
          agentName="Support"
          agentAvatar="🤖"
        />
      </div>
    </Router>
  );
}

export default PageRoute;