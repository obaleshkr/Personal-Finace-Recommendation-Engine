import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Menu,
  X,
  Check,
} from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import { cn } from '../../lib/utils';

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const typeColors = {
    info: 'text-blue-400 bg-blue-500/10',
    warning: 'text-amber-400 bg-amber-500/10',
    success: 'text-green-400 bg-green-500/10',
    alert: 'text-red-400 bg-red-500/10',
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>

        <AnimatePresence>
          {showSearch ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="relative"
            >
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search transactions, goals..."
                className="w-full pl-9 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
                onBlur={() => setShowSearch(false)}
              />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <Search size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 w-80 glass-card p-0 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                  <span className="font-semibold text-sm">Notifications</span>
                  <button onClick={markAllRead} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    <Check size={12} /> Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        'px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors',
                        !n.read && 'bg-indigo-500/5'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn('mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold', typeColors[n.type])}>
                          {n.type.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">{n.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white">
            o
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">obalesh K R</p>
            <p className="text-[10px] text-slate-400">Premium Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}
