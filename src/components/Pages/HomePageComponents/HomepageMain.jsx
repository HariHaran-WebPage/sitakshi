import HeroSection from './Home';
import AboutUs from './AboutUs';
import Services from './Services';
import PortfolioSection from './Portfolio';
import Clientssection from './Clientssection';
import SkillsSection from './Skills';
import BlogSection from './BlogSection';
import ContactSection from './Contact';

function HomepageMain() {
  return (
    <div className="HomepageMain">
      <HeroSection />
      <AboutUs />
      <Services />
      <PortfolioSection />
      <SkillsSection />
      <Clientssection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}

export default HomepageMain;