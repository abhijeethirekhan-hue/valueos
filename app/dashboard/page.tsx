'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const SUBSCRIPTIONS = [
  { id: 1, name: "Hotstar Premium", category: "Streaming", icon: "📺", monthly: 299, usageMinutes: 72, genome: "GHOST", renewsIn: 2, score: 1.2 },
  { id: 2, name: "LinkedIn Premium", category: "Professional", icon: "💼", monthly: 2499, usageMinutes: 14, genome: "STATUS SYMBOL", renewsIn: 12, score: 1.8 },
  { id: 3, name: "Adobe Creative Cloud", category: "Design", icon: "🎨", monthly: 1675, usageMinutes: 240, genome: "ZOMBIE", renewsIn: 7, score: 2.4 },
  { id: 4, name: "Netflix Standard", category: "Streaming", icon: "🎬", monthly: 649, usageMinutes: 540, genome: "EXPENSIVE HABIT", renewsIn: 30, score: 5.5 },
  { id: 5, name: "Kindle Unlimited", category: "Reading", icon: "📚", monthly: 169, usageMinutes: 180, genome: "SEASONAL BEAST", renewsIn: 18, score: 4.8 },
  { id: 6, name: "ChatGPT Plus", category: "AI Tools", icon: "🤖", monthly: 1650, usageMinutes: 2670, genome: "VITAL ORGAN", renewsIn: 22, score: 9.2 },
  { id: 7, name: "Spotify Premium", category: "Music", icon: "🎵", monthly: 119, usageMinutes: 7620, genome: "VITAL ORGAN", renewsIn: 15, score: 9.7 },
  { id: 8, name: "Google One", category: "Storage", icon: "☁️", monthly: 130, usageMinutes: 0, genome: "FEAR HOLD", renewsIn: 5, score: 2.1 },
]

const GENOME_COLORS: Record<string, string> = {
  "VITAL ORGAN": "#00FF99", "DAILY DRIVER": "#00E5FF",
  "SEASONAL BEAST": "#FFB800", "EXPENSIVE HABIT": "#FFB800",
  "ZOMBIE": "#FF2D55", "STATUS SYMBOL": "#B066FF",
  "FEAR HOLD": "#FF2D55", "GHOST": "#5A6A90",
}

const GENOME_PROFILES: Record<string, number[]> = {
  "VITAL ORGAN": [90, 88, 85, 80, 82], "DAILY DRIVER": [70, 65, 60, 50, 60],
  "SEASONAL BEAST": [40, 30, 80, 20, 45], "EXPENSIVE HABIT": [35, 30, 20, 40, 45],
  "ZOMBIE": [10, 8, 8, 20, 20], "STATUS SYMBOL": [15, 20, 10, 15, 65],
  "FEAR HOLD": [8, 5, 5, 40, 30], "GHOST": [5, 5, 5, 10, 15],
}

function getAccentColor(score: number) {
  if (score < 3.5) return "#FF2D55"
  if (score < 6) return "#FFB800"
  return "#00FF99"
}

function getAction(score: number) {
  if (score < 3.5) return "cancel"
  if (score < 6) return "downgrade"
  return "keep"
}

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN")
}

function useCountUp(target: number, duration: number, delay: number = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setVal(Math.floor(ease * target))
        if (progress < 1) requestAnimationFrame(step)
        else setVal(target)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, duration, delay])
  return val
}

function RadarChart({ genome, color }: { genome: string; color: string }) {
  const vals = GENOME_PROFILES[genome] || [20, 20, 20, 20, 20]
  const cx = 50, cy = 50, r = 38
  const angles = [-90, -18, 54, 126, 198].map(a => a * Math.PI / 180)
  const outer = angles.map(a => [cx + Math.cos(a) * r, cy + Math.sin(a) * r])
  const data = vals.map((v, i) => {
    const dist = (v / 100) * r
    return [cx + Math.cos(angles[i]) * dist, cy + Math.sin(angles[i]) * dist]
  })
  const outerPoly = outer.map(p => p.join(",")).join(" ")
  const mid = outer.map(p => [(p[0] + cx) * 0.66 + cx * 0.34, (p[1] + cy) * 0.66 + cy * 0.34])
  const midPoly = mid.map(p => p.join(",")).join(" ")
  const dataPoly = data.map(p => p.join(",")).join(" ")
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <polygon points={outerPoly} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <polygon points={midPoly} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      {angles.map((a, i) => (
        <line key={i} x1={cx} y1={cy} x2={outer[i][0]} y2={outer[i][1]} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      ))}
      <polygon points={dataPoly} fill={color + "20"} stroke={color} strokeWidth="1.5"
        style={{ filter: `drop-shadow(0 0 4px ${color}80)`, animation: "radarDraw 0.8s ease both" }} />
      {["FREQ", "DEPTH", "MOMENT", "SUBST", "DEP"].map((label, i) => {
        const lx = cx + Math.cos(angles[i]) * (r + 10)
        const ly = cy + Math.sin(angles[i]) * (r + 10)
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: "JetBrains Mono", fontSize: 7, fill: "#1E2A40" }}>{label}</text>
      })}
    </svg>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const [cancelled, setCancelled] = useState<number[]>([])
  const [toast, setToast] = useState("")
  const [barsVisible, setBarsVisible] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setBarsVisible(true), 800)
    return () => clearTimeout(t)
  }, [])

  const activeSubs = SUBSCRIPTIONS.filter(s => !cancelled.includes(s.id))
  const totalMonthly = activeSubs.reduce((s, x) => s + x.monthly, 0)
  const totalWaste = activeSubs.filter(x => x.score < 4).reduce((s, x) => s + x.monthly, 0)
  const totalValue = activeSubs.filter(x => x.score >= 7).reduce((s, x) => s + x.monthly, 0)
  const annualWaste = totalWaste * 12
  const wasteScore = totalMonthly > 0 ? Math.round((totalWaste / totalMonthly) * 100) : 0

  const wasteAnim = useCountUp(totalWaste, 1800, 300)
  const payingAnim = useCountUp(totalMonthly, 1600, 500)
  const valueAnim = useCountUp(totalValue, 1600, 700)
  const annualAnim = useCountUp(annualWaste, 2000, 900)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 2800)
  }

  const cancelSub = (id: number, name: string, monthly: number) => {
    setCancelled(prev => [...prev, id])
    showToast(`Cancelled ${name} — saving ${formatINR(monthly)}/month`)
  }

  const sortedByRenewal = [...activeSubs].sort((a, b) => a.renewsIn - b.renewsIn).slice(0, 4)
  const urgentSubs = activeSubs.filter(s => s.renewsIn <= 7)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600&display=swap');
        :root {
          --void:#030407;--deep:#070A12;--surface:#0C1220;--elevated:#121C30;
          --teal:#00E5FF;--red:#FF2D55;--amber:#FFB800;--green:#00FF99;--purple:#B066FF;
          --t1:#EEF3FF;--t2:#5A6A90;--t3:#1E2A40;
        }
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:var(--void);color:var(--t1);font-family:'Outfit',sans-serif}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--void)}
        ::-webkit-scrollbar-thumb{background:rgba(0,229,255,0.2);border-radius:2px}

        @keyframes wasteBreathing {
          0%,100%{text-shadow:0 0 20px rgba(255,45,85,0.3)}
          50%{text-shadow:0 0 60px rgba(255,45,85,0.8),0 0 100px rgba(255,45,85,0.3)}
        }
        @keyframes livePulse {
          0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(0,255,153,0.4)}
          50%{opacity:0.5;box-shadow:0 0 0 6px rgba(0,255,153,0)}
        }
        @keyframes alertPulse {
          0%,100%{box-shadow:0 0 0 0 rgba(255,184,0,0.4)}
          50%{box-shadow:0 0 0 8px rgba(255,184,0,0)}
        }
        @keyframes fadeUp {
          from{opacity:0;transform:translateY(16px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes rowEntrance {
          from{opacity:0;transform:translateX(-12px)}
          to{opacity:1;transform:translateX(0)}
        }
        @keyframes radarDraw {
          from{opacity:0;transform:scale(0.8)}
          to{opacity:1;transform:scale(1)}
        }
        @keyframes spin {
          from{transform:rotate(0deg)}
          to{transform:rotate(360deg)}
        }

        .sub-row{transition:background 0.15s;position:relative}
        .sub-row:hover{background:rgba(255,255,255,0.025)!important}
        .card-hover{transition:border-color 0.2s,transform 0.2s;cursor:pointer}
        .card-hover:hover{border-color:rgba(255,255,255,0.10)!important;transform:translateY(-2px)}
        .btn-cancel:hover{background:rgba(255,45,85,0.18)!important}
        .btn-downgrade:hover{background:rgba(255,184,0,0.18)!important}
        .btn-primary:hover{transform:translateY(-1px);box-shadow:0 0 30px rgba(0,229,255,0.5)!important}

        @media(max-width:1024px){
          .hero-grid{grid-template-columns:1fr 1fr!important}
          .main-grid{grid-template-columns:1fr!important}
          .genome-grid{grid-template-columns:1fr 1fr!important}
          .bench-grid{grid-template-columns:1fr!important}
        }
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important}
          .genome-grid{grid-template-columns:1fr!important}
          .ai-grid{grid-template-columns:1fr!important}
          .savings-inner{flex-direction:column!important;gap:20px!important}
          .nav-right{gap:8px!important}
          .clarity-rank{display:none!important}
          .usage-col{display:none!important}
        }
        @media(max-width:480px){
          .hero-val{font-size:24px!important}
          .cta-strip{flex-direction:column!important;gap:12px!important}
        }
      `}</style>

      {/* Background layers */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#030407" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "radial-gradient(circle, rgba(0,229,255,0.10) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(0,229,255,0.06), transparent)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,255,0.007) 3px, rgba(0,229,255,0.007) 4px)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* ── NAV ── */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(3,4,7,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 0", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 32, height: 32, background: "#00E5FF", clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(0,229,255,0.4)", flexShrink: 0 }}>
              <span style={{ fontFamily: "Unbounded", fontWeight: 900, fontSize: 12, color: "#000" }}>V</span>
            </div>
            <div>
              <div style={{ fontFamily: "Unbounded", fontSize: 15, fontWeight: 700, background: "linear-gradient(90deg,#fff,#00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2 }}>ValueOS</div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 8, color: "#1E2A40", letterSpacing: 3, textTransform: "uppercase" }}>Central AI Agent</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,255,153,0.08)", border: "1px solid rgba(0,255,153,0.2)", padding: "4px 12px", borderRadius: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FF99", animation: "livePulse 1.8s ease-in-out infinite" }} />
              <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#00FF99", letterSpacing: 1 }}>LIVE</span>
            </div>
          </div>

          <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="clarity-rank" style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", padding: "6px 14px", borderRadius: 10 }}>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "#5A6A90", marginBottom: 2 }}>CLARITY RANK</div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#00E5FF", fontWeight: 700 }}>TOP 8% · ELITE</div>
            </div>
            <div style={{ background: "rgba(255,45,85,0.08)", border: "1px solid rgba(255,45,85,0.2)", padding: "6px 16px", borderRadius: 10 }}>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "#FF2D55", opacity: 0.7, marginBottom: 2 }}>WASTE SCORE</div>
              <div style={{ fontFamily: "Unbounded", fontSize: 22, fontWeight: 900, color: "#FF2D55", lineHeight: 1, animation: "wasteBreathing 3s ease-in-out infinite" }}>{wasteScore}</div>
            </div>
            <label style={{ background: "transparent", border: "1px solid rgba(0,229,255,0.25)", color: "#00E5FF", fontFamily: "JetBrains Mono", fontSize: 10, padding: "7px 14px", borderRadius: 8, cursor: "pointer" }}>
              {uploading ? "PARSING..." : "+ UPLOAD PDF"}
              <input type="file" accept=".pdf" style={{ display: "none" }} onChange={() => {
                setUploading(true)
                showToast("Parsing bank statement with AI...")
                setTimeout(() => { setUploading(false); showToast("8 subscriptions detected!") }, 2000)
              }} />
            </label>
          </div>
        </nav>

        {/* ── ALERT ── */}
        {urgentSubs.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,184,0,0.07)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 12, padding: "13px 18px", marginBottom: 14, cursor: "pointer", animation: "fadeUp 0.5s ease 0.3s both" }}
            onClick={() => showToast("Opening cancellation flow...")}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFB800", flexShrink: 0, animation: "alertPulse 1.6s ease-in-out infinite" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Outfit", fontSize: 13, fontWeight: 600, color: "#FFB800", marginBottom: 2 }}>
                Hotstar Premium auto-charges in 2 days — 0 hours used this month
              </div>
              <div style={{ fontFamily: "Outfit", fontSize: 11, color: "rgba(255,184,0,0.55)" }}>
                ₹299 will be deducted. AI confidence: 94% probability this is pure waste.
              </div>
            </div>
            <div style={{ background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.3)", padding: "6px 14px", borderRadius: 6, fontFamily: "JetBrains Mono", fontSize: 10, color: "#FFB800", fontWeight: 700, whiteSpace: "nowrap" }}>
              CANCEL NOW →
            </div>
          </div>
        )}

        {/* ── HERO METRICS ── */}
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 10, marginBottom: 14, animation: "fadeUp 0.5s ease 0.1s both" }}>
          {/* Waste card */}
          <div style={{ background: "linear-gradient(135deg, rgba(255,45,85,0.08), rgba(255,45,85,0.02))", border: "1px solid rgba(255,45,85,0.22)", borderRadius: 14, padding: "22px 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: "#FF2D55", opacity: 0.06 }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: 10, height: 10, borderTop: "2px solid #FF2D55", borderLeft: "2px solid #FF2D55" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderBottom: "2px solid #FF2D55", borderRight: "2px solid #FF2D55" }} />
            <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#5A6A90", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FF2D55" }} />MONTHLY WASTE
            </div>
            <div className="hero-val" style={{ fontFamily: "Unbounded", fontSize: 34, fontWeight: 900, color: "#FF2D55", letterSpacing: -1.5, lineHeight: 1, marginBottom: 6, animation: "wasteBreathing 3s ease-in-out infinite", textShadow: "0 0 30px rgba(255,45,85,0.3)" }}>
              {formatINR(wasteAnim)}
            </div>
            <div style={{ fontFamily: "Outfit", fontSize: 11, color: "#5A6A90" }}>
              burning monthly · <span style={{ color: "#FF2D55" }}>{wasteScore}% of total spend</span>
            </div>
            <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, opacity: 0.35 }} viewBox="0 0 300 48" preserveAspectRatio="none">
              <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF2D55" stopOpacity="0.4" /><stop offset="100%" stopColor="#FF2D55" stopOpacity="0" /></linearGradient></defs>
              <polyline points="0,40 50,34 100,36 150,24 200,26 250,14 300,12" fill="none" stroke="#FF2D55" strokeWidth="1.5" />
              <polygon points="0,40 50,34 100,36 150,24 200,26 250,14 300,12 300,48 0,48" fill="url(#sg)" />
            </svg>
          </div>

          {[
            { label: "TOTAL PAYING", val: payingAnim, color: "#B066FF", sub: `across ${activeSubs.length} subscriptions` },
            { label: "VALUE RECEIVED", val: valueAnim, color: "#00E5FF", sub: "actual value delivered" },
            { label: "ANNUAL BURN", val: annualAnim, color: "#FFB800", sub: "if nothing changes today" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#0C1220", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: "22px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: c.color, opacity: 0.06 }} />
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#5A6A90", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: c.color }} />{c.label}
              </div>
              <div className="hero-val" style={{ fontFamily: "Unbounded", fontSize: 28, fontWeight: 900, color: c.color, letterSpacing: -1, lineHeight: 1, marginBottom: 6 }}>
                {formatINR(c.val)}
              </div>
              <div style={{ fontFamily: "Outfit", fontSize: 11, color: "#5A6A90" }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="main-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 12, marginBottom: 12 }}>

          {/* Subscription Table */}
          <div style={{ background: "#0C1220", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "#5A6A90", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5FF", display: "inline-block" }} />
                Subscription Intelligence
              </div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#00E5FF", cursor: "pointer", opacity: 0.7 }}
                onClick={() => showToast("Connecting bank account...")}>
                CONNECT BANK +
              </div>
            </div>

            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 72px 120px 80px 100px", gap: 10, padding: "9px 18px", background: "rgba(255,255,255,0.015)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              {["", "SERVICE", "MONTHLY", "REAL USAGE", "GENOME", "ACTION"].map((h, i) => (
                <div key={i} style={{ fontFamily: "JetBrains Mono", fontSize: 8, textTransform: "uppercase", letterSpacing: 1.2, color: "#1E2A40" }} className={i === 3 ? "usage-col" : ""}>{h}</div>
              ))}
            </div>

            {activeSubs.map((sub, idx) => {
              const accentColor = getAccentColor(sub.score)
              const action = getAction(sub.score)
              const genomeColor = GENOME_COLORS[sub.genome] || "#5A6A90"
              const usagePct = Math.min((sub.usageMinutes / (30 * 60)) * 100, 100)
              const usageHrs = (sub.usageMinutes / 60).toFixed(1)

              return (
                <div key={sub.id} className="sub-row" style={{ display: "grid", gridTemplateColumns: "32px 1fr 72px 120px 80px 100px", gap: 10, padding: "12px 18px", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.03)", animation: "rowEntrance 0.4s ease both", animationDelay: `${idx * 0.05}s` }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: accentColor + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{sub.icon}</div>
                  <div>
                    <div style={{ fontFamily: "Outfit", fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{sub.name}</div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "#1E2A40", textTransform: "uppercase", letterSpacing: 0.8 }}>{sub.category}</div>
                  </div>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 13, fontWeight: 700, color: accentColor }}>{formatINR(sub.monthly)}</div>
                  <div className="usage-col">
                    <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden", marginBottom: 4 }}>
                      <div style={{ height: "100%", width: barsVisible ? `${usagePct}%` : "0%", background: accentColor, borderRadius: 2, transition: "width 1.4s cubic-bezier(0.23,1,0.32,1)" }} />
                    </div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 9.5, color: accentColor }}>{usagePct.toFixed(0)}% · {usageHrs}hrs/mo</div>
                  </div>
                  <div>
                    <span style={{ background: genomeColor + "18", color: genomeColor, border: `1px solid ${genomeColor}35`, padding: "3px 7px", borderRadius: 5, fontFamily: "JetBrains Mono", fontSize: 8, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      {sub.genome.length > 8 ? sub.genome.split(" ")[0] : sub.genome}
                    </span>
                  </div>
                  <div>
                    {action === "cancel" ? (
                      <button className="btn-cancel" onClick={() => cancelSub(sub.id, sub.name, sub.monthly)} style={{ background: "rgba(255,45,85,0.10)", color: "#FF2D55", border: "1px solid rgba(255,45,85,0.25)", padding: "4px 10px", borderRadius: 6, fontFamily: "Outfit", fontSize: 9, fontWeight: 600, cursor: "pointer" }}>✕ Cancel</button>
                    ) : action === "downgrade" ? (
                      <button className="btn-downgrade" onClick={() => showToast(`Consider cheaper ${sub.name} plan`)} style={{ background: "rgba(255,184,0,0.10)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.25)", padding: "4px 10px", borderRadius: 6, fontFamily: "Outfit", fontSize: 9, fontWeight: 600, cursor: "pointer" }}>↓ Downgrade</button>
                    ) : (
                      <span style={{ background: "rgba(0,255,153,0.08)", color: "#00FF99", border: "1px solid rgba(0,255,153,0.18)", padding: "4px 10px", borderRadius: 6, fontFamily: "Outfit", fontSize: 9, fontWeight: 600 }}>✓ Vital</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Donut */}
            <div style={{ background: "#0C1220", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "JetBrains Mono", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "#5A6A90", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF2D55", display: "inline-block" }} />Value Allocation
              </div>
              <div style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="20" />
                  <circle cx="60" cy="60" r="44" fill="none" stroke="#FF2D55" strokeWidth="20" strokeDasharray="160 116" strokeDashoffset="0" transform="rotate(-90 60 60)" style={{ filter: "drop-shadow(0 0 6px rgba(255,45,85,0.5))" }} />
                  <circle cx="60" cy="60" r="44" fill="none" stroke="#FFB800" strokeWidth="20" strokeDasharray="42 234" strokeDashoffset="-160" transform="rotate(-90 60 60)" />
                  <circle cx="60" cy="60" r="44" fill="none" stroke="#00FF99" strokeWidth="20" strokeDasharray="52 224" strokeDashoffset="-202" transform="rotate(-90 60 60)" style={{ filter: "drop-shadow(0 0 4px rgba(0,255,153,0.4))" }} />
                  <text x="60" y="55" textAnchor="middle" style={{ fontFamily: "Unbounded", fontSize: 18, fontWeight: 900, fill: "#EEF3FF" }}>{wasteScore}%</text>
                  <text x="60" y="67" textAnchor="middle" style={{ fontFamily: "JetBrains Mono", fontSize: 8, fill: "#5A6A90" }}>WASTED</text>
                </svg>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { color: "#FF2D55", label: "Pure waste", val: formatINR(totalWaste) },
                    { color: "#FFB800", label: "Underused", val: "₹1,120" },
                    { color: "#00FF99", label: "Value", val: formatINR(totalValue) },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                      <div style={{ fontFamily: "Outfit", fontSize: 11, color: "#5A6A90" }}>{item.label}</div>
                      <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, fontWeight: 600, color: item.color, marginLeft: "auto", paddingLeft: 8 }}>{item.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Renewals */}
            <div style={{ background: "#0C1220", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "#5A6A90", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB800", display: "inline-block" }} />Renewal Predictions
                </div>
                <span style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "#00E5FF" }}>AI-POWERED</span>
              </div>
              {sortedByRenewal.map((sub, i) => {
                const urgent = sub.renewsIn <= 3
                const warn = sub.renewsIn <= 14 && !urgent
                const color = urgent ? "#FF2D55" : warn ? "#FFB800" : "#5A6A90"
                return (
                  <div key={sub.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "12", border: `1px solid ${color}25`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ fontFamily: "JetBrains Mono", fontSize: 15, fontWeight: 700, color, lineHeight: 1 }}>{sub.renewsIn}</div>
                      <div style={{ fontFamily: "JetBrains Mono", fontSize: 8, color, opacity: 0.65, textTransform: "uppercase" }}>days</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Outfit", fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{sub.name}</div>
                      <div style={{ fontFamily: "Outfit", fontSize: 10, color: "#5A6A90" }}>{sub.genome} · score {sub.score}</div>
                    </div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, fontWeight: 700, color }}>{formatINR(sub.monthly)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── GENOME SECTION ── */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "#5A6A90", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5FF", display: "inline-block" }} />
            Value Genome — Behavioral Fingerprint Per Subscription
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)", display: "block" }} />
          </div>
          <div className="genome-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {activeSubs.slice(0, 3).map(sub => {
              const genomeColor = GENOME_COLORS[sub.genome] || "#5A6A90"
              const usageHrs = sub.usageMinutes / 60
              const costPerHr = usageHrs > 0 ? Math.round(sub.monthly / usageHrs) : null
              return (
                <div key={sub.id} className="card-hover" style={{ background: "#0C1220", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: 18 }}
                  onClick={() => showToast(`${sub.name}: ${sub.genome} genome`)}>
                  <div style={{ fontFamily: "Outfit", fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{sub.name}</div>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 8, letterSpacing: 0.8, textTransform: "uppercase", color: genomeColor, marginBottom: 12 }}>{sub.genome}</div>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                    <RadarChart genome={sub.genome} color={genomeColor} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "6px 8px" }}>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "#5A6A90" }}>COST/HR</span>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, fontWeight: 700, color: genomeColor }}>
                      {costPerHr ? formatINR(costPerHr) + "/hr" : "∞ Never opened"}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── BENCHMARK + CLARITY ── */}
        <div className="bench-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>

          {/* Benchmark */}
          <div style={{ background: "#0C1220", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: 18 }}>
            <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#5A6A90", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00E5FF", display: "inline-block" }} />
              Peer Benchmark — Tech Professionals
            </div>
            {[
              { label: "Total spending", you: "₹7,190", youPct: 100, avg: "₹4,200", avgPct: 58, youColor: "#FF2D55" },
              { label: "Professional tools", you: "₹2,499", youPct: 100, avg: "₹800", avgPct: 32, youColor: "#FF2D55" },
              { label: "AI Tools", you: "₹1,650", youPct: 79, avg: "₹2,100", avgPct: 100, youColor: "#00E5FF" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontFamily: "Outfit", fontSize: 11, color: "#5A6A90" }}>{item.label}</span>
                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, fontWeight: 700, color: item.youColor }}>{item.you}</span>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#5A6A90" }}>avg {item.avg}</span>
                  </div>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${item.avgPct}%`, background: "rgba(255,255,255,0.12)", borderRadius: 3 }} />
                  <div style={{ position: "absolute", top: -4, left: `${item.youPct - 1}%`, width: 3, height: 13, background: item.youColor, borderRadius: 2 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, background: "rgba(255,45,85,0.06)", border: "1px solid rgba(255,45,85,0.14)", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontFamily: "Outfit", fontSize: 11, fontWeight: 600, color: "#FF2D55", marginBottom: 3 }}>You spend 1.7× more than similar professionals</div>
              <div style={{ fontFamily: "Outfit", fontSize: 10, color: "rgba(255,45,85,0.55)" }}>87% of your peer group cancelled LinkedIn Premium</div>
            </div>
          </div>

          {/* Clarity gauge */}
          <div style={{ background: "#0C1220", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: 18 }}>
            <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#5A6A90", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#FFB800", display: "inline-block" }} />
              Clarity Score Ranking
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <svg viewBox="0 0 220 110" width="220" height="110">
                <defs>
                  <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00FF99" />
                    <stop offset="50%" stopColor="#FFB800" />
                    <stop offset="100%" stopColor="#FF2D55" />
                  </linearGradient>
                </defs>
                <path d="M30 90 A80 80 0 0 1 190 90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" strokeLinecap="round" />
                <path d="M30 90 A80 80 0 0 1 190 90" fill="none" stroke="url(#gaugeGrad)" strokeWidth="16" strokeLinecap="round"
                  strokeDasharray="251" strokeDashoffset={251 * (1 - wasteScore / 100)} />
                <text x="110" y="80" textAnchor="middle" style={{ fontFamily: "Unbounded", fontSize: 28, fontWeight: 900, fill: "#EEF3FF" }}>{wasteScore}</text>
                <text x="110" y="96" textAnchor="middle" style={{ fontFamily: "JetBrains Mono", fontSize: 9, fill: "#5A6A90" }}>WASTE SCORE</text>
                <text x="25" y="108" style={{ fontFamily: "JetBrains Mono", fontSize: 8, fill: "#00FF99" }}>LOW</text>
                <text x="185" y="108" textAnchor="end" style={{ fontFamily: "JetBrains Mono", fontSize: 8, fill: "#FF2D55" }}>HIGH</text>
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { label: "Top 10% (Clarity Master)", score: "Score 18", bg: "rgba(0,255,153,0.06)", border: "rgba(0,255,153,0.12)", color: "#00FF99" },
                { label: "Your peer average", score: "Score 42", bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)", color: "#FFB800" },
                { label: "You currently", score: `Score ${wasteScore}`, bg: "rgba(255,45,85,0.07)", border: "rgba(255,45,85,0.15)", color: "#FF2D55" },
                { label: "After 3 cancellations", score: "Score 28 ↑", bg: "rgba(0,229,255,0.06)", border: "rgba(0,229,255,0.14)", color: "#00E5FF" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", borderRadius: 7, background: row.bg, border: `1px solid ${row.border}` }}>
                  <span style={{ fontFamily: "Outfit", fontSize: 11, color: "#5A6A90" }}>{row.label}</span>
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, fontWeight: 700, color: row.color }}>{row.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── AI INSIGHTS TERMINAL ── */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "#5A6A90", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B066FF", display: "inline-block" }} />
            AI Behavioral Insights · Real-Time Analysis
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)", display: "block" }} />
          </div>
          <div className="ai-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[
              {
                sub: "LinkedIn Premium", genome: "STATUS SYMBOL", color: "#B066FF",
                lines: [
                  { k: "Usage detected", v: "14 min/month", c: "#EEF3FF" },
                  { k: "InMails sent", v: "0 in 6 months", c: "#EEF3FF" },
                  { k: "Login pattern", v: "2× to scroll", c: "#EEF3FF" },
                  { k: "", v: "", c: "" },
                  { k: "GENOME", v: "STATUS SYMBOL", c: "#B066FF" },
                  { k: "", v: "", c: "" },
                  { k: "Cost per hour", v: "₹10,710", c: "#FF2D55" },
                  { k: "Annual waste", v: "₹29,988", c: "#FF2D55" },
                  { k: "Confidence", v: "97%", c: "#00FF99" },
                ]
              },
              {
                sub: "Hotstar Premium", genome: "GHOST", color: "#5A6A90",
                lines: [
                  { k: "Sessions this month", v: "0", c: "#EEF3FF" },
                  { k: "Hours used", v: "0.0", c: "#EEF3FF" },
                  { k: "Last opened", v: "47 days ago", c: "#EEF3FF" },
                  { k: "", v: "", c: "" },
                  { k: "GENOME", v: "GHOST", c: "#5A6A90" },
                  { k: "", v: "", c: "" },
                  { k: "Next charge", v: "2 days", c: "#FF2D55" },
                  { k: "Action required", v: "URGENT", c: "#FF2D55" },
                  { k: "Confidence", v: "99%", c: "#00FF99" },
                ]
              },
              {
                sub: "Spotify Premium", genome: "VITAL ORGAN", color: "#00FF99",
                lines: [
                  { k: "Sessions this month", v: "127", c: "#EEF3FF" },
                  { k: "Hours used", v: "127hrs", c: "#EEF3FF" },
                  { k: "Usage trend", v: "+12% ↑", c: "#00FF99" },
                  { k: "", v: "", c: "" },
                  { k: "GENOME", v: "VITAL ORGAN", c: "#00FF99" },
                  { k: "", v: "", c: "" },
                  { k: "Cost per hour", v: "₹0.94", c: "#00FF99" },
                  { k: "Best value score", v: "9.7/10", c: "#00FF99" },
                  { k: "Confidence", v: "99%", c: "#00FF99" },
                ]
              },
            ].map((insight, i) => (
              <div key={i} style={{ background: "#070A12", border: `1px solid rgba(0,229,255,0.12)`, borderLeft: `3px solid ${insight.color}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "10px 14px", background: "rgba(0,229,255,0.04)", borderBottom: "1px solid rgba(0,229,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "#00E5FF", letterSpacing: 2, textTransform: "uppercase" }}>AI INSIGHT</span>
                  <span style={{ background: insight.color + "18", color: insight.color, border: `1px solid ${insight.color}35`, padding: "2px 6px", borderRadius: 4, fontFamily: "JetBrains Mono", fontSize: 8, fontWeight: 700, textTransform: "uppercase" }}>{insight.genome}</span>
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontFamily: "Outfit", fontSize: 12, fontWeight: 500, marginBottom: 10 }}>{insight.sub}</div>
                  {insight.lines.map((line, j) => (
                    <div key={j} style={{ fontFamily: "JetBrains Mono", fontSize: 10, lineHeight: 1.8, color: line.k ? "#5A6A90" : "transparent" }}>
                      {line.k ? (
                        <span>
                          {line.k.padEnd(20, " ").replace(/ /g, "\u00A0")}
                          <span style={{ color: line.c }}>{line.v}</span>
                        </span>
                      ) : <span>&nbsp;</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SAVINGS TRACKER ── */}
        <div style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.06), rgba(0,255,153,0.03))", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 14, padding: "22px 26px", marginBottom: 12 }}>
          <div className="savings-inner" style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "#00E5FF", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, opacity: 0.7 }}>TOTAL RECOVERABLE THIS YEAR</div>
              <div style={{ fontFamily: "Unbounded", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, background: "linear-gradient(90deg, #00E5FF, #00FF99)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: -2, lineHeight: 1, marginBottom: 8 }}>
                {formatINR(annualWaste)}
              </div>
              <div style={{ fontFamily: "Outfit", fontSize: 12, color: "#5A6A90" }}>
                Cancel 3 subscriptions in <span style={{ color: "#EEF3FF", fontWeight: 500 }}>4 minutes</span> · {formatINR(totalWaste)}/month freed
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "#00E5FF", opacity: 0.7, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>THIS EQUALS</div>
              {[
                { color: "#00E5FF", text: "A return trip to Bali (₹55,000)" },
                { color: "#00FF99", text: "8 months SIP → ₹3.8L in 5 years" },
                { color: "#FFB800", text: "MacBook Air M3 EMI — fully covered" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: "Outfit", color: "#5A6A90", marginBottom: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="cta-strip" style={{ display: "flex", alignItems: "center", gap: 20, background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.14)", borderRadius: 14, padding: "18px 24px", marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Outfit", fontSize: 15, fontWeight: 600, color: "#EEF3FF", marginBottom: 4 }}>
              Act in the next 2 days — {formatINR(totalWaste)} saved this month alone
            </div>
            <div style={{ fontFamily: "Outfit", fontSize: 12, color: "#5A6A90" }}>
              Cancel Hotstar + Adobe + LinkedIn in 4 minutes. That's {formatINR(annualWaste)} recovered this year.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button className="btn-primary" onClick={() => showToast("Opening investor pitch deck...")} style={{ background: "#00E5FF", color: "#000", border: "none", padding: "10px 24px", borderRadius: 9, fontFamily: "Outfit", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 20px rgba(0,229,255,0.3)", whiteSpace: "nowrap", transition: "all 0.2s" }}>
              Get Started →
            </button>
            <button onClick={() => showToast("Uploading bank statement...")} style={{ background: "transparent", color: "#00E5FF", border: "1px solid rgba(0,229,255,0.25)", padding: "10px 24px", borderRadius: 9, fontFamily: "Outfit", fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
              Upload Bank PDF ↗
            </button>
          </div>
        </div>

        {/* ── STATUS BAR ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.04)", flexWrap: "wrap" }}>
          {[
            { dot: "#00FF99", text: "SYSTEM ONLINE" },
            { dot: "#00E5FF", text: "DATA SOURCES: 3/5 CONNECTED" },
            { dot: "#FFB800", text: "ML MODEL v2.1.4 · ACC 94.2%" },
            { dot: "#5A6A90", text: "LAST SYNC: 2 MIN AGO" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono", fontSize: 9, color: "#1E2A40", letterSpacing: 0.5, textTransform: "uppercase" }}>
              {i > 0 && <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.04)", marginRight: 10 }} />}
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.dot }} />
              {item.text}
            </div>
          ))}
          <div style={{ marginLeft: "auto", fontFamily: "JetBrains Mono", fontSize: 9, color: "#1E2A40", letterSpacing: 0.5 }}>
            VALUEOS · CENTRAL AI AGENT · BUILD 0.1.0
          </div>
        </div>
      </div>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#00E5FF", color: "#000", padding: "10px 22px", borderRadius: 20, fontFamily: "JetBrains Mono", fontSize: 12, fontWeight: 700, zIndex: 999, boxShadow: "0 0 30px rgba(0,229,255,0.4)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          {toast}
        </div>
      )}
    </>
  )
}
