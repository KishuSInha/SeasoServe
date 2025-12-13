import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import ClimateSelector from "@/components/ClimateSelector";
import WhySection from "@/components/WhySection";
import HealthyDietSection from "@/components/HealthyDietSection";
import Footer from "@/components/Footer";
import FloatingAction from "@/components/FloatingAction";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div className="relative" style={{ backgroundImage: 'url(/food3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <HealthyDietSection />
          <HowItWorksSection />
          <FeaturesSection />
          <ClimateSelector />
          <WhySection />
        </div>
      </div>
      <Footer />
      <FloatingAction />
    </main>
  );
};

export default Index;
