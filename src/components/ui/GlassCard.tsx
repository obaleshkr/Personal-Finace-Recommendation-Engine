import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useState } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'accent' | 'success' | 'warning' | 'danger' | 'none';
  gradient?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
};

export function GlassCard({
  children,
  className,
  hover = false,
  glow = 'none',
  gradient = false,
  padding = 'md',
  ...props
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'glass-card transition-all duration-300',
        paddingMap[padding],
        hover && 'glass-card-hover cursor-pointer',
        gradient && 'gradient-border',
        glow === 'accent' && isHovered && 'glow-accent',
        glow === 'success' && isHovered && 'glow-success',
        glow === 'warning' && isHovered && 'glow-warning',
        glow === 'danger' && isHovered && 'glow-danger',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
