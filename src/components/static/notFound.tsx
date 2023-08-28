import React from 'react';

import {Failed} from '@/components/icons/failed';
import {defaultLocale} from '@/const/website';


export const NotFound = () => {
  return (
    <html lang={defaultLocale}>
      <body>
        <Failed text="404"/>
      </body>
    </html>
  );
};
