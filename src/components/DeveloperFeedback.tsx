import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageSquare, Bug, Lightbulb, Heart } from "lucide-react";
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

interface DeveloperFeedbackProps {
  web3formsKey?: string;
  formspreeId?: string;
}

const DeveloperFeedback = ({ web3formsKey, formspreeId }: DeveloperFeedbackProps) => {
  const { t } = useTranslation();
  
  const feedbackTypes = [
    { value: "feature", label: t('feedbackForm.feedbackTypes.feature'), icon: Lightbulb },
    { value: "bug", label: t('feedbackForm.feedbackTypes.bug'), icon: Bug },
    { value: "feedback", label: t('feedbackForm.feedbackTypes.feedback'), icon: MessageSquare },
    { value: "other", label: t('feedbackForm.feedbackTypes.other'), icon: Heart },
  ];
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: t('feedbackForm.messageRequired'),
        description: t('feedbackForm.messageRequiredDesc'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        feedback_type: feedbackType || "feedback",
        message: message,
        email: email || "anonymous",
        source: "landing_page",
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
            subject: `CurrenSee Feedback: ${feedbackType || "General"}`,
            ...formData,
          }),
        });

        const result = await response.json();
        if (result.success) {
          analytics.trackFeedbackSubmit(feedbackType || "general");
          toast({
            title: t('feedbackForm.successTitle'),
            description: t('feedbackForm.successDescription'),
          });
          setMessage("");
          setEmail("");
          setFeedbackType("");
        } else {
          throw new Error("Submission failed");
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
          analytics.trackFeedbackSubmit(feedbackType || "general");
          toast({
            title: t('feedbackForm.successTitle'),
            description: t('feedbackForm.successDescription'),
          });
          setMessage("");
          setEmail("");
          setFeedbackType("");
        } else {
          throw new Error("Submission failed");
        }
      } else {
        // Fallback: just show success (for development)
        analytics.trackFeedbackSubmit(feedbackType || "general");
        toast({
          title: t('feedbackForm.successTitle'),
          description: t('feedbackForm.successDescription'),
        });
        setMessage("");
        setEmail("");
        setFeedbackType("");
      }
    } catch (error) {
      toast({
        title: t('feedbackForm.errorTitle'),
        description: t('feedbackForm.errorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
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
              {t('developerFeedback.badge')}
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('developerFeedback.title')}
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-normal md:font-normal">
            {t('developerFeedback.description')}
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Feedback Type */}
            <div className="space-y-2">
              <Label htmlFor="feedback-type">{t('feedbackForm.feedbackTypeLabel')}</Label>
              <Select value={feedbackType} onValueChange={setFeedbackType}>
                <SelectTrigger id="feedback-type">
                  <SelectValue placeholder={t('feedbackForm.feedbackTypePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {feedbackTypes.map((type) => (
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

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">{t('feedbackForm.messageLabel')}</Label>
              <Textarea
                id="message"
                placeholder={t('feedbackForm.messagePlaceholder')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="resize-none"
                required
              />
            </div>

            {/* Email (optional) */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('feedbackForm.emailLabel')}</Label>
              <input
                id="email"
                type="email"
                placeholder={t('feedbackForm.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">
                {t('feedbackForm.emailHelp')}
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('feedbackForm.submitting') : t('feedbackForm.submit')}
            </Button>

            {!web3formsKey && !formspreeId && (
              <div className="bg-muted/50 border border-border rounded-lg p-4 text-sm text-muted-foreground">
                <p className="font-semibold mb-2">{t('feedbackForm.devMode')}</p>
                <p>
                  {t('feedbackForm.devModeDesc')}
                </p>
              </div>
            )}
          </form>

          {/* Additional info */}
          <motion.div
            className="mt-8 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span>{t('feedbackForm.readEverySubmission')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                <span>{t('feedbackForm.inputShapesApp')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span>{t('feedbackForm.featureRequestsWelcome')}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperFeedback;
