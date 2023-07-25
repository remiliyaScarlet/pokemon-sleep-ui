import {Locale} from '@/types/next/locale';


export type AnnouncementLevel = 'info' | 'ok' | 'warning' | 'alert';

export type Announcement = {
  message: string,
  locale: Locale[],
  level: AnnouncementLevel,
};
