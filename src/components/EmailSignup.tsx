import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface EmailSignupProps {
  /**
   * Formspree form ID (get from https://formspree.io)
   * Free: 50/month | Paid: $19/month for 1,000
   * Example: "xvgqyqkn" or "your-email@example.com"
   */
  formspreeId?: string;
  
  /**
   * Web3Forms access key (get from https://web3forms.com)
   * Free: 250/month | Paid: $5/month for 1,000
   * Better free tier than Formspree!
   */
  web3formsKey?: string;
  
  /**
   * Formspark form ID (get from https://formspark.io)
   * Free: 250/month | Paid: $9/month for 1,000
   */
  formsparkId?: string;
  
  /**
   * EmailJS service ID (alternative to Formspree)
   */
  emailjsServiceId?: string;
  emailjsTemplateId?: string;
  emailjsPublicKey?: string;
  
  /**
   * Custom submit handler (for other services)
   */
  onSubmit?: (email: string) => Promise<void>;
  
  /**
   * Placeholder text for input
   */
  placeholder?: string;
  
  /**
   * Button text
   */
  buttonText?: string;
  
  /**
   * Success message
   */
  successMessage?: string;
  
  /**
   * Variant: "inline" or "stacked"
   */
  variant?: "inline" | "stacked";
  
  className?: string;
}

const EmailSignup = ({
  formspreeId,
  web3formsKey,
  formsparkId,
  emailjsServiceId,
  emailjsTemplateId,
  emailjsPublicKey,
  onSubmit,
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  successMessage = "You're all set! We'll notify you about updates.",
  variant = "inline",
  className = "",
}: EmailSignupProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Option 1: Web3Forms (250 free/month - BEST FREE TIER)
      if (web3formsKey) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            email: email,
            subject: "New Email Signup - CurrenSee",
            from_name: "CurrenSee Landing Page",
          }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error("Failed to submit");
        }
      }
      // Option 2: Formspark (250 free/month)
      else if (formsparkId) {
        const response = await fetch("https://submit-form.com/" + formsparkId, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit");
        }
      }
      // Option 3: Formspree (50 free/month)
      else if (formspreeId) {
        const response = await fetch("https://formspree.io/f/" + formspreeId, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit");
        }
      }
      // Option 4: EmailJS
      else if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
        // You'll need to install emailjs: npm install @emailjs/browser
        // Then import: import emailjs from '@emailjs/browser';
        // emailjs.send(emailjsServiceId, emailjsTemplateId, { email }, emailjsPublicKey);
        throw new Error("EmailJS integration requires @emailjs/browser package");
      }
      // Option 5: Custom handler
      else if (onSubmit) {
        await onSubmit(email);
      }
      // No service configured
      else {
        throw new Error("No email service configured. Please provide web3formsKey, formsparkId, formspreeId, emailjs config, or onSubmit handler.");
      }

      setStatus("success");
      setEmail("");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  const containerClass = variant === "inline" 
    ? "flex flex-col sm:flex-row gap-3 w-full max-w-md"
    : "flex flex-col gap-3 w-full max-w-md";

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={containerClass}>
        <div className="flex-1 relative">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === "loading" || status === "success"}
            className="w-full rounded-xl"
            required
          />
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 text-sm text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errorMessage}
            </motion.div>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`rounded-xl ${variant === "inline" ? "sm:w-auto w-full" : "w-full"}`}
        >
          {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
          {status === "success" && <CheckCircle2 className="w-4 h-4" />}
          {status === "success" ? "Subscribed!" : buttonText}
        </Button>
      </div>
      
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-success-green flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          {successMessage}
        </motion.p>
      )}
    </form>
  );
};

export default EmailSignup;
