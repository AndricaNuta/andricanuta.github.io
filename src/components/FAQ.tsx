import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <section className="py-20 lg:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about CurrenSee
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
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
