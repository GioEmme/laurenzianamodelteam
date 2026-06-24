export const site = {
  name: "A.S.D. Laurenziana Model Team",
  fullName: "A.S.D. Laurenziana Model Team Firenze",
  section: "Sezione Automodellismo RC",
  track: "Pista Permanente di Firenze",
  domain: "asdlaurenziana.it",
  tagline: "Automodellismo RC su asfalto. A Firenze, da sempre.",
  description:
    "A.S.D. Laurenziana Model Team Firenze: pista permanente RC su asfalto all'aperto, a Firenze. Tracciati riconfigurabili, campionato sociale e F1 Championship — Touring, FWD, GT, Vaschetta e F1 1/10.",
  address: {
    street: "Via di Caciolle 4/L",
    cap: "50127",
    city: "Firenze",
  },
  contacts: {
    email: "laurenzianamodelteam@gmail.com",
    paypal: "laurenzianamodelteam@gmail.com",
    people: [
      { name: "Fabrizio", phone: "+39 339 811 3298", role: "Iscrizioni / Direzione gara" },
      { name: "Andrea", phone: "+39 338 873 2562", role: "Iscrizioni / Direzione gara" },
    ],
  },
  nav: [
    { label: "Circuito", href: "/circuito" },
    { label: "Categorie", href: "/categorie" },
    { label: "Calendario", href: "/calendario" },
    { label: "Campionati", href: "/campionati" },
    { label: "Contatti", href: "/contatti" },
  ],
  social: {
    myrcm: "https://www.myrcm.ch/myrcm/main?hId[1]=org&dId[O]=8538&pLa=it",
    facebook: "https://www.facebook.com/",
  },
  // Campionato sociale: 5 prove per categoria su tracciati diversi.
  championships: [
    {
      key: "sociale",
      title: "Campionato Sociale",
      blurb:
        "Cinque prove per categoria, ciascuna su un tracciato diverso del circuito. Classifica con uno scarto per Touring e FWD, senza scarto per il Formulino.",
      classes: ["Touring", "FWD", "Formulino"],
      rounds: 5,
    },
    {
      key: "f1",
      title: "F1 Championship",
      blurb:
        "Cinque GP su altrettanti tracciati. Classifica piloti e classifica costruttori: ogni team schiera due piloti, livree libere ispirate alla F1 reale. Punteggi fino a 400 per vittoria.",
      classes: ["F1 Foam 1/10"],
      rounds: 5,
    },
    {
      key: "trofei",
      title: "Trofei & Gare libere",
      blurb:
        "Durante la stagione: Trofeo Bracing, Trofeo Lattice, Trofeo Spugne e gare libere aperte a più categorie nella stessa giornata.",
      classes: ["Open"],
      rounds: null,
    },
  ],
  fees: {
    race: 30,
    note: "Iscrizione a gara, treno di gomme incluso (da ritirare obbligatoriamente).",
  },
} as const;

// ---------------- categorie ----------------

export type Category = {
  slug: string;
  label: string;
  short: string;
  tire: "spugna" | "lattice";
  blurb: string;
  description: string;
  format: { qualifiche: string; finali: string }; // svolgimento gara
  specs: Record<string, string>;
  social?: { drop: boolean }; // campionato sociale con/senza scarto
};

