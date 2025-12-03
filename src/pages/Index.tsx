import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import ClimateSelector from "@/components/ClimateSelector";
import WhySection from "@/components/WhySection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import FloatingAction from "@/components/FloatingAction";
import ScrollSnapSection from "@/components/ScrollSnapSection";
import SectionIndicator from "@/components/SectionIndicator";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ScrollSnapSection id="hero">
        <HeroSection />
      </ScrollSnapSection>
      <ScrollSnapSection id="how-it-works">
        <HowItWorksSection />
      </ScrollSnapSection>
      <ScrollSnapSection id="features">
        <FeaturesSection />
      </ScrollSnapSection>
      <ScrollSnapSection id="climate">
        <ClimateSelector />
      </ScrollSnapSection>
      <ScrollSnapSection id="why">
        <WhySection />
      </ScrollSnapSection>
      <ScrollSnapSection id="stats">
        <StatsSection />
      </ScrollSnapSection>
      <Footer />
      <FloatingAction />
      <SectionIndicator />
    </main>
  );
};

export default Index;
