<template>
  <svg class="art" viewBox="0 0 480 300" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="nf-mist" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" class="art__mist-stop" stop-opacity="0.6" />
        <stop offset="1" class="art__mist-stop" stop-opacity="0" />
      </linearGradient>
      <clipPath id="nf-painted">
        <path d="M262 92 H340 V290 H208 Z" />
      </clipPath>
      <path
        id="nf-window"
        d="M23.5 -5 L48.9 -17.8 A52 52 0 0 1 48.9 17.8 L23.5 5 Z"
        stroke-linejoin="round"
      />
    </defs>

    <line class="art__ground" x1="16" y1="284" x2="464" y2="284" />

    <path
      class="art__digit"
      transform="translate(28 122)"
      fill-rule="evenodd"
      d="M72 0 H102 V102 H115 V130 H102 V160 H72 V130 H0 V104 Z M72 50 L34 102 H72 Z"
    />
    <path
      class="art__digit"
      transform="translate(340 122)"
      fill-rule="evenodd"
      d="M72 0 H102 V102 H115 V130 H102 V160 H72 V130 H0 V104 Z M72 50 L34 102 H72 Z"
    />

    <g transform="translate(240 190)">
      <circle class="art__tire" r="92" />
      <circle class="art__tread" r="84" />
      <circle class="art__rim" r="60" />
    </g>
    <circle class="art__paint" cx="240" cy="190" r="60" clip-path="url(#nf-painted)" />
    <g class="art__spokes" transform="translate(240 190)">
      <use href="#nf-window" transform="rotate(-54)" />
      <use href="#nf-window" transform="rotate(18)" />
      <use href="#nf-window" transform="rotate(90)" />
      <use href="#nf-window" transform="rotate(162)" />
      <use href="#nf-window" transform="rotate(234)" />
      <circle class="art__lip" r="60" />
      <circle class="art__hub" r="16" />
      <circle class="art__cap" r="6" />
    </g>

    <g class="art__dust">
      <circle cx="262" cy="148" r="2.5" />
      <circle cx="252" cy="166" r="2" />
      <circle cx="272" cy="126" r="1.6" />
      <circle cx="244" cy="214" r="2.2" />
      <circle cx="236" cy="246" r="1.8" />
      <circle cx="226" cy="262" r="1.4" />
      <circle cx="346" cy="132" r="2" />
      <circle cx="356" cy="140" r="1.5" />
      <circle cx="342" cy="150" r="1.3" />
    </g>

    <g transform="translate(346 108) rotate(-40) translate(0 -24)">
      <path class="art__mist" d="M0 24 L-104 -8 Q-118 24 -104 56 Z" fill="url(#nf-mist)" />
      <path class="art__gun art__gun--handle" d="M70 32 H92 L100 92 H80 Z" />
      <rect class="art__gun" x="80" y="92" width="22" height="9" rx="2" />
      <path class="art__trigger" d="M58 34 Q48 56 60 76" />
      <path class="art__gun" d="M12 14 H86 Q96 14 96 24 V34 H12 Z" />
      <rect class="art__gun" x="55" y="2" width="12" height="13" />
      <path class="art__cup" d="M44 -40 H80 L73 3 H51 Z" />
      <rect class="art__gun" x="41" y="-47" width="42" height="8" rx="3" />
      <circle class="art__gun art__gun--cap" cx="6" cy="24" r="10" />
    </g>
  </svg>
</template>

<style scoped lang="scss">
.art {
  display: block;
  width: 100%;
  height: auto;

  &__ground {
    stroke: var(--color-border);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 2 10;
  }

  &__digit {
    fill: var(--color-text);
  }

  &__tire {
    fill: var(--hero-0);
  }

  &__tread {
    fill: none;
    stroke: var(--hero-1);
    stroke-width: 6;
    stroke-dasharray: 4 9;
  }

  &__rim {
    fill: var(--color-border);
  }

  &__paint {
    fill: var(--color-accent);
  }

  &__spokes use {
    fill: var(--hero-0);
    stroke: var(--hero-1);
    stroke-width: 2;
  }

  &__lip {
    fill: none;
    stroke: var(--hero-1);
    stroke-width: 3;
  }

  &__hub {
    fill: var(--hero-1);
  }

  &__cap {
    fill: var(--color-border);
  }

  &__dust {
    fill: var(--color-accent);
    opacity: 0.7;
  }

  &__mist-stop {
    stop-color: var(--color-accent);
  }

  &__gun {
    fill: var(--hero-1);
    stroke: var(--color-text);
    stroke-width: 2.5;
    stroke-linejoin: round;

    &--handle {
      fill: var(--hero-0);
    }

    &--cap {
      fill: var(--color-surface);
    }
  }

  &__cup {
    fill: var(--color-surface);
    stroke: var(--color-text);
    stroke-width: 2.5;
    stroke-linejoin: round;
  }

  &__trigger {
    fill: none;
    stroke: var(--color-text);
    stroke-width: 4;
    stroke-linecap: round;
  }

  @include motion {
    &__mist {
      transform-box: fill-box;
      transform-origin: 100% 50%;
      animation: spray 1.6s ease-in-out infinite;
    }
  }
}

@keyframes spray {
  0%,
  100% {
    opacity: 0.55;
    transform: scaleX(0.92);
  }

  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}
</style>
