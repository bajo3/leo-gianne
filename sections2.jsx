/* ============================================================
   sections2.jsx — Cronograma, Cómo llegar, Dress code
   ============================================================ */

function Cronograma({ data, copy }) {
  return (
    <Section id="cronograma" data-screen-label="Cronograma" className="py-24 md:py-36" style={{ background: "var(--c-bg2)" }}>
      <div className="text-center">
        <Reveal><Eyebrow>{copy.cronoEyebrow}</Eyebrow></Reveal>
        <Reveal delay={120}>
          <h2 className="font-display" style={{ margin: "16px 0 0", fontSize: "clamp(32px, 7vw, 56px)", lineHeight: 1.05 }}>
            {copy.cronoTitle}
          </h2>
        </Reveal>
        <Reveal delay={200}><div className="rule" style={{ margin: "26px auto 0" }} /></Reveal>
      </div>

      <div className="tl mx-auto mt-14 flex flex-col gap-9" style={{ maxWidth: 520 }}>
        {data.schedule.map((s, i) => (
          <Reveal key={s.time} variant="reveal" delay={i * 110}>
            <div className="flex items-start gap-5">
              <span className="tl-dot" style={{ marginTop: 4 }} />
              <div className="flex-1">
                <div className="font-display" style={{ fontSize: "clamp(26px,6vw,34px)", lineHeight: 1, color: "var(--c-accent)" }}>{s.time}</div>
                <div className="lead" style={{ marginTop: 6, fontSize: 16, color: "var(--c-ink)" }}>{s.label}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <p className="text-center lead mx-auto" style={{ marginTop: 44, fontSize: 14.5, maxWidth: 420, color: "var(--c-muted)" }}>
          {copy.cronoNote}
        </p>
      </Reveal>
    </Section>
  );
}

function ComoLlegar({ data, copy }) {
  return (
    <Section id="como-llegar" data-screen-label="Cómo llegar" className="py-24 md:py-36">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="order-2 md:order-none">
          <Reveal><Eyebrow>{copy.mapEyebrow}</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="font-display" style={{ margin: "18px 0 0", fontSize: "clamp(32px, 6vw, 54px)", lineHeight: 1.05 }}>
              {copy.mapTitle}
            </h2>
          </Reveal>
          <Reveal delay={180}><div className="rule mt-7" style={{ marginLeft: 0 }} /></Reveal>

          <Reveal delay={240}>
            <p className="font-display" style={{ marginTop: 28, fontSize: 21, color: "var(--c-ink)", lineHeight: 1.4 }}>
              {data.venue}
            </p>
            <p className="lead" style={{ marginTop: 6, fontSize: 15 }}>{data.venueArea}</p>
          </Reveal>

          <Reveal delay={320}>
            <div className="flex items-start gap-3 mt-8" style={{ maxWidth: 420 }}>
              <span style={{ flex: "0 0 auto", marginTop: 2, color: "var(--c-accent)" }}><CarIcon /></span>
              <p className="lead" style={{ margin: 0, fontSize: 15 }}>{copy.parking}</p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <a href={data.mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-solid no-tap mt-9">
              <PinIcon /> {copy.ctaMap}
            </a>
          </Reveal>
        </div>

        <Reveal variant="reveal-scale" className="order-1 md:order-none">
          <a href={data.mapsLink} target="_blank" rel="noopener noreferrer" className="no-tap block photo-frame" style={{ borderRadius: 6 }}>
            <img src={data.mapImage} alt="Mapa de cómo llegar a la quinta en Tandil"
                 style={{ width: "100%", height: "auto", display: "block", borderRadius: 3 }} loading="lazy" />
          </a>
          <p style={{ textAlign: "center", marginTop: 14, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--c-muted)" }}>
            {data.venueAddress}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

function DressCode({ data, copy }) {
  return (
    <Section id="dresscode" data-screen-label="Dress code" className="py-24 md:py-36" style={{ background: "var(--c-bg2)" }}>
      <div className="text-center max-w-2xl mx-auto">
        <Reveal><Eyebrow>{copy.dressEyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display" style={{ margin: "16px 0 0", fontSize: "clamp(38px, 9vw, 66px)", lineHeight: 1.02 }}>
            {data.dressCode}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="font-display" style={{ marginTop: 28, fontSize: "clamp(18px,3.6vw,22px)", fontStyle: "italic", lineHeight: 1.6, color: "var(--c-soft)" }}>
            {copy.dressText}
          </p>
        </Reveal>
      </div>

      <Reveal delay={260}>
        <div className="flex justify-center gap-3 md:gap-4 mt-12 flex-wrap">
          {data.palette.map((c) => (
            <span key={c.hex} title={c.name} style={{ width: 46, height: 46, borderRadius: 999, background: c.hex, border: "1px solid var(--c-line)", boxShadow: "0 10px 20px -10px rgba(0,0,0,.45)" }} />
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--c-muted)", marginTop: 18 }}>Tonos sugeridos</p>
      </Reveal>

      <Reveal variant="reveal" delay={320}>
        <div className="card mx-auto mt-12 flex flex-col items-center text-center px-8 py-10" style={{ maxWidth: 460, background: "var(--c-bg)" }}>
          <span style={{
            width: 48, height: 48, borderRadius: 999, display: "grid", placeItems: "center",
            border: "1px solid var(--c-line)", color: "var(--c-muted)", position: "relative",
          }}>
            <span style={{ position: "absolute", width: 30, height: 1, background: "currentColor", transform: "rotate(-45deg)" }} />
            <span style={{ width: 18, height: 18, borderRadius: 999, border: "1.5px solid currentColor" }} />
          </span>
          <p className="font-display" style={{ margin: "16px 0 0", fontSize: 22, fontStyle: "italic", color: "var(--c-soft)" }}>{copy.dressAvoid}</p>
          <p className="lead" style={{ marginTop: 8, fontSize: 13.5, color: "var(--c-muted)" }}>{copy.dressAvoidSub}</p>
        </div>
      </Reveal>
    </Section>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l1.5-4.5A2 2 0 0 1 8.4 6h7.2a2 2 0 0 1 1.9 1.5L19 12" />
      <path d="M3 12h18v5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H6.5v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5Z" />
      <circle cx="7" cy="15" r="0.6" /><circle cx="17" cy="15" r="0.6" />
    </svg>
  );
}

Object.assign(window, { Cronograma, ComoLlegar, DressCode, CarIcon, PinIcon });
