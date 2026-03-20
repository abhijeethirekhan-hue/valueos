'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Navigation Component
function Navigation() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[rgba(3,4,7,0.85)] backdrop-blur-[20px]' : ''}`} style={{ borderBottom: '1px solid rgba(0,229,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hexagon Logo */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" fill="#00E5FF" />
              <text x="20" y="25" textAnchor="middle" fill="#000" fontWeight="900" fontSize="16" fontFamily="var(--font-unbounded)">V</text>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-unbounded)] font-bold text-lg gradient-text-white-teal">ValueOS</span>
            <span className="font-mono text-[8px] tracking-[3px] uppercase" style={{ color: 'rgba(0,229,255,0.5)' }}>Central AI Agent</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button   onClick={() => router.push('/onboarding?demo=true')}
                    className="hidden sm:block px-5 py-2.5 rounded-[10px] border border-teal/30 text-teal font-sans text-sm font-medium hover:bg-teal-dim transition-colors">
            Live Demo
          </button>
          <button className="px-5 py-2.5 rounded-[10px] bg-teal text-black font-sans text-sm font-semibold hover:scale-[1.02] transition-transform" style={{ boxShadow: '0 0 30px rgba(0,229,255,0.4)' }}>
            Get Early Access →
          </button>
        </div>
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 relative" style={{ backgroundColor: '#040407' }}>
      <div className="max-w-[800px] mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
          <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ backgroundColor: '#00E5FF' }} />
          <span className="font-mono text-[10px] tracking-wide" style={{ color: 'rgba(0,229,255,0.9)' }}>The Central AI Agent for the Digital Economy</span>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-unbounded)] font-black leading-[1.05] mb-6 text-balance">
          <span className="block text-[36px] md:text-[64px] tracking-[-2px]" style={{ color: '#FFFFFF' }}>The internet was built</span>
          <span className="block text-[36px] md:text-[64px] tracking-[-2px] mb-6" style={{ color: '#FFFFFF' }}>without a truth layer.</span>
          <span className="block text-[44px] md:text-[78px] tracking-[-3px]">
            <span style={{ color: '#FFFFFF' }}>{"We're adding "}</span>
            <span style={{ color: '#00E5FF', textShadow: '0 0 40px rgba(0,229,255,0.5)' }}>one.</span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-lg max-w-[520px] mx-auto mb-10" style={{ color: '#5A6A90', lineHeight: 1.8 }}>
          $400 billion disappears every year into subscriptions, SaaS tools, and AI agents nobody actually uses. For the first time — an independent AI tells you the truth about all of it. Behavioral proof. Not opinions. Not vendor claims.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <button    
                    className="px-8 py-3.5 rounded-[10px] font-sans font-bold text-sm hover:scale-[1.02] transition-all" style={{ backgroundColor: '#00E5FF', color: '#000000', boxShadow: '0 0 24px rgba(0,229,255,0.3)' }}>
            See The Truth →
          </button>
          <button className="px-8 py-3.5 rounded-[10px] font-sans font-medium text-sm transition-colors" style={{ background: 'transparent', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)' }}>
            Watch How It Works ↗
          </button>
        </div>

        {/* Trust Line */}
        <p className="font-mono text-[10px] tracking-[1px] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          FREE · PRIVATE · 60 SECONDS · FOR EVERYONE · EVERYWHERE
        </p>
      </div>
    </section>
  )
}

