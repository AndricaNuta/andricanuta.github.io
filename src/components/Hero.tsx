import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PhoneMockup from "./PhoneMockup";
import AppStoreBadge from "./AppStoreBadge";
import appScreenshot from "@/assets/app-screenshot-scan.png";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-subtle pt-20">
      {/* Enhanced Background decoration - Optimized for Safari */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-soft blur-optimized" style={{ willChange: 'filter, opacity', transform: 'translateZ(0)' }} />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft blur-optimized" style={{ animationDelay: '1.5s', willChange: 'filter, opacity', transform: 'translateZ(0)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl blur-optimized" style={{ willChange: 'filter', transform: 'translateZ(0)' }} />
        {/* Brand pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          willChange: 'auto'
        }} />
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center lg:text-left"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-primary/20 mb-6"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">{t('hero.badge')}</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
              {t('hero.title')}
              <br />
              <span 
                className="text-gradient bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% auto",
                  backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.6), hsl(var(--primary)))",
                  animation: "gradient 3s ease infinite",
                }}
              >
                {t('hero.titleHighlight')}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-normal md:font-normal">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10">
              <AppStoreBadge href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro" source="hero" />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-base text-muted-foreground justify-center lg:justify-start">
              <motion.div
                className="flex items-center gap-2.5"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ willChange: 'transform' }}
              >
                <div className="w-6 h-6 rounded-full bg-success-green/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">{t('hero.freeToDownload')}</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2.5"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ willChange: 'transform' }}
              >
                <div className="w-6 h-6 rounded-full bg-success-green/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="font-medium">{t('hero.private')}</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2.5"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ willChange: 'transform' }}
              >
                <div className="w-6 h-6 rounded-full bg-success-green/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-medium">{t('hero.noAccount')}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            className="relative flex justify-center lg:justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative">
              <PhoneMockup
                imageSrc={appScreenshot}
                alt="CurrenSee app scanning a restaurant menu"
              />
              {/* Floating glow effect - Optimized for Safari */}
              <div className="absolute inset-0 -z-10 bg-primary/20 rounded-[3rem] blur-3xl scale-110 animate-pulse-soft blur-optimized" style={{ willChange: 'filter, opacity', transform: 'translateZ(0) scale(1.1)' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
