/* Tortuguitas — reusable UI components */
const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Sparkline (mini area + line) ---------- */
function Sparkline({ values, color = "#7AA0FF", fill = true, height = 36, width = 88, animate = true }) {
  const [t, setT] = useState(animate ? 0 : 1);
  useEffect(() => {
    if (!animate) return;
    let raf, start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / 900);
      setT(easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const path = useMemo(() => {
    if (!values?.length) return { line: "", area: "" };
    const min = Math.min(...values), max = Math.max(...values);
    const range = Math.max(1, max - min);
    const pad = 2;
    const W = width, H = height - pad * 2;
    const step = W / (values.length - 1);
    const pts = values.map((v, i) => [i * step, pad + H - ((v - min) / range) * H]);
    // smooth via Catmull-Rom-ish
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      const cx = (x1 + x2) / 2;
      d += ` C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
    }
    const area = `${d} L ${W} ${height} L 0 ${height} Z`;
    return { line: d, area };
  }, [values, width, height]);

  const gid = `sg-${Math.abs(values.reduce((a,b)=>a+b,0))}-${color.slice(1)}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none"
         style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
        <clipPath id={`${gid}-clip`}>
          <rect x="0" y="0" width={width * t} height={height}/>
        </clipPath>
      </defs>
      {fill && <path d={path.area} fill={`url(#${gid})`} clipPath={`url(#${gid}-clip)`}/>}
      <path d={path.line} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"
            clipPath={`url(#${gid}-clip)`}/>
      <circle r="2.5" fill={color}
              cx={width * t}
              cy={pointY(values, t, width, height)}
              style={{ filter: `drop-shadow(0 0 4px ${color})` }}/>
    </svg>
  );
}
function pointY(values, t, width, height) {
  if (!values?.length) return height / 2;
  const min = Math.min(...values), max = Math.max(...values);
  const range = Math.max(1, max - min);
  const pad = 2; const H = height - pad * 2;
  const idx = Math.min(values.length - 1, Math.round((values.length - 1) * t));
  return pad + H - ((values[idx] - min) / range) * H;
}
function easeOut(p) { return 1 - Math.pow(1 - p, 3); }

/* ---------- Animated number ---------- */
function AnimNum({ value, duration = 900, format = (v) => v }) {
  const [v, setV] = useState(0);
  const isNum = typeof value === "number";
  const target = isNum ? value : parseInt(String(value).replace(/[^\d-]/g, ""), 10) || 0;
  const suffix = isNum ? "" : (String(value).match(/[^\d-]+$/)?.[0] || "");
  useEffect(() => {
    let raf, start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setV(Math.round(target * easeOut(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return <>{format(v)}{suffix}</>;
}

/* ---------- KPI Card ---------- */
const KPI_THEME = {
  blue:   { c: "#7AA0FF", bg: "rgba(79,124,255,0.12)",  br: "rgba(79,124,255,0.22)",  glow: "rgba(79,124,255,0.20)" },
  cyan:   { c: "#5CE0FF", bg: "rgba(0,209,255,0.10)",   br: "rgba(0,209,255,0.22)",   glow: "rgba(0,209,255,0.18)" },
  violet: { c: "#C4B5FD", bg: "rgba(167,139,250,0.12)", br: "rgba(167,139,250,0.22)", glow: "rgba(167,139,250,0.18)" },
  amber:  { c: "#FCD34D", bg: "rgba(245,158,11,0.10)",  br: "rgba(245,158,11,0.22)",  glow: "rgba(245,158,11,0.18)" },
  green:  { c: "#86EFAC", bg: "rgba(34,197,94,0.10)",   br: "rgba(34,197,94,0.22)",   glow: "rgba(34,197,94,0.18)" },
};
const KPI_ICONS = { users: Icons.Users, check: Icons.Check, star: Icons.Star, clock: Icons.Clock };

function KPI({ kpi, idx }) {
  const t = KPI_THEME[kpi.accent] || KPI_THEME.blue;
  const I = KPI_ICONS[kpi.icon] || Icons.Chart;
  return (
    <div className={`kpi anim anim-${idx + 1}`}
         style={{ "--kpi-c": t.c, "--kpi-bg": t.bg, "--kpi-border": t.br, "--kpi-glow": t.glow }}>
      <div className="kpi-head">
        <div className="kpi-icon"><I/></div>
        <div className="kpi-label">{kpi.label}</div>
        <div className="kpi-menu"><Icons.Dots/></div>
      </div>
      <div className="kpi-value">
        <AnimNum value={kpi.value}/>
      </div>
      <div className="kpi-foot">
        <div className={`kpi-delta ${kpi.deltaDir}`}>
          {kpi.deltaDir === "up" ? <Icons.ArrowUp/> : <Icons.ArrowDown/>}
          {kpi.delta}
        </div>
        <div className="kpi-compare">{kpi.compare}</div>
      </div>
      <div className="kpi-spark">
        <Sparkline values={kpi.spark} color={t.c}/>
      </div>
    </div>
  );
}

/* ---------- Team card (cinematic portrait) ---------- */
function TeamCard({ m, idx }) {
  const color = `oklch(0.72 0.18 ${m.hue})`;
  const glow = `oklch(0.72 0.22 ${m.hue} / 0.35)`;
  const initials = m.name.split(" ").map(w => w[0]).slice(0, 2).join("");
  const [hover, setHover] = useState(false);
  return (
    <div className={`tcard anim anim-${Math.min(idx + 1, 5)}`}
         style={{ "--tcard-color": color, "--tcard-glow": glow }}
         onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="portrait-wrap">
        <div className="portrait-halo"/>
        <div className="portrait">
          <span className="ph-grid"/>
          <span className="ph-shine"/>
          <span style={{ position: "relative", zIndex: 2 }}>{initials}</span>
        </div>
        <div className={`portrait-status ${m.online ? "" : "off"}`}/>
      </div>
      <div className="tcard-name">{m.name}</div>
      <div className="tcard-role">{m.role}</div>
      <div className="tcard-tag">{m.tag}</div>
      <div className="tcard-stats">
        {m.stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="v"><AnimNum value={s.value}/></div>
            <div className="l">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="tcard-bar">
        <div className="fill" style={{ width: hover ? `${m.progress}%` : `${m.progress * 0.96}%` }}/>
      </div>
    </div>
  );
}

/* ---------- Activity chart (Stripe-style smooth area) ---------- */
function ActivityChart({ series, series2, days, height = 240 }) {
  const wrapRef = useRef(null);
  const [w, setW] = useState(560);
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);
  const padL = 32, padR = 12, padT = 16, padB = 28;
  const H = height - padT - padB;
  const W = Math.max(100, w - padL - padR);
  const all = [...series, ...series2];
  const min = 0;
  const max = Math.max(...all) * 1.15;
  const step = W / (series.length - 1);
  const toY = v => padT + H - ((v - min) / (max - min)) * H;
  const toX = i => padL + i * step;
  const smoothPath = (vals) => {
    const pts = vals.map((v, i) => [toX(i), toY(v)]);
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      const cx = (x1 + x2) / 2;
      d += ` C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
    }
    return d;
  };
  const linePath = smoothPath(series);
  const linePath2 = smoothPath(series2);
  const areaPath = `${linePath} L ${toX(series.length - 1)} ${padT + H} L ${padL} ${padT + H} Z`;
  // grid lines
  const ticks = 4;
  const yLines = Array.from({ length: ticks + 1 }, (_, i) => i * (max / ticks));
  const lastIdx = series.length - 1;
  return (
    <div className="chart-wrap" ref={wrapRef}>
      <svg viewBox={`0 0 ${w} ${height}`} width={w} height={height}>
        <defs>
          <linearGradient id="actFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0.40"/>
            <stop offset="100%" stopColor="#4F7CFF" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="actLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#4F7CFF"/>
            <stop offset="100%" stopColor="#00D1FF"/>
          </linearGradient>
        </defs>

        {/* Y grid */}
        {yLines.map((v, i) => (
          <g key={i}>
            <line x1={padL} x2={w - padR} y1={toY(v)} y2={toY(v)}
                  stroke="rgba(255,255,255,0.05)" strokeDasharray="3 4"/>
            <text x={padL - 8} y={toY(v) + 3} textAnchor="end"
                  fill="#64748B" fontSize="10" fontFamily="var(--font-mono)">{Math.round(v)}</text>
          </g>
        ))}

        {/* X labels */}
        {days.map((d, i) => (
          <text key={i} x={toX(i)} y={height - 8} textAnchor="middle"
                fill={i === lastIdx ? "#F8FAFC" : "#64748B"}
                fontSize="11" fontWeight={i === lastIdx ? 600 : 500}>{d}</text>
        ))}

        {/* Secondary series (cierres) — thin */}
        <path d={linePath2} fill="none" stroke="rgba(0,209,255,0.55)" strokeWidth="1.5"
              strokeDasharray="3 4"/>

        {/* Area + line */}
        <path d={areaPath} fill="url(#actFill)"/>
        <path d={linePath} fill="none" stroke="url(#actLine)" strokeWidth="2.5"
              strokeLinecap="round" style={{ filter: "drop-shadow(0 4px 14px rgba(79,124,255,0.4))" }}/>

        {/* Last value marker */}
        <circle cx={toX(lastIdx)} cy={toY(series[lastIdx])} r="5"
                fill="#0F1729" stroke="#7AA0FF" strokeWidth="2"/>
        <rect x={toX(lastIdx) - 22} y={toY(series[lastIdx]) - 32} width="44" height="22" rx="6"
              fill="#131D33" stroke="rgba(255,255,255,0.12)"/>
        <text x={toX(lastIdx)} y={toY(series[lastIdx]) - 17} textAnchor="middle"
              fill="#F8FAFC" fontSize="12" fontWeight="600">{series[lastIdx]}</text>
      </svg>
    </div>
  );
}

Object.assign(window, { Sparkline, AnimNum, KPI, TeamCard, ActivityChart });
