/* ============================================================
   sections3.jsx — RSVP, Regalos, Galería, Footer
   ============================================================ */

function Rsvp({ data, copy }) {
  return (
    <Section id="rsvp" data-screen-label="Confirmar asistencia" className="py-24 md:py-36">
      <Reveal variant="reveal-scale">
        <div className="card relative overflow-hidden text-center px-7 py-14 md:px-16 md:py-20">
          <div className="absolute inset-0 -z-10 opacity-60" style={{
            background: "radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, var(--c-accent) 12%, transparent), transparent 70%)"
          }} />
          <Eyebrow>{copy.rsvpEyebrow}</Eyebrow>
          <h2 className="font-display" style={{ margin: "18px 0 0", fontSize: "clamp(34px, 7.5vw, 60px)", lineHeight: 1.04 }}>
            {copy.rsvpTitle}
          </h2>
          <div className="rule my-8" />
          <p className="lead mx-auto" style={{ maxWidth: 480, fontSize: 16 }}>{copy.rsvpText}</p>
          <div className="mt-9 flex justify-center">
            <Btn href={data.rsvpLink} variant="solid"><WhatsIcon /> {copy.ctaRsvp}</Btn>
          </div>
          <p className="mt-7" style={{ fontSize: 13.5, letterSpacing: "0.04em", color: "var(--c-muted)" }}>
            También por WhatsApp al <strong style={{ color: "var(--c-soft)", fontWeight: 600 }}>{data.rsvpPhonePretty}</strong>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

function Gifts({ data, copy }) {
  const [copied, setCopied] = useState(false);
  const copyAlias = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1900); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data.alias).then(done).catch(done);
    } else { done(); }
  };
  return (
    <Section id="regalos" data-screen-label="Regalos" className="py-24 md:py-36" style={{ background: "var(--c-bg2)" }}>
      <div className="text-center max-w-2xl mx-auto">
        <Reveal><Eyebrow>{copy.giftsEyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display" style={{ margin: "16px 0 0", fontSize: "clamp(32px, 7vw, 54px)", lineHeight: 1.05 }}>
            {copy.giftsTitle}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="lead mt-7" style={{ fontSize: 16 }}>{copy.giftsText}</p>
        </Reveal>
      </div>

      <Reveal variant="reveal" delay={120} className="mt-12">
        <button onClick={copyAlias} aria-label="Copiar alias"
          className="gift-card no-tap card mx-auto block w-full max-w-md text-center"
          style={{ cursor: "pointer", padding: "44px 28px 36px", position: "relative", overflow: "hidden" }}>
          <span className="gift-glow" aria-hidden="true" />
          <span className="ornament" style={{ position: "relative" }}><span className="diamond" /></span>
          <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-muted)", margin: "20px 0 0" }}>Alias</p>
          <p className="font-display" style={{ fontSize: "clamp(28px,8vw,42px)", margin: "10px 0 0", letterSpacing: "0.02em", lineHeight: 1.05, position: "relative" }}>{data.alias}</p>
          <span className="gift-copy" style={{
            marginTop: 26, display: "inline-flex", alignItems: "center", gap: 9,
            padding: "11px 20px", borderRadius: 999,
            border: "1px solid var(--c-line)", background: "var(--c-bg2)",
            color: copied ? "var(--c-accent)" : "var(--c-soft)",
            fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500,
            transition: "color .3s var(--ease), border-color .3s var(--ease)",
            borderColor: copied ? "var(--c-accent)" : "var(--c-line)",
          }}>
            {copied ? <CheckIcon /> : <CopyIcon />} {copied ? "¡Alias copiado!" : "Tocá para copiar"}
          </span>
        </button>
      </Reveal>
    </Section>
  );
}

function Gallery({ copy, data }) {
  const tiles = [
    { c: "col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto", l: "Foto destacada", idx: 0 },
    { c: "aspect-[4/5]", l: "Foto", idx: 1 },
    { c: "aspect-[4/5]", l: "Foto", idx: 2 },
  ];
  return (
    <Section id="galeria" data-screen-label="Galería" className="py-24 md:py-36">
      <div className="text-center">
        <Reveal><Eyebrow>{copy.galleryEyebrow}</Eyebrow></Reveal>
        <Reveal delay={120}>
          <h2 className="font-display" style={{ margin: "16px 0 0", fontSize: "clamp(32px, 7vw, 54px)", lineHeight: 1.05 }}>
            {copy.galleryTitle}
          </h2>
        </Reveal>
      </div>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 md:gap-4">
        {tiles.map((t, i) => (
          <Reveal key={i} variant="reveal-scale" delay={i * 110} className={`gallery-tile ${t.c}`}>
            <Photo
              src={data.photosGallery && data.photosGallery[t.idx]}
              label={t.l}
              className="w-full h-full"
              style={{ borderRadius: 12, minHeight: 160 }}
            />
            <span className="gallery-veil" aria-hidden="true" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Footer({ data, copy }) {
  return (
    <footer data-screen-label="Cierre" className="relative overflow-hidden text-center px-6 py-24 md:py-32" style={{ background: "var(--c-ink)", color: "var(--c-bg)" }}>
      <Reveal variant="reveal">
        <span className="ornament" style={{ color: "color-mix(in oklab, var(--c-accent) 75%, white)" }}><span className="diamond" style={{ background: "currentColor" }} /></span>
        <p className="font-script" style={{ fontSize: "clamp(40px, 12vw, 86px)", margin: "20px 0 0", color: "color-mix(in oklab, var(--c-accent) 70%, white)", lineHeight: 1 }}>
          ¡Te esperamos!
        </p>
        <p className="mx-auto mt-6" style={{ maxWidth: 440, opacity: 0.78, lineHeight: 1.8, fontSize: 15 }}>{copy.footerText}</p>
        <div style={{ width: 56, height: 1, background: "currentColor", opacity: 0.3, margin: "30px auto" }} />
        <p className="font-display" style={{ fontSize: "clamp(22px,5.5vw,32px)", letterSpacing: "0.06em", margin: 0 }}>
          {data.nameA} &amp; {data.nameB}
        </p>
        <p style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.6, marginTop: 12 }}>{data.dateLong}</p>
      </Reveal>
    </footer>
  );
}

/* ---- icons ---- */
function CopyIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>);
}
function CheckIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>);
}
function WhatsIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4-.1-.2-1-1.4-1-2.6 0-1.3.6-1.9.9-2.1.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.3.1.7-.1 1.1Z"/></svg>);
}

Object.assign(window, { Rsvp, Gifts, Gallery, Footer, CopyIcon, CheckIcon, WhatsIcon });
