import {AnnouncementLevel} from '@/types/mongo/announcement';


export const announcementLevelToText: {[level in AnnouncementLevel]: string} = {
  info: 'Info',
  ok: 'OK',
  warning: 'Warning',
  alert: 'Alert',
};
