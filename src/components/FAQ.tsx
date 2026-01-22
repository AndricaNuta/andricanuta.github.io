import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { analytics } from "@/lib/analytics";

const FAQ = () => {
  const { t } = useTranslation();
  
  const faqs = [
    {
      question: t('faq.items.scanning.question'),
      answer: t('faq.items.scanning.answer'),
    },
    {
      question: t('faq.items.internet.question'),
      answer: t('faq.items.internet.answer'),
    },
    {
      question: t('faq.items.privacy.question'),
      answer: t('faq.items.privacy.answer'),
    },
    {
      question: t('faq.items.currencies.question'),
      answer: t('faq.items.currencies.answer'),
    },
    {
      question: t('faq.items.free.question'),
      answer: t('faq.items.free.answer'),
    },
    {
      question: t('faq.items.account.question'),
      answer: t('faq.items.account.answer'),
    },
    {
      question: t('faq.items.rates.question'),
      answer: t('faq.items.rates.answer'),
    },
    {
      question: t('faq.items.countries.question'),
      answer: t('faq.items.countries.answer'),
    },
  ];
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
              {t('faq.badge')}
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('faq.title')}
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-normal md:font-normal">
            {t('faq.description')}
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
