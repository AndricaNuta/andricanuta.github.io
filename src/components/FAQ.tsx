import { motion } from "framer-motion";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { analytics } from "@/lib/analytics";

const faqs = [
  {
    question: "How does the price scanning work?",
    answer: "Simply point your camera at any price tag, menu, or receipt. Our app uses advanced OCR (Optical Character Recognition) to detect prices and instantly converts them to your preferred currency using real-time exchange rates.",
  },
  {
    question: "Do I need an internet connection?",
    answer: "The app works best with an internet connection for real-time exchange rates. However, you can save exchange rates for offline use, and basic scanning features work offline once the app is loaded.",
  },
  {
    question: "Is my data private and secure?",
    answer: "Absolutely! All image processing happens directly on your device. We never send your photos or scanned data to our servers. Your privacy is our top priority—100% of the processing is done locally on your phone.",
  },
  {
    question: "Which currencies are supported?",
    answer: "CurrenSee supports over 150 currencies worldwide, including all major currencies like USD, EUR, GBP, JPY, CNY, and many more. You can convert between any supported currencies.",
  },
  {
    question: "Is the app really free?",
    answer: "Yes! The app is completely free to download and use. The free version includes all core features: price scanning, currency conversion, label translation, and price saving. There are optional ads, but they don't interfere with the core functionality.",
  },
  {
    question: "Can I use it without creating an account?",
    answer: "Yes! CurrenSee works completely without requiring an account. Just download, open, and start scanning. No sign-up, no email, no hassle.",
  },
  {
    question: "How accurate are the exchange rates?",
    answer: "We use real-time exchange rates from reliable financial data providers. Rates are updated frequently throughout the day to ensure accuracy. Note that actual conversion rates may vary slightly when you make purchases, as banks and payment processors may apply their own fees.",
  },
  {
    question: "Does it work in all countries?",
    answer: "Yes! CurrenSee works anywhere in the world. As long as you can see a price tag, menu, or receipt, you can scan and convert it. The app supports prices in any language and format.",
  },
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string>("");

  const handleValueChange = (value: string) => {
    // Track analytics when an item opens (before updating state)
    if (value && value !== openItem) {
      try {
        const index = parseInt(value.replace('item-', ''), 10);
        if (!isNaN(index) && index >= 0 && index < faqs.length && faqs[index] && analytics) {
          analytics.trackEvent('faq_open', { 
            question_index: index,
            question: faqs[index].question.substring(0, 50) 
          });
        }
      } catch (error) {
        // Silently fail - don't break the UI
        console.error('FAQ analytics error:', error);
      }
    }
    
    // Update state after tracking
    setOpenItem(value);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background decoration - Optimized for Safari */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl blur-optimized" style={{ willChange: 'filter', transform: 'translateZ(0)' }} />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl blur-optimized" style={{ willChange: 'filter', transform: 'translateZ(0)' }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Got Questions?
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-normal md:font-normal">
            Everything you need to know about CurrenSee
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={openItem}
            onValueChange={handleValueChange}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border bg-card rounded-lg mb-4 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
