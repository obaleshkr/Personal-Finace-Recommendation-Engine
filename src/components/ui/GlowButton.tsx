import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  icon?: React.ReactNode;
}

export function GlowButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button',
  icon,
}: GlowButtonProps) {
  const baseClasses = 'relative font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] active:scale-[0.98]',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 active:scale-[0.98]',
    ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] active:scale-[0.98]',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {icon}
      {children}
    </motion.button>
  );
}
