import { motion } from "framer-motion";
import { ShoppingBag, UtensilsCrossed, Hotel, Receipt, Gift, Plane } from "lucide-react";

const useCases = [
  {
    icon: ShoppingBag,
    title: "Shopping Abroad",
    description: "Compare prices across different stores and markets. Save prices as you shop to find the best deals.",
    scenario: "You're shopping in a local market and want to know if that souvenir is a good deal compared to other shops.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant Menus",
    description: "Instantly understand menu prices in your currency. No more guessing or awkward mental math at the table.",
    scenario: "You're at a restaurant and the menu is in a foreign currency. Quickly scan to see if it fits your budget.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Hotel,
    title: "Hotel & Accommodation",
    description: "Compare hotel rates, room service prices, and local amenities to make informed booking decisions.",
    scenario: "Checking hotel prices and comparing different accommodation options in your home currency.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Receipt,
    title: "Expense Tracking",
    description: "Scan receipts from your trip to track expenses. Perfect for business travel or budget planning.",
    scenario: "You need to track all your travel expenses and want to convert receipts to your home currency.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Gift,
    title: "Gift Shopping",
    description: "Find the perfect gift within your budget. Compare prices and make sure you're getting good value.",
    scenario: "Shopping for gifts for family back home and want to stay within your budget.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Plane,
    title: "Travel Planning",
    description: "Research costs before you travel. Save prices from travel websites to plan your budget accurately.",
    scenario: "Planning your trip and want to estimate costs in your home currency before you go.",
    color: "from-indigo-500 to-blue-500",
  },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-16 lg:py-24 bg-gradient-subtle relative overflow-hidden">
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
              Real-World Scenarios
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Perfect for every travel situation
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-normal md:font-light">
            See how CurrenSee helps travelers save money and shop confidently in real situations
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${useCase.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <useCase.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {useCase.description}
              </p>
              
              {/* Scenario */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  "{useCase.scenario}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-muted-foreground mb-2">
            Have a different use case? We'd love to hear about it!
          </p>
          <a
            href="/support"
            className="text-primary hover:underline font-medium"
          >
            Share your feedback →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
