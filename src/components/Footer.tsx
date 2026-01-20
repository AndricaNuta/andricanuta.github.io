import currenseeLogo from "@/assets/currensee-logo.png";
import { ThemeToggle } from "./ThemeToggle";
import { Instagram, Music } from "lucide-react";

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
            <a 
              href="https://few-cephalopod-11a.notion.site/Currency-Converter-About-Privacy-Policy-Terms-27ffb972bd6380049ba2c94b28535589" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="https://few-cephalopod-11a.notion.site/Currency-Converter-About-Privacy-Policy-Terms-27ffb972bd6380049ba2c94b28535589" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Support
            </a>
            <a 
              href="https://www.instagram.com/currensee.app" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-2"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
              <span className="hidden sm:inline">@currensee.app</span>
            </a>
            <a 
              href="https://open.spotify.com/artist/YOUR_ARTIST_ID" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-2"
              aria-label="Listen to our music"
            >
              <Music className="w-5 h-5" />
              <span className="hidden sm:inline">Music</span>
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
