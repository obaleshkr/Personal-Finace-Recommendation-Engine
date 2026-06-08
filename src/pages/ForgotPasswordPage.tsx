import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Sparkles, ArrowRight } from 'lucide-react';
import { GlowButton } from '../components/ui/GlowButton';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 gradient-border">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl font-[family-name:var(--font-display)]">
                Fin<span className="text-indigo-400">Pilot</span>
              </span>
            </Link>
            {!sent ? (
              <>
                <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Forgot password?</h1>
                <p className="text-sm text-slate-400 mt-2">No worries, we'll send you reset instructions.</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Mail size={28} className="text-green-400" />
                </div>
                <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Check your email</h1>
                <p className="text-sm text-slate-400 mt-2">We sent a password reset link to <span className="text-white">{email}</span></p>
              </>
            )}
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="arjun@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                    required
                  />
                </div>
              </div>
              <GlowButton type="submit" className="w-full" size="lg" icon={<ArrowRight size={18} />}>
                Reset Password
              </GlowButton>
            </form>
          ) : (
            <GlowButton onClick={() => navigate('/login')} className="w-full" size="lg">
              Back to Login
            </GlowButton>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back to login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
