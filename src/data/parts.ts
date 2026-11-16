import type { Part } from '@/types/parts'

// Порядок = порядок на странице: бампер — самая частая работа, первым
export const PARTS: readonly Part[] = [
  { id: 'bumper', prices: ['bumper', 'parkingSensors'] },
  { id: 'hood', prices: ['hood'] },
  { id: 'fender', prices: ['frontFender', 'rearFender'] },
  { id: 'door', prices: ['door', 'doorBothSides', 'doorOpeningHalf', 'upperPillar'] },
  { id: 'roof', prices: ['roof', 'trunkLid', 'trunkLidBothSides'] },
  { id: 'sill', prices: ['sillMetal', 'sillPlastic'] },
  { id: 'small', prices: ['mirrorCover', 'doorHandle', 'moldings', 'spoiler'] },
]
