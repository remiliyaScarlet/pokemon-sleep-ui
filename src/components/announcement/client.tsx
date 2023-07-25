'use client';
import React from 'react';

import {alertClassCommon, alertClasses} from '@/components/announcement/styles';
import {Announcement} from '@/types/mongo/announcement';
import {classNames} from '@/utils/react';

import styles from './main.module.css';


type Props = {
  announcements: Announcement[],
};

export const AnnouncementsClient = ({announcements}: Props) => {
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

  return (
    <>
      <div className={classNames(alertClassCommon, styles['announcement'])}>
        <div
          className={classNames(alertClassCommon, alertClasses[level])}
          onAnimationIteration={() => setIdx((idx + 1) % announcements.length)}
        >
          {message}
        </div>
      </div>
      <hr className="border-t-gray-700"/>
    </>
  );
};