// Infinite Scrolling Ticker
function InfiniteTickerSection() {
  const tickerItems = [
    '₹2.1 LAKH CRORE WASTED ANNUALLY',
    "INDIA'S CENTRAL AI AGENT",
    '7 AI MODELS',
    'BEHAVIORAL TRUTH NOT OPINIONS',
    '66% SUBSCRIPTIONS UNUSED',
    'PRIVACY FIRST ARCHITECTURE',
    'GENOME SCORING ENGINE',
    'WORKS WITH ALL INDIAN BANKS'
  ]

  return (
    <section className="py-4 overflow-hidden bg-void" style={{ borderTop: '1px solid rgba(0,229,255,0.08)', borderBottom: '1px solid rgba(0,229,255,0.08)' }}>
      <div className="flex animate-ticker">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {tickerItems.map((text, j) => (
              <span key={j} className="flex items-center gap-6 px-6 font-mono text-[10px] tracking-[1.5px] uppercase whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {text}
                <span style={{ color: '#00E5FF' }}>◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

// Section Label Component
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <span className="text-teal">●</span>
      <span className="font-mono text-[9px] uppercase tracking-[3px] text-text-ghost">{children}</span>
    </div>
  )
}

// Metric Cards Section (Three Truth Numbers)
function MetricCardsSection() {
  return (
    <section className="py-24 px-6 bg-void">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>The Scale of the Problem</SectionLabel>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Red - Annual Waste */}
          <div className="relative p-8 rounded-[14px] corner-brackets" style={{ background: 'linear-gradient(135deg, rgba(255,45,85,0.06), rgba(255,45,85,0.02))', border: '1px solid rgba(255,45,85,0.2)', boxShadow: '0 0 40px rgba(255,45,85,0.15)' }}>
            {/* Custom red corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: '#FF2D55' }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: '#FF2D55' }} />
            
            <p className="font-mono text-[9px] uppercase tracking-wide mb-4" style={{ color: 'rgba(255,45,85,0.6)' }}>Annual Waste · India</p>
            <p className="font-[family-name:var(--font-unbounded)] font-black text-[52px] sm:text-[56px] text-value-red leading-none mb-4" style={{ textShadow: '0 0 40px rgba(255,45,85,0.5)' }}>₹2.1L Cr</p>
            <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">wasted on unused subscriptions and SaaS tools every year</p>
            
            {/* Sparkline */}
            <svg className="w-full h-12" viewBox="0 0 120 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,45,85,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,45,85,0)" />
                </linearGradient>
              </defs>
              <path d="M0,35 L15,32 L30,28 L45,25 L60,20 L75,15 L90,10 L105,6 L120,3" fill="none" stroke="#FF2D55" strokeWidth="2"/>
              <path d="M0,35 L15,32 L30,28 L45,25 L60,20 L75,15 L90,10 L105,6 L120,3 L120,40 L0,40 Z" fill="url(#redGradient)"/>
            </svg>
          </div>

          {/* Card 2 - Amber - Waste Percentage */}
          <div className="relative p-8 rounded-[14px]" style={{ background: 'linear-gradient(135deg, rgba(255,184,0,0.06), rgba(255,184,0,0.02))', border: '1px solid rgba(255,184,0,0.2)', boxShadow: '0 0 40px rgba(255,184,0,0.15)' }}>
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: '#FFB800' }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: '#FFB800' }} />
            
            <p className="font-mono text-[9px] uppercase tracking-wide mb-4" style={{ color: 'rgba(255,184,0,0.6)' }}>Waste Percentage</p>
            <p className="font-[family-name:var(--font-unbounded)] font-black text-[52px] sm:text-[56px] text-value-amber leading-none mb-4" style={{ textShadow: '0 0 40px rgba(255,184,0,0.5)' }}>66%</p>
            <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">of total digital subscription spend delivers zero real value</p>
            
            {/* Sparkline */}
            <svg className="w-full h-12" viewBox="0 0 120 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="amberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,184,0,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,184,0,0)" />
                </linearGradient>
              </defs>
              <path d="M0,30 L20,28 L40,32 L60,20 L80,22 L100,12 L120,15" fill="none" stroke="#FFB800" strokeWidth="2"/>
              <path d="M0,30 L20,28 L40,32 L60,20 L80,22 L100,12 L120,15 L120,40 L0,40 Z" fill="url(#amberGradient)"/>
            </svg>
          </div>

          {/* Card 3 - Teal - Free */}
          <div className="relative p-8 rounded-[14px]" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.06), rgba(0,229,255,0.02))', border: '1px solid rgba(0,229,255,0.2)', boxShadow: '0 0 40px rgba(0,229,255,0.15)' }}>
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: '#00E5FF' }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: '#00E5FF' }} />
            
            <p className="font-mono text-[9px] uppercase tracking-wide mb-4" style={{ color: 'rgba(0,229,255,0.6)' }}>Cost to Find Out</p>
            <p className="font-[family-name:var(--font-unbounded)] font-black text-[52px] sm:text-[56px] text-teal leading-none mb-4" style={{ textShadow: '0 0 40px rgba(0,229,255,0.5)' }}>₹0</p>
            <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">ValueOS is free forever. We earn when you save.</p>
            
            {/* Sparkline */}
            <svg className="w-full h-12" viewBox="0 0 120 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tealGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0,229,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(0,229,255,0)" />
                </linearGradient>
              </defs>
              <path d="M0,35 L20,35 L40,35 L60,35 L80,35 L100,35 L120,35" fill="none" stroke="#00E5FF" strokeWidth="2"/>
              <path d="M0,35 L20,35 L40,35 L60,35 L80,35 L100,35 L120,35 L120,40 L0,40 Z" fill="url(#tealGradient)"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

