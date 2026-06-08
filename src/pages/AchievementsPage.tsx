import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { mockAchievements } from '../data/mockData';
import { Trophy, Flame, Star, Lock } from 'lucide-react';

export function AchievementsPage() {
  const earned = mockAchievements.filter(a => a.earned);
  const locked = mockAchievements.filter(a => !a.earned);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Achievements</h1>
          <p className="text-sm text-slate-400 mt-1">Track your financial milestones</p>
        </div>
        <div className="flex items-center gap-3">
          <GlassCard padding="sm" className="!bg-amber-500/10 !border-amber-500/20">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-amber-400" />
              <span className="text-sm font-bold text-amber-400">5 Month Streak</span>
            </div>
          </GlassCard>
          <GlassCard padding="sm" className="!bg-indigo-500/10 !border-indigo-500/20">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-indigo-400" />
              <span className="text-sm font-bold text-indigo-400">{earned.length}/{mockAchievements.length}</span>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Savings Streak */}
      <GlassCard gradient className="!bg-gradient-to-r !from-amber-500/10 !to-orange-500/10 !border-amber-500/20">
        <div className="flex items-center gap-6">
          <div className="flex gap-1">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                  i < 5 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-slate-600 border border-white/5'
                }`}
              >
                {i < 5 ? '🔥' : '🔒'}
              </motion.div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-[family-name:var(--font-display)]">5 Month Savings Streak! 🔥</h3>
            <p className="text-sm text-slate-400 mt-1">Save for 2 more months to unlock the "Savings Master" badge</p>
          </div>
        </div>
      </GlassCard>

      {/* Earned Achievements */}
      <div>
        <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
          <Star size={18} className="text-amber-400" /> Earned ({earned.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {earned.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard hover glow="accent" className="!bg-gradient-to-br !from-amber-500/5 !to-transparent !border-amber-500/10">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{achievement.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{achievement.description}</p>
                    {achievement.date && (
                      <p className="text-[10px] text-slate-500 mt-1">Earned {new Date(achievement.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Locked Achievements */}
      <div>
        <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
          <Lock size={18} className="text-slate-500" /> In Progress ({locked.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locked.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <GlassCard hover className="opacity-70">
                <div className="flex items-center gap-4">
                  <div className="text-3xl grayscale">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">{achievement.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{achievement.description}</p>
                    {achievement.progress !== undefined && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-slate-500">Progress</span>
                          <span className="text-[10px] text-indigo-400 font-medium">{achievement.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-indigo-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${achievement.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
