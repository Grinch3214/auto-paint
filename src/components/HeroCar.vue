<script setup lang="ts">
import carRaw from '@/assets/hero-car.svg?raw'
import { parseCarSvg } from '@/utils/car'

const carParts = parseCarSvg(carRaw)
const paintPaths = carParts.filter((p) => p.part === 'paint')
</script>

<!-- Временная SVG-машина: цвет кузова берётся из --car. Заменим на фото Audi -->
<template>
  <svg class="car" viewBox="-20 -10 1320 700" role="img" aria-hidden="true">
    <defs>
      <!-- всё, что красится: для светотени поверх цвета -->
      <clipPath id="h-paint">
        <path
          v-for="(p, i) in paintPaths"
          :key="i"
          :d="p.d"
          transform="translate(0 660) scale(.1 -.1)"
        />
      </clipPath>
      <linearGradient id="h-shade-v" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".28" />
        <stop offset=".3" stop-color="#fff" stop-opacity=".1" />
        <stop offset=".48" stop-color="#fff" stop-opacity=".02" />
        <stop offset=".5" stop-color="#000" stop-opacity=".12" />
        <stop offset=".75" stop-color="#000" stop-opacity=".22" />
        <stop offset="1" stop-color="#000" stop-opacity=".55" />
      </linearGradient>
      <linearGradient id="h-shade-h" x1="0" x2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".45" />
        <stop offset=".35" stop-color="#000" stop-opacity="0" />
        <stop offset=".8" stop-color="#fff" stop-opacity=".06" />
        <stop offset="1" stop-color="#000" stop-opacity=".25" />
      </linearGradient>
      <linearGradient id="h-glass-fill" x1="0" y1="0" x2=".4" y2="1">
        <stop offset="0" stop-color="#3a3f48" />
        <stop offset=".45" stop-color="#15171b" />
        <stop offset="1" stop-color="#08090b" />
      </linearGradient>
      <radialGradient id="h-rim" cx=".45" cy=".4" r=".6">
        <stop offset="0" stop-color="#e9ecef" />
        <stop offset=".6" stop-color="#9aa1aa" />
        <stop offset="1" stop-color="#4a4f57" />
      </radialGradient>
      <linearGradient id="h-lens" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#454b55" />
        <stop offset="1" stop-color="#0d0e11" />
      </linearGradient>
      <linearGradient id="h-sweep" x1="0" x2="1">
        <stop offset="0" stop-color="#fff" stop-opacity="0" />
        <stop offset=".5" stop-color="#fff" stop-opacity=".45" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
      <radialGradient id="h-spec" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff" stop-opacity=".5" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </radialGradient>
      <pattern id="h-honey" width="10" height="9" patternUnits="userSpaceOnUse">
        <rect width="10" height="9" fill="#08090a" />
        <path
          d="M2.5 0H7.5L10 4.5L7.5 9H2.5L0 4.5Z"
          fill="#202328"
          stroke="#08090a"
          stroke-width="1.2"
        />
      </pattern>
      <filter id="h-blur" x="-20%" y="-60%" width="140%" height="220%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <filter id="h-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- тень под машиной -->
    <ellipse cx="700" cy="640" rx="620" ry="34" fill="#000" opacity=".85" filter="url(#h-blur)" />
    <ellipse cx="60" cy="430" rx="110" ry="18" fill="#000" opacity=".7" filter="url(#h-blur)" />

    <!-- диски под трафаретом: спицы = зазоры, через них виден металл -->
    <ellipse cx="490" cy="489" rx="112" ry="126" fill="url(#h-rim)" />
    <ellipse cx="490" cy="489" rx="30" ry="34" fill="#2a2e34" />
    <ellipse cx="50" cy="334" rx="28" ry="82" fill="url(#h-rim)" />

    <!-- детали машины -->
    <g transform="translate(0 660) scale(.1 -.1)">
      <path v-for="(p, i) in carParts" :key="i" :d="p.d" :class="`car-${p.part}`" />
    </g>

    <!-- светотень и блики только по кузову -->
    <g clip-path="url(#h-paint)">
      <rect x="-20" y="-10" width="1320" height="700" fill="url(#h-shade-v)" />
      <rect x="-20" y="-10" width="1320" height="700" fill="url(#h-shade-h)" />
      <ellipse
        cx="820"
        cy="190"
        rx="260"
        ry="34"
        fill="url(#h-spec)"
        transform="rotate(12 820 190)"
      />
      <ellipse
        cx="560"
        cy="210"
        rx="180"
        ry="14"
        fill="url(#h-spec)"
        transform="rotate(14 560 210)"
      />
      <ellipse cx="1090" cy="300" rx="150" ry="12" fill="url(#h-spec)" opacity=".7" />
      <ellipse
        cx="760"
        cy="420"
        rx="160"
        ry="18"
        fill="url(#h-spec)"
        opacity=".5"
        transform="rotate(8 760 420)"
      />
      <ellipse
        cx="200"
        cy="230"
        rx="90"
        ry="10"
        fill="url(#h-spec)"
        opacity=".6"
        transform="rotate(10 200 230)"
      />
      <rect class="sweep" x="-420" y="-10" width="300" height="700" fill="url(#h-sweep)" />
    </g>

    <!-- отражения ламп камеры на лобовом -->
    <g fill="#fff" opacity=".18">
      <rect x="420" y="50" width="160" height="6" rx="3" transform="rotate(8 500 53)" />
      <rect x="600" y="80" width="120" height="6" rx="3" transform="rotate(14 660 83)" />
    </g>
  </svg>
</template>

<style scoped lang="scss">
.car-paint {
  fill: var(--car);
  transition: fill 0.5s ease;
}

.car-glass {
  fill: url(#h-glass-fill);
}

.car-trim {
  fill: #15171b;
}

.car-grille {
  fill: url(#h-honey);
}

.car-tire {
  fill: #0b0c0e;
}

.car-rim {
  fill: #17191d;
}

.car-lens {
  fill: url(#h-lens);
}

.car-light {
  fill: #c9d1dc;
  opacity: 0.75;
}

.car-amber {
  fill: #e7781f;
}

.sweep {
  @include motion {
    animation: sweep 5s ease-in-out infinite;
  }
}

@keyframes sweep {
  0%,
  35% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(1900px);
  }
}
</style>
