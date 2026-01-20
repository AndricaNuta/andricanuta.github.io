import Navigation from "@/components/Navigation";
import DeveloperFeedback from "@/components/DeveloperFeedback";
import Footer from "@/components/Footer";

const Feedback = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <DeveloperFeedback web3formsKey="e53984f2-18c4-4e52-98f8-9f8a26a14292" />
      </div>
      <Footer />
    </main>
  );
};

export default Feedback;
