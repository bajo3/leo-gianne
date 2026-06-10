/* ============================================================
   sections1.jsx — Hero, Versículo, Countdown, Historia
   ============================================================ */

function Hero({ data, copy }) {
  const [bgRef, bgY] = useParallax(0.12);
  return (
    <header data-screen-label="Portada" className="hero-dark relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 -z-10" style={{ transform: `translateY(${bgY}px) scale(1.12)` }}>
        <Photo src={data.photoHero} label="Foto principal de los novios" objectPosition="center 18%" style={{ position: "absolute", inset: 0 }} />
      </div>
      <div className="scrim -z-10" />

      <div className="reveal-blur in" style={{ transitionDelay: "120ms" }}>
        <Eyebrow>{copy.heroEyebrow}</Eyebrow>
      </div>

      <Reveal variant="reveal" delay={300}>
        <h1 className="font-display" style={{
          margin: "22px 0 0", lineHeight: 0.94,
          fontSize: "clamp(56px, 18vw, 138px)", color: "#FCF8F0",
          textShadow: "0 2px 40px rgba(20,16,10,0.45)",
        }}>
          {data.nameA}
          <span className="block font-script" style={{ fontSize: "clamp(32px, 10vw, 76px)", color: "color-mix(in oklab, var(--c-accent) 72%, white)", margin: "-4px 0", fontWeight: 400, letterSpacing: 0, textShadow: "0 2px 30px rgba(20,16,10,0.4)" }}>y</span>
          {data.nameB}
        </h1>
      </Reveal>

      <Reveal variant="reveal" delay={560} className="mt-9 flex flex-col items-center gap-4">
        <span className="ornament" style={{ color: "color-mix(in oklab, var(--c-accent) 70%, white)" }}><span className="diamond" style={{ background: "currentColor" }} /></span>
        <p className="font-display" style={{ margin: 0, fontSize: "clamp(16px, 4.2vw, 23px)", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(252,248,240,0.95)", textWrap: "balance", textShadow: "0 1px 18px rgba(20,16,10,0.5)" }}>
          {data.dateLong}
        </p>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(252,248,240,0.78)", textShadow: "0 1px 16px rgba(20,16,10,0.5)" }}>
          {data.city}
        </p>
      </Reveal>

      <Reveal variant="reveal" delay={760} className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
        <Btn href={data.rsvpLink} variant="solid" block>{copy.ctaRsvp}</Btn>
        <Btn href={data.mapsLink} variant="ghost" block>{copy.ctaMap}</Btn>
      </Reveal>

      <div className="absolute bottom-7 left-0 right-0 flex flex-col items-center gap-3 reveal in" style={{ transitionDelay: "1100ms" }}>
        <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(252,248,240,0.8)", textShadow: "0 1px 14px rgba(20,16,10,0.5)" }}>{copy.scroll}</span>
        <span className="rule-v" style={{ animation: "none", background: "rgba(252,248,240,0.5)" }} />
      </div>
    </header>
  );
}

/* Versículo + bienvenida */
function Verse({ data, copy }) {
  return (
    <Section id="bienvenida" data-screen-label="Bienvenida" className="py-24 md:py-36 text-center">
      <Reveal><Eyebrow>{copy.verseEyebrow}</Eyebrow></Reveal>
      <Reveal delay={120}>
        <p className="lead mx-auto" style={{ marginTop: 26, fontSize: 17, maxWidth: 540 }}>
          {copy.welcome}
        </p>
      </Reveal>

      <Reveal delay={220}><div className="rule" style={{ margin: "40px auto 0" }} /></Reveal>

      <Reveal variant="reveal-blur" delay={300}>
        <blockquote className="font-display" style={{
          margin: "40px auto 0", maxWidth: 680, fontStyle: "italic",
          fontSize: "clamp(26px, 5.5vw, 44px)", lineHeight: 1.3, color: "var(--c-ink)",
        }}>
          “{copy.verseText}”
        </blockquote>
      </Reveal>
      <Reveal delay={420}>
        <p style={{ marginTop: 22, fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--c-accent)" }}>
          {copy.verseRef}
        </p>
      </Reveal>

      <Reveal delay={520}>
        <p className="lead mx-auto" style={{ marginTop: 38, fontSize: 16, maxWidth: 500 }}>
          {copy.welcome2}
        </p>
      </Reveal>
    </Section>
  );
}

function Countdown({ data, copy }) {
  const t = useCountdown(data.dateISO);
  const items = [
    { v: t.d, l: "Días" },
    { v: t.h, l: "Horas" },
    { v: t.m, l: "Minutos" },
    { v: t.s, l: "Segundos" },
  ];
  return (
    <Section id="countdown" data-screen-label="Cuenta regresiva" className="py-24 md:py-32" style={{ background: "var(--c-bg2)" }}>
      <div className="text-center">
        <Reveal><Eyebrow>{copy.countEyebrow}</Eyebrow></Reveal>
        <Reveal delay={120}>
          <h2 className="font-display" style={{ margin: "16px 0 0", fontSize: "clamp(30px, 7vw, 50px)", lineHeight: 1.05 }}>
            {copy.countTitle}
          </h2>
        </Reveal>
      </div>
      <div className="mt-12 grid grid-cols-4 gap-2.5 sm:gap-5 max-w-2xl mx-auto">
        {items.map((it, i) => (
          <Reveal key={it.l} variant="reveal" delay={i * 110}>
            <div className="count-card">
              <div className="count-num">{String(it.v).padStart(2, "0")}</div>
              <div className="count-label">{it.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
      {t.done && (
        <Reveal className="mt-10 text-center">
          <p className="font-script" style={{ fontSize: "clamp(28px,7vw,44px)", color: "var(--c-accent)", margin: 0 }}>¡Hoy es el gran día!</p>
        </Reveal>
      )}
    </Section>
  );
}

function Story({ data, copy }) {
  const [imgRef, imgY] = useParallax(0.08);
  return (
    <Section id="historia" data-screen-label="Nuestra historia" className="py-24 md:py-36">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <Reveal variant="reveal-scale" className="order-1 md:order-none">
          <div ref={imgRef} style={{ transform: `translateY(${imgY}px)` }}>
            <Photo framed src={data.photoStory} label="Foto de la pareja" className="aspect-[4/5] w-full" />
          </div>
        </Reveal>
        <div>
          <Reveal><Eyebrow>{copy.storyEyebrow}</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="font-display" style={{ margin: "18px 0 0", fontSize: "clamp(32px, 6vw, 56px)", lineHeight: 1.05 }}>
              {copy.storyTitle}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="rule mt-7" style={{ marginLeft: 0 }} />
          </Reveal>
          {copy.storyParas.map((p, i) => (
            <Reveal key={i} delay={260 + i * 90}>
              <p className="lead" style={{ marginTop: i === 0 ? 28 : 18, fontSize: 16 }}>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={520}>
            <p className="font-script mt-8" style={{ fontSize: "clamp(26px,6vw,38px)", color: "var(--c-accent)", margin: "26px 0 0" }}>
              {data.nameA} &amp; {data.nameB}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { Hero, Verse, Countdown, Story });
