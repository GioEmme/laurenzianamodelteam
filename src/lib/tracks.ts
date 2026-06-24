// Tracciati rappresentativi del circuito riconfigurabile della A.S.D. Laurenziana Model Team.
// La pista permanente viene ridisegnata per ogni prova: questi sono layout-tipo,
// resi come centerline SVG (viewBox 0 0 1000 560).

export type Track = {
  id: string;
  name: string;
  index: string; // "01"
  character: "Veloce" | "Tecnico" | "Misto" | "Tortuoso";
  corners: number;
  note: string;
  d: string; // centerline path (closed)
};

export const TRACK_VIEWBOX = "0 0 1000 560";

export const tracks: Track[] = [
  {
    id: "anello",
    name: "Anello Veloce",
    index: "01",
    character: "Veloce",
    corners: 8,
    note: "Curvoni in appoggio e un solo punto di stacco vero. Si fa media.",
    d: "M150 320 C150 200 280 170 400 200 C500 224 540 300 650 290 C770 279 790 170 870 210 C930 240 910 340 830 370 C730 407 600 370 510 405 C410 444 380 480 280 470 C180 460 150 410 150 320 Z",
  },
  {
    id: "tecnico",
    name: "Tecnico",
    index: "02",
    character: "Tecnico",
    corners: 12,
    note: "Doppio tornante e cambio di direzione stretto: paga la trazione in uscita.",
    d: "M140 300 C140 190 250 180 320 230 C390 280 360 360 440 370 C510 379 540 300 520 240 C503 188 580 160 650 195 C720 230 700 330 770 350 C850 372 860 460 770 470 C660 482 560 440 450 455 C320 472 140 450 140 300 Z",
  },
  {
    id: "misto",
    name: "Misto Lungo",
    index: "03",
    character: "Misto",
    corners: 9,
    note: "Lungo rettilineo del palco, infield veloce. Premia chi gestisce la gomma.",
    d: "M170 240 C320 150 680 150 850 230 C920 263 915 360 820 385 C710 414 580 380 500 400 C430 417 430 460 330 465 C210 471 120 380 170 240 Z",
  },
  {
    id: "stadio",
    name: "Stadio",
    index: "04",
    character: "Tortuoso",
    corners: 14,
    note: "Switchback al centro, ritmo spezzato. Il tracciato più completo.",
    d: "M130 280 C130 180 230 165 310 205 C400 249 380 330 460 345 C525 357 545 290 610 295 C690 301 690 385 605 400 C700 410 800 375 860 310 C905 262 910 430 815 455 C690 488 520 460 390 470 C240 481 130 430 130 280 Z",
  },
];
