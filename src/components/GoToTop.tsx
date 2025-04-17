import { ChevronUp } from "lucide-react";
import { motion } from "motion/react";

export default function GoToTop({ elementId }: { elementId: string }) {
  function scrollToTop() {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  return (
    <div className="size-8 bg-white rounded-md shadow border flex items-center justify-center md:hidden">
      <motion.button
        animate={{ y: [-2, 2] }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
        }}
        onClick={scrollToTop}
        className="relative size-full flex items-center justify-center hover:bg-slate-100"
      >
        <ChevronUp />
      </motion.button>
    </div>
  );
}
