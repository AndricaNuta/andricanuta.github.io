import currenseeLogo from "@/assets/currensee-logo.png";
import { ThemeToggle } from "./ThemeToggle";

const Footer = () => {
  return (
    <footer className="py-12 bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src={currenseeLogo} 
              alt="CurrenSee Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="font-semibold text-foreground">CurrenSee</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
            <ThemeToggle />
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CurrenSee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
