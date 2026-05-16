import React, { useState, useEffect } from 'react';

const locations = ["New York", "London", "Tokyo", "Bangalore", "Paris", "Singapore", "Berlin", "Mumbai"];
const locationVotes = { speed: "Speed", features: "Features", ui: "UI Design" };

export default function LiveSimulator() {
  const [votes, setVotes] = useState({ speed: 184, features: 142, ui: 98 });
  const [logs, setLogs] = useState([
    'User from Mumbai voted "Features"',
    'User from Berlin voted "Speed"'
  ]);

  const labels = {
    speed: "Real-time engine sync speed",
    features: "Feature set & capabilities",
    ui: "Minimal interface aesthetics"
  };

  const totalVotes = votes.speed + votes.features + votes.ui;

  const pushLog = (msg) => {
    setLogs((prevLogs) => [msg, prevLogs[0]]);
  };

  const handleVote = (key) => {
    setVotes((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    pushLog(`You voted "${locationVotes[key]}"`);
  };

  // Simulates periodic background votes coming in over mock WebSockets
  useEffect(() => {
    const interval = setInterval(() => {
      const keys = Object.keys(votes);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      
      setVotes((prev) => ({ ...prev, [randomKey]: prev[randomKey] + 1 }));
      
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      pushLog(`User from ${randomLoc} voted "${locationVotes[randomKey]}"`);
    }, 4000);

    return () => clearInterval(interval);
  }, [votes]);

  return (
    <div className="py-16 px-6 border-b border-[#E2E8F0]">
      <div className="max-w-[900px] mx-auto">
        <div className="border-[1.5px] border-[#0F172A] rounded-[20px] overflow-hidden shadow-[6px_6px_0_#0F172A]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Interactive Section */}
            <div className="p-7 border-r border-[#E2E8F0]">
              <span className="inline-flex items-center gap-[6px] px-3 py-1 bg-[#EEF6FF] border border-[rgba(9,127,232,0.2)] rounded-full text-[11px] font-bold text-[#097FE8] mb-3">
                Interactive sandbox
              </span>
              <div className="text-eaise text-xl font-extrabold text-[#0F172A] tracking-tight mb-[6px]">
                Try the live WebSocket feed
              </div>
              <p className="text-xs text-[#64748B] leading-[1.6] mb-5">
                Click any option to cast a vote. Watch percentages recalculate instantly with zero layout shift.
              </p>
              
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] p-[18px]">
                <div className="flex justify-between items-center pb-3 border-b border-[#E2E8F0] mb-[14px]">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#334155]">Live poll</span>
                  <span className="flex items-center gap-1 bg-[#ECFDF5] border border-[rgba(16,185,129,0.2)] rounded-full px-[10px] py-[3px] text-[11px] font-semibold text-[#059669]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_5px_rgba(16,185,129,0.7)]"></span>
                    12 connected
                  </span>
                </div>
                <p className="text-[13px] font-bold text-[#0F172A] mb-[14px] leading-[1.4]">
                  What's the most critical metric for your stack?
                </p>
                
                {/* Voting Action Elements */}
                <div className="flex flex-col gap-2">
                  {Object.keys(votes).map((key) => {
                    const pct = ((votes[key] / totalVotes) * 100).toFixed(1);
                    return (
                      <button 
                        key={key} 
                        onClick={() => handleVote(key)} 
                        className="w-full text-left bg-white border border-[#E2E8F0] rounded-xl p-[11px_14px] relative overflow-hidden transition-colors duration-150 hover:border-[#097FE8]"
                      >
                        <div className="absolute top-0 left-0 bottom-0 bg-[rgba(9,127,232,0.08)] transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }}></div>
                        <div className="relative z-10 flex justify-between items-center">
                          <span className="text-xs font-semibold text-[#334155]">{labels[key]}</span>
                          <span className="text-xs font-bold text-[#097FE8] tabular-nums">{pct}%</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Terminal Console View */}
            <div className="bg-[#0F172A] p-6 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex justify-between pb-[10px] border-b border-[rgba(255,255,255,0.07)] mb-[14px] text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.3)]">
                  <span>Telemetry log</span>
                  <span className="text-[#097FE8]">Active</span>
                </div>
                <div className="text-[11px] font-mono mb-[7px] text-[rgba(255,255,255,0.3)]">// incoming state stream</div>
                <div className="text-[11px] font-mono mb-[7px] text-[#4ADE80]">✔ ws_handshake initialized</div>
                <div className="text-[11px] font-mono mb-[7px] text-[#A78BFA]">⚡ socket.on("vote") bound</div>
                
                <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.07)]">
                  <div className="text-[11px] font-mono mb-[7px]">
                    <span className="text-[#097FE8]">→</span> <span className="text-[rgba(255,255,255,0.8)]">{logs[0]}</span>
                  </div>
                  <div className="text-[11px] font-mono mb-[7px]">
                    <span className="text-[#097FE8]">→</span> <span className="text-[rgba(255,255,255,0.8)]">{logs[1]}</span>
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg p-[10px_12px] text-[11px] font-mono text-[rgba(255,255,255,0.45)] leading-[1.5]">
                <strong className="text-[rgba(255,255,255,0.8)] font-bold">How it works:</strong> Each vote triggers a Socket.IO broadcast all connected clients update simultaneously without a page reload.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}