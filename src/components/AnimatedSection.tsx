import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants,
  type MotionProps,
} from 'framer-motion';
import { useRef, useEffect, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

/* ═══════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════ */
const REDUCED = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

const spring = { type: 'spring' as const, stiffness: 100, damping: 15, mass: 0.8 };
const springSnappy = { type: 'spring' as const, stiffness: 260, damping: 20, mass: 0.6 };
const ease = { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const };
const easeFast = { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] as const };

/* ═══════════════════════════════════════════
   FadeIn — fade up from below
═══════════════════════════════════════════ */
interface FadeInProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 0.6,
  once = true,
  className,
  as: Tag = 'div',
  ...rest
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px 0px 0px 0px' });

  const offsets = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };
  const { x, y } = offsets[direction];

  if (REDUCED) {
    return (
      <Tag ref={ref as never} className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ ...ease, duration, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ScaleIn — scale from 0.95 → 1 with fade
═══════════════════════════════════════════ */
interface ScaleInProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  className?: string;
}

export function ScaleIn({ children, delay = 0, once = true, className }: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-40px 0px 0px 0px' });

  if (REDUCED) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   StaggerContainer — parent that staggers children
═══════════════════════════════════════════ */
interface StaggerContainerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  staggerDelay?: number;
  once?: boolean;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  once = true,
  className,
  ...rest
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-40px 0px 0px 0px' });

  if (REDUCED) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   StaggerItem — child for StaggerContainer
═══════════════════════════════════════════ */
interface StaggerItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
}

export function StaggerItem({ children, direction = 'up', distance = 28, className }: StaggerItemProps) {
  const offsets = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };
  const { x, y } = offsets[direction];

  const variants: Variants = REDUCED
    ? { hidden: { opacity: 1, x: 0, y: 0 }, visible: { opacity: 1, x: 0, y: 0 } }
    : {
        hidden: { opacity: 0, x, y },
        visible: { opacity: 1, x: 0, y: 0, transition: { ...spring } },
      };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SlideIn — directional slide
═══════════════════════════════════════════ */
interface SlideInProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  once?: boolean;
  className?: string;
}

export function SlideIn({ children, direction = 'left', delay = 0, once = true, className }: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-40px 0px 0px 0px' });
  const x = direction === 'left' ? -60 : 60;

  if (REDUCED) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ ...ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ParallaxImage — subtle parallax on scroll
═══════════════════════════════════════════ */
interface ParallaxImageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  overlay?: ReactNode;
}

export function ParallaxImage({ src, alt, speed = 0.15, className, overlay }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px 0px 0px 0px' });
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 120, damping: 30 });
  const translateY = useTransform(smoothY, [0, 1], [0, speed * 100]);

  useEffect(() => {
    if (REDUCED) return;
    const el = ref.current;
    if (!el) return;
    const fn = () => {
      const rect = el.getBoundingClientRect();
      const progress = 1 - Math.max(0, Math.min(1, rect.top / window.innerHeight));
      y.set(progress);
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, [y]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {overlay}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y: translateY }}
        loading="lazy"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   Counter — animated number count
═══════════════════════════════════════════ */
interface CounterProps {
  value: string;
  className?: string;
  once?: boolean;
  prefix?: string;
  suffix?: string;
}

export function Counter({ value, className, once = true }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-40px 0px 0px 0px' });
  const numericPart = value.replace(/[^0-9.]/g, '');
  const prefix = value.match(/^[^0-9]*/)?.[0] ?? '';
  const suffix = value.match(/[^0-9.]*$/)?.[0] ?? '';
  const num = parseFloat(numericPart) || 0;

  if (REDUCED) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 1 } : { opacity: 1 }}
      >
        <CountUp value={num} trigger={isInView} />
      </motion.span>
      {suffix}
    </span>
  );
}

function CountUp({ value, trigger }: { value: number; trigger: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 20, duration: 1.5 });
  const display = useTransform(springVal, (v) => {
    if (Number.isInteger(value)) return Math.round(v).toString();
    return v.toFixed(1);
  });

  useEffect(() => {
    if (trigger) motionVal.set(value);
  }, [trigger, motionVal, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ═══════════════════════════════════════════
   AnimatedCard — hover card with spring physics
═══════════════════════════════════════════ */
interface AnimatedCardProps extends Omit<MotionProps, 'children'> {
  children: ReactNode;
  className?: string;
  hoverLift?: number;
  hoverScale?: number;
}

export function AnimatedCard({
  children,
  className,
  hoverLift = -8,
  hoverScale = 1.01,
  ...motionProps
}: AnimatedCardProps) {
  return (
    <motion.div
      className={cn('site-card', className)}
      whileHover={REDUCED ? {} : {
        y: hoverLift,
        scale: hoverScale,
        borderColor: 'rgba(198,161,69,0.25)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(198,161,69,0.08)',
      }}
      transition={springSnappy}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   GlowPulse — subtle ambient glow animation
═══════════════════════════════════════════ */
interface GlowPulseProps {
  className?: string;
  color?: string;
  size?: string;
}

export function GlowPulse({ className, color = 'rgba(198,161,69,0.08)', size = '600px' }: GlowPulseProps) {
  if (REDUCED) {
    return (
      <div
        className={cn('absolute pointer-events-none', className)}
        style={{
          width: size, height: size,
          background: `radial-gradient(ellipse, ${color} 0%, transparent 70%)`,
          borderRadius: '50%',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  return (
    <motion.div
      className={cn('absolute pointer-events-none', className)}
      style={{
        width: size, height: size,
        background: `radial-gradient(ellipse, ${color} 0%, transparent 70%)`,
        borderRadius: '50%',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ═══════════════════════════════════════════
   HeroReveal — staggered hero text reveal
═══════════════════════════════════════════ */
interface HeroRevealProps {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export function HeroReveal({ children, staggerDelay = 0.1, className }: HeroRevealProps) {
  if (REDUCED) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
            visible: {
              opacity: 1, y: 0, filter: 'blur(0px)',
              transition: { ...ease, duration: 0.8 },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   AnimateWrap — page transition wrapper
═══════════════════════════════════════════ */
export function AnimateWrap({ children, className }: { children: ReactNode; className?: string }) {
  if (REDUCED) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Re-export AnimatePresence for pages
═══════════════════════════════════════════ */
export { AnimatePresence, motion };
