import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getScoreColor, getScoreLabel } from '../../lib/utils';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showAnimation?: boolean;
  className?: string;
}

export function ScoreGauge({
  score,
  size = 180,
  strokeWidth = 12,
  label,
  showAnimation = true,
  className = '',
}: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const color = getScoreColor(score);

  useEffect(() => {
    if (!showAnimation) {
      setAnimatedScore(score);
      return;
    }
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score, showAnimation]);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          style={{
            filter: `drop-shadow(0 0 8px ${color}60)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-bold font-[family-name:var(--font-display)]"
          style={{ color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {animatedScore}
        </motion.span>
        <span className="text-xs text-slate-400 mt-1">{label || getScoreLabel(score)}</span>
      </div>
    </div>
  );
}