export const categories: Category[] = [
  {
    slug: "touring",
    label: "Touring 1/10",
    short: "Touring",
    tire: "lattice",
    blurb: "4WD da 190 mm, motore 13.5T fornito dalla direzione gara. Categoria del campionato sociale.",
    description:
      "Touring elettrica 1/10 4WD con carrozzeria 190 mm e motore 13.5T fornito dalla direzione gara: potenza uguale per tutti, la differenza la fanno guida e assetto. Rientra nel campionato sociale a cinque prove con uno scarto.",
    format: {
      qualifiche: "Superpole, durata 60/90 minuti.",
      finali: "Tre finali, griglia di partenza come da qualificazione Superpole.",
    },
    specs: {
      Scala: "1/10 · 4WD",
      Carrozzeria: "Touring 190 mm",
      Telaio: "Touring",
      Motore: "Ruddog RP540 o Osram N22 13.5T (fornito dalla direzione gara)",
      Regolatore: "Libero · no timing · modalità Sportmen",
      Rapporto: "min 4,50",
      Batteria: "LiPo 2S · max 8,4 V / 10 A",
      Peso: "min 1.280 g",
      Gomme: "Lattice Bracing o Matrix EP · punzonate · un treno a gara",
      Additivo: "Permesso · scaldagomme permesso",
    },
    social: { drop: true },
  },
  {
    slug: "fwd",
    label: "FWD 1/10",
    short: "FWD",
    tire: "lattice",
    blurb: "Trazione anteriore su telaio touring, motore Justock 17.5T tarato a 17.500 giri.",
    description:
      "Touring 1/10 a sola trazione anteriore: comportamento diverso dal 4WD, più sottosterzo e trazione in uscita da dosare. Motore Hobbywing Justock 17.5T con regolatore tarato a 17.500 giri. Categoria del campionato sociale a cinque prove con uno scarto.",
    format: {
      qualifiche: "Superpole, durata 60/90 minuti.",
      finali: "Tre finali, griglia di partenza come da qualificazione Superpole.",
    },
    specs: {
      Scala: "1/10 · 2WD anteriore",
      Carrozzeria: "FWD 190 mm",
      Telaio: "Touring",
      Motore: "Hobbywing Justock 17.5T",
      Regolatore: "Hobbywing XR10 Justock · libero · no timing · tarato a 17.500 giri",
      Rapporto: "min 4,50",
      Batteria: "LiPo 2S · max 8,4 V / 10 A",
      Peso: "min 1.250 g",
      Gomme: "Lattice Bracing o Matrix EP · punzonate · un treno a gara",
      Additivo: "Permesso · scaldagomme permesso",
    },
    social: { drop: true },
  },
  {
    slug: "gt",
    label: "GT Foam 1/10",
    short: "GT Foam",
    tire: "spugna",
    blurb: "Carrozzerie GT su telaio touring, gomme in spugna. Additivo e scaldagomme vietati.",
    description:
      "Granturismo 1/10 su telaio touring con motore Justock 17.5T e gomme in spugna Matrix GT Foam. Additivo e scaldagomme vietati: conta la pulizia di guida e la gestione della gomma. Carrozzerie GT da 190 mm.",
    format: {
      qualifiche: "Superpole, durata 60/90 minuti.",
      finali: "Tre finali, griglia di partenza come da qualificazione Superpole.",
    },
    specs: {
      Scala: "1/10 · 4WD",
      Carrozzeria: "GT 190 mm",
      Telaio: "Touring",
      Motore: "Hobbywing Justock 17.5T",
      Regolatore: "Libero · no timing",
      Rapporto: "min 4,00",
      Batteria: "LiPo 2S · max 8,4 V / 10 A",
      Peso: "min 1.250 g",
      Gomme: "Spugna Matrix GT Foam · punzonate · un treno a gara",
      Additivo: "Vietato · scaldagomme vietato",
    },
  },
  {
    slug: "vaschetta",
    label: "Vaschetta Cardano",
    short: "Vaschetta",
    tire: "spugna",
    blurb: "Telai a vaschetta e cardano da catalogo, motore Justock G2.1 17.5T. La categoria d'ingresso.",
    description:
      "Touring 1/10 a vaschetta con trasmissione a cardano e modelli da catalogo. Combo Justock G2.1 17.5T, rapporto minimo 5,00, qualifiche a manche. La porta d'ingresso al campionato, senza corsa al setup.",
    format: {
      qualifiche:
        "Tre manche da 5 minuti: 1ª in ordine casuale, 2ª e 3ª per ordine d'arrivo della manche precedente.",
      finali:
        "Tre finali: prima griglia come da qualificazione, poi per ordine d'arrivo della manche precedente.",
    },
    specs: {
      Scala: "1/10 · vaschetta cardano",
      Carrozzeria: "Rallye 190 mm",
      Telaio:
        "Vaschetta con cardano: Tamiya TT02 · TT02r · TT01 · Kyosho Fazer · Carten T410 · Rallye Legend · VRX X-Ranger",
      Motore: "Hobbywing Justock G2.1 17.5T",
      Regolatore: "Libero · no timing · modalità Sportmen",
      Rapporto: "min 5,00",
      Batteria: "LiPo 2S · max 8,4 V / 10 A",
      Peso: "non richiesto",
      Gomme: "Spugna Matrix GT Foam · punzonate · un treno a gara",
      Additivo: "Vietato · scaldagomme vietato",
    },
  },
  {
    slug: "f1",
    label: "F1 Foam · Formulino 1/10",
    short: "F1 Foam",
    tire: "spugna",
    blurb: "Monoposto 1/10 su gomme in spugna, motore Justock 21.5T. Categoria dell'F1 Championship.",
    description:
      "Monoposto 1/10 con telaio F1 in carbonio, carrozzerie di tutte le F1 moderne e gomme in spugna Matrix F1 Foam. Motore Justock 21.5T, rapporto minimo 2,50. Come categoria sociale (Formulino) rientra nel campionato a cinque prove senza scarto; è inoltre la categoria dell'F1 Championship, con regolamento esteso (qui sotto).",
    format: {
      qualifiche:
        "Tre manche da 5 minuti: 1ª in ordine casuale, 2ª e 3ª per ordine d'arrivo della manche precedente.",
      finali: "Finale unica da 8 minuti.",
    },
    specs: {
      Scala: "1/10 · monoposto",
      Carrozzeria: "Tutte le F1 moderne · 190 mm",
      Telaio: "F1 in carbonio",
      Motore: "Hobbywing Justock 21.5T",
      Regolatore: "Libero · no timing (tipo XR10 Justock, Orca)",
      Rapporto: "min 2,50",
      Batteria: "LiPo 2S · max 8,4 V / 10 A",
      Peso: "min 1.050 g",
      Gomme: "Spugna Matrix F1 Foam · punzonate · un treno a gara",
      Additivo: "Vietato · scaldagomme vietato",
    },
    social: { drop: false },
  },
];

