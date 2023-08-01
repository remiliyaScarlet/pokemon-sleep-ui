'use client';
import React from 'react';

import {announcementTextClasses} from '@/components/announcement/styles';
import {AnnouncementProps} from '@/components/announcement/type';
import {Announcement} from '@/types/mongo/announcement';
import {classNames} from '@/utils/react';

import styles from './main.module.css';


type Props = AnnouncementProps & {
  announcements: Announcement[],
};

export const AnnouncementsClient = ({larger, announcements}: Props) => {
  const [idx, setIdx] = React.useState(0);

  // Could be `undefined` if `idx` goes out of bound
  // - This could happen if the user switch to the other language with less site alerts
  // Reference: https://github.com/RaenonX-DL/dragalia-site-front/issues/253
  const announcement = announcements[idx] as Announcement | undefined;

  if (!announcement) {
    setIdx(0);
    return <></>;
  }

  const {message, level} = announcement;
  const commonClass = larger ? styles['announcement-lg'] : styles['announcement'];

  return (
    <div className={classNames(styles['announcement-animation'], commonClass)}>
      <div
        className={classNames(announcementTextClasses[level], commonClass)}
        onAnimationIteration={() => setIdx((idx + 1) % announcements.length)}
      >
        {message}
      </div>
    </div>
  );
};
