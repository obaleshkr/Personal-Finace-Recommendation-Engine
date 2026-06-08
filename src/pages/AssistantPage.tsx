import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Lightbulb, Bot, User, MessageCircle } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GlowButton } from '../components/ui/GlowButton';
import type { ChatMessage } from '../types';

const quickQuestions = [
  'How can I save more?',
  'Can I afford a bike?',
  'Why did my expenses increase?',
  'Suggest a budget plan',
  'Am I on track for my goals?',
  'Analyze my spending',
];

const aiResponses: Record<string, string> = {
  'how can i save more': `Great question! Based on your spending analysis, here are my top recommendations:

1. **Reduce food delivery** — You spend ₹6,700/month on food delivery. Cutting 2 orders/week saves ~₹2,500/month.

2. **Optimize subscriptions** — Switch to annual plans for Netflix & Spotify to save ₹4,680/year.

3. **Auto-save ₹8,000** — Our analysis shows you can comfortably auto-save this amount on the 15th of every month.

4. **Shopping budget** — You exceeded your shopping budget by ₹700. Setting a hard limit could save ₹8,400/year.

💡 **Total potential savings: ₹5,200/month (₹62,400/year)**`,

  'can i afford a bike': `Let me analyze your finances for the Royal Enfield goal (₹1,80,000):

📊 **Current Progress:** ₹45,000 saved (25%)
💰 **Monthly Savings Capacity:** ₹10,000/month
📅 **At Current Rate:** You'll reach the goal by March 2026

**My Assessment:** Yes, but with adjustments!

✅ You can afford it if you:
- Increase monthly savings to ₹12,000 (reduce entertainment by ₹2K)
- This moves the target to December 2025

⚠️ **Risk Factor:** Your emergency fund is at 60%. I recommend reaching 80% before big purchases.

🎯 **Best Strategy:** Save ₹12K/month for 11 months + wait for festive season discounts!`,

  'why did my expenses increase': `I've analyzed your expense trends. Here's what I found:

📈 **Expense Increase:** +8.3% compared to last month

**Top Contributors:**
1. 🛍️ **Shopping:** ₹5,700 (+28% vs avg) — Headphones + Winter jacket
2. 🚕 **Travel:** ₹4,350 (+35% vs avg) — Airport trips
3. 📚 **Education:** ₹4,999 (One-time ML course)

**Pattern Analysis:**
- Shopping & travel are seasonal spikes (winter/holidays)
- Education was a one-time investment with high ROI
- Food delivery remains consistently high

🔮 **Prediction:** Next month should normalize to ~₹43,000 as seasonal spending decreases.

💡 **Tip:** Set aside ₹5,000/month as a "seasonal buffer" to smooth out these spikes.`,

  'suggest a budget plan': `Here's your AI-optimized budget plan for next month:

💰 **Income:** ₹1,00,000

| Category | Allocated | Rationale |
|----------|-----------|------------|
| 🏠 Bills & Utilities | ₹5,600 | Fixed costs |
| 🍛 Food & Dining | ₹6,000 | -25% from current |
| 🚕 Travel | ₹3,500 | -20% from current |
| 🛍️ Shopping | ₹4,000 | Hard cap |
| 🎬 Entertainment | ₹2,000 | Current level |
| 📚 Education | ₹2,000 | Reduced (no course) |
| ❤️ Healthcare | ₹2,000 | Current level |
| 📈 Investments | ₹15,000 | Maintain SIP |
| 💵 Savings | ₹10,000 | Auto-save |
| 🎯 Goals | ₹12,000 | Accelerated |
| 🆘 Emergency | ₹5,000 | Building buffer |

**Total Allocated:** ₹67,100
**Remaining Buffer:** ₹32,900

🎯 This plan helps you save ₹27,000/month and reach your MacBook goal by May!`,

  'am i on track for my goals': `Let me check all your savings goals:

🎯 **Goal Progress Report:**

1. 💻 **MacBook Pro M4** — 65% complete ✅
   - ₹97,500 / ₹1,50,000
   - On track! Expected: June 2025

2. ✈️ **Japan Vacation** — 32.5% ⚠️
   - ₹65,000 / ₹2,00,000
   - Need to increase savings by ₹3K/month

3. 🛡️ **Emergency Fund** — 60% ✅
   - ₹1,80,000 / ₹3,00,000
   - On track! Expected: September 2025

4. 🏍️ **Royal Enfield** — 25% ⚠️
   - ₹45,000 / ₹1,80,000
   - Need ₹12K/month to hit target

📊 **Overall:** 2 goals on track, 2 need attention.

💡 **Priority:** Focus on Emergency Fund first (safety net), then accelerate MacBook (almost there!).`,

  'analyze my spending': `Here's your comprehensive spending analysis:

📊 **Monthly Spending Breakdown (₹45,899):**

| Category | Amount | % | Status |
|----------|--------|---|--------|
| 📈 Investments | ₹15,000 | 32.7% | ✅ Great |
| 🍛 Food | ₹6,700 | 14.6% | ⚠️ High |
| 🛍️ Shopping | ₹5,700 | 12.4% | 🔴 Over budget |
| 🏠 Bills | ₹5,599 | 12.2% | ✅ Normal |
| 📚 Education | ₹4,999 | 10.9% | ✅ Investment |
| 🚕 Travel | ₹4,350 | 9.5% | ⚠️ Rising |
| ❤️ Healthcare | ₹2,300 | 5.0% | ✅ Low |
| 🎬 Entertainment | ₹1,950 | 4.2% | ✅ Under budget |

**Key Insights:**
- 🔴 Shopping exceeded budget by ₹700
- ⚠️ Food delivery 25% above peer average
- ⚠️ Travel costs trending upward (+35%)
- ✅ Investment discipline is excellent
- ✅ Entertainment well within budget

**Savings Potential:** ₹5,200/month with minor adjustments`,
};

