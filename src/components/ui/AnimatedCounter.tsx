import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, formatNumber } from '../../lib/utils';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  format?: 'currency' | 'number' | 'none';
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.5,
  delay = 0,
  format = 'none',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-50px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      if (now < startTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(eased * value);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [value, duration, delay, isInView]);

  const formattedValue = () => {
    if (format === 'currency') return formatCurrency(Math.round(displayValue));
    if (format === 'number') return formatNumber(Math.round(displayValue));
    return decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString('en-IN');
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}{formattedValue()}{suffix}
    </motion.span>
  );
}
