import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SupportForm from "@/components/SupportForm";
import FeedbackForm from "@/components/FeedbackForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HelpCircle, MessageSquare } from "lucide-react";

interface SupportProps {
  web3formsKey?: string;
  formspreeId?: string;
}

const Support = ({ web3formsKey = "e53984f2-18c4-4e52-98f8-9f8a26a14292", formspreeId }: SupportProps) => {
  const { t } = useTranslation();
  
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
            <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-block mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  {t('support.badge')}
                </span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t('support.title')}
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed font-normal md:font-normal">
                {t('support.description')}
              </p>
            </motion.div>

            <Tabs defaultValue="support" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger 
                  value="support" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/10 data-[state=active]:via-primary/5 data-[state=active]:to-primary/10 data-[state=active]:text-foreground"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{t('support.supportTab')}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="feedback" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/10 data-[state=active]:via-primary/5 data-[state=active]:to-primary/10 data-[state=active]:text-foreground"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('support.feedbackTab')}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="support" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {t('support.getSupport.title')}
                    </h2>
                    <p className="text-muted-foreground">
                      {t('support.getSupport.description')}
                    </p>
                  </div>
                  <SupportForm web3formsKey={web3formsKey} formspreeId={formspreeId} />
                </motion.div>
              </TabsContent>

              <TabsContent value="feedback" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {t('support.shareFeedback.title')}
                    </h2>
                    <p className="text-muted-foreground">
                      {t('support.shareFeedback.description')}
                    </p>
                  </div>
                  <FeedbackForm web3formsKey={web3formsKey} formspreeId={formspreeId} />
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Support;