// Problem Section
function ProblemSection() {
  return (
    <section className="py-24 px-6 bg-void">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Why This Exists</SectionLabel>
        
        <h2 className="font-[family-name:var(--font-unbounded)] font-bold text-4xl text-text-primary mb-4">Nobody Is On Your Side.</h2>
        <p className="font-sans text-base text-text-secondary max-w-2xl mb-12 leading-relaxed">
          Every subscription company employs engineers and psychologists to prevent you from cancelling. Dark patterns. Hidden billing. Auto-renewals buried in emails. Until now, no AI existed to fight back.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Problem Card 1 */}
          <div className="bg-surface p-6 rounded-r-[14px]" style={{ borderLeft: '3px solid #FF2D55', borderTop: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-4" style={{ background: 'rgba(255,45,85,0.1)', color: '#FF2D55' }}>01 · AWARENESS GAP</span>
            <h3 className="font-sans font-semibold text-base text-text-primary mb-3">You pay for 11 subscriptions. You use 4.</h3>
            <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">
              The rest auto-renew silently every month. LinkedIn Premium. Adobe CC. Hotstar. All charging. All forgotten. ₹4,473 leaving your account monthly without a single conscious decision.
            </p>
            <p className="font-mono text-[11px] text-text-ghost">Avg: 7 forgotten subscriptions per Indian user</p>
          </div>

          {/* Problem Card 2 */}
          <div className="bg-surface p-6 rounded-r-[14px]" style={{ borderLeft: '3px solid #FFB800', borderTop: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-4" style={{ background: 'rgba(255,184,0,0.1)', color: '#FFB800' }}>02 · USAGE GAP</span>
            <h3 className="font-sans font-semibold text-base text-text-primary mb-3">₹10,710 per real hour of use.</h3>
            <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">
              LinkedIn Premium — ₹2,499/month — 14 minutes actual use. That math is brutal. Adobe CC — ₹1,675/month — opened twice this month. ₹419/hour. This data exists on your phone. No AI has ever connected it to your bank statement.
            </p>
            <p className="font-mono text-[11px] text-text-ghost">Most expensive subscription per hour of use in India: LinkedIn Premium</p>
          </div>

          {/* Problem Card 3 */}
          <div className="bg-surface p-6 rounded-r-[14px]" style={{ borderLeft: '3px solid #B066FF', borderTop: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-4" style={{ background: 'rgba(176,102,255,0.1)', color: '#B066FF' }}>03 · AI AGENT GAP</span>
            <h3 className="font-sans font-semibold text-base text-text-primary mb-3">Your AI agents might be the biggest waste of all.</h3>
            <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">
              Companies now pay ₹5-50L/month for AI agents. Vendors show impressive dashboards. Reality: 30% of promised automation actually delivered. No independent AI evaluates whether your AI is actually working. That changes now.
            </p>
            <p className="font-mono text-[11px] text-text-ghost">₹50,000 crore AI agent market by 2030. Zero evaluation infrastructure exists.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'AI reads your bank',
      body: 'Upload any Indian bank PDF. Fine-tuned NLP model extracts every subscription in 60 seconds. HDFC, SBI, ICICI, Axis, Kotak, Paytm, PhonePe — all supported. Hidden trials, price increases, duplicate charges — all caught.',
      tech: 'NLP + OCR · 95% accuracy',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="6" width="24" height="20" rx="2" stroke="#00E5FF" strokeWidth="1.5"/>
          <line x1="8" y1="12" x2="24" y2="12" stroke="#00E5FF" strokeWidth="1.5" opacity="0.5"/>
          <line x1="8" y1="16" x2="20" y2="16" stroke="#00E5FF" strokeWidth="1.5" opacity="0.3"/>
          <line x1="8" y1="20" x2="16" y2="20" stroke="#00E5FF" strokeWidth="1.5" opacity="0.3"/>
        </svg>
      )
    },
    {
      num: '02',
      title: 'AI maps your usage',
      body: 'Screen time API reads actual app usage on your device. Browser extension tracks web tools. On-device processing — raw data never leaves your phone. Only anonymized behavioral scores transmitted.',
      tech: 'TF Lite · On-Device · Private',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke="#00E5FF" strokeWidth="1.5"/>
          <circle cx="16" cy="16" r="4" fill="#00E5FF" opacity="0.3"/>
          <line x1="16" y1="6" x2="16" y2="2" stroke="#00E5FF" strokeWidth="1.5"/>
          <line x1="16" y1="30" x2="16" y2="26" stroke="#00E5FF" strokeWidth="1.5"/>
          <line x1="6" y1="16" x2="2" y2="16" stroke="#00E5FF" strokeWidth="1.5"/>
          <line x1="30" y1="16" x2="26" y2="16" stroke="#00E5FF" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      num: '03',
      title: 'AI assigns your genome',
      body: 'XGBoost model with 24 behavioral features classifies every subscription. Not a 1-10 score — a behavioral genome type that tells the real story of your relationship with every product.',
      tech: 'XGBoost · 24 Features · <50ms',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L28 12V24L16 28L4 24V12L16 4Z" stroke="#00E5FF" strokeWidth="1.5"/>
          <circle cx="16" cy="16" r="3" fill="#00E5FF"/>
        </svg>
      )
    },
    {
      num: '04',
      title: 'AI saves your money',
      body: 'LSTM model predicts waste 6 days before renewal. WhatsApp alert fires automatically. One tap to cancel. AI recommends alternatives. Savings tracked forever.',
      tech: 'LSTM · RAG + Claude · WhatsApp',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#00E5FF" strokeWidth="1.5"/>
          <path d="M16 8V16L22 20" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    }
  ]

  return (
    <section className="py-24 px-6 bg-void">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>The AI Process</SectionLabel>
        
        <h2 className="font-[family-name:var(--font-unbounded)] font-bold text-4xl text-text-primary mb-16">
          7 AI Models. One Central Agent. 60 Seconds to Truth.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px border-t-2 border-dashed border-teal/30" style={{ left: 'calc(100% - 12px)', width: 'calc(24px)' }} />
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center font-mono text-sm text-teal">{step.num}</span>
                {step.icon}
              </div>
              <h3 className="font-sans font-semibold text-base text-text-primary mb-3">{step.title}</h3>
              <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">{step.body}</p>
              <span className="inline-block px-3 py-1.5 rounded-md text-[10px] font-mono text-teal" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)' }}>{step.tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Genome Section - Value Genome Cards
function GenomeSection() {
  const genomes = [
    {
      type: 'VITAL ORGAN',
      color: '#00FF99',
      bg: 'linear-gradient(135deg, rgba(0,255,153,0.08), rgba(0,255,153,0.02))',
      border: 'rgba(0,255,153,0.25)',
      glow: '0 0 30px rgba(0,255,153,0.2)',
      example: 'Spotify Premium',
      cost: '₹0.9/hour',
      description: 'Core infrastructure of your life. Daily use. Deep sessions. Growing. Never cancel.',
      // Pentagon radar values: usage, frequency, growth, depth, value (0-40 scale from center 50)
      radarValues: [38, 35, 32, 36, 40]
    },
    {
      type: 'ZOMBIE',
      color: '#FF2D55',
      bg: 'linear-gradient(135deg, rgba(255,45,85,0.08), rgba(255,45,85,0.02))',
      border: 'rgba(255,45,85,0.25)',
      glow: '0 0 30px rgba(255,45,85,0.2)',
      example: 'Adobe CC',
      cost: '₹419/hour',
      description: "AI detected abandonment months ago. Still charging monthly. You didn't notice. Cancel today.",
      radarValues: [5, 3, 2, 4, 8]
    },
    {
      type: 'STATUS SYMBOL',
      color: '#B066FF',
      bg: 'linear-gradient(135deg, rgba(176,102,255,0.08), rgba(176,102,255,0.02))',
      border: 'rgba(176,102,255,0.25)',
      glow: '0 0 30px rgba(176,102,255,0.2)',
      example: 'LinkedIn Premium',
      cost: '₹10,710/hour',
      description: 'Kept for identity. Cancelling feels like failure. Not because you use it. AI confirmed what you already knew.',
      radarValues: [8, 12, 5, 6, 35]
    },
    {
      type: 'GHOST',
      color: '#5A6A90',
      bg: 'linear-gradient(135deg, rgba(90,106,144,0.06), rgba(90,106,144,0.02))',
      border: 'rgba(90,106,144,0.15)',
      glow: '0 0 20px rgba(90,106,144,0.1)',
      example: 'Hotstar Premium',
      cost: '₹249/hour',
      description: 'Zero detected usage. Auto-renewing silently. This subscription haunts your bank account every month.',
      radarValues: [0, 0, 0, 0, 2]
    }
  ]

  // Convert radar values to pentagon points
  const getRadarPoints = (values: number[]) => {
    const cx = 50, cy = 50
    const angles = [-90, -18, 54, 126, 198].map(a => a * Math.PI / 180)
    return values.map((v, i) => {
      const r = v
      const x = cx + r * Math.cos(angles[i])
      const y = cy + r * Math.sin(angles[i])
      return `${x},${y}`
    }).join(' ')
  }

  return (
    <section className="py-24 px-6 bg-void">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>The Core Innovation</SectionLabel>
        
        <h2 className="font-[family-name:var(--font-unbounded)] font-bold text-[36px] sm:text-[40px] mb-4">
          <span className="text-text-primary">Not a Score. </span>
          <span className="gradient-text-teal">A Behavioral Identity.</span>
        </h2>
        <p className="font-sans text-base text-text-secondary max-w-3xl mb-12 leading-relaxed">
          We built 7 AI models to answer one question: what is your actual behavioral relationship with every digital product you pay for? The answer is a genome — a living fingerprint that no number could ever capture.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {genomes.map((genome, i) => (
            <div key={i} className="relative p-6 rounded-[14px]" style={{ background: genome.bg, border: `1px solid ${genome.border}`, boxShadow: genome.glow }}>
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: genome.color }} />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: genome.color }} />
              
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-4" style={{ background: `${genome.color}20`, color: genome.color }}>{genome.type}</span>
              
              {/* Pentagon Radar Chart */}
              <svg className="w-full h-28 mb-4" viewBox="0 0 100 100">
                {/* Outer pentagon grid */}
                <polygon points="50,10 90,39 74,85 26,85 10,39" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                <polygon points="50,22 78,43 66,77 34,77 22,43" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                <polygon points="50,34 66,47 58,69 42,69 34,47" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                
                {/* Axis lines */}
                <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                <line x1="50" y1="50" x2="90" y2="39" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                <line x1="50" y1="50" x2="74" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                <line x1="50" y1="50" x2="26" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                <line x1="50" y1="50" x2="10" y2="39" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                
                {/* Data polygon */}
                <polygon 
                  points={getRadarPoints(genome.radarValues)} 
                  fill={`${genome.color}30`} 
                  stroke={genome.color} 
                  strokeWidth="2"
                />
                
                {/* Data points */}
                {getRadarPoints(genome.radarValues).split(' ').map((point, j) => {
                  const [x, y] = point.split(',')
                  return <circle key={j} cx={x} cy={y} r="3" fill={genome.color} />
                })}
              </svg>

              <div className="flex items-baseline justify-between mb-2">
                <p className="font-mono text-[11px]" style={{ color: genome.color }}>{genome.example}</p>
                <p className="font-mono text-[10px] text-text-ghost">{genome.cost}</p>
              </div>
              <p className="font-sans text-[12px] text-text-secondary leading-relaxed">{genome.description}</p>
            </div>
          ))}
        </div>

        {/* Full-Width AI Insight Terminal Card */}
        <div className="relative w-full rounded-[14px] overflow-hidden" style={{ background: '#050810', border: '1px solid rgba(0,229,255,0.25)', boxShadow: '0 0 60px rgba(0,229,255,0.1)' }}>
          {/* Terminal Header Bar */}
          <div className="flex items-center justify-between px-6 py-3" style={{ background: 'rgba(0,229,255,0.05)', borderBottom: '1px solid rgba(0,229,255,0.15)' }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-value-red/80" />
                <span className="w-3 h-3 rounded-full bg-value-amber/80" />
                <span className="w-3 h-3 rounded-full bg-value-green/80" />
              </div>
              <span className="font-mono text-[10px] text-teal tracking-widest uppercase">valueos://ai-insight/genome-analysis</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-text-primary font-semibold">LINKEDIN PREMIUM</span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono" style={{ background: 'rgba(176,102,255,0.15)', color: '#B066FF', border: '1px solid rgba(176,102,255,0.3)' }}>STATUS SYMBOL</span>
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 sm:p-8">
            <pre className="font-mono text-[10px] sm:text-[11px] md:text-xs text-teal leading-relaxed overflow-x-auto whitespace-pre">
{`> INITIALIZING VALUEOS BEHAVIORAL ANALYSIS ENGINE...
> LOADING GENOME CLASSIFICATION MODEL v2.4.1
> PARSING BANK STATEMENT DATA... COMPLETE
> CROSS-REFERENCING SCREEN TIME API... COMPLETE
> RUNNING BEHAVIORAL PATTERN DETECTION...

┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                │
│   ██╗     ██╗███╗   ██╗██╗  ██╗███████╗██████╗ ██╗███╗   ██╗                   │
│   ██║     ██║████╗  ██║██║ ██╔╝██╔════╝██╔══██╗██║████╗  ██║                   │
│   ██║     ██║██╔██╗ ██║█████╔╝ █████╗  ██║  ██║██║██╔██╗ ██║                   │
│   ██║     ██║██║╚██╗██║██╔═██╗ ██╔══╝  ██║  ██║██║██║╚██╗██║                   │
│   ███████╗██║██║ ╚████║██║  ██╗███████╗██████╔╝██║██║ ╚████║                   │
│   ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═══╝  PREMIUM         │
│                                                                                │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│   BEHAVIORAL DATA EXTRACTION                                                   │
│   ══════════════════════════════════════════════════════════════════════════   │
│                                                                                │
│   usage_detected        │ `}<span className="text-value-red">14 minutes/month</span>{`                                     │
│   inmails_sent          │ `}<span className="text-value-red">0 in 6 months</span>{`                                        │
│   job_applications      │ `}<span className="text-value-red">0</span>{`                                                     │
│   login_pattern         │ `}<span className="text-value-amber">2x/month to scroll feed</span>{`                              │
│   premium_features_used │ `}<span className="text-value-red">0%</span>{`                                                    │
│   free_tier_equivalent  │ `}<span className="text-value-green">IDENTICAL ACCESS</span>{`                                      │
│                                                                                │
├──��───────────────────────────��─────────────────────────────────────────────────┤
│                                                                                │
│   GENOME CLASSIFICATION: `}<span className="text-[#B066FF] font-bold">STATUS SYMBOL</span>{`                                        │
│   ───────���────────────────────────────────────────────────────────────────     │
│                                                                                │
│   > "You keep this because cancelling feels like failure.                      │
│   >  Not because you use it. AI confirmed what you already knew."              │
│                                                                                │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│   FINANCIAL IMPACT                                                             │
│   ══════════════════════════════════════════════════════════════════════════   │
│                                                                                │
│   monthly_cost          │ `}<span className="text-value-amber">₹2,499</span>{`                                              │
│   cost_per_real_hour    │ `}<span className="text-value-red font-bold">₹10,710</span>{`                                             │
│   annual_waste          │ `}<span className="text-value-red font-bold">₹29,988</span>{`                                             │
│                                                                                │
│   recommendation        │ `}<span className="text-value-green font-bold">CANCEL TODAY</span>{`                                        │
│   savings_if_cancelled  │ `}<span className="text-value-green font-bold">₹29,988/year</span>{`                                        │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘

> ANALYSIS COMPLETE. CONFIDENCE: 98.7%
> `}<span className="animate-pulse">█</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

// Social Proof Section
function SocialProofSection() {
  const quotes = [
    {
      text: "ValueOS showed me I was paying ₹2,499/month for LinkedIn and hadn't logged in for 3 months. Found it in 30 seconds.",
      name: 'Rahul K.',
      role: 'Product Manager · Mumbai'
    },
    {
      text: "The AI classified my Figma subscription as 'Vital Organ' and Adobe CC as 'Zombie'. It was right. I cancelled Adobe instantly.",
      name: 'Priya S.',
      role: 'Designer · Bangalore'
    },
    {
      text: "₹47,000 in annual savings identified in under a minute. The genome classification made the decision obvious.",
      name: 'Arjun M.',
      role: 'Founder · Delhi'
    }
  ]

  return (
    <section className="py-24 px-6 bg-void">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Early Results</SectionLabel>
        
        <h2 className="font-[family-name:var(--font-unbounded)] font-bold text-4xl text-text-primary mb-12">
          The AI Found What Nobody Was Looking For.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quotes.map((quote, i) => (
            <div key={i} className="bg-surface p-6 rounded-r-[14px]" style={{ borderLeft: '3px solid #00E5FF', borderTop: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-sans text-sm text-text-primary leading-[1.7] mb-6">{`"${quote.text}"`}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
                  <span className="font-mono text-sm text-teal">{quote.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="font-sans font-medium text-sm text-text-primary">{quote.name}</p>
                  <p className="font-sans text-xs text-text-secondary">{quote.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {['₹4,200 avg monthly waste found', '60 seconds to first insight', 'AI accuracy: 95%+'].map((stat, i) => (
            <span key={i} className="px-4 py-2 rounded-full font-mono text-[11px]" style={{ background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)', color: '#5A6A90' }}>{stat}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// Expansion Section
function ExpansionSection() {
  const modes = [
    {
      status: 'LIVE NOW',
      statusColor: '#00FF99',
      title: 'Personal',
      subtitle: 'For individuals',
      body: 'Every subscription you pay for — evaluated by AI behavioral analysis. Netflix. Hotstar. LinkedIn. Gym. Storage. Truth in 60 seconds.',
      link: 'Try it free →',
      borderColor: 'rgba(0,255,153,0.15)',
      accentColor: '#00FF99',
      icon: (
        <svg className="w-12 h-12 mb-4" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="18" r="8" stroke="#00FF99" strokeWidth="1.5"/>
          <path d="M12 40C12 33.4 17.4 28 24 28C30.6 28 36 33.4 36 40" stroke="#00FF99" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="38" cy="14" r="4" stroke="#00FF99" strokeWidth="1" opacity="0.5"/>
          <circle cx="10" cy="22" r="3" stroke="#00FF99" strokeWidth="1" opacity="0.5"/>
        </svg>
      )
    },
    {
      status: 'STAGE 2',
      statusColor: '#FFB800',
      title: 'Business',
      subtitle: 'For companies',
      body: "Every SaaS tool your company pays for — mapped to actual employee usage. Unused licenses found. Real ROI calculated. CFO's dream.",
      link: 'Join waitlist →',
      borderColor: 'rgba(255,184,0,0.12)',
      accentColor: '#FFB800',
      icon: (
        <svg className="w-12 h-12 mb-4" viewBox="0 0 48 48" fill="none">
          <rect x="10" y="18" width="28" height="22" rx="2" stroke="#FFB800" strokeWidth="1.5"/>
          <path d="M10 24H38" stroke="#FFB800" strokeWidth="1.5" opacity="0.5"/>
          <rect x="18" y="8" width="12" height="10" rx="1" stroke="#FFB800" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      status: 'STAGE 3',
      statusColor: '#B066FF',
      title: 'AI Agents',
      subtitle: 'For the AI economy',
      body: 'Every AI agent your company deploys — evaluated by the Central AI Agent. Is Salesforce Einstein actually working? Is your Copilot delivering ROI? Finally answered.',
      link: 'Coming 2026 →',
      borderColor: 'rgba(176,102,255,0.12)',
      accentColor: '#B066FF',
      icon: (
        <svg className="w-12 h-12 mb-4" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="14" stroke="#B066FF" strokeWidth="1.5"/>
          <circle cx="24" cy="24" r="6" stroke="#B066FF" strokeWidth="1.5" opacity="0.5"/>
          <circle cx="24" cy="24" r="2" fill="#B066FF"/>
          <path d="M24 10V6M24 42V38M38 24H42M6 24H10" stroke="#B066FF" strokeWidth="1.5"/>
        </svg>
      )
    }
  ]

  return (
    <section className="py-24 px-6 bg-void">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>One Agent · Three Markets</SectionLabel>
        
        <h2 className="font-[family-name:var(--font-unbounded)] font-bold text-4xl text-text-primary mb-12">
          Central AI Agent. Expanding Intelligence.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode, i) => (
            <div key={i} className="p-6 rounded-[14px] bg-surface relative overflow-hidden" style={{ border: `1px solid ${mode.borderColor}` }}>
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: mode.accentColor }} />
              
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-4" style={{ background: `${mode.accentColor}15`, color: mode.statusColor }}>{mode.status}</span>
              
              {mode.icon}
              
              <h3 className="font-sans font-semibold text-lg text-text-primary mb-1">{mode.title}</h3>
              <p className="font-sans text-sm text-text-secondary mb-4">{mode.subtitle}</p>
              <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-6">{mode.body}</p>
              
              <button className="font-sans text-sm font-medium hover:underline" style={{ color: mode.accentColor }}>{mode.link}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-32 px-6 relative" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,255,0.06), transparent), #030407', borderTop: '1px solid rgba(0,229,255,0.08)' }}>
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block px-4 py-2 rounded-full text-[10px] font-mono text-teal mb-8" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>FREE · PRIVATE · INSTANT</span>
        
        <h2 className="font-[family-name:var(--font-unbounded)] font-black text-[36px] sm:text-[52px] leading-[1.1] tracking-[-2px] text-text-primary mb-6 text-balance">
          {"Find out what you're"}<br />really paying for.
        </h2>
        
        <p className="font-sans text-lg text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
          Upload your bank statement. AI analyzes in 60 seconds. No signup required. Your data never leaves your device.
        </p>

        <button className="px-10 py-4 rounded-[12px] bg-teal text-black font-sans font-bold text-base hover:scale-[1.03] transition-transform mb-8" style={{ boxShadow: '0 0 30px rgba(0,229,255,0.4)' }}>
          Reveal My Truth →
        </button>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><rect x="3" y="6" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M5 6V4C5 2.89543 5.89543 2 7 2H9C10.1046 2 11 2.89543 11 4V6" stroke="currentColor" strokeWidth="1.5"/></svg>
            On-device AI
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M8 1L2 4V7.5C2 11.09 4.56 14.41 8 15C11.44 14.41 14 11.09 14 7.5V4L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            DPDP Act Compliant
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><polygon points="8,1 10,6 15,6 11,9 13,15 8,11 3,15 5,9 1,6 6,6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            60 second analysis
          </span>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-6 bg-void" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" fill="#00E5FF" />
                <text x="20" y="25" textAnchor="middle" fill="#000" fontWeight="900" fontSize="14" fontFamily="var(--font-unbounded)">V</text>
              </svg>
            </div>
            <div>
              <span className="font-[family-name:var(--font-unbounded)] font-bold text-sm text-text-primary">ValueOS</span>
              <p className="font-mono text-[9px] text-text-ghost">{"Central AI Agent for India's Digital Economy"}</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {['Dashboard', 'How it works', 'Privacy', 'Contact'].map((link, i) => (
              <a key={i} href="#" className="font-mono text-[11px] text-text-ghost hover:text-text-secondary transition-colors">{link}</a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-text-ghost">@Kidwiththeheat</span>
            <span className="font-mono text-[11px] text-text-ghost">Mumbai, India</span>
          </div>
        </div>

        <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="font-mono text-[9px] text-text-ghost text-center">
            {"ValueOS © 2025 · India's Central AI Agent · Built with AI · Powered by Behavioral Truth"}
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function ValueOSLandingPage() {
  return (
    <main className="bg-void min-h-screen noise-overlay relative">
      <Navigation />
      <HeroSection />
      <InfiniteTickerSection />
      <MetricCardsSection />
      <ProblemSection />
      <HowItWorksSection />
      <GenomeSection />
      <SocialProofSection />
      <ExpansionSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
