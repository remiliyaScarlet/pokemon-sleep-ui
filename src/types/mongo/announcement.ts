import {Locale} from '@/types/next/locale';


export const announcementLevels = [
  'info',
  'ok',
  'warning',
  'alert',
] as const;

export type AnnouncementLevel = typeof announcementLevels[number];

// Check `addAnnouncementDataValidation()` for data validation
export type Announcement = {
  uuid: string,
  message: string,
  locale: Locale[],
  level: AnnouncementLevel,
  expiry?: string,
  order?: number,
};

export type AnnouncementMap = {[uuid in string]?: Announcement};
