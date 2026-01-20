import { motion } from "framer-motion";
import EmailSignup from "./EmailSignup";

interface GetUpdatesProps {
  /**
   * Web3Forms access key (recommended - 250/month free)
   * Get yours at https://web3forms.com
   */
  web3formsKey?: string;
  
  /**
   * Formspree form ID (alternative - 50/month free)
   * Get yours at https://formspree.io
   */
  formspreeId?: string;
}

const GetUpdates = ({ web3formsKey, formspreeId }: GetUpdatesProps) => {
  return (
    <section className="pt-12 lg:pt-16 pb-24 lg:pb-32 bg-gradient-subtle relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Product Updates
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Be the first to know
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed font-light max-w-xl mx-auto">
            Get notified when we launch new features, improvements, and updates. We'll only email you when there's something worth sharing.
          </p>

          {web3formsKey || formspreeId ? (
            <div className="flex justify-center">
              <EmailSignup
                web3formsKey={web3formsKey}
                formspreeId={formspreeId}
                placeholder="Enter your email address"
                buttonText="Get Updates"
                variant="inline"
                className="w-full max-w-md"
              />
            </div>
          ) : (
            <div className="bg-muted/50 border border-border rounded-lg p-6 text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Setup Required</p>
              <p>
                To enable email collection, add your Web3Forms key or Formspree ID to this component.
                <br />
                Get your Web3Forms key at <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">web3forms.com</a>
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>100% private</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Unsubscribe anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetUpdates;
