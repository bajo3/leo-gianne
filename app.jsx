/* ============================================================
   app.jsx — Leo & Gianne · datos editables, tweaks y montaje
   ============================================================ */

/* ----------------------------------------------------------------
   ▼▼▼  DATOS EDITABLES — cambiá todo desde acá  ▼▼▼
---------------------------------------------------------------- */
const DATA = {
  nameA: "Leo",
  nameB: "Gianne",

  dateISO:  "2027-02-20T11:00:00-03:00",
  dateLong: "Sábado 20 de Febrero, 2027",
  city:     "Tandil · Buenos Aires",

  // Lugar (ceremonia + fiesta, mismo predio)
  venue:        "Quinta Sal Si Puedes",
  venueArea:    "La ceremonia y la fiesta se realizan en el mismo lugar.",
  venueAddress: "Paraje La Elena · Tandil · Buenos Aires",
  mapsLink:  "https://www.google.com/maps?q=-37.3443221,-59.1769831&z=17&hl=es",
  mapImage:  "photos/mapa-tandil.png",

  // Cronograma
  schedule: [
    { time: "11:00", label: "Ingreso al predio para la ceremonia" },
    { time: "11:30", label: "Ingreso de los novios" },
    { time: "13:00", label: "Inicio de la fiesta · almuerzo" },
    { time: "19:00", label: "Fin de fiesta" },
  ],

  // Confirmar asistencia (WhatsApp)
  rsvpPhone: "5492494351517",
  rsvpPhonePretty: "+54 9 2494 35-1517",
  rsvpLink: "https://wa.me/5492494351517?text=" + encodeURIComponent("¡Hola! Confirmo mi asistencia al casamiento de Leo y Gianne 🤍"),

  dressCode: "Formal",

  // Regalos · luna de miel
  alias: "Leonel.gela.bert",

  // Fotos
  photoHero:  "photos/hero.png",
  photoStory: "photos/historia.jpg",
  photosGallery: [
    "photos/selfie.jpg",
    "photos/hero.png",
    "photos/historia.jpg",
  ],

  // Paleta de tonos sugeridos (dress code)
  palette: [
    { name: "Marrón",    hex: "#9A7456" },
    { name: "Dorado",    hex: "#C9B36B" },
    { name: "Verde",     hex: "#7E9450" },
    { name: "Terracota", hex: "#C77B4C" },
    { name: "Negro",     hex: "#1F1F1F" },
  ],
};

const COPY = {
  heroEyebrow: "Nos casamos",
  ctaRsvp: "Confirmar asistencia",
  ctaMap: "Ver ubicación",
  scroll: "Desliza",

  verseEyebrow: "Nos casamos",
  welcome: "Queremos celebrar este día tan especial junto a nuestra familia y amigos.",
  verseText: "Cordón de tres dobleces no se rompe pronto.",
  verseRef: "Eclesiastés 4:12",
  welcome2: "Te esperamos para acompañarnos y compartir con nosotros esta gran alegría.",

  countEyebrow: "Falta cada vez menos",
  countTitle: "La cuenta regresiva",

  storyEyebrow: "Nuestra historia",
  storyTitle: "Lo que nos trajo hasta acá",
  storyParas: [
    "Entre mates, charlas y un montón de planes compartidos, fuimos construyendo de a poco la historia que hoy queremos celebrar con ustedes.",
    "Llegó el momento de dar el paso más soñado, y no imaginamos hacerlo sin la familia y los amigos que siempre nos acompañan.",
  ],

  cronoEyebrow: "El día",
  cronoTitle: "Cronograma",
  cronoNote: "Te esperamos desde las 11:00 para vivir juntos cada momento.",

  mapEyebrow: "Cómo llegar",
  mapTitle: "El lugar",
  parking: "Hay estacionamiento gratuito al frente de la quinta, no dentro de la misma.",

  dressEyebrow: "Dress code",
  dressText: "Elegante y formal, acorde al evento. Buscamos comodidad para todos sin quitar la elegancia ni la importancia del día. Mujeres, vestido · hombres, traje.",
  dressAvoid: "Evitá el blanco",
  dressAvoidSub: "Reservado para la novia. Evitar también: rojo, gama de azul / celeste y verde oliva.",

  rsvpEyebrow: "Te esperamos",
  rsvpTitle: "Confirmá tu asistencia",
  rsvpText: "Tu presencia es muy importante para nosotros. Por favor confirmanos si vas a acompañarnos para poder organizar cada detalle con cariño.",

  giftsEyebrow: "Regalos",
  giftsTitle: "Tu presencia es nuestro mejor regalo",
  giftsText: "Si además querés acompañarnos con un presente para arrancar esta nueva etapa y nuestra luna de miel, te dejamos nuestros datos con todo el cariño.",

  galleryEyebrow: "Momentos",
  galleryTitle: "Un poco de nosotros",

  footerText: "Gracias por ser parte de nuestra historia y por acompañarnos en este día tan especial. Con amor,",
};

/* ----------------------------------------------------------------
   Tweaks
---------------------------------------------------------------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "terracota",
  "heroEyebrow": "Nos casamos",
  "showCountdown": true,
  "showGallery": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const data = DATA;
  const copy = { ...COPY, heroEyebrow: t.heroEyebrow || COPY.heroEyebrow };

  return (
    <div data-accent={t.accent}>
      <Hero data={data} copy={copy} />
      <Verse data={data} copy={copy} />
      {t.showCountdown && <Countdown data={data} copy={copy} />}
      <Story data={data} copy={copy} />
      <Cronograma data={data} copy={copy} />
      <ComoLlegar data={data} copy={copy} />
      <Rsvp data={data} copy={copy} />
      <Gifts data={data} copy={copy} />
      {t.showGallery && <Gallery copy={copy} data={data} />}
      <Footer data={data} copy={copy} />

      <FloatingRsvp data={data} copy={copy} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Dirección visual" />
        <TweakRadio
          label="Acento"
          value={t.accent}
          options={[{ value: "terracota", label: "Terracota" }, { value: "olivo", label: "Olivo" }, { value: "tierra", label: "Tierra" }, { value: "dorado", label: "Dorado" }]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakSection label="Secciones" />
        <TweakToggle label="Cuenta regresiva" value={t.showCountdown} onChange={(v) => setTweak("showCountdown", v)} />
        <TweakToggle label="Galería" value={t.showGallery} onChange={(v) => setTweak("showGallery", v)} />
        <TweakSection label="Textos" />
        <TweakText label="Frase del hero" value={t.heroEyebrow} onChange={(v) => setTweak("heroEyebrow", v)} />
      </TweaksPanel>
    </div>
  );
}

/* Botón flotante de RSVP que aparece al hacer scroll */
function FloatingRsvp({ data, copy }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href={data.rsvpLink} target="_blank" rel="noopener noreferrer"
       className="no-tap"
       style={{
         position: "fixed", right: 18, bottom: 18, zIndex: 40,
         display: "inline-flex", alignItems: "center", gap: 9,
         padding: "13px 20px", borderRadius: 999,
         background: "var(--c-accent)", color: "#fff",
         fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 12.5,
         letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
         boxShadow: "0 16px 34px -14px rgba(0,0,0,.5)",
         transform: show ? "translateY(0)" : "translateY(140%)",
         opacity: show ? 1 : 0,
         transition: "transform .6s var(--ease), opacity .5s var(--ease)",
       }}>
      <WhatsIcon /> Confirmar
    </a>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
