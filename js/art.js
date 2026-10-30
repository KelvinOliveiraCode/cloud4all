// Arte vetorial de cada página. Traço fino, um acento, animação em CSS.

const OPEN = (title, body, extra = "") =>
  `<svg class="art" viewBox="0 0 400 300" role="img" aria-label="${title}" ${extra}>${body}</svg>`;

export function art(name) {
  return ART[name]?.() ?? ART.orbit();
}

const ART = {
  orbit: () =>
    OPEN(
      "Órbitas concêntricas com pontos de rede",
      `
      <ellipse class="art-faint" cx="200" cy="150" rx="164" ry="66" transform="rotate(-16 200 150)"/>
      <ellipse class="art-faint" cx="200" cy="150" rx="118" ry="118"/>
      <g class="art-orbit">
        <ellipse class="art-line art-dash" cx="200" cy="150" rx="88" ry="134" transform="rotate(38 200 150)"/>
        <circle class="art-dot" cx="200" cy="16" r="3.2"/>
        <circle class="art-dot" cx="288" cy="150" r="2.4"/>
        <circle class="art-dot" cx="200" cy="284" r="2.8"/>
      </g>
      <g class="art-orbit art-orbit--reverse">
        <ellipse class="art-line" cx="200" cy="150" rx="150" ry="54" transform="rotate(-16 200 150)"/>
        <circle class="art-dot-soft" cx="50" cy="150" r="2.6"/>
        <circle class="art-dot-soft" cx="350" cy="150" r="2.6"/>
      </g>
      <circle class="art-fill" cx="200" cy="150" r="44"/>
      <circle class="art-line" cx="200" cy="150" r="44"/>
      <circle class="art-dot art-pulse" cx="200" cy="150" r="4.6"/>
      <path class="art-accent art-draw" d="M58 214C118 254 282 254 342 210"/>
      <path class="art-faint" d="M200 106v-18M200 194v18M156 150h-18M244 150h18"/>
    `
    ),

  layers: () =>
    OPEN(
      "Camadas empilhadas em perspectiva",
      `
      <g class="art-float art-float--slow">
        <path class="art-faint" d="M200 58L346 132L200 206L54 132Z"/>
        <path class="art-line" d="M200 92L320 152L200 212L80 152Z"/>
        <path class="art-accent" d="M200 126L294 172L200 218L106 172Z"/>
      </g>
      <g class="art-float">
        <path class="art-faint" d="M200 26L302 77L200 128L98 77Z"/>
        <path class="art-faint" d="M200 186L302 237L200 288L98 237Z"/>
      </g>
      <path class="art-dash" d="M200 26V288" stroke="currentColor" fill="none" stroke-width="1"/>
      <circle class="art-dot art-pulse" cx="200" cy="172" r="3.6"/>
      <circle class="art-dot art-pulse art-pulse--2" cx="106" cy="172" r="2.6"/>
      <circle class="art-dot art-pulse art-pulse--3" cx="294" cy="172" r="2.6"/>
    `
    ),

  index: () =>
    OPEN(
      "Fichas de índice organizadas em leque",
      `
      <g transform="rotate(-9 200 150)">
        <rect class="art-faint" x="92" y="66" width="150" height="192" rx="2"/>
      </g>
      <g transform="rotate(7 200 150)">
        <rect class="art-faint" x="158" y="58" width="150" height="192" rx="2"/>
      </g>
      <rect class="art-line art-paper" x="124" y="50" width="152" height="200" rx="2"/>
      <path class="art-accent" d="M148 82h104"/>
      <path class="art-line" d="M148 104h78M148 120h96M148 136h64"/>
      <path class="art-faint" d="M148 168h104M148 184h104M148 200h72"/>
      <circle class="art-dot art-pulse" cx="252" cy="82" r="3.2"/>
      <path class="art-dash" d="M60 250C120 268 280 268 340 248" stroke="currentColor" fill="none" stroke-width="1"/>
    `
    ),

  clouds: () =>
    OPEN(
      "Três contornos de nuvem sobrepostos",
      `
      <g class="art-float art-float--slow">
        <path class="art-faint" d="M70 206a30 30 0 0 1 5-59 44 44 0 0 1 84-12 34 34 0 0 1 32 34 26 26 0 0 1-7 37Z"/>
      </g>
      <g class="art-float">
        <path class="art-line" d="M132 196a34 34 0 0 1 6-67 50 50 0 0 1 95-14 38 38 0 0 1 36 38 30 30 0 0 1-8 43Z"/>
      </g>
      <path class="art-accent" d="M190 186a38 38 0 0 1 7-74 55 55 0 0 1 104-15 42 42 0 0 1 40 42 33 33 0 0 1-9 47Z"/>
      <circle class="art-dot art-pulse" cx="250" cy="132" r="3.4"/>
      <path class="art-dash" d="M84 236h232" stroke="currentColor" fill="none" stroke-width="1"/>
      <path class="art-faint" d="M118 252h164"/>
    `
    ),

  tiles: () =>
    OPEN(
      "Grade de serviços com um item em destaque",
      `
      <g class="art-faint">
        <rect x="62" y="52" width="58" height="58" rx="2"/>
        <rect x="134" y="52" width="58" height="58" rx="2"/>
        <rect x="206" y="52" width="58" height="58" rx="2"/>
        <rect x="278" y="52" width="58" height="58" rx="2"/>
        <rect x="62" y="124" width="58" height="58" rx="2"/>
        <rect x="206" y="124" width="58" height="58" rx="2"/>
        <rect x="278" y="124" width="58" height="58" rx="2"/>
        <rect x="62" y="196" width="58" height="58" rx="2"/>
        <rect x="134" y="196" width="58" height="58" rx="2"/>
        <rect x="206" y="196" width="58" height="58" rx="2"/>
        <rect x="278" y="196" width="58" height="58" rx="2"/>
      </g>
      <rect class="art-accent art-soft" x="134" y="124" width="58" height="58" rx="2"/>
      <path class="art-accent" d="M150 153l8 8 16-18"/>
      <path class="art-dash" d="M192 153h66" stroke="currentColor" fill="none" stroke-width="1"/>
      <circle class="art-dot art-pulse" cx="266" cy="153" r="3.4"/>
      <path class="art-line" d="M62 272h274"/>
    `
    ),

  path: () =>
    OPEN(
      "Caminho pontilhado com pontos de decisão",
      `
      <path class="art-faint" d="M54 250C120 250 96 196 160 188S250 214 288 160 312 82 350 66"/>
      <path class="art-dash" d="M54 250C120 250 96 196 160 188S250 214 288 160 312 82 350 66" stroke="currentColor" fill="none" stroke-width="1.2"/>
      <path class="art-accent" d="M288 160C312 126 326 96 350 66"/>
      <g>
        <circle class="art-dot" cx="54" cy="250" r="4"/>
        <circle class="art-dot" cx="160" cy="188" r="4"/>
        <circle class="art-dot" cx="288" cy="160" r="4"/>
        <circle class="art-dot art-pulse" cx="350" cy="66" r="5"/>
      </g>
      <g class="art-float">
        <circle class="art-line" cx="350" cy="66" r="22"/>
        <path class="art-line" d="M350 50v10M350 72v10M334 66h10M356 66h10"/>
      </g>
      <path class="art-faint" d="M54 274h128M54 284h84"/>
    `
    ),

  steps: () =>
    OPEN(
      "Degraus ascendentes com selo de conclusão",
      `
      <path class="art-faint" d="M62 250h62v-52h62v-52h62v-52h62"/>
      <path class="art-accent" d="M62 250h62v-52h62"/>
      <path class="art-dash" d="M186 198v-52h62v-52" stroke="currentColor" fill="none" stroke-width="1"/>
      <g class="art-float">
        <circle class="art-line" cx="310" cy="94" r="34"/>
        <path class="art-accent" d="M296 94l10 10 20-22"/>
      </g>
      <circle class="art-dot art-pulse" cx="124" cy="250" r="3"/>
      <circle class="art-dot art-pulse art-pulse--2" cx="186" cy="198" r="3"/>
      <circle class="art-dot art-pulse art-pulse--3" cx="248" cy="146" r="3"/>
      <path class="art-faint" d="M62 274h276"/>
    `
    ),

  prompt: () =>
    OPEN(
      "Linhas de texto convergindo para um nó",
      `
      <g class="art-line">
        <path d="M48 78h150M48 102h118M48 126h164M48 150h96M48 174h138"/>
      </g>
      <path class="art-faint" d="M48 198h84"/>
      <path class="art-accent art-draw" d="M210 78C270 78 250 132 300 142"/>
      <path class="art-accent art-draw" d="M210 126C262 126 258 138 300 142"/>
      <path class="art-accent art-draw" d="M210 174C266 174 258 152 300 142"/>
      <g class="art-float">
        <path class="art-line art-paper" d="M320 118l28 24-28 24-28-24Z"/>
        <circle class="art-dot art-pulse" cx="320" cy="142" r="4"/>
      </g>
      <path class="art-dash" d="M348 142h24" stroke="currentColor" fill="none" stroke-width="1"/>
      <circle class="art-dot-soft" cx="384" cy="142" r="3"/>
      <path class="art-faint" d="M48 236h108M48 252h72"/>
    `
    ),

  contours: () =>
    OPEN(
      "Curvas de nível com um ponto marcado",
      `
      <g class="art-faint">
        <path d="M36 188c30-54 90-84 156-80s118 40 172 22"/>
        <path d="M28 216c36-62 100-96 172-92s124 46 180 24"/>
        <path d="M20 244c42-70 112-108 190-104s130 52 188 28"/>
        <path d="M44 160c26-46 80-72 140-68s106 34 154 18"/>
      </g>
      <path class="art-accent" d="M68 132c22-38 68-60 118-56s90 28 130 14"/>
      <g class="art-float">
        <circle class="art-line" cx="236" cy="126" r="18"/>
        <circle class="art-dot" cx="236" cy="126" r="4"/>
        <path class="art-line" d="M236 144v34"/>
      </g>
      <path class="art-dash" d="M236 178c0 22-18 34-44 38" stroke="currentColor" fill="none" stroke-width="1"/>
      <circle class="art-dot-soft" cx="192" cy="216" r="3"/>
      <path class="art-faint" d="M54 274h180"/>
    `
    ),

  broken: () =>
    OPEN(
      "Órbita interrompida",
      `
      <path class="art-faint" d="M88 224a136 136 0 1 1 224 0" fill="none"/>
      <path class="art-dash" d="M74 214a146 146 0 0 1 252-4" stroke="currentColor" fill="none" stroke-width="1"/>
      <circle class="art-line" cx="200" cy="150" r="58"/>
      <path class="art-accent" d="M200 118v44M200 180v2"/>
      <circle class="art-dot art-pulse" cx="200" cy="200" r="3.4"/>
      <circle class="art-dot-soft" cx="88" cy="224" r="3"/>
      <circle class="art-dot-soft" cx="312" cy="224" r="3"/>
      <path class="art-faint" d="M140 250h120"/>
    `
    ),
};

export const pageArt = {
  inicio: "orbit",
  aprender: "layers",
  glossario: "index",
  tipos: "clouds",
  catalogo: "tiles",
  encontrar: "path",
  cursos: "steps",
  ia: "prompt",
  sobre: "contours",
  naoEncontrado: "broken",
};
