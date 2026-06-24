# A.S.D. Laurenziana Model Team Firenze

Sito ufficiale della **A.S.D. Laurenziana Model Team** — pista permanente RC su asfalto
all'aperto, a Firenze.
Dominio previsto: `asdlaurenziana.it`.

## Concept

**Circuito vivo.** L'identità ruota attorno all'asset unico della società: una
pista che si **riconfigura** a ogni gara. Il tracciato (SVG interattivo con
racing-line animata) è il cuore grafico. Palette **blueprint chiaro / asfalto**
con **viola Firenze** come accento sobrio e il **giglio** come motivo. Volutamente
diverso dal sito Team La Gang (`rclws`): chiaro anziché dark, tecnico/editoriale,
organizzato per circuito.

## Stack

- **Next.js 16** · App Router, Turbopack
- **React 19** · TypeScript
- **Tailwind CSS v4** · design system via `@theme` in `src/app/globals.css`
- **GSAP** (MotionPath) · auto che percorre il tracciato
- **Framer Motion** · scroll reveal
- **Lenis** · smooth scroll
- Font: **Bricolage Grotesque** (display) · **Inter Tight** (testo) · **IBM Plex Mono** (telemetria)

## Sviluppo

```bash
npm install
npm run dev      # nota: rclws usa la 3000 → questo parte su 3001
npm run build
npm run start
```

## Struttura

```
src/
├── app/
│   ├── layout.tsx        # font, Lenis, nav, footer
│   ├── page.tsx          # home
│   ├── circuito/         # tracciati + galleria pista
│   ├── categorie/        # 5 categorie + specifiche tecniche
│   ├── calendario/       # 21 date stagione 2026
│   ├── campionati/       # sociale, F1 Championship, trofei
│   ├── contatti/         # dove siamo + iscrizioni
│   ├── globals.css       # design system Tailwind v4
│   ├── sitemap.ts · robots.ts
├── components/
│   ├── TrackCanvas.tsx   # tracciato SVG interattivo + GSAP
│   ├── TrackMini.tsx     # render statico tracciato
│   ├── GiglioMark.tsx    # giglio fiorentino stilizzato (SVG)
│   ├── Navigation · Footer · PageHero · Reveal · SmoothScroll
│   └── sections/Hero.tsx
└── lib/
    ├── site.ts           # contenuti: contatti, categorie, calendario, campionati
    ├── tracks.ts         # geometrie SVG dei tracciati
    └── cn.ts
```

## Contenuti — da rifinire con la società

- **Calendario**: le 21 date sono ufficiali; l'abbinamento categoria/tipologia
  delle prove marcate `provisional` in `src/lib/site.ts` va confermato (la tabella
  PDF originale aveva celle unite illeggibili in automatico).
- **Tracciati** (`src/lib/tracks.ts`): layout-tipo rappresentativi, da sostituire
  con i tracciati reali se disponibili in vettoriale.
- **Foto** in `public/pista/`, loghi in `public/loghi/` (giglio + scudo).

## Todo per produzione

- [ ] Confermare calendario + tracciati reali
- [ ] Form contatti / iscrizione (API route + Resend), oppure solo link MyRCM
- [ ] Eventuale area riservata + classifiche (sync MyRCM, come rclws)
- [ ] OG image dedicata, analytics, cookie banner (GDPR/ASD)
- [ ] Materiale sorgente in `materiale/` (PDF regolamenti, foto)
```
