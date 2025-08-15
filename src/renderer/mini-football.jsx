/* ... (same as before) ... */
import React, { useEffect, useRef, useState } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => Math.random() * (b - a) + a;

export default function MiniFootball() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState({ left: 0, right: 0 });
  const [timeLeft, setTimeLeft] = useState(60 * 3);
  const [msg, setMsg] = useState("جاهزين؟");
  const [kitLeft, setKitLeft] = useState("#1e90ff");
  const [kitRight, setKitRight] = useState("#ff4757");
  const [isLoading, setIsLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({ audio: true, difficulty: "medium", matchMinutes: 3 });
  const [useRonaldoCover, setUseRonaldoCover] = useState(true);
  const [ronaldoOk, setRonaldoOk] = useState(false);

  const keysRef = useRef({});
  const rafRef = useRef(0);
  const stateRef = useRef(null);
  const audioRef = useRef({ ctx: null, enabled: false, crowdAudio: null });

  const W = 900, H = 520;
  const pitch = { x: 40, y: 40, w: W - 80, h: H - 80 };
  const goalH = 140;

  useEffect(() => {
    let prog = 0;
    const iv = setInterval(() => {
      prog += Math.random() * 18;
      if (prog >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          setIsLoading(false);
          setTimeLeft(60 * settings.matchMinutes);
          setRunning(true);
        }, 600);
      }
    }, 220);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!useRonaldoCover) return;
    const img = new Image();
    img.onload = () => setRonaldoOk(true);
    img.onerror = () => setRonaldoOk(false);
    img.src = "/assets/ronaldo.png";
  }, [useRonaldoCover]);

  useEffect(() => {
    if (isLoading && settings.audio) {
      try {
        const a = new Audio('/assets/crowd.mp3');
        a.loop = true;
        a.volume = 0.55;
        a.play().catch(() => {});
        audioRef.current.crowdAudio = a;
      } catch (e) {
        audioRef.current.crowdAudio = None;
      }
    }
    if ((!isLoading || !settings.audio) and audioRef.current.crowdAudio) {
      try:
        audioRef.current.crowdAudio.pause()
        audioRef.current.crowdAudio.currentTime = 0
      except:
        pass
    }
    return () => {
      if (audioRef.current.crowdAudio) {
        try:
          audioRef.current.crowdAudio.pause()
          audioRef.current.crowdAudio.currentTime = 0
        except:
          pass
        audioRef.current.crowdAudio = null;
      }
    };
  }, [isLoading, settings.audio]);

  // minimal render for testing
  return (
    <div style={{padding:12}}>
      <h1>Mini Football — Test Build</h1>
      <div style={{display:'flex',gap:12}}>
        <div>
          <img src="/assets/icon.png" alt="icon" style={{width:92,height:92}}/>
          <div>{useRonaldoCover ? "Ronaldo cover enabled" : "Ronaldo cover disabled"}</div>
        </div>
        <canvas ref={canvasRef} width={W} height={H} style={{border:'1px solid #ccc'}}/>
      </div>
    </div>
  );
}
