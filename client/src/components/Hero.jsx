import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Counter = ({ target, suffix = "", duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const tick = () => {
            start += step;
            if (start >= target) { setCount(target); return; }
            setCount(Math.floor(start));
            requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const useTilt = () => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)";
  };
  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
};

/* Live vote ticker — cycles through fake live updates */
const liveFeed = [
  { user: "Arjun S.", poll: "Best sprint name?", vote: "Phoenix" },
  { user: "Mia K.",   poll: "Launch this Friday?", vote: "Yes" },
  { user: "Dev R.",   poll: "Dark mode default?", vote: "Always" },
  { user: "Sara L.",  poll: "Retro format?", vote: "Keep async" },
  { user: "Tom B.",   poll: "Ship v2 features?", vote: "Next week" },
];

const LiveTicker = () => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % liveFeed.length);
        setVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const item = liveFeed[idx];

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      background: "rgba(9,127,232,0.06)",
      border: "1px solid rgba(9,127,232,0.15)",
      borderRadius: "10px", padding: "9px 14px",
      maxWidth: "460px", width: "100%",
      transition: "opacity 0.3s ease",
      opacity: visible ? 1 : 0,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%",
        background: "#10B981", flexShrink: 0,
        boxShadow: "0 0 8px #10B981aa",
      }} />
      <span style={{ fontSize: 12, color: "#64748B", whiteSpace: "nowrap" }}>
        <span style={{ fontWeight: 600, color: "#334155" }}>{item.user}</span>
        {" voted "}
        <span style={{
          fontWeight: 600, color: "#097FE8",
          background: "rgba(9,127,232,0.08)",
          padding: "1px 7px", borderRadius: 5,
        }}>"{item.vote}"</span>
        {" on "}
        <span style={{ color: "#475569" }}>{item.poll}</span>
      </span>
      <span style={{
        marginLeft: "auto", fontSize: 10, color: "#94A3B8",
        fontVariantNumeric: "tabular-nums", flexShrink: 0,
      }}>just now</span>
    </div>
  );
};

/* ─── Main Hero ─── */
const Hero = ({ scrollToSection }) => {
  const tilt = useTilt();

  return (
    <section style={{
      position: "relative",
      paddingTop: 72, paddingBottom: 80,
      paddingLeft: 24, paddingRight: 24,
      maxWidth: 1200, margin: "0 auto",
      overflow: "hidden",
    }}>

      {/* ── Dot grid background ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
        backgroundSize: "28px 28px", opacity: 0.5,
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* ── Ambient glow blobs ── */}
      <div style={{
        position: "absolute", top: -60, left: "30%",
        width: 500, height: 400,
        background: "radial-gradient(circle, rgba(9,127,232,0.09) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 40, right: "10%",
        width: 320, height: 280,
        background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* ── Content ── */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center", gap: 22,
      }}>

        {/* Status pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 14px 5px 10px",
          background: "#F0FDF4",
          border: "1px solid rgba(16,185,129,0.25)",
          borderRadius: 999,
          fontSize: 12, fontWeight: 600, color: "#059669",
          letterSpacing: "0.01em",
        }}>
          <span style={{ position: "relative", width: 8, height: 8, display: "inline-flex" }}>
            <span style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#10B981", opacity: 0.75,
              animation: "hpPing 1.5s ease-out infinite",
            }} />
            <span style={{
              position: "relative", width: 8, height: 8,
              borderRadius: "50%", background: "#10B981", display: "block",
            }} />
          </span>
          Live · All systems operational
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(38px, 6vw, 72px)",
          fontWeight: 800, lineHeight: 1.04,
          letterSpacing: "-0.03em",
          color: "#0F172A",
          maxWidth: 780, margin: 0,
          fontFamily: "'DM Sans', 'Sora', sans-serif",
        }}>
          Stop guessing.<br />
          <span style={{
            background: "linear-gradient(135deg, #097FE8 0%, #0EA5E9 50%, #06B6D4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Watch your team decide
          </span>
          <br />
          <span style={{ fontWeight: 400, color: "#94A3B8", fontSize: "0.78em" }}>
            in real time.
          </span>
        </h1>

        {/* Sub */}
        <p style={{
          fontSize: 17, color: "#64748B", maxWidth: 520,
          lineHeight: 1.7, fontWeight: 400, margin: 0,
        }}>
          PollSync streams votes the moment they happen so every standup,
          launch decision, and team vote lands with full confidence.
        </p>

        {/* CTA row */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
          <Link
            to="/create"
            style={{
              display: "inline-block",
              background: "#097FE8",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 12,
              fontWeight: 700, fontSize: 14,
              textDecoration: "none",
              letterSpacing: "0.01em",
              boxShadow: "0 8px 24px rgba(9,127,232,0.28), 0 1px 2px rgba(9,127,232,0.2)",
              transition: "all 0.18s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#0866BA";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(9,127,232,0.38), 0 1px 2px rgba(9,127,232,0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#097FE8";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(9,127,232,0.28), 0 1px 2px rgba(9,127,232,0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Launch free poll →
          </Link>
          <button
            onClick={() => scrollToSection("demo")}
            style={{
              background: "#fff",
              color: "#334155",
              border: "1.5px solid #E2E8F0",
              padding: "13px 28px",
              borderRadius: 12,
              fontWeight: 600, fontSize: 14,
              cursor: "pointer",
              transition: "all 0.18s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#CBD5E1";
              e.currentTarget.style.background = "#F8FAFC";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            See it in action
          </button>
        </div>

        {/* Live vote feed — THE MEMORABLE MOMENT */}
        <LiveTicker />

        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          width: "100%", maxWidth: 480,
          borderTop: "1px solid #E2E8F0",
          paddingTop: 24, marginTop: 4, gap: 0,
        }}>
          {[
            { value: 2400, suffix: "+", label: "Polls created" },
            { value: 18700, suffix: "+", label: "Votes cast" },
            { value: null, label: "Real-time sync", custom: (
              <span style={{ fontSize: 26, fontWeight: 800, color: "#10B981", letterSpacing: "-0.02em", lineHeight: 1 }}>
                Live
              </span>
            )},
          ].map((s, i) => (
            <div key={i} style={{
              padding: "0 16px",
              borderRight: i < 2 ? "1px solid #E2E8F0" : "none",
              textAlign: "center",
            }}>
              {s.custom ?? (
                <div style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
              )}
              <div style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 5 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Dashboard chassis ─── */}
        <div
          {...tilt}
          style={{
            marginTop: 32,
            width: "100%", maxWidth: 900,
            background: "#fff",
            border: "1.5px solid #E2E8F0",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(15,23,42,0.08), 0 4px 16px rgba(15,23,42,0.04)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            willChange: "transform",
          }}
        >
          {/* Browser chrome */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 16px",
            background: "#F8FAFC",
            borderBottom: "1px solid #E2E8F0",
          }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#EF4444","#F59E0B","#10B981"].map((c,i) => (
                <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.5 }} />
              ))}
            </div>
            <div style={{
              flex: 1, textAlign: "center",
              background: "#fff", border: "1px solid #E2E8F0",
              borderRadius: 7, padding: "3px 12px",
              fontSize: 11, fontFamily: "monospace", color: "#94A3B8",
              fontWeight: 600, maxWidth: 320, margin: "0 auto",
            }}>
              pollsync.dev/dashboard
            </div>
            <div style={{ width: 48 }} />
          </div>

          {/* Dashboard UI */}
          <div style={{ background: "#F8FAFC", padding: "20px 20px 24px" }}>

            {/* Top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>My Workspace</div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>Monday, updates live</div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#ECFDF5", border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: 999, padding: "4px 12px",
                fontSize: 12, fontWeight: 600, color: "#059669",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "block", boxShadow: "0 0 6px #10B981" }} />
                Streaming
              </div>
            </div>

            {/* Metric cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Active polls", val: "12", sub: "+3 today", color: "#097FE8" },
                { label: "Responses", val: "248", sub: "last 24h", color: "#0F172A" },
                { label: "Avg. response", val: "1.3s", sub: "live latency", color: "#10B981" },
              ].map((m, i) => (
                <div key={i} style={{
                  background: "#fff", border: "1px solid #E2E8F0",
                  borderRadius: 12, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{m.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: m.color, letterSpacing: "-0.02em" }}>{m.val}</div>
                  <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600, marginTop: 3 }}>{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Poll rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { q: "Best sprint name for Q3?", lead: "Phoenix", pct: 72, votes: 84 },
                { q: "Ship dark mode this sprint?", lead: "Yes, do it", pct: 61, votes: 57 },
                { q: "Preferred standup time?", lead: "9:30 AM", pct: 55, votes: 103 },
              ].map((p, i) => (
                <div key={i} style={{
                  background: "#fff", border: "1px solid #E2E8F0",
                  borderRadius: 12, padding: "13px 16px",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 7, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.q}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 5, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: `${p.pct}%`,
                          background: "linear-gradient(90deg, #097FE8, #0EA5E9)",
                          borderRadius: 99,
                          transition: "width 1s ease",
                        }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#097FE8", minWidth: 32 }}>{p.pct}%</span>
                      <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>"{p.lead}"</span>
                    </div>
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 5,
                    fontSize: 11, color: "#64748B", fontWeight: 600,
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", display: "block" }} />
                    {p.votes} votes
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        {/* End chassis */}

        {/* Trust strip */}
        <p style={{ fontSize: 12, color: "#CBD5E1", fontWeight: 500, marginTop: 8 }}>
          No credit card · Free forever on the starter plan · Deployed on edge infra
        </p>

      </div>

      {/* keyframes injected once */}
      <style>{`
        @keyframes hpPing {
          0%   { transform: scale(1); opacity: 0.75; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;