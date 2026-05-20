/* Tortuguitas — main app */
const { useState, useEffect, useRef } = React;

/* ===== Top navbar ===== */
function Navbar({ active, onNav, tweaks }) {
  const [openTools, setOpenTools] = useState(false);
  const dropRef = useRef(null);
  useEffect(() => {
    const h = (e) => { if (!dropRef.current?.contains(e.target)) setOpenTools(false); };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  const links = [
    { id: "inicio", label: "Inicio", icon: <Icons.Home/>, href: "#inicio" },
    { id: "tools",  label: "Herramientas", icon: <Icons.Tools/>, dropdown: true },
    { id: "informe",label: "Informe Anual", icon: <Icons.Chart/>, href: "pages/cierres-de-mes-2026.html" },
    { id: "zonales",label: "Zonales", icon: <Icons.Map/>, href: "pages/zonales.html" },
  ];

  return (
    <nav className="navbar">
      <a className="nav-brand" href="#inicio">
        <span className="logo-box">
          <svg viewBox="0 0 24 24" fill="white"><path d="M12 4c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7zm-3 5c-.6 0-1 .5-1 1.1s.4 1.1 1 1.1 1-.5 1-1.1S9.6 9 9 9zm6 0c-.6 0-1 .5-1 1.1s.4 1.1 1 1.1 1-.5 1-1.1S15.6 9 15 9z" opacity=".95"/><path d="M5 14c-1 0-1.7-.6-1.8-1.5M19 14c1 0 1.7-.6 1.8-1.5M7 18.5c-.4.7-1.1 1.1-1.9 1M17 18.5c.4.7 1.1 1.1 1.9 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
        </span>
        <div>
          <div className="brand-name">Tortuguitas</div>
          <div className="brand-sub">{tweaks.subtitle}</div>
        </div>
      </a>

      <div className="nav-links" ref={dropRef}>
        {links.map(l => (
          <div key={l.id} style={{ position: l.dropdown ? "relative" : "static" }}>
            {l.dropdown ? (
              <>
                <button className={`nav-link ${openTools ? "active" : ""}`}
                        onClick={(e) => { e.stopPropagation(); setOpenTools(v => !v); }}>
                  {l.icon}<span>{l.label}</span>
                  <Icons.Chevron size={12}/>
                </button>
                <div className={`dropdown ${openTools ? "open" : ""}`} onClick={e => e.stopPropagation()}>
                  {TORTU_DATA.herramientas.map((h, i) => (
                    <a className="dropdown-item" key={i} href={h.href}
                       target={h.href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer">
                      <span className="glyph"><Icons.ArrowR/></span>
                      <span className="text">
                        <div className="t1">{h.label}</div>
                        <div className="t2">{h.desc}</div>
                      </span>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <a className={`nav-link ${active === l.id ? "active" : ""}`}
                 href={l.href} onClick={() => onNav?.(l.id)}>
                {l.icon}<span>{l.label}</span>
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="nav-meta">
        <button className="nav-icon-btn" title="Buscar"><Icons.Search/></button>
        <button className="nav-icon-btn" title="Notificaciones">
          <Icons.Bell/>
          <span className="badge">3</span>
        </button>
        <div className="nav-user">
          <div className="ava" style={{ background: `linear-gradient(140deg, oklch(0.65 0.15 ${TORTU_DATA.user.hue}), oklch(0.55 0.18 ${TORTU_DATA.user.hue + 30}))` }}>
            {TORTU_DATA.user.initials}
          </div>
          <div className="who">
            <div className="name">{TORTU_DATA.user.name}</div>
            <div className="role">{TORTU_DATA.user.role}</div>
          </div>
          <Icons.Chevron size={13}/>
        </div>
      </div>
    </nav>
  );
}

/* ===== Sidebar ===== */
function Sidebar({ active, onNav }) {
  const items = [
    { id: "inicio", icon: <Icons.Home/>, label: "Inicio", count: null },
    { id: "entrev", icon: <Icons.Users/>, label: "Entrevistas", count: 14 },
    { id: "seg", icon: <Icons.Activity/>, label: "Seguimientos", count: 8 },
    { id: "cal", icon: <Icons.Calendar/>, label: "Calendario", count: null },
    { id: "cand", icon: <Icons.Star/>, label: "Candidatos", count: 22 },
    { id: "rep", icon: <Icons.Reports/>, label: "Reportes", count: null },
    { id: "cfg", icon: <Icons.Settings/>, label: "Configuración", count: null },
  ];
  return (
    <aside className="sidebar">
      {items.map(i => (
        <a key={i.id} className={`side-item ${active === i.id ? "active" : ""}`}
           onClick={(e) => { e.preventDefault(); onNav?.(i.id); }} href={`#${i.id}`} title={i.label}>
          {i.icon}
          <span className="lbl">{i.label}</span>
          {i.count != null && <span className="count">{i.count}</span>}
        </a>
      ))}
      <div className="side-footer">
        <div className="pill">
          <span className="dot"/>
          <div>
            <div className="t1">Equipo activo</div>
            <div className="t2">5 / 5 online</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ===== Hero ===== */
function Hero({ tweaks }) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const greet = (() => {
    const h = time.getHours();
    if (h < 12) return "Buen día";
    if (h < 19) return "Buenas tardes";
    return "Buenas noches";
  })();
  const dateStr = new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(time);
  const timeStr = new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }).format(time);

  return (
    <section className="hero">
      <div className="hero-left anim anim-1">
        <span className="hero-eyebrow">
          <span className="pulse"/>
          {TORTU_DATA.brand.eyebrow} · {TORTU_DATA.brand.sub}
        </span>
        <h1 className="hero-title">
          {tweaks.heroStyle === "greeting" ? (
            <>{greet}, <span className="accent">equipo</span><br/><span className="muted">Vamos por otro gran día.</span></>
          ) : (
            <>Sistema operativo<br/><span className="accent">del equipo</span> <span className="muted">Tortuguitas.</span></>
          )}
        </h1>
        <p className="hero-sub">
          Panel interno de entrevistas, seguimiento, métricas y operación diaria del equipo de selección.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#herramientas">
            <Icons.Tools/> Ver Herramientas
          </a>
          <a className="btn btn-ghost" href="pages/cierres-de-mes-2026.html">
            <Icons.Chart/> Ver Informe Anual
          </a>
        </div>
      </div>

      <aside className="hero-card anim anim-2">
        <div className="grid"/>
        <h3>Snapshot · operación</h3>
        <div className="snap-grid">
          <div className="snap-cell">
            <div className="num"><AnimNum value={TORTU_DATA.totals.zonales}/></div>
            <div className="lbl"><strong>Zonales</strong>en el equipo</div>
          </div>
          <div className="snap-cell">
            <div className="num"><AnimNum value={TORTU_DATA.totals.locales}/></div>
            <div className="lbl"><strong>Locales</strong>activos hoy</div>
          </div>
          <div className="snap-cell">
            <div className="num"><AnimNum value={TORTU_DATA.totals.referentes}/></div>
            <div className="lbl"><strong>Referentes</strong>activos</div>
          </div>
        </div>
        <div className="snap-divider"/>
        <div className="snap-meta">
          <span style={{ textTransform: "capitalize" }}>{dateStr}</span>
          <span className="clock"><Icons.Clock size={12} stroke={2}/>&nbsp;{timeStr} hs</span>
        </div>
      </aside>
    </section>
  );
}

/* ===== Right rail ===== */
const QUICK_THEME = {
  blue:   { c: "#7AA0FF", bg: "rgba(79,124,255,0.12)",  br: "rgba(79,124,255,0.22)" },
  cyan:   { c: "#5CE0FF", bg: "rgba(0,209,255,0.10)",   br: "rgba(0,209,255,0.22)" },
  violet: { c: "#C4B5FD", bg: "rgba(167,139,250,0.12)", br: "rgba(167,139,250,0.22)" },
  amber:  { c: "#FCD34D", bg: "rgba(245,158,11,0.10)",  br: "rgba(245,158,11,0.22)" },
};
const QUICK_ICONS = { plus: Icons.Plus, flash: Icons.Flash, doc: Icons.Doc, clock: Icons.Clock };

function RightRail() {
  return (
    <aside className="right-rail">
      <section className="rail-panel anim anim-2">
        <header className="rail-head">
          <h4>Tareas urgentes</h4>
          <span className="rail-count">{TORTU_DATA.tareasUrgentes.length}</span>
        </header>
        {TORTU_DATA.tareasUrgentes.map((t, i) => (
          <div className={`task-row ${t.level}`} key={i}>
            <span className="marker"/>
            <div>
              <div className="title">{t.title}</div>
              <div className="due">{t.due}</div>
            </div>
          </div>
        ))}
        <a className="see-all" href="#tareas">Ver todas las tareas <Icons.ArrowR size={13}/></a>
      </section>

      <section className="rail-panel anim anim-3">
        <header className="rail-head">
          <h4>Actividad reciente</h4>
        </header>
        {TORTU_DATA.actividad.map((a, i) => (
          <div className="act-row" key={i}>
            <div className="ava" style={{ background: `linear-gradient(140deg, oklch(0.65 0.15 ${a.hue}), oklch(0.5 0.16 ${a.hue + 30}))` }}>
              {a.who.split(" ").map(w => w[0]).slice(0, 2).join("")}
            </div>
            <div>
              <div className="who">{a.who}</div>
              <div className="what">{a.what}</div>
            </div>
            <div className="when">{a.when}</div>
          </div>
        ))}
        <a className="see-all" href="#actividad">Ver toda la actividad <Icons.ArrowR size={13}/></a>
      </section>

      <section className="rail-panel anim anim-4">
        <header className="rail-head"><h4>Acceso rápido</h4></header>
        <div className="quick-grid">
          {TORTU_DATA.accesos.map((q) => {
            const t = QUICK_THEME[q.accent]; const I = QUICK_ICONS[q.icon] || Icons.Plus;
            return (
              <a className="quick-tile" key={q.id} href={q.href}
                 style={{ "--q-c": t.c, "--q-bg": t.bg, "--q-border": t.br }}>
                <span className="ico"><I/></span>
                <span className="lbl">{q.label}</span>
              </a>
            );
          })}
        </div>
      </section>
    </aside>
  );
}

/* ===== Activity panel ===== */
function ActivityPanel({ tweaks }) {
  const [range, setRange] = useState("Esta semana");
  return (
    <section className="panel anim anim-3">
      <header className="panel-head">
        <div>
          <h3>Actividad semanal</h3>
          <div className="desc">Entrevistas realizadas · Cierres confirmados</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div className="chart-legend">
            <span><span className="dot" style={{ background: "#4F7CFF" }}/>Entrevistas</span>
            <span><span className="dot" style={{ background: "#00D1FF" }}/>Cierres</span>
          </div>
          <button className="chip"
                  onClick={() => setRange(r => r === "Esta semana" ? "Semana pasada" : "Esta semana")}>
            {range} <Icons.Chevron size={12}/>
          </button>
        </div>
      </header>
      <ActivityChart series={TORTU_DATA.weekly.series} series2={TORTU_DATA.weekly2.series}
                     days={TORTU_DATA.weekly.days}/>
    </section>
  );
}

/* ===== Upcoming interviews ===== */
function UpcomingPanel() {
  return (
    <section className="panel anim anim-4">
      <header className="panel-head">
        <div><h3>Próximas entrevistas</h3><div className="desc">Próximas 24 hs</div></div>
        <button className="chip"><Icons.Filter/>Filtrar</button>
      </header>
      <div className="upc-list">
        {TORTU_DATA.proximas.map((p, i) => (
          <div className="upc-row" key={i}>
            <div className="upc-time">{p.time}</div>
            <div className="upc-ava"
                 style={{ background: `linear-gradient(140deg, oklch(0.65 0.15 ${p.hue}), oklch(0.5 0.16 ${p.hue + 30}))` }}>
              {p.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
            </div>
            <div>
              <div className="upc-name">{p.name}</div>
              <div className="upc-role">{p.role}</div>
            </div>
            <span className={`upc-day ${p.day === "Mañana" ? "mna" : ""}`}>{p.day}</span>
          </div>
        ))}
      </div>
      <a className="see-all" href="pages/horarios-equipo.html">Ver calendario completo <Icons.ArrowR size={13}/></a>
    </section>
  );
}

/* ===== Tweaks ===== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroStyle": "greeting",
  "subtitle": "INTERNAL OS",
  "density": "comfort",
  "accent": "#4F7CFF",
  "showRightRail": true
}/*EDITMODE-END*/;

function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection title="Hero">
        <TweakRadio label="Estilo de título" value={t.heroStyle}
                    onChange={v => setTweak("heroStyle", v)}
                    options={[{ value: "greeting", label: "Saludo" }, { value: "system", label: "Sistema OS" }]}/>
        <TweakText label="Subtítulo navbar" value={t.subtitle}
                   onChange={v => setTweak("subtitle", v)}/>
      </TweakSection>
      <TweakSection title="Layout">
        <TweakRadio label="Densidad" value={t.density}
                    onChange={v => setTweak("density", v)}
                    options={[{ value: "comfort", label: "Cómoda" }, { value: "compact", label: "Compacta" }]}/>
        <TweakToggle label="Mostrar columna derecha" value={t.showRightRail}
                     onChange={v => setTweak("showRightRail", v)}/>
      </TweakSection>
      <TweakSection title="Color">
        <TweakColor label="Acento primario" value={t.accent}
                    options={["#4F7CFF", "#00D1FF", "#A78BFA", "#22C55E", "#F59E0B", "#EF4444"]}
                    onChange={v => setTweak("accent", v)}/>
      </TweakSection>
    </TweaksPanel>
  );
}

/* ===== App ===== */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [side, setSide] = useState("inicio");

  // Apply density + accent live
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", tweaks.accent);
    const c = tweaks.accent;
    const lighter = mix(c, "#ffffff", 0.45);
    document.documentElement.style.setProperty("--primary-2", lighter);
    document.body.dataset.density = tweaks.density;
  }, [tweaks.accent, tweaks.density]);

  return (
    <>
      <div className="app-bg"/>
      <Navbar active="inicio" tweaks={tweaks}/>
      <div className="shell" data-screen-label="Dashboard">
        <Sidebar active={side} onNav={setSide}/>
        <main className="main">
          <Hero tweaks={tweaks}/>
          <div className="section-head anim anim-2">
            <div>
              <h2>Métricas del día</h2>
              <div className="desc">Indicadores clave en tiempo real · {new Date().toLocaleDateString("es-AR")}</div>
            </div>
            <div className="right">
              <button className="chip"><Icons.Calendar/>Hoy</button>
              <button className="chip"><Icons.Filter/>Filtros</button>
            </div>
          </div>
          <div className="kpis">
            {TORTU_DATA.kpis.map((k, i) => <KPI kpi={k} idx={i} key={k.id}/>)}
          </div>

          <div className="section-head anim anim-3" id="equipo">
            <div>
              <h2>Nuestro equipo</h2>
              <div className="desc">Las tortuguitas que hacen posible la operación de cada día.</div>
            </div>
            <div className="right">
              <button className="chip"><Icons.Users/>Ver equipo completo</button>
            </div>
          </div>
          <div className="team-grid">
            {TORTU_DATA.team.map((m, i) => <TeamCard m={m} idx={i} key={m.id}/>)}
          </div>

          <div className="row-2">
            <ActivityPanel tweaks={tweaks}/>
            <UpcomingPanel/>
          </div>

          <div className="footer-note">
            <span>© 2026 Tortuguitas · Sabores Express · Hamburguesas Extremas</span> · Equipo de Selección
          </div>
        </main>
        {tweaks.showRightRail && <RightRail/>}
      </div>
      <Tweaks t={tweaks} setTweak={setTweak}/>
    </>
  );
}

/* Small color mix helper for live accent */
function mix(a, b, t) {
  const pa = parse(a), pb = parse(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r},${g},${bl})`;
}
function parse(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
