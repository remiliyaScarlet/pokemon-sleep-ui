'use client';
import React from 'react';

import {DocsEditor} from '@/components/shared/docs/editor/main';
import {DocsDataEditableFetched} from '@/types/mongo/docs';
import {Locale} from '@/types/next/locale';


type Props = {
  locale: Locale,
  initialDoc: DocsDataEditableFetched,
};

export const DocsEditClient = ({locale, initialDoc}: Props) => {
  const [data, setData] = React.useState(initialDoc);

  return (
    <DocsEditor
      idPrefix="editDoc"
      locale={locale}
      doc={data}
      onDocUpdated={(doc) => setData((original) => ({
        ...original,
        ...doc,
      } satisfies DocsDataEditableFetched))}
      getUserDataAction={(editable) => ({
        action: 'upload',
        options: {
          type: 'cms.docs.edit',
          data: {
            id: data.id,
            ...editable,
          },
        },
      })}
    />
  );
};
