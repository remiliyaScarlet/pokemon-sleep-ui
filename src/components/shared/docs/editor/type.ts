export const docsEditorDisplayType = [
  'markdown',
  'preview',
] as const;

export type DocsEditorDisplayType = typeof docsEditorDisplayType[number];
