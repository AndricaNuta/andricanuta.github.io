import { motion } from "framer-motion";

interface PhoneMockupProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

const PhoneMockup = ({ imageSrc, alt, className = "" }: PhoneMockupProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Phone frame */}
      <div className="relative mx-auto w-[280px] md:w-[320px] rounded-[3rem] bg-foreground p-3 shadow-phone">
        {/* Inner bezel */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground">
          {/* Screen */}
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-auto rounded-[2.3rem]"
          />
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-foreground rounded-b-3xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default PhoneMockup;
