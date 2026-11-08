// types.ts

export interface Book {
  id: string;
  title: string;
  author: string;
  spineColor: string;
  initials: string;
}

export interface Genre {
  id: string;
  label: string;
}

export interface ShelfStat {
  id: string;
  value: string;
  label: string;
}
