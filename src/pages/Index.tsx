import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import GetUpdates from "@/components/GetUpdates";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustBadges />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CallToAction />
      <GetUpdates web3formsKey="e53984f2-18c4-4e52-98f8-9f8a26a14292" />
      <Footer />
      <FloatingCTA />
    </main>
  );
};

export default Index;
