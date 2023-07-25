import React from 'react';

import {useLocale} from 'next-intl';

import {AnnouncementsClient} from '@/components/announcement/client';
import {getAllAnnouncements} from '@/controller/announcement';
import {isLocale} from '@/utils/i18n';


export const Announcements = () => {
  const locale = useLocale();
  const announcements = React.use(getAllAnnouncements(isLocale(locale) ? locale : null));

  if (!announcements.length) {
    return <></>;
  }

  return <AnnouncementsClient announcements={announcements}/>;
};
