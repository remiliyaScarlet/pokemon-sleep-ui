import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {PokeboxPreviewButton} from '@/ui/team/pokebox/content/preview/button';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';


export type PokeboxPreviewStatusProps = {
  filter: PokeboxViewerFilter,
  setFilter: ReactStateUpdaterFromOriginal<PokeboxViewerFilter>,
};

export const PokeboxPreviewStatus = ({filter, setFilter}: PokeboxPreviewStatusProps) => {
  const {previewLevel, previewFinalEvolution} = filter;

  const t = useTranslations('UI.InPage.Team.Box.Preview');

  if (!previewLevel && !previewFinalEvolution) {
    return null;
  }

  return (
    <Flex direction="row" wrap className="gap-1.5">
      {
        previewLevel &&
        <PokeboxPreviewButton
          message={t('Level')}
          onClick={() => setFilter((original) => ({
            ...original,
            previewLevel: null,
          }))}
        />
      }
      {
        previewFinalEvolution &&
        <PokeboxPreviewButton
          message={t('FinalEvolution')}
          onClick={() => setFilter((original) => ({
            ...original,
            previewFinalEvolution: false,
          }))}
        />
      }
    </Flex>
  );
};
