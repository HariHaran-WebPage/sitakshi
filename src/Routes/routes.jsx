import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import ScrollToTop from '../components/ScrollToTop';
import Navbar from '../components/Header/Navbar';
import HomepageMain from '../components/Pages/HomePageComponents/HomepageMain';
import Aboutpage from '../components/Pages/About Us/Aboutpage';
import ContactSection from '../components/Pages/Contact/ContactSection';
import BlogPage from '../components/Pages/Blogpage/Blogpage';
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
import NotFound from '../components/404page';

function AppRoutes() {
  const location = useLocation();

  const validRoutes = [
    '/',
    '/contact',
    '/about',
    '/portfolio',
    '/blog',
    '/services/frontend-development',
    '/services/backend-development',
    '/services/full-stack',
    '/services/seo',
    '/services/social-media',
    '/services/ppc',
    '/services/email-marketing',
    '/services/content-marketing',
  ];

  const is404 = !validRoutes.includes(location.pathname);

  if (is404) {
    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomepageMain />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route
          path="/services/frontend-development"
          element={<ServicesPage />}
        />
        <Route
          path="/services/backend-development"
          element={<BackendServicesPage />}
        />
        <Route
          path="/services/full-stack"
          element={<FullStackServicesPage />}
        />
        <Route path="/services/seo" element={<SEOPage />} />
        <Route
          path="/services/social-media"
          element={<SocialMediaPage />}
        />
        <Route path="/services/ppc" element={<PPCPage />} />
        <Route
          path="/services/email-marketing"
          element={<EmailMarketingPage />}
        />
        <Route
          path="/services/content-marketing"
          element={<ContentMarketingPage />}
        />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>

      <Footer />

      <FloatingWhatsApp
        phoneNumber="918098914008"
        message="Hello! I would like to know more about your services."
      />

      <FloatingChatbot
        agentName="Support"
        agentAvatar="🤖"
      />
    </div>
  );
}

function PageRoute() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
}

export default PageRoute;