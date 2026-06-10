/* ============================================================
   components.jsx — hooks + primitives compartidos
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- Reveal on scroll (sequenced) ---- */
function Reveal({ children, variant = "reveal", delay = 0, as = "div", className = "", style = {}, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const reveal = () => { if (!done) { done = true; setShown(true); cleanup(); } };
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.94 && r.bottom > 0;
    };
    const onScroll = () => { if (inView()) reveal(); };
    let io = null;
    try {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) reveal(); }),
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
      );
      io.observe(el);
    } catch (e) { /* no IO support */ }
    function cleanup() {
      if (io) io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // reveal above-the-fold content immediately after mount
    const raf = requestAnimationFrame(() => { if (inView()) reveal(); });
    const t = setTimeout(onScroll, 300);
    return () => { cleanup(); cancelAnimationFrame(raf); clearTimeout(t); };
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`${variant} ${shown ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---- Parallax: returns a translateY based on scroll, only when in view ---- */
function useParallax(strength = 0.18) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.bottom < -200 || r.top > vh + 200) return;
        const center = r.top + r.height / 2;
        const dist = center - vh / 2;
        setOffset(-(dist * strength));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength]);
  return [ref, offset];
}

/* ---- Live countdown ---- */
function useCountdown(targetISO) {
  const compute = useCallback(() => {
    const diff = new Date(targetISO).getTime() - Date.now();
    const clamp = Math.max(0, diff);
    return {
      done: diff <= 0,
      d: Math.floor(clamp / 86400000),
      h: Math.floor((clamp % 86400000) / 3600000),
      m: Math.floor((clamp % 3600000) / 60000),
      s: Math.floor((clamp % 60000) / 1000),
    };
  }, [targetISO]);
  const [t, setT] = useState(compute);
  useEffect(() => {
    const id = setInterval(() => setT(compute()), 1000);
    return () => clearInterval(id);
  }, [compute]);
  return t;
}

/* ---- Photo placeholder (con src opcional) ---- */
function Photo({ label = "Foto", className = "", style = {}, framed = false, src = null, objectPosition = "center" }) {
  const [err, setErr] = useState(false);
  const imgStyle = { width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block", borderRadius: framed ? 3 : 0 };
  const inner = src && !err ? (
    <div className={framed ? "" : className}
         style={framed ? { width: "100%", height: "100%", borderRadius: 3, overflow: "hidden" } : { ...style, overflow: "hidden" }}>
      <img src={src} alt={label} style={imgStyle} onError={() => setErr(true)} loading="lazy" />
    </div>
  ) : (
    <div className={`photo ${framed ? "" : className}`} data-label={label}
         style={framed ? { width: "100%", height: "100%", borderRadius: 3 } : style} />
  );
  if (framed) {
    return <div className={`photo-frame ${className}`} style={style}>{inner}</div>;
  }
  return inner;
}

/* ---- Section shell ---- */
function Section({ id, children, className = "", style = {} }) {
  return (
    <section id={id} className={`px-6 md:px-10 ${className}`} style={style}>
      <div className="mx-auto w-full" style={{ maxWidth: "var(--maxw)" }}>{children}</div>
    </section>
  );
}

/* ---- Eyebrow + ornament heading ---- */
function Eyebrow({ children }) {
  return <p className="eyebrow" style={{ margin: 0 }}>{children}</p>;
}

function Ornament() {
  return (
    <div className="flex justify-center">
      <span className="ornament"><span className="diamond" /></span>
    </div>
  );
}

/* ---- Button ---- */
function Btn({ href, variant = "solid", children, onClick, block = false }) {
  return (
    <a href={href} onClick={onClick} target={href && href.startsWith("http") ? "_blank" : undefined}
       rel="noopener noreferrer"
       className={`btn no-tap ${variant === "solid" ? "btn-solid" : "btn-ghost"} ${block ? "w-full sm:w-auto" : ""}`}>
      {children}
    </a>
  );
}

Object.assign(window, {
  Reveal, useParallax, useCountdown, Photo, Section, Eyebrow, Ornament, Btn,
  useState, useEffect, useRef, useCallback,
});
