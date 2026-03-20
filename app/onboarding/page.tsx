'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// Questions data
const questions = [
  {
    text: "How many subscriptions are silently charging your account right now?",
    options: [
      "Honestly, I have no idea",
      "Probably 1 to 3",
      "Around 4 to 7",
      "8 or more — I've lost count"
    ]
  },
  {
    text: "Do you know exactly how much you spend on digital subscriptions every month?",
    options: [
      "Not at all — it just auto-charges",
      "I have a rough idea",
      "Approximately, yes",
      "I track every rupee"
    ]
  },
  {
    text: "Have you ever discovered a subscription charging you that you completely forgot about?",
    options: [
      "Never happened to me",
      "Once or twice maybe",
      "A few times honestly",
      "More times than I'd like to admit"
    ]
  },
  {
    text: "When did you last sit down and review every single subscription you're paying for?",
    options: [
      "I did this recently",
      "Sometime this year",
      "More than a year ago",
      "I have never actually done this"
    ]
  },
  {
    text: "Your most expensive subscription — how often do you genuinely use it?",
    options: [
      "Every single day",
      "A few times a week",
      "Maybe once a month",
      "Rarely if ever, honestly"
    ]
  }
]

const scanMessages = [
  "Initializing behavioral analysis engine...",
  "Mapping subscription detection patterns...",
  "Cross-referencing transaction signatures...",
  "Identifying recurring charge vectors...",
  "Computing usage intelligence matrix...",
  "Calculating peer benchmark percentiles...",
  "Generating genome classification models...",
  "Synthesizing your financial truth report..."
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStage, setCurrentStage] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Stage 2 state
  const [scanProgress, setScanProgress] = useState(0)
  const [currentScanMessage, setCurrentScanMessage] = useState(0)
  const [checklistItems, setChecklistItems] = useState([false, false, false, false])
  
  // Stage 3 state
  const [revealStep, setRevealStep] = useState(0)
  const [showToast, setShowToast] = useState(false)

  // Handle option selection
  const handleOptionSelect = useCallback((index: number) => {
    if (selectedOption !== null) return
    setSelectedOption(index)
    
    setTimeout(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setAnswers(prev => [...prev, index])
        if (currentQuestion < 4) {
          setCurrentQuestion(prev => prev + 1)
          setSelectedOption(null)
          setIsTransitioning(false)
        } else {
          setCurrentStage(1)
          setIsTransitioning(false)
        }
      }, 300)
    }, 350)
  }, [selectedOption, currentQuestion])

  // Stage 2: Scan progress
  useEffect(() => {
    if (currentStage !== 1) return
    
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        const increment = Math.floor(Math.random() * 6) + 3
        const newProgress = Math.min(prev + increment, 100)
        
        // Update checklist
        if (newProgress >= 25 && !checklistItems[0]) {
          setChecklistItems(prev => [true, prev[1], prev[2], prev[3]])
        }
        if (newProgress >= 45 && !checklistItems[1]) {
          setChecklistItems(prev => [prev[0], true, prev[2], prev[3]])
        }
        if (newProgress >= 65 && !checklistItems[2]) {
          setChecklistItems(prev => [prev[0], prev[1], true, prev[3]])
        }
        if (newProgress >= 85 && !checklistItems[3]) {
          setChecklistItems(prev => [prev[0], prev[1], prev[2], true])
        }
        
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setCurrentStage(2)
          }, 800)
        }
        
        return newProgress
      })
    }, 150)
    
    return () => clearInterval(progressInterval)
  }, [currentStage, checklistItems])

  // Stage 2: Scan message cycling
  useEffect(() => {
    if (currentStage !== 1) return
    
    const messageInterval = setInterval(() => {
      setCurrentScanMessage(prev => (prev + 1) % scanMessages.length)
    }, 600)
    
    return () => clearInterval(messageInterval)
  }, [currentStage])

  // Stage 3: Reveal sequence
  useEffect(() => {
    if (currentStage !== 2) return
    
    const delays = [200, 500, 1000, 1600, 2100, 2500, 3000, 3800, 4200, 4800, 5200]
    const timers: NodeJS.Timeout[] = []
    
    delays.forEach((delay, index) => {
      const timer = setTimeout(() => {
        setRevealStep(index + 1)
      }, delay)
      timers.push(timer)
    })
    
    return () => timers.forEach(t => clearTimeout(t))
  }, [currentStage])

  // Copy to clipboard
  const handleShare = useCallback(() => {
    const text = `ValueOS AI just showed me I waste ₹66,600/year on subscriptions I don't use.\nMy waste score: 68/100.\nWhat's YOUR number? → valueos.in`
    navigator.clipboard.writeText(text)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@400;500;600;700&family=Unbounded:wght@700;900&display=swap');
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes breathe {
          0%, 100% { text-shadow: 0 0 40px rgba(255,45,85,0.4), 0 0 80px rgba(255,45,85,0.2); }
          50% { text-shadow: 0 0 60px rgba(255,45,85,0.8), 0 0 100px rgba(255,45,85,0.4), 0 0 140px rgba(255,45,85,0.2); }
        }
        
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#040407',
        backgroundImage: 'radial-gradient(rgba(0,229,255,0.025) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Stage 0: Clarity Assessment */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          opacity: currentStage === 0 ? 1 : 0,
          transform: currentStage === 0 ? 'translateY(0)' : 'translateY(-20px)',
          pointerEvents: currentStage === 0 ? 'auto' : 'none'
        }}>
          {/* Top Bar */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 100,
            backgroundColor: 'rgba(4,4,7,0.9)',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="36" height="36" viewBox="0 0 40 40">
                <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" fill="#00E5FF" />
                <text x="20" y="25" textAnchor="middle" fill="#000" fontWeight="900" fontSize="16" style={{ fontFamily: "'Unbounded', sans-serif" }}>V</text>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: 900,
                  fontSize: '16px',
                  background: 'linear-gradient(135deg, #FFFFFF, #00E5FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>ValueOS</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '8px',
                  color: '#1E2A40',
                  letterSpacing: '3px',
                  textTransform: 'uppercase'
                }}>Central AI Agent</span>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  width: '40px',
                  height: '2px',
                  borderRadius: '1px',
                  backgroundColor: i <= currentQuestion ? '#00E5FF' : 'rgba(255,255,255,0.08)',
                  transition: 'background-color 0.3s ease'
                }} />
              ))}
            </div>
            
            {/* Question Counter */}
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#5A6A90'
            }}>Question {currentQuestion + 1} of 5</span>
          </div>
          
          {/* Question Area */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px',
            maxWidth: '520px',
            margin: '0 auto',
            width: '100%',
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
          }}>
            {/* Question Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(0,229,255,0.08)',
              border: '1px solid rgba(0,229,255,0.2)',
              marginBottom: '24px'
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: '#00E5FF',
                letterSpacing: '2px'
              }}>QUESTION {String(currentQuestion + 1).padStart(2, '0')} · CLARITY ASSESSMENT</span>
            </div>
            
            {/* Question Text */}
            <h2 style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(22px, 5vw, 28px)',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              lineHeight: 1.3,
              marginBottom: '32px',
              textAlign: 'center'
            }}>{questions[currentQuestion].text}</h2>
            
            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              {questions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(i)}
                  onMouseEnter={() => setHoveredOption(i)}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: selectedOption === i 
                      ? '1px solid rgba(0,229,255,0.4)'
                      : hoveredOption === i 
                        ? '1px solid rgba(0,229,255,0.25)'
                        : '1px solid rgba(255,255,255,0.07)',
                    backgroundColor: selectedOption === i 
                      ? 'rgba(0,229,255,0.08)'
                      : hoveredOption === i 
                        ? '#121C30'
                        : '#0C1220',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                >
                  {/* Radio Circle */}
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: selectedOption === i || hoveredOption === i 
                      ? '1.5px solid #00E5FF'
                      : '1.5px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}>
                    {selectedOption === i && (
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#00E5FF'
                      }} />
                    )}
                  </div>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: '15px',
                    color: '#EEF3FF'
                  }}>{option}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Bottom Note */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px',
            textAlign: 'center'
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '1px'
            }}>YOUR ANSWERS ARE PROCESSED LOCALLY · NEVER STORED · NEVER TRANSMITTED</p>
          </div>
        </div>
        
        {/* Stage 1: AI Awakening */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          opacity: currentStage === 1 ? 1 : 0,
          transform: currentStage === 1 ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: currentStage === 1 ? 'auto' : 'none',
          backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,229,255,0.05), transparent), radial-gradient(rgba(0,229,255,0.025) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 32px 32px'
        }}>
          <div style={{ textAlign: 'center', padding: '24px', maxWidth: '500px' }}>
            {/* Animated Hex */}
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px' }}>
              {/* Outer Ring */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                backgroundColor: 'rgba(0,229,255,0.06)',
                border: '1px solid rgba(0,229,255,0.15)',
                animation: 'spin 8s linear infinite'
              }} />
              {/* Inner Hex */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '64px',
                height: '64px',
                backgroundColor: '#00E5FF',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(0,229,255,0.5)',
                animation: 'pulse 2s ease infinite'
              }}>
                <span style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: 900,
                  fontSize: '22px',
                  color: '#000'
                }}>V</span>
              </div>
            </div>
            
            {/* Title */}
            <h2 style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 700,
              fontSize: '22px',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              marginBottom: '12px'
            }}>Analyzing Your Financial Behavior</h2>
            
            {/* Scan Message */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#00E5FF',
              letterSpacing: '0.5px',
              marginBottom: '32px',
              minHeight: '18px'
            }}>{scanMessages[currentScanMessage]}</p>
            
            {/* Progress Bar */}
            <div style={{
              width: '100%',
              maxWidth: '400px',
              height: '3px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderRadius: '2px',
              margin: '0 auto 8px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${scanProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00E5FF, #00FF99)',
                borderRadius: '2px',
                boxShadow: '0 0 10px rgba(0,229,255,0.4)',
                transition: 'width 0.15s ease'
              }} />
            </div>
            
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#5A6A90',
              marginBottom: '32px'
            }}>{scanProgress}% complete</p>
            
            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start', maxWidth: '300px', margin: '0 auto' }}>
              {[
                'Transaction pattern analysis',
                'Subscription vendor identification',
                'Usage behavioral mapping',
                'Peer benchmark calibration'
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  opacity: checklistItems[i] ? 1 : 0.3,
                  transition: 'opacity 0.3s ease'
                }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: checklistItems[i] ? '#00E5FF' : 'transparent',
                    border: checklistItems[i] ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    {checklistItems[i] && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: checklistItems[i] ? '#EEF3FF' : '#1E2A40'
                  }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Stage 2: Truth Bomb */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          opacity: currentStage === 2 ? 1 : 0,
          transform: currentStage === 2 ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: currentStage === 2 ? 'auto' : 'none',
          backgroundImage: revealStep >= 7 
            ? 'radial-gradient(ellipse 50% 30% at 50% 60%, rgba(255,45,85,0.06), transparent)'
            : 'none',
          padding: '24px',
          overflowY: 'auto'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', width: '100%', padding: '60px 0' }}>
            {/* Top Label */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#5A6A90',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '40px',
              opacity: revealStep >= 1 ? 1 : 0,
              transform: revealStep >= 1 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease'
            }}>YOUR FINANCIAL TRUTH REPORT · POWERED BY AI</p>
            
            {/* Reveal 1: Paid Label */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#5A6A90',
              letterSpacing: '2px',
              marginBottom: '8px',
              opacity: revealStep >= 2 ? 1 : 0,
              transform: revealStep >= 2 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease'
            }}>IN THE LAST 12 MONTHS YOU PAID</p>
            
            {/* Reveal 2: Total Amount */}
            <p style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 900,
              fontSize: '48px',
              color: '#EEF3FF',
              letterSpacing: '-2px',
              marginBottom: '24px',
              opacity: revealStep >= 3 ? 1 : 0,
              transform: revealStep >= 3 ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.6s ease'
            }}>₹1,01,040</p>
            
            {/* Reveal 3: Value Label */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#5A6A90',
              letterSpacing: '2px',
              marginBottom: '8px',
              opacity: revealStep >= 4 ? 1 : 0,
              transform: revealStep >= 4 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease'
            }}>IN SUBSCRIPTIONS · YOU RECEIVED VALUE FROM</p>
            
            {/* Reveal 4: Value Amount */}
            <p style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 900,
              fontSize: '40px',
              color: '#00FF99',
              letterSpacing: '-1px',
              textShadow: '0 0 30px rgba(0,255,153,0.4)',
              marginBottom: '32px',
              opacity: revealStep >= 5 ? 1 : 0,
              transform: revealStep >= 5 ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.6s ease'
            }}>₹34,440</p>
            
            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
              opacity: revealStep >= 6 ? 1 : 0,
              transition: 'all 0.6s ease'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#FF2D55',
                letterSpacing: '3px'
              }}>YOU WASTED</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} />
            </div>
            
            {/* THE BOMB */}
            <div style={{
              opacity: revealStep >= 7 ? 1 : 0,
              transform: revealStep >= 7 ? 'scale(1)' : 'scale(0.7)',
              transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)'
            }}>
              <p style={{
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(64px, 12vw, 96px)',
                color: '#FF2D55',
                letterSpacing: '-4px',
                lineHeight: 1,
                animation: revealStep >= 7 ? 'breathe 2.5s ease-in-out infinite' : 'none',
                marginBottom: '8px'
              }}>₹66,600</p>
              <p style={{
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: 700,
                fontSize: '18px',
                color: 'rgba(255,45,85,0.7)',
                marginBottom: '32px'
              }}>every single month</p>
            </div>
            
            {/* Anchor Card */}
            <div style={{
              backgroundColor: 'rgba(255,45,85,0.06)',
              border: '1px solid rgba(255,45,85,0.15)',
              borderRadius: '14px',
              padding: '20px 28px',
              maxWidth: '500px',
              margin: '0 auto 32px',
              textAlign: 'left',
              opacity: revealStep >= 8 ? 1 : 0,
              transform: revealStep >= 8 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease'
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: 'rgba(255,45,85,0.6)',
                letterSpacing: '2px',
                marginBottom: '12px'
              }}>ANNUAL WASTE = ₹66,600</p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                color: '#EEF3FF',
                lineHeight: 1.8
              }}>
                {"That's a return trip to Bali. Or 8 months of SIP → ₹3.8L in 5 years. Or a MacBook Air M3. Fully paid. You earned this money. "}
                <span style={{ color: '#FF2D55' }}>You deserved better.</span>
              </p>
            </div>
            
            {/* Stats Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap',
              marginBottom: '32px',
              opacity: revealStep >= 9 ? 1 : 0,
              transform: revealStep >= 9 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease'
            }}>
              {[
                { num: '11', label: 'SUBSCRIPTIONS PAYING', color: '#5A6A90' },
                { num: '4', label: 'ACTUALLY USING', color: '#00FF99' },
                { num: '7', label: 'PURE WASTE', color: '#FF2D55' }
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <p style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontWeight: 900,
                    fontSize: '36px',
                    color: stat.color,
                    lineHeight: 1
                  }}>{stat.num}</p>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px',
                    color: '#5A6A90',
                    letterSpacing: '1px',
                    marginTop: '4px'
                  }}>{stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '32px',
              opacity: revealStep >= 10 ? 1 : 0,
              transform: revealStep >= 10 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease'
            }}>
              <button
                onClick={() => router.push('/dashboard')}
                style={{
                  backgroundColor: '#FF2D55',
                  color: '#FFFFFF',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '14px 32px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(255,45,85,0.4)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(255,45,85,0.6)'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255,45,85,0.4)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >Stop the Waste Now →</button>
              
              <button
                onClick={handleShare}
                style={{
                  backgroundColor: 'transparent',
                  color: '#EEF3FF',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  padding: '14px 32px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >Share My Truth ↗</button>
            </div>
            
            {/* Bottom Note */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '2px',
              opacity: revealStep >= 11 ? 1 : 0,
              transition: 'all 0.6s ease'
            }}>BASED ON BEHAVIORAL AI ANALYSIS · NOT OPINIONS · NOT VENDOR CLAIMS</p>
          </div>
        </div>
        
        {/* Toast */}
        <div style={{
          position: 'fixed',
          bottom: '32px',
          left: '50%',
          transform: `translateX(-50%) translateY(${showToast ? '0' : '20px'})`,
          opacity: showToast ? 1 : 0,
          backgroundColor: '#00E5FF',
          color: '#000000',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          fontWeight: 700,
          padding: '10px 20px',
          borderRadius: '20px',
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          zIndex: 1000
        }}>Copied to clipboard ✓</div>
      </div>
    </>
  )
}
