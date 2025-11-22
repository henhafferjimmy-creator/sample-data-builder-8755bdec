import { motion } from "framer-motion";
import { useMotionSettings } from "@/lib/motionConfig";

interface BackgroundBlobsProps {
  prefersReducedMotion?: boolean;
}

const BackgroundBlobs = ({ prefersReducedMotion = false }: BackgroundBlobsProps) => {
  const { isMobile } = useMotionSettings();
  
  // Disable entirely on mobile for performance
  if (isMobile) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top left blob */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/15 via-secondary/8 to-transparent blur-xl"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Top right blob */}
      <motion.div
        className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-bl from-primary/12 via-primary/6 to-transparent blur-xl"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.15, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Bottom center blob */}
      <motion.div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-to-t from-secondary/10 via-secondary/5 to-transparent blur-xl"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default BackgroundBlobs;
