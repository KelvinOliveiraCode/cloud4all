// Arte vetorial de cada página. Traço fino, um acento, animação em CSS.

const OPEN = (title, body, extra = "") =>
  `<svg class="art" viewBox="0 0 400 300" role="img" aria-label="${title}" ${extra}>${body}</svg>`;

export function art(name) {
  return ART[name]?.() ?? ART.orbit();
}

const ART = {
  orbit: () =>
    OPEN(
      "Mapa do site com nuvem central e serviços ligados",
      `
      <g class="art-orbit">
        <ellipse class="art-faint" cx="200" cy="142" rx="152" ry="84" transform="rotate(-8 200 142)"/>
      </g>
      <path class="art-faint" d="M156 150C132 156 104 168 78 188"/>
      <path class="art-faint" d="M256 120c24-16 46-38 64-52"/>
      <path class="art-faint" d="M242 162c28 18 58 46 86 76"/>
      <g class="art-float art-float--slow">
        <circle class="art-line" cx="62" cy="196" r="14"/>
        <circle class="art-dot" cx="62" cy="196" r="3"/>
      </g>
      <g class="art-float">
        <rect class="art-line" x="316" y="228" width="26" height="22" rx="2"/>
        <path class="art-line" d="M320 232h18"/>
      </g>
      <circle class="art-dot-soft" cx="322" cy="66" r="8"/>
      <circle class="art-dot art-pulse" cx="322" cy="66" r="3.6"/>
      <path class="art-accent art-draw" d="M154 168a28 28 0 0 1 2-55 38 38 0 0 1 72-10 30 30 0 0 1 28 30 24 24 0 0 1-18 35Z"/>
      <path class="art-faint" d="M62 262h84M62 272h56"/>
    `
    ),

  layers: () =>
    OPEN(
      "Três camadas empilhadas: banco de dados, servidor e rede",
      `
      <g class="art-float art-float--slow">
        <path class="art-accent art-soft" d="M200 66L330 120L200 174L70 120Z"/>
        <ellipse class="art-line" cx="200" cy="114" rx="14" ry="5"/>
        <path class="art-line" d="M186 114v10a14 5 0 0 0 28 0v-10"/>
      </g>
      <path class="art-line" d="M304 98l-44 20M78 128l30 14"/>
      <g class="art-float">
        <path class="art-line art-paper" d="M200 114L330 168L200 222L70 168Z"/>
        <rect class="art-line" x="184" y="156" width="32" height="24" rx="2"/>
        <path class="art-line" d="M190 164h20"/>
        <circle class="art-dot-soft" cx="190" cy="172" r="1.6"/>
      </g>
      <g>
        <path class="art-line art-paper" d="M200 162L330 216L200 270L70 216Z"/>
        <circle class="art-line" cx="200" cy="212" r="17"/>
        <ellipse class="art-line" cx="200" cy="212" rx="7" ry="17"/>
        <path class="art-line" d="M183 212h34"/>
      </g>
      <circle class="art-dot art-pulse" cx="200" cy="212" r="3.4"/>
    `
    ),

  index: () =>
    OPEN(
      "Livro aberto com lupa sobre palavra em destaque",
      `
      <path class="art-line art-paper" d="M84 88C134 68 178 80 200 96 222 80 266 68 316 88L316 218C266 198 222 210 200 226 178 210 134 198 84 218Z"/>
      <path class="art-line" d="M200 96V226"/>
      <path class="art-faint" d="M292 78v32l-9-9-9 9V82"/>
      <g class="art-line">
        <path d="M104 112h84M104 160h84M104 176h64M226 112h62M226 128h74M226 144h52M226 160h66"/>
      </g>
      <g class="art-float art-float--slow">
        <path class="art-accent" d="M104 130h52"/>
        <path class="art-line art-paper" d="M118 124h56v14h-56Z"/>
        <path class="art-accent" d="M124 131h40"/>
        <circle class="art-line" cx="140" cy="131" r="17"/>
        <path class="art-accent" d="M152 143l16 16"/>
        <circle class="art-dot art-pulse" cx="140" cy="131" r="2.6"/>
      </g>
      <path class="art-dash" d="M52 258C140 276 260 276 348 256" stroke="currentColor" fill="none" stroke-width="1"/>
    `
    ),

  clouds: () =>
    OPEN(
      "Nuvens pública, privada e híbrida",
      `
      <g class="art-float art-float--slow">
        <path class="art-line art-paper" d="M48 134a22 22 0 0 1 4-43 32 32 0 0 1 60-9 24 24 0 0 1 23 24 19 19 0 0 1-5 28Z"/>
        <path class="art-accent" d="M81 110v-7a9 9 0 0 1 18 0v7"/>
        <rect class="art-accent" x="75" y="110" width="30" height="20" rx="2"/>
        <circle class="art-dot-soft" cx="90" cy="120" r="2.6"/>
      </g>
      <g class="art-float">
        <path class="art-line" d="M243 124a22 22 0 0 1 4-43 32 32 0 0 1 60-9 24 24 0 0 1 23 24 19 19 0 0 1-5 28Z"/>
        <circle class="art-dot-soft" cx="272" cy="102" r="2.6"/>
        <circle class="art-dot" cx="292" cy="94" r="3"/>
        <circle class="art-dot-soft" cx="310" cy="106" r="2.6"/>
        <circle class="art-dot art-pulse" cx="292" cy="94" r="4.6"/>
      </g>
      <path class="art-line" d="M86 250a16 16 0 0 1 3-30 22 22 0 0 1 42-6 17 17 0 0 1 16 16 13 13 0 0 1-4 20Z"/>
      <path class="art-line" d="M216 250a16 16 0 0 1 3-30 22 22 0 0 1 42-6 17 17 0 0 1 16 16 13 13 0 0 1-4 20Z"/>
      <path class="art-accent art-draw" d="M166 226h34m0 0l-8-8M200 226l-8 8"/>
      <path class="art-accent art-dash" d="M206 238h-34m0 0l8-8M172 238l8 8" fill="none"/>
    `
    ),

  tiles: () =>
    OPEN(
      "Prateleira de provedores como cartões dobrados",
      `
      <g class="art-faint">
        <rect x="60" y="64" width="66" height="44" rx="3"/>
        <rect x="142" y="64" width="66" height="44" rx="3"/>
        <rect x="224" y="64" width="66" height="44" rx="3"/>
        <rect x="60" y="132" width="66" height="44" rx="3"/>
        <rect x="224" y="132" width="66" height="44" rx="3"/>
        <rect x="60" y="200" width="66" height="44" rx="3"/>
        <rect x="142" y="200" width="66" height="44" rx="3"/>
        <rect x="224" y="200" width="66" height="44" rx="3"/>
        <path d="M114 64l12 12M196 64l12 12M278 64l12 12M114 132l12 12M278 132l12 12M114 200l12 12M196 200l12 12M278 200l12 12"/>
      </g>
      <g class="art-float">
        <rect class="art-accent art-soft" x="142" y="132" width="66" height="44" rx="3"/>
        <path class="art-accent" d="M158 154l10 10 22-22"/>
        <circle class="art-dot art-pulse" cx="242" cy="154" r="3.4"/>
      </g>
      <path class="art-line" d="M52 116h296M52 184h296M52 252h296"/>
      <path class="art-dash" d="M300 154h34" stroke="currentColor" fill="none" stroke-width="1"/>
      <circle class="art-dot-soft" cx="340" cy="154" r="3"/>
    `
    ),

  path: () =>
    OPEN(
      "Trilha de decisão com balões de pergunta e pino de mapa",
      `
      <path class="art-faint" d="M112 170l-1-46M112 170h80M197 175h76M197 175l4-40M210 226h58M149 250h58"/>
      <g>
        <path class="art-line art-paper" d="M96 148h32v22h-20l-10 9V170a11 11 0 0 1 0-22Z"/>
        <text class="art-fill" x="112" y="165" font-size="15" text-anchor="middle" font-family="Georgia, serif">?</text>
        <circle class="art-dot" cx="112" cy="159" r="3.4"/>
      </g>
      <g>
        <path class="art-line art-paper" d="M180 148h32a11 11 0 0 1 0 22h-22l-8 9 1-9a11 11 0 0 1 0-22Z"/>
        <text class="art-fill" x="196" y="165" font-size="15" text-anchor="middle" font-family="Georgia, serif">?</text>
        <circle class="art-dot" cx="196" cy="159" r="3.4"/>
      </g>
      <g>
        <path class="art-line art-paper" d="M254 196h32a11 11 0 0 1 0 22h-24l-6 9V218a11 11 0 0 1 0-22Z"/>
        <text class="art-fill" x="270" y="213" font-size="15" text-anchor="middle" font-family="Georgia, serif">?</text>
        <circle class="art-dot" cx="270" cy="207" r="3.4"/>
      </g>
      <path class="art-dash" d="M90 142C60 164 62 196 92 210c34 16 42 22 66 24 28 2 66-2 88-20 28-24 44-32 62-40" stroke="currentColor" fill="none" stroke-width="1.2"/>
      <circle class="art-line" cx="90" cy="142" r="15"/>
      <path class="art-line art-paper" d="M90 152v15M82 167h16"/>
      <path class="art-accent art-draw" d="M254 218c34 0 70-14 86-48"/>
      <g class="art-float">
        <path class="art-accent" d="M352 82c-10-12-18-20-18-30a18 18 0 1 1 36 0c0 10-8 18-18 30Z"/>
        <circle class="art-dot art-pulse" cx="352" cy="52" r="4.6"/>
      </g>
    `
    ),

  steps: () =>
    OPEN(
      "Escada de progressão com bandeira, selo e diploma",
      `
      <path class="art-faint" d="M56 214H106M56 250v-36"/>
      <g class="art-float art-float--slow">
        <path class="art-accent" d="M158 178h46"/>
        <circle class="art-dot art-pulse" cx="181" cy="178" r="3"/>
      </g>
      <path class="art-faint" d="M180 144v-2M160 170v-30"/>
      <path class="art-float art-line" d="M240 106V70"/>
      <g class="art-float">
        <circle class="art-line art-paper" cx="310" cy="86" r="34"/>
        <path class="art-accent" d="M298 88l9 9 17-20"/>
        <path class="art-faint" d="M292 56l14-12M312 52l12-10"/>
      </g>
      <circle class="art-dot art-pulse art-pulse--2" cx="292" cy="92" r="2.6"/>
      <circle class="art-dot art-pulse art-pulse--3" cx="330" cy="66" r="2.6"/>
      <path class="art-faint" d="M56 274h286"/>
    `
    ),

  prompt: () =>
    OPEN(
      "Janela de chat com balões de pergunta e resposta",
      `
      <rect class="art-line art-paper" x="48" y="54" width="304" height="196" rx="6"/>
      <path class="art-faint" d="M48 82h304"/>
      <circle class="art-dot-soft" cx="66" cy="68" r="3"/>
      <rect class="art-faint" x="86" y="64" width="126" height="9" rx="2"/>
      <g class="art-line art-paper">
        <path d="M76 110h96a16 16 0 0 1 0 32H92l-16 14 4-14h-4a16 16 0 0 1 0-32Z"/>
      </g>
      <circle class="art-dot" cx="98" cy="126" r="3"/>
      <circle class="art-dot art-pulse" cx="120" cy="126" r="3.4"/>
      <circle class="art-dot-soft" cx="142" cy="126" r="3"/>
      <g class="art-line art-paper">
        <path d="M214 170h100a16 16 0 0 1 0 32H246l12 12-2-12h-42a16 16 0 0 1 0-32Z"/>
      </g>
      <path class="art-accent" d="M232 182l10 8-10 8"/>
      <path class="art-line art-dash" d="M252 180v20" stroke="currentColor" fill="none" stroke-width="1.4"/>
      <path class="art-faint" d="M70 226h120"/>
      <circle class="art-line" cx="322" cy="226" r="9"/>
      <path class="art-line" d="M318 219l10 7-10 7"/>
    `
    ),

  contours: () =>
    OPEN(
      "Curvas de nível com régua e lupa sobre o mapa",
      `
      <g class="art-float art-float--slow">
        <path class="art-faint" d="M96 150c0-34 38-58 84-58s84 24 84 58-38 58-84 58-84-24-84-58Z"/>
        <path class="art-line" d="M128 150c0-22 24-38 52-38s52 16 52 38-24 38-52 38-52-16-52-38Z"/>
        <path class="art-line" d="M158 150c0-11 12-19 22-19s22 8 22 19-12 19-22 19-22-8-22-19Z"/>
        <circle class="art-dot art-pulse" cx="180" cy="150" r="3.4"/>
      </g>
      <path class="art-faint" d="M252 96c26-8 54 0 62 18 8 18-8 34-34 32-10-18-10-38-28-50Z"/>
      <g class="art-float">
        <circle class="art-accent" cx="268" cy="128" r="22"/>
        <path class="art-accent" d="M284 144l22 22"/>
        <circle class="art-dot-soft" cx="268" cy="128" r="3"/>
      </g>
      <g class="art-line art-paper">
        <path d="M50 252l100 30"/>
        <path d="M52 258l100 30"/>
      </g>
      <g class="art-line">
        <path d="M64 250l-6 8M84 256l-6 8M104 262l-6 8M124 268l-6 8M144 274l-6 8"/>
      </g>
      <g class="art-float">
        <circle class="art-dot" cx="117" cy="54" r="3.4"/>
        <path class="art-line" d="M117 57l-14 36M117 57l14 34"/>
      </g>
      <circle class="art-dot-soft" cx="70" cy="210" r="3"/>
      <path class="art-faint" d="M52 96h44M52 108h60"/>
    `
    ),

  broken: () =>
    OPEN(
      "Janela de navegador rasgada com ponto de interrogação",
      `
      <path class="art-line art-paper" d="M70 56h260v180l-16 8-16-10-16 8-16-8-16 8-16-10-16 8-16-8-16 10-16-10-16 8-16-8-16 8-16-10-16 8-20-14Z"/>
      <path class="art-faint" d="M70 84h260"/>
      <circle class="art-dot-soft" cx="86" cy="70" r="2.6"/>
      <circle class="art-dot-soft" cx="102" cy="70" r="2.6"/>
      <path class="art-faint" d="M98 126h60M96 144h44M96 160h54"/>
      <path class="art-faint" d="M126 96l28 22-12 10 26 18"/>
      <path class="art-accent art-draw" d="M180 138a25 22 0 1 1 42 14c-8 10-20 12-20 26"/>
      <circle class="art-dot art-pulse" cx="202" cy="192" r="3.2"/>
      <path class="art-dash" d="M120 262h160" stroke="currentColor" fill="none" stroke-width="1"/>
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
