import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Compass,
  Shield,
  BarChart3,
  TrendingUp,
  Target,
  Lightbulb,
  MessageCircle,
  Zap,
  ArrowRight,
  ChevronRight,
  Star,
  Play,
} from 'lucide-react';
import { GlowButton } from '../components/ui/GlowButton';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const features = [
  { icon: Lightbulb, title: 'Smart Insights', description: 'Intelligent analysis of your spending patterns with personalized financial recommendations.', color: '#6366F1' },
  { icon: TrendingUp, title: 'Expense Predictions', description: 'Predict future expenses and plan ahead with advanced forecasting models.', color: '#22C55E' },
  { icon: Target, title: 'Goal Tracking', description: 'Set savings goals and track progress with visual indicators and deadline estimates.', color: '#F59E0B' },
  { icon: Shield, title: 'Financial Health Score', description: 'Get a comprehensive financial wellness score with actionable improvement tips.', color: '#EC4899' },
  { icon: BarChart3, title: 'Advanced Analytics', description: 'Beautiful charts and visualizations that make complex financial data easy to understand.', color: '#3B82F6' },
  { icon: MessageCircle, title: 'Finance Assistant', description: 'Chat with our smart assistant about your finances. Ask anything, get helpful answers.', color: '#8B5CF6' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Software Engineer', text: 'FinPilot helped me save ₹2.5L in 6 months. The spending insights about my food delivery habits were eye-opening!', avatar: '👩‍💻', rating: 5 },
  { name: 'obalesh K R', role: 'Product Manager', text: 'The prediction feature is incredibly accurate. It warned me about a potential budget overshoot 2 weeks in advance.', avatar: '👨‍💼', rating: 5 },
  { name: 'Ananya Patel', role: 'Designer', text: "Best finance app I've used. The assistant actually gives useful advice, not generic tips. Love the dark theme!", avatar: '👩‍🎨', rating: 5 },
];

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '₹12Cr+', label: 'Savings Tracked' },
  { value: '94%', label: 'Prediction Accuracy' },
  { value: '4.9', label: 'App Rating' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Compass size={18} className="text-white" />
              </div>
              <span className="font-bold text-xl font-[family-name:var(--font-display)]">
                Fin<span className="text-indigo-400">Pilot</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-sm text-slate-400 hover:text-white transition-colors">Testimonials</a>
              <a href="#stats" className="text-sm text-slate-400 hover:text-white transition-colors">Stats</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2">Login</Link>
              <Link to="/signup"><GlowButton size="sm">Get Started Free</GlowButton></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <Zap size={14} className="text-indigo-400" />
                <span className="text-xs font-medium text-indigo-300">Smart Personal Finance</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight">
                Your Finances,
                <br />
                <span className="gradient-text">Under Control</span>
              </h1>
              <p className="mt-6 text-lg text-slate-400 max-w-lg leading-relaxed">
                FinPilot analyzes your spending, predicts expenses, and recommends smart savings strategies — putting you in control of your financial future.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/signup"><GlowButton size="lg" icon={<ArrowRight size={18} />}>Start Free Trial</GlowButton></Link>
                <GlowButton variant="secondary" size="lg" icon={<Play size={18} />}>Watch Demo</GlowButton>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['🧑‍💻', '👩‍💼', '👨‍🎨', '👩‍🔬', '🧑‍🚀'].map((emoji, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0F172A] flex items-center justify-center text-sm">{emoji}</div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}</div>
                  <p className="text-xs text-slate-400 mt-0.5">Loved by 50,000+ users</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="relative">
                <div className="glass-card p-6 animate-float">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-slate-500">FinPilot Dashboard</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[{ label: 'Balance', value: '₹2.8L', color: '#6366F1' }, { label: 'Savings', value: '₹54K', color: '#22C55E' }, { label: 'Expenses', value: '₹45K', color: '#EF4444' }].map((item) => (
                      <div key={item.label} className="p-3 rounded-xl bg-white/5">
                        <p className="text-[10px] text-slate-500">{item.label}</p>
                        <p className="text-sm font-bold mt-1" style={{ color: item.color }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 2, delay: 1 }} />
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-500/10">
                      <Lightbulb size={12} className="text-indigo-400" />
                      <span className="text-[10px] text-indigo-300">You can save ₹2,500/mo by reducing food delivery</span>
                    </div>
                  </div>
                </div>
                <motion.div className="absolute -top-4 -right-4 glass-card p-3 animate-pulse-glow" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <div className="flex items-center gap-2"><BarChart3 size={16} className="text-indigo-400" /><span className="text-xs font-medium text-white">Score: 72</span></div>
                </motion.div>
                <motion.div className="absolute -bottom-4 -left-4 glass-card p-3" animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                  <div className="flex items-center gap-2"><TrendingUp size={16} className="text-green-400" /><span className="text-xs font-medium text-green-400">+15.7% savings</span></div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Zap size={14} className="text-indigo-400" />
              <span className="text-xs font-medium text-indigo-300">Powerful Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)]">Everything You Need to <span className="gradient-text">Master Money</span></h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">From smart insights to expense predictions, FinPilot gives you the tools to take control of your financial future.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-card p-6 h-full cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${feature.color}15` }}>
                    <feature.icon size={24} style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-display)]">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all" style={{ color: feature.color }}>Learn more <ChevronRight size={14} /></div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12 gradient-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedSection key={stat.label} delay={index * 0.1} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold gradient-text font-[family-name:var(--font-display)]">{stat.value}</p>
                  <p className="text-sm text-slate-400 mt-2">{stat.label}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)]">Loved by <span className="gradient-text">Thousands</span></h2>
            <p className="mt-4 text-slate-400">See what our users have to say about FinPilot</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} delay={index * 0.15}>
                <div className="glass-card p-6 h-full">
                  <div className="flex gap-1 mb-4">{[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}</div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg">{testimonial.avatar}</div>
                    <div><p className="text-sm font-medium text-white">{testimonial.name}</p><p className="text-xs text-slate-400">{testimonial.role}</p></div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="glass-card p-12 md:p-16 gradient-border relative overflow-hidden">
              <div className="absolute inset-0 mesh-gradient" />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)]">Ready to <span className="gradient-text">Transform</span> Your Finances?</h2>
                <p className="mt-4 text-slate-400 max-w-lg mx-auto">Join 50,000+ smart savers who use FinPilot to make better financial decisions every day.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link to="/signup"><GlowButton size="lg" icon={<ArrowRight size={18} />}>Get Started — It's Free</GlowButton></Link>
                </div>
                <p className="mt-4 text-xs text-slate-500">No credit card required • Free forever plan</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"><Compass size={14} className="text-white" /></div>
            <span className="font-bold font-[family-name:var(--font-display)]">Fin<span className="text-indigo-400">Pilot</span></span>
          </div>
          <p className="text-xs text-slate-500">© 2025 FinPilot. All rights reserved. Built with ❤️ in India.</p>
        </div>
      </footer>
    </div>
  );
}
