import {Announcement, AnnouncementMap} from '@/types/mongo/announcement';


export type AdminAnnouncementServerDataProps = {
  preloaded: AnnouncementMap,
};

export type AdminAnnouncementModifyProps = {
  onUpdate: (uuid: string, update: Partial<Announcement>) => void,
  onDelete: (uuid: string) => void,
};
