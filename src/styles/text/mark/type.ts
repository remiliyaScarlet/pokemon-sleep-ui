export type TextMarkStyle = 'rare' | 'superRare' | 'ordinary';

export type TextMarkThreshold = {[mark in TextMarkStyle]?: number};
