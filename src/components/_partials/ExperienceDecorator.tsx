import { useTranslations } from "next-intl";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";

interface ExperienceDecoratorProps {
  index: number;
  isLeft: boolean;
  progress: MotionValue<number>;
  jobKeys: string[];
}

export default function ExperienceDecorator({
  index,
  isLeft,
  progress,
  jobKeys,
}: ExperienceDecoratorProps) {
  const t = useTranslations("Experience");

  const y = useTransform(progress, [0, 1], [0, index % 2 === 0 ? -100 : 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const displayIndex = jobKeys.length - index;

  return (
    <motion.div
      style={{ y: smoothY }}
      className={`hidden md:flex absolute top-1/2 -translate-y-1/2 space-y-12 flex-col items-center justify-center pointer-events-none select-none ${
        isLeft ? "right-[10%]" : "left-[10%]"
      }`}
    >
      <p className="text-[12rem] font-black leading-none text-primary/5 font-mono italic">
        {String(displayIndex).padStart(2, "0")}
      </p>
      <p className="text-[10px] absolute bottom-1/4 -translate-y-1/4 font-mono tracking-[0.3em] text-primary/20 uppercase whitespace-nowrap">
        {t("title")}
      </p>
    </motion.div>
  );
}
