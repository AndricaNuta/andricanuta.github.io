import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { analytics } from "@/lib/analytics";

// Placeholder testimonials - replace with real ones as you collect them
const testimonials = [
  {
    name: "Sarah M.",
    location: "Traveler from USA",
    rating: 5,
    text: "This app saved me so much money on my trip to Japan! No more mental math at restaurants. Just scan and know exactly what I'm paying.",
    avatar: "SM",
  },
  {
    name: "James K.",
    location: "Business Traveler",
    rating: 5,
    text: "Perfect for tracking expenses. I scan all my receipts and convert them instantly. Makes expense reports so much easier.",
    avatar: "JK",
  },
  {
    name: "Emma L.",
    location: "Backpacker",
    rating: 5,
    text: "Love that it works offline and doesn't need an account. Privacy-first design is exactly what I want in a travel app.",
    avatar: "EL",
  },
  {
    name: "Michael R.",
    location: "Frequent Flyer",
    rating: 5,
    text: "The translation feature is a game-changer. Not just prices, but I can understand what I'm actually buying. Brilliant!",
    avatar: "MR",
  },
  {
    name: "Lisa T.",
    location: "Travel Blogger",
    rating: 5,
    text: "I've tried many currency apps, but this one is the fastest and most accurate. The scanning is incredibly reliable.",
    avatar: "LT",
  },
  {
    name: "David C.",
    location: "Digital Nomad",
    rating: 5,
    text: "The widget feature is perfect. I can check exchange rates without opening the app. Small details that make a big difference.",
    avatar: "DC",
  },
];

const RealTestimonials = () => {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              User Reviews
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Loved by travelers worldwide
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-normal md:font-light">
            See what real users are saying about their experience with CurrenSee
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-8 h-8 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-muted-foreground mb-4">
            Join thousands of travelers who trust CurrenSee
          </p>
          <motion.a
            href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              analytics.trackAppStoreClick('testimonials');
              analytics.trackDownload('ios', 'testimonials');
            }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              <span>Download Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default RealTestimonials;