// ---------------- F1 Championship (regolamento esteso) ----------------
// Dal documento "F1 Championship Laurenziana Model Team". Categoria F1 Foam 1/10,
// cinque gare sui cinque tracciati. Più dettagliato del regolamento Formulino sociale.

export const f1Championship = {
  intro:
    "Cinque gare sui cinque tracciati del nostro circuito, categoria F1 Foam 1/10. Il calendario è presentato alla riunione sociale di inizio stagione; l'apertura delle iscrizioni è annunciata su WhatsApp e sui social. Nessun numero massimo di partecipanti.",
  fee: "Iscrizione 30€ a gara, treno di gomme incluso (da ritirare obbligatoriamente).",
  format: {
    qualifiche:
      "Tre manche da 5 minuti in batterie fino a 8 piloti, metodo Round by Round: contano le due migliori prestazioni (giri e tempo).",
    finali:
      "Finali A, B e C da 8 minuti, griglie in base alla qualificazione. Un pilota di una finale inferiore non può superare in classifica chi è in una finale più veloce.",
  },
  tech: {
    Carrozzeria:
      "Tutte le F1 commerciali (livree dal 1950 a oggi, verniciate) · larghezza max 186 mm nominali (dima 190 mm, +0/−6) · alettone posteriore max 110 mm da terra · obbligo alettone anteriore e posteriore",
    Alettoni:
      "Solo in plastica a iniezione commerciali, non modificati · vietati lexan e stampa 3D",
    Telaio:
      "F1 ad assale posteriore rigido, uno solo per gara · sospensione anteriore a perno scorrevole e molla con braccetto inferiore fisso · barra antirollio anteriore ammessa · vietati schemi a sospensioni indipendenti (es. FGX, F113)",
    Motore:
      "Hobbywing Xerun Justock 3650SD G2 (30408007) o G2.1 (30408012) · 21,5T · anticipo fisso",
    Regolatore:
      "Hobbywing XR10 Justock, Orca o similari con firmware Zero Timing–Unlimited · vietato XR10 Justock G3 Handout grigio · nessun aiuto elettronico (giroscopi)",
    Rapporto: "minimo 2,50:1",
    Peso: "minimo 1.050 g con transponder",
    Batteria:
      "LiPo Shorty/MiniShorty hard-case con marchio CE · 7,4/7,6 V (HV) · max 8,40 V alla verifica · carica/scarica max 10 A",
    Gomme:
      "Spugna Matrix F1 Foam pre-incollata · un solo treno punzonato per gara (sostituzione solo per gomma rotta) · vietati additivi, termocoperte, pulitore freni/WD40",
    Caschi: "Casco del pilota separato e verniciato (non in lexan), colori verosimili",
  },
  teams:
    "Si stilano una classifica piloti e una costruttori. Ogni pilota può formare un team di due: i nomi si comunicano prima della prima gara e restano fissi per la stagione (team facoltativo). In caso di assenza è ammesso un \"secondo pilota\" non appartenente ad altri team: i suoi punti vanno alla sua classifica piloti e si sommano al team per i costruttori. Nome del team facoltativo (altrimenti i cognomi); gradite livree coordinate ispirate alla F1 reale.",
  punteggi: [
    ["1°", 400], ["2°", 370], ["3°", 340], ["4°", 310], ["5°", 280], ["6°", 250],
    ["7°", 220], ["8°", 200], ["9°", 180], ["10°", 160], ["11°", 150], ["12°", 140],
    ["13°", 130], ["14°", 120], ["15°", 110], ["16°", 100], ["17°", 96], ["18°", 92],
    ["19°", 88], ["20°", 84], ["21°", 82], ["22°", 80], ["23°", 78], ["24°", 76],
  ] as [string, number][],
  punteggiNota:
    "Nessuno scarto: valgono tutte e cinque le gare. In caso di parità contano vittorie e migliori piazzamenti.",
  verifiche:
    "A fine sessione le auto restano in pitlane per i controlli. Prima di ogni batteria si verificano, a discrezione della direzione gara, voltaggio batteria, misure carrozzeria, motore, punzonatura gomme, lampeggio ESC, peso e rapporto. Verifiche a sorpresa in qualsiasi momento; penalità fino all'esclusione.",
  palco:
    "Posto sul palco assegnato per ordine di griglia (fino al 12°). Vietate ingiurie e bestemmie (stop immediato del modello). Non è consentito chiamare i doppiaggi con veemenza (possibile penalità di un giro). Chi arriva all'ultimo sul palco parte dalla pit lane senza giro di riscaldamento.",
  premiazione:
    "A fine campionato, premiazione dei primi tre di piloti e costruttori, poi estrazione dei premi. Il montepremi si costituisce in stagione (patrocinio B-Racing RC Products e Matrix Racing Tyres); una parte delle quote è devoluta al montepremi. Ha diritto a un premio chi ha partecipato ad almeno tre gare.",
  timetable:
    "Giornata tipo (8 posti sul palco): iscrizioni e prove libere 8:00–9:00, foto e briefing ~9:05, qualifiche dalle 9:30, finali C/B/A in tarda mattinata, premiazione ed estrazione ~12:45–13:20.",
};

