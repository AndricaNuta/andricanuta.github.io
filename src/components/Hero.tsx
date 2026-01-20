import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import AppStoreBadge from "./AppStoreBadge";
import appScreenshot from "@/assets/app-screenshot-scan.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-subtle">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <svg 
                version="1.0" 
                xmlns="http://www.w3.org/2000/svg"
                width="56" 
                height="56" 
                viewBox="0 0 500 500"
                preserveAspectRatio="xMidYMid meet"
                className="w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 ease-in-out hover:rotate-180 cursor-pointer"
              >
                <g transform="translate(0,500) scale(0.1,-0.1)" fill="#483AA0">
                  <path d="M2633 4049 c-104 -12 -214 -42 -341 -93 -397 -160 -779 -473 -1276
                  -1046 -17 -19 14 8 69 61 604 580 1069 862 1497 908 224 24 443 -36 624 -173
                  88 -66 229 -217 302 -323 71 -104 226 -378 243 -431 10 -31 9 -37 -7 -49 -10
                  -8 -190 -70 -399 -138 -209 -69 -389 -131 -399 -138 -13 -9 -16 -20 -12 -34 6
                  -19 17 -22 104 -27 53 -3 246 -9 427 -12 182 -4 369 -9 415 -13 l84 -6 60 -85
                  c128 -182 250 -275 353 -268 48 3 48 3 66 53 36 103 10 243 -83 443 l-42 91
                  185 348 c237 447 249 470 245 496 -7 49 -42 31 -175 -90 -71 -65 -176 -158
                  -233 -208 -282 -244 -270 -236 -290 -225 -10 5 -66 80 -124 165 -294 431 -550
                  656 -860 754 -140 45 -281 58 -433 40z"/>
                  <path d="M582 2775 c-33 -41 -46 -126 -33 -207 15 -89 33 -142 91 -264 l48
                  -102 -22 -38 c-13 -22 -94 -174 -181 -339 -87 -165 -175 -333 -197 -374 -42
                  -81 -46 -114 -11 -119 15 -2 52 25 135 100 194 177 502 444 519 450 9 3 20 3
                  26 0 5 -4 57 -75 115 -158 270 -387 464 -577 713 -700 163 -80 269 -104 459
                  -104 164 0 267 18 426 76 181 65 422 209 633 379 129 104 409 375 546 528 146
                  164 157 184 40 72 -363 -350 -667 -578 -964 -726 -228 -113 -411 -162 -605
                  -161 -358 0 -662 211 -905 629 -32 54 -73 123 -90 153 -47 78 -85 168 -79 184
                  7 18 45 32 452 166 183 60 342 115 353 120 26 15 24 49 -3 59 -13 4 -165 11
                  -338 15 -173 3 -395 9 -493 13 l-178 6 -60 88 c-112 164 -232 262 -337 276
                  -33 4 -42 2 -60 -22z"/>
                </g>
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Scan prices.
              <br />
              <span className="text-gradient">Convert instantly.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              Stop doing mental math abroad. CurrenSee instantly converts prices when you point your camera at any menu, receipt, or price tag.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <AppStoreBadge href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro" />
              <p className="text-sm text-muted-foreground">
                Free to download • 100% private
              </p>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <PhoneMockup
              imageSrc={appScreenshot}
              alt="CurrenSee app scanning a restaurant menu"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
