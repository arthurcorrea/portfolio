import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ElementType, useRef, useState } from "react";

interface SkillItem {
  id: string;
  Icon: ElementType;
  brand: string;
}

interface SkillGroupData {
  icon: ElementType;
  items: SkillItem[];
}

interface SkillCardProps {
  groupKey: string;
  data: SkillGroupData;
  t: (key: string) => string;
}

export default function SkillCard({ groupKey, data, t }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);

    setSpotlight({ x: mouseXPos, y: mouseYPos, opacity: 1 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const GroupIcon = data.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full rounded-2xl border border-border/40 bg-secondary/10 p-8 shadow-xl transition-colors duration-500 hover:border-primary/50 hover:bg-secondary/20"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, hsl(var(--primary) / 0.15), transparent 80%)`,
        }}
      />

      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <GroupIcon size={18} />
          </div>
          <h3 className="text-sm font-bold tracking-widest text-foreground uppercase">
            {t(`skillGroups.${groupKey}`)}
          </h3>
        </div>

        <ul className="space-y-4">
          {data.items.map((skill) => (
            <li
              key={skill.id}
              className="group relative flex items-center gap-4 cursor-default"
              style={{ "--skill-color": skill.brand } as React.CSSProperties}
            >
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--skill-color)] group-hover:shadow-[0_0_15px_var(--skill-color)]">
                <skill.Icon
                  size={18}
                  className="text-muted-foreground transition-colors duration-300 group-hover:text-[var(--skill-color)]"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {t(`skills.${skill.id}.name`)}
                </span>
                {/* <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors">
                  {t(`skills.${skill.id}.desc`)}
                </span> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