// ---------------- calendario 2026 ----------------
// Date certe dal calendario ufficiale. L'abbinamento categoria/tipo è
// PROVVISORIO (tabella PDF a celle unite) — da confermare con la società.

export type RaceDate = {
  n: number;
  date: string; // ISO
  display: string;
  label: string;
  kind: "sociale" | "trofeo" | "libera";
  duration: "Mattina" | "Giornata";
  provisional?: boolean;
};

export const calendar2026: RaceDate[] = [
  { n: 1, date: "2026-01-11", display: "11 Gennaio", label: "1ª prova Sociale F1 · GT", kind: "sociale", duration: "Mattina" },
  { n: 2, date: "2026-02-01", display: "1 Febbraio", label: "1ª prova Sociale FWD", kind: "sociale", duration: "Mattina" },
  { n: 3, date: "2026-02-22", display: "22 Febbraio", label: "2ª prova Sociale F1 · Vaschetta", kind: "sociale", duration: "Mattina" },
  { n: 4, date: "2026-03-15", display: "15 Marzo", label: "1ª prova Sociale Touring", kind: "sociale", duration: "Mattina" },
  { n: 5, date: "2026-03-29", display: "29 Marzo", label: "Trofeo Bracing", kind: "trofeo", duration: "Giornata" },
  { n: 6, date: "2026-04-12", display: "12 Aprile", label: "3ª prova Sociale F1", kind: "sociale", duration: "Mattina" },
  { n: 7, date: "2026-04-19", display: "19 Aprile", label: "2ª prova Sociale FWD · K. Fantom", kind: "sociale", duration: "Mattina" },
  { n: 8, date: "2026-05-03", display: "3 Maggio", label: "2ª prova Sociale Touring", kind: "sociale", duration: "Mattina" },
  { n: 9, date: "2026-05-17", display: "17 Maggio", label: "Trofeo Lattice", kind: "trofeo", duration: "Giornata" },
  { n: 10, date: "2026-06-07", display: "7 Giugno", label: "Trofeo Bracing", kind: "trofeo", duration: "Giornata" },
  { n: 11, date: "2026-06-28", display: "28 Giugno", label: "Gara libera F1 · Vaschetta", kind: "libera", duration: "Mattina" },
  { n: 12, date: "2026-07-05", display: "5 Luglio", label: "3ª prova Sociale FWD", kind: "sociale", duration: "Mattina", provisional: true },
  { n: 13, date: "2026-07-19", display: "19 Luglio", label: "3ª prova Sociale Touring", kind: "sociale", duration: "Mattina", provisional: true },
  { n: 14, date: "2026-09-06", display: "6 Settembre", label: "4ª prova Sociale FWD", kind: "sociale", duration: "Mattina", provisional: true },
  { n: 15, date: "2026-09-27", display: "27 Settembre", label: "4ª prova Sociale F1", kind: "sociale", duration: "Mattina", provisional: true },
  { n: 16, date: "2026-10-11", display: "11 Ottobre", label: "4ª prova Sociale Touring", kind: "sociale", duration: "Mattina", provisional: true },
  { n: 17, date: "2026-10-25", display: "25 Ottobre", label: "Trofeo Bracing", kind: "trofeo", duration: "Giornata", provisional: true },
  { n: 18, date: "2026-11-08", display: "8 Novembre", label: "5ª prova Sociale FWD · Touring", kind: "sociale", duration: "Giornata", provisional: true },
  { n: 19, date: "2026-11-22", display: "22 Novembre", label: "Trofeo Spugne", kind: "trofeo", duration: "Giornata", provisional: true },
  { n: 20, date: "2026-12-06", display: "6 Dicembre", label: "5ª prova Sociale F1", kind: "sociale", duration: "Mattina", provisional: true },
  { n: 21, date: "2026-12-20", display: "20 Dicembre", label: "Gara libera GT · F1", kind: "libera", duration: "Mattina", provisional: true },
];

export type NavItem = (typeof site.nav)[number];
