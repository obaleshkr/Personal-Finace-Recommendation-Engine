import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { GlowButton } from '../components/ui/GlowButton';
import { User, Mail, Phone, Shield, Bell, Palette, Globe, Lock, Camera } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <GlassCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl font-bold text-white">
              o
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
              <Camera size={12} className="text-white" />
            </button>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">obalesh K R</h2>
            <p className="text-sm text-slate-400">rahul@example.com</p>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 rounded">PREMIUM</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" defaultValue="obalesh K R" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all" />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" defaultValue="rahul@example.com" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Phone</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="tel" defaultValue="+91 98765 43210" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all" />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Currency</label>
              <div className="relative">
                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <select className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer">
                  <option value="INR" className="bg-slate-800">₹ INR - Indian Rupee</option>
                  <option value="USD" className="bg-slate-800">$ USD - US Dollar</option>
                </select>
              </div>
            </div>
          </div>
          <GlowButton size="sm">Save Changes</GlowButton>
        </div>
      </GlassCard>

      {/* Security */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
          <Shield size={18} className="text-indigo-400" /> Security
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', enabled: true },
            { label: 'Biometric Login', desc: 'Use fingerprint or face recognition', enabled: false },
            { label: 'Login Notifications', desc: 'Get notified of new sign-ins', enabled: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
              <div className={`w-10 h-6 rounded-full p-0.5 cursor-pointer transition-colors ${item.enabled ? 'bg-indigo-500' : 'bg-white/10'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${item.enabled ? 'translate-x-4' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
          <Bell size={18} className="text-amber-400" /> Notifications
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Budget Alerts', desc: 'When spending exceeds budget', enabled: true },
            { label: 'AI Insights', desc: 'Daily personalized insights', enabled: true },
            { label: 'Goal Updates', desc: 'Progress on savings goals', enabled: true },
            { label: 'Weekly Summary', desc: 'Weekly financial digest', enabled: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
              <div className={`w-10 h-6 rounded-full p-0.5 cursor-pointer transition-colors ${item.enabled ? 'bg-indigo-500' : 'bg-white/10'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${item.enabled ? 'translate-x-4' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Danger Zone */}
      <GlassCard className="!border-red-500/20">
        <h3 className="text-lg font-semibold text-red-400 font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
          <Lock size={18} /> Danger Zone
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/5">
            <div>
              <p className="text-sm font-medium text-white">Delete Account</p>
              <p className="text-xs text-slate-400">Permanently delete your account and data</p>
            </div>
            <GlowButton variant="danger" size="sm">Delete</GlowButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
