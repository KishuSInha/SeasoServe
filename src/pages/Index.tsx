import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import ClimateSelector from "@/components/ClimateSelector";
import WhySection from "@/components/WhySection";
import Footer from "@/components/Footer";
import FloatingAction from "@/components/FloatingAction";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ClimateSelector />
      <WhySection />
      <Footer />
      <FloatingAction />
    </main>
  );
};

export default Index;
