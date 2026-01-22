import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HelpCircle, AlertCircle, MessageCircle, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { analytics } from "@/lib/analytics";

interface SupportFormProps {
  web3formsKey?: string;
  formspreeId?: string;
}

const SupportForm = ({ web3formsKey, formspreeId }: SupportFormProps) => {
  const { t } = useTranslation();
  
  const supportTypes = [
    { value: "technical", label: t('supportForm.supportTypes.technical'), icon: Settings },
    { value: "question", label: t('supportForm.supportTypes.question'), icon: MessageCircle },
    { value: "bug", label: t('supportForm.supportTypes.bug'), icon: AlertCircle },
    { value: "other", label: t('supportForm.supportTypes.other'), icon: HelpCircle },
  ];
  const [supportType, setSupportType] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: t('supportForm.messageRequired'),
        description: t('supportForm.messageRequiredDesc'),
        variant: "destructive",
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: t('supportForm.emailRequired'),
        description: t('supportForm.emailRequiredDesc'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        support_type: supportType || "other",
        message: message,
        email: email,
        source: "support_page",
        timestamp: new Date().toISOString(),
      };

      if (web3formsKey) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `CurrenSee Support: ${supportType || "General"}`,
            ...formData,
          }),
        });

        // Check if response is ok first
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // Consider it successful if response is ok, even if success field is not explicitly true
        // This handles cases where web3forms sends the email but response format varies
        if (response.ok && (result.success !== false)) {
          analytics.trackEvent("support_submit", { support_type: supportType || "general" });
          toast({
            title: t('supportForm.successTitle'),
            description: t('supportForm.successDescription'),
          });
          setMessage("");
          setEmail("");
          setSupportType("");
        } else {
          throw new Error(result.message || "Submission failed");
        }
      } else if (formspreeId) {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          analytics.trackEvent("support_submit", { support_type: supportType || "general" });
          toast({
            title: t('supportForm.successTitle'),
            description: t('supportForm.successDescription'),
          });
          setMessage("");
          setEmail("");
          setSupportType("");
        } else {
          throw new Error("Submission failed");
        }
      } else {
        // Fallback: just show success (for development)
        analytics.trackEvent("support_submit", { support_type: supportType || "general" });
        toast({
          title: t('supportForm.successTitle'),
          description: t('supportForm.successDescription'),
        });
        setMessage("");
        setEmail("");
        setSupportType("");
      }
    } catch (error) {
      toast({
        title: t('supportForm.errorTitle'),
        description: t('supportForm.errorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Support Type */}
        <div className="space-y-2">
          <Label htmlFor="support-type">{t('supportForm.supportTypeLabel')}</Label>
          <Select value={supportType} onValueChange={setSupportType} required>
            <SelectTrigger id="support-type">
              <SelectValue placeholder={t('supportForm.supportTypePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {supportTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.icon className="w-4 h-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="support-email">{t('supportForm.emailLabel')}</Label>
          <input
            id="support-email"
            type="email"
            placeholder={t('supportForm.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
          <p className="text-xs text-muted-foreground">
            {t('supportForm.emailHelp')}
          </p>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="support-message">{t('supportForm.messageLabel')}</Label>
          <Textarea
            id="support-message"
            placeholder={t('supportForm.messagePlaceholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('supportForm.submitting') : t('supportForm.submit')}
        </Button>

        {!web3formsKey && !formspreeId && (
          <div className="bg-muted/50 border border-border rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-semibold mb-2">{t('supportForm.devMode')}</p>
            <p>
              {t('supportForm.devModeDesc')}
            </p>
          </div>
        )}
      </form>

      {/* Additional info */}
      <motion.div
        className="mt-8 pt-8 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span>{t('supportForm.responseTime')}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span>{t('supportForm.checkFAQ')}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SupportForm;
