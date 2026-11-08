// data.ts
// Static content only — no network calls, per the "no backend" brief.

import { colors } from './theme'
import { Book, Genre, ShelfStat } from './types'

export const currentlyReading: Book = {
  id: 'cr-1',
  title: 'Hell University',
  author: 'Knight in Black',
  spineColor: colors.berry,
  initials: 'HU',
}

export const currentlyReadingProgress = 0.95 // 95% through

export const genres: Genre[] = [
  { id: 'g1', label: 'Literary fiction' },
  { id: 'g2', label: 'Essays' },
  { id: 'g3', label: 'Poetry' },
  { id: 'g4', label: 'Nonfiction' },
  { id: 'g5', label: 'Short stories' },
  { id: 'g6', label: 'Translated' },
]

export const staffPicks: Book[] = [
  {
    id: 'sp-1',
    title: 'Braiding Sweetgrass',
    author: 'Robin Wall Kimmerer',
    spineColor: colors.moss,
    initials: 'BS',
  },
  {
    id: 'sp-2',
    title: 'Convenience Store Woman',
    author: 'Sayaka Murata',
    spineColor: colors.brassMuted,
    initials: 'CS',
  },
  {
    id: 'sp-3',
    title: 'The Copenhagen Trilogy',
    author: 'Tove Ditlevsen',
    spineColor: colors.mossDeep,
    initials: 'CT',
  },
  {
    id: 'sp-4',
    title: 'Minor Feelings',
    author: 'Cathy Park Hong',
    spineColor: colors.berrySoft,
    initials: 'MF',
  },
]

export const shelfStats: ShelfStat[] = [
  { id: 'st-1', value: '27', label: 'Books this year' },
  { id: 'st-2', value: '8,412', label: 'Pages turned' },
  { id: 'st-3', value: '14', label: 'Day streak' },
]
