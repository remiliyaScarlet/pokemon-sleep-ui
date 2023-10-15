import React from 'react';

import {useLocale} from 'next-intl';

import {AnnouncementsClient} from '@/components/announcement/client';
import {AnnouncementProps} from '@/components/announcement/type';
import {getAllAnnouncements} from '@/controller/announcement';
import {isLocale} from '@/utils/i18n';


export const Announcements = (props: AnnouncementProps) => {
  const locale = useLocale();
  const announcements = React.use(getAllAnnouncements(isLocale(locale) ? locale : null));

  if (!announcements.length) {
    return null;
  }

  return <AnnouncementsClient announcements={announcements} {...props}/>;
};
