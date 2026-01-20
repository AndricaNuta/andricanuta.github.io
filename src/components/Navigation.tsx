import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import currenseeLogo from "@/assets/currensee-logo.png";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import AppStoreBadge from "./AppStoreBadge";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll to section
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const goToHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      // Already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button
            onClick={goToHome}
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to home"
          >
            <img
              src={currenseeLogo}
              alt="CurrenSee Logo"
              className="w-10 h-10 rounded-xl transition-transform duration-300 group-hover:rotate-6"
            />
            <span className="text-xl font-bold text-foreground hidden sm:block">
              CurrenSee
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </button>
            <div className="h-6 w-px bg-border" />
            <ThemeToggle />
            <AppStoreBadge
              href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro"
              className="scale-90"
              source="navigation"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left text-base font-medium text-foreground py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block w-full text-left text-base font-medium text-foreground py-2"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left text-base font-medium text-foreground py-2"
              >
                FAQ
              </button>
              <div className="pt-4 border-t border-border">
                <AppStoreBadge
                  href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro"
                  className="w-full"
                  source="mobile-navigation"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
