<script setup lang="ts">
import { HERO_CAR } from '@/constants/images'
import { useContent } from '@/i18n'
import { imageSources } from '@/utils/image'
import { paintFilter } from '@/utils/paint'
import type { PaintFilter } from '@/types/car'

defineProps<{ paint: PaintFilter }>()

const content = useContent()

const photo = imageSources(HERO_CAR.folder, HERO_CAR.name, HERO_CAR.widths)
const paintLayer = imageSources(HERO_CAR.folder, HERO_CAR.paint, HERO_CAR.widths)
</script>

<template>
  <div class="car">
    <img
      class="car__photo"
      :src="photo.src"
      :srcset="photo.srcset"
      :sizes="HERO_CAR.sizes"
      :width="HERO_CAR.width"
      :height="HERO_CAR.height"
      :alt="content.hero.carAlt"
      fetchpriority="high"
    />
    <img
      class="car__paint"
      :src="paintLayer.src"
      :srcset="paintLayer.srcset"
      :sizes="HERO_CAR.sizes"
      :width="HERO_CAR.width"
      :height="HERO_CAR.height"
      :style="{ filter: paintFilter(paint) }"
      alt=""
      aria-hidden="true"
    />
  </div>
</template>

<style scoped lang="scss">
.car {
  position: relative;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  &__paint {
    position: absolute;
    inset: 0;

    @include motion {
      transition: filter 0.6s ease;
    }
  }
}
</style>