function getAIResponse(question: string): string {
  const normalized = question.toLowerCase().replace(/[^a-z ]/g, '').trim();
  for (const [key, response] of Object.entries(aiResponses)) {
    if (normalized.includes(key) || key.split(' ').every(word => normalized.includes(word))) {
      return response;
    }
  }
  return `Thanks for your question! Based on your financial data:

📊 **Your Financial Snapshot:**
- Monthly Income: ₹1,00,000
- Monthly Expenses: ₹45,899
- Savings Rate: 54.1%
- Financial Health Score: 72/100

Your savings rate is above average! I'd recommend focusing on:
1. Reducing food delivery expenses
2. Staying within your shopping budget
3. Increasing your emergency fund

💡 Ask me specific questions like "How can I save more?" or "Can I afford a bike?" for detailed analysis!`;
}

export function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your Finance Assistant. I can help you with budgeting, savings strategies, expense analysis, and more. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Bold text
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
      // Headers with emoji
      if (line.startsWith('📊') || line.startsWith('📈') || line.startsWith('🎯') || line.startsWith('💡') || line.startsWith('🔮') || line.startsWith('✅') || line.startsWith('⚠️') || line.startsWith('🔴') || line.startsWith('💰')) {
        formatted = `<span class="font-semibold text-white">${formatted}</span>`;
      }
      return <p key={i} className={`${line.trim() === '' ? 'h-2' : ''}`} dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <div className="space-y-6 h-[calc(100vh-7rem)] flex flex-col">
      <div className="flex items-center gap-3 shrink-0">
        <div className="p-2 rounded-xl bg-indigo-500/10">
          <MessageCircle size={20} className="text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Finance Assistant</h1>
          <p className="text-sm text-slate-400">Ask anything about your finances</p>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="flex flex-wrap gap-2 shrink-0">
        {quickQuestions.map((q) => (
          <motion.button
            key={q}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => sendMessage(q)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-indigo-500/10 hover:border-indigo-500/20 hover:text-indigo-300 transition-all"
          >
            {q}
          </motion.button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                msg.role === 'assistant' ? 'bg-indigo-500/20' : 'bg-violet-500/20'
              }`}>
                {msg.role === 'assistant' ? (
                  <Lightbulb size={14} className="text-indigo-400" />
                ) : (
                  <User size={14} className="text-violet-400" />
                )}
              </div>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-500/20 text-indigo-100 rounded-tr-md'
                    : 'glass-card !rounded-tl-md text-slate-300'
                }`}>
                  {msg.role === 'user' ? msg.content : formatMessage(msg.content)}
                </div>
                <p className="text-[10px] text-slate-600 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="shrink-0 w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Lightbulb size={14} className="text-indigo-400" />
            </div>
            <div className="glass-card !rounded-tl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0">
        <div className="glass-card !rounded-2xl p-2 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask about your finances..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <GlowButton
            size="sm"
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            icon={<Send size={16} />}
          >
            Send
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
