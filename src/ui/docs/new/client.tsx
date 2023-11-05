'use client';
import React from 'react';

import {DocsEditor} from '@/components/shared/docs/editor/main';
import {DocsDataEditable} from '@/types/mongo/docs';
import {Locale} from '@/types/next/locale';


type Props = {
  locale: Locale,
};

export const DocsNewClient = ({locale}: Props) => {
  const [data, setData] = React.useState<DocsDataEditable>({
    locale,
    path: '',
    title: '',
    content: '',
    showIndex: true,
    related: [],
  });

  return (
    <DocsEditor
      idPrefix="newDoc"
      locale={locale}
      doc={data}
      onDocUpdated={setData}
      getUserDataAction={(editable) => ({
        action: 'upload',
        options: {
          type: 'cms.docs.create',
          data: editable,
        },
      })}
    />
  );
};
