import { motion } from "framer-motion";
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

interface FeedbackFormProps {
  web3formsKey?: string;
  formspreeId?: string;
}

const feedbackTypes = [
  { value: "feature", label: "Feature Request", icon: Lightbulb },
  { value: "bug", label: "Bug Report", icon: Bug },
  { value: "feedback", label: "General Feedback", icon: MessageSquare },
  { value: "other", label: "Other", icon: Heart },
];

const FeedbackForm = ({ web3formsKey, formspreeId }: FeedbackFormProps) => {
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter your feedback message.",
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
            subject: `CurrenSee Feedback: ${feedbackType || "General"}`,
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
          analytics.trackFeedbackSubmit(feedbackType || "general");
          toast({
            title: "Thank you!",
            description: "Your feedback has been received. We appreciate your input!",
          });
          setMessage("");
          setEmail("");
          setFeedbackType("");
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
          analytics.trackFeedbackSubmit(feedbackType || "general");
          toast({
            title: "Thank you!",
            description: "Your feedback has been received. We appreciate your input!",
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
          title: "Thank you!",
          description: "Your feedback has been received. (Note: Form submission not configured)",
        });
        setMessage("");
        setEmail("");
        setFeedbackType("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again later.",
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
        {/* Feedback Type */}
        <div className="space-y-2">
          <Label htmlFor="feedback-type">What type of feedback is this?</Label>
          <Select value={feedbackType} onValueChange={setFeedbackType}>
            <SelectTrigger id="feedback-type">
              <SelectValue placeholder="Select feedback type" />
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
          <Label htmlFor="message">Your feedback *</Label>
          <Textarea
            id="message"
            placeholder="Tell us what you think, what features you'd like, or any issues you've encountered..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="resize-none"
            required
          />
        </div>

        {/* Email (optional) */}
        <div className="space-y-2">
          <Label htmlFor="email">Email (optional)</Label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-xs text-muted-foreground">
            We'll only use this to follow up if needed. Your email won't be shared.
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>

        {!web3formsKey && !formspreeId && (
          <div className="bg-muted/50 border border-border rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Development Mode</p>
            <p>
              To enable feedback collection, add your Web3Forms key or Formspree ID to this component.
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
            <MessageSquare className="w-4 h-4 text-primary" />
            <span>We read every submission</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" />
            <span>Your input shapes the app</span>
          </div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span>Feature requests welcome</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackForm;
