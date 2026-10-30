// Arte vetorial de cada página. Traço fino, um acento, animação em CSS.

const CLOUD = "M70 206a30 30 0 0 1 5-59 44 44 0 0 1 84-12 34 34 0 0 1 32 34 26 26 0 0 1-7 37Z";

const OPEN = (title, body, extra = "") =>
  `<svg class="art" viewBox="0 0 400 300" role="img" aria-label="${title}" ${extra}>${body}</svg>`;

export function art(name) {
  return ART[name]?.() ?? ART.orbit();
}

const ART = {
  orbit: () =>
    OPEN(
      "Mapa do site: nuvem central ligada a três serviços",
      `
      <g class="art-float art-float--slow">
        <g transform="translate(9.5 -137) scale(1.5)">
          <path class="art-line" d="${CLOUD}"/>
        </g>
        <circle class="art-dot art-pulse" cx="200" cy="106" r="4"/>
      </g>
      <path class="art-faint" d="M116 162 80 222m120 -52v66m124 -66 34 56"/>
      <circle class="art-line" cx="72" cy="232" r="11"/>
      <circle class="art-dot" cx="72" cy="232" r="3"/>
      <circle class="art-line" cx="200" cy="244" r="11"/>
      <circle class="art-dot" cx="200" cy="244" r="3"/>
      <circle class="art-line" cx="328" cy="232" r="11"/>
      <circle class="art-dot" cx="328" cy="232" r="3"/>
      <path class="art-faint" d="M60 272h280"/>
    `
    ),

  layers: () =>
    OPEN(
      "Três camadas empilhadas: banco, servidor e rede",
      `
      <g class="art-float art-float--slow">
        <rect class="art-faint" x="58" y="48" width="132" height="86" rx="10"/>
        <ellipse class="art-faint" cx="124" cy="86" rx="15" ry="5.5"/>
        <path class="art-faint" d="M109 86v18a15 5.5 0 0 0 30 0v-18"/>
      </g>
      <rect class="art-line art-paper" x="134" y="106" width="132" height="86" rx="10"/>
      <rect class="art-line" x="182" y="128" width="36" height="30" rx="3"/>
      <circle class="art-dot-soft" cx="192" cy="144" r="2.2"/>
      <circle class="art-dot-soft" cx="201" cy="144" r="2.2"/>
      <circle class="art-dot-soft" cx="210" cy="144" r="2.2"/>
      <path class="art-line" d="M188 150h24"/>
      <path class="art-faint" d="M148 136h18M148 152h12"/>
      <rect class="art-line art-paper" x="210" y="164" width="132" height="86" rx="10"/>
      <circle class="art-line" cx="276" cy="205" r="17"/>
      <ellipse class="art-line" cx="276" cy="205" rx="7" ry="17"/>
      <path class="art-line" d="M260 205h32"/>
      <circle class="art-dot art-pulse" cx="276" cy="205" r="3.2"/>
    `
    ),

  index: () =>
    OPEN(
      "Livro aberto com lupa sobre um termo",
      `
      <path class="art-line" d="M96 88C140 70 180 82 200 94V210C180 198 140 186 96 204Z"/>
      <path class="art-line" d="M304 88C260 70 220 82 200 94V210C220 198 260 186 304 204Z"/>
      <path class="art-faint" d="M160 78v24l9-8 9 8V82"/>
      <g class="art-float art-float--slow">
        <path class="art-faint" d="M112 120h60M112 140h66M112 160h48M226 122h56M226 142h64M226 162h42"/>
        <path class="art-accent" d="M226 112h50"/>
        <circle class="art-line art-paper" cx="252" cy="116" r="17"/>
        <circle class="art-dot art-pulse" cx="252" cy="116" r="3.2"/>
        <path class="art-accent" d="M264 128l15 15"/>
      </g>
      <path class="art-faint" d="M84 246h232"/>
    `
    ),

  clouds: () =>
    OPEN(
      "Nuvem pública, privada e híbrida",
      `
      <g transform="translate(-40 -14) scale(1)">
        <path class="art-line" d="${CLOUD}"/>
        <path class="art-faint" d="M108 180 127 166l19 14"/>
      </g>
      <g class="art-float" transform="translate(73 -14) scale(1)">
        <path class="art-line art-paper" d="${CLOUD}"/>
        <circle class="art-dot" cx="108" cy="180" r="2.8"/>
        <circle class="art-dot art-pulse" cx="127" cy="166" r="3.4"/>
        <circle class="art-dot" cx="146" cy="180" r="2.8"/>
      </g>
      <g transform="translate(186 -14) scale(1)">
        <path class="art-line" d="${CLOUD}"/>
        <path class="art-accent" d="M120 166v-7a9 9 0 0 1 18 0v7"/>
        <rect class="art-accent" x="116" y="166" width="26" height="18" rx="3"/>
        <circle class="art-dot-soft" cx="129" cy="175" r="2.4"/>
      </g>
      <text x="87" y="230" font-size="11" text-anchor="middle" font-family="Archivo, Arial, sans-serif" fill="currentColor" opacity="0.65" letter-spacing="1">PÚBLICA</text>
      <text x="200" y="230" font-size="11" text-anchor="middle" font-family="Archivo, Arial, sans-serif" fill="currentColor" opacity="0.65" letter-spacing="1">PRIVADA</text>
      <text x="313" y="230" font-size="11" text-anchor="middle" font-family="Archivo, Arial, sans-serif" fill="currentColor" opacity="0.65" letter-spacing="1">HÍBRIDA</text>
      <path class="art-line" d="M28 114h66m212 0h66"/>
      <path class="art-faint" d="M60 258h280"/>
    `
    ),

  tiles: () =>
    OPEN(
      "Grade de serviços com um em destaque",
      `
      <g class="art-faint">
        <rect x="68" y="64" width="72" height="58" rx="8"/>
        <rect x="156" y="64" width="72" height="58" rx="8"/>
        <rect x="244" y="64" width="72" height="58" rx="8"/>
        <rect x="68" y="136" width="72" height="58" rx="8"/>
        <rect x="244" y="136" width="72" height="58" rx="8"/>
        <rect x="68" y="208" width="72" height="58" rx="8"/>
        <rect x="156" y="208" width="72" height="58" rx="8"/>
        <rect x="244" y="208" width="72" height="58" rx="8"/>
        <circle cx="80" cy="78" r="2.2"/>
        <circle cx="168" cy="78" r="2.2"/>
        <circle cx="256" cy="78" r="2.2"/>
        <circle cx="80" cy="224" r="2.2"/>
        <circle cx="168" cy="224" r="2.2"/>
        <circle cx="256" cy="224" r="2.2"/>
      </g>
      <g class="art-float">
        <rect class="art-soft art-accent" x="156" y="136" width="72" height="58" rx="8"/>
        <path class="art-accent art-draw" d="M180 166l10 10 20-20"/>
      </g>
      <circle class="art-dot art-pulse" cx="280" cy="110" r="3.2"/>
    `
    ),

  path: () =>
    OPEN(
      "Trilha de perguntas até o pin de mapa",
      `
      <path class="art-faint art-dash" d="M56 238C120 236 140 198 178 184C222 168 268 144 332 86"/>
      <circle class="art-line art-paper" cx="92" cy="228" r="16"/>
      <text x="92" y="233" font-size="15" text-anchor="middle" font-family="Georgia, serif" fill="currentColor" opacity="0.75">?</text>
      <circle class="art-line art-paper" cx="176" cy="182" r="16"/>
      <text x="176" y="187" font-size="15" text-anchor="middle" font-family="Georgia, serif" fill="currentColor" opacity="0.75">?</text>
      <circle class="art-line art-paper" cx="258" cy="136" r="16"/>
      <text x="258" y="141" font-size="15" text-anchor="middle" font-family="Georgia, serif" fill="currentColor" opacity="0.75">?</text>
      <g class="art-float">
        <path class="art-accent" d="M332 24c-15 0-26 11-26 25 0 19 26 37 26 37s26-18 26-37c0-14-11-25-26-25Z"/>
        <circle class="art-paper" cx="332" cy="49" r="10"/>
        <circle class="art-dot art-pulse" cx="332" cy="49" r="4"/>
      </g>
      <circle class="art-dot-soft" cx="56" cy="238" r="3"/>
    `
    ),

  steps: () =>
    OPEN(
      "Escada de progresso com bandeira no topo",
      `
      <path class="art-faint" d="M56 276h304"/>
      <path class="art-line" d="M64 248h60v-42h60v-42h62v-42h64"/>
      <g class="art-float art-float--slow">
        <path class="art-soft art-accent" d="M310 64h34l-8 10 8 10h-34Z"/>
      </g>
      <path class="art-line" d="M310 122V64"/>
      <circle class="art-dot art-pulse" cx="344" cy="80" r="3"/>
      <circle class="art-dot-soft" cx="94" cy="248" r="2.6"/>
      <circle class="art-dot" cx="186" cy="206" r="3"/>
      <path class="art-faint" d="M248 164h46"/>
    `
    ),

  prompt: () =>
    OPEN(
      "Janela de chat com pergunta e resposta",
      `
      <rect class="art-line" x="76" y="60" width="248" height="176" rx="10"/>
      <path class="art-faint" d="M76 88h248"/>
      <circle class="art-dot-soft" cx="92" cy="74" r="2.6"/>
      <circle class="art-dot-soft" cx="104" cy="74" r="2.6"/>
      <g class="art-float art-float--slow">
        <rect class="art-line art-paper" x="98" y="112" width="112" height="34" rx="10"/>
        <circle class="art-dot" cx="140" cy="129" r="2.6"/>
        <circle class="art-dot art-pulse" cx="154" cy="129" r="2.6"/>
        <circle class="art-dot" cx="168" cy="129" r="2.6"/>
      </g>
      <rect class="art-line art-paper" x="192" y="164" width="112" height="34" rx="10"/>
      <path class="art-faint" d="M210 176h66M210 184h44"/>
      <path class="art-accent" d="M286 170v22"/>
      <path class="art-faint" d="M98 218h186"/>
      <path class="art-accent" d="M292 210v16"/>
    `
    ),

  contours: () =>
    OPEN(
      "Mapa com curvas de nível e lupa conferindo",
      `
      <g class="art-float art-float--slow">
        <circle class="art-faint" cx="168" cy="142" r="64"/>
        <circle class="art-line" cx="168" cy="142" r="44"/>
        <circle class="art-line" cx="168" cy="142" r="26"/>
        <circle class="art-dot art-pulse" cx="168" cy="118" r="3.6"/>
      </g>
      <path class="art-faint" d="M330 94V66m0 0-7 11h14"/>
      <g class="art-float">
        <circle class="art-accent" cx="268" cy="196" r="26"/>
        <circle class="art-dot" cx="260" cy="188" r="3.6"/>
        <path class="art-accent" d="M287 214l26 26"/>
      </g>
      <path class="art-faint" d="M74 246h104"/>
    `
    ),

  broken: () =>
    OPEN(
      "Janela de navegador danificada com interrogação",
      `
      <path class="art-line art-paper" d="M70 64h260v168l-26 10-26-10-26 10-26-10-26 10-26-10-26 10-26-10-26 10-26-10Z"/>
      <path class="art-faint" d="M70 92h260"/>
      <circle class="art-dot-soft" cx="84" cy="78" r="2.6"/>
      <circle class="art-dot-soft" cx="98" cy="78" r="2.6"/>
      <path class="art-accent art-draw" d="M252 104l22 18-13 11 19 15"/>
      <text x="200" y="196" font-size="58" text-anchor="middle" font-family="Georgia, serif" fill="currentColor">?</text>
      <circle class="art-dot art-pulse" cx="246" cy="196" r="3.2"/>
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
