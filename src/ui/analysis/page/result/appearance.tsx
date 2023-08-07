import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {MapLink} from '@/components/shared/map/link';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {AnalysisStatsSleepStyleAppearance} from '@/ui/analysis/page/calc/type';
import {AnalysisStatsContinuousUI} from '@/ui/analysis/page/result/continuous';


type Props = {
  stats: AnalysisStatsSleepStyleAppearance,
  mapId: number,
  i18nTitleKey: I18nMessageKeysOfNamespace<'UI.InPage.Analysis'>,
};

export const AnalysisStatsAppearanceUI = ({stats, mapId, i18nTitleKey}: Props) => {
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Analysis');

  const mapName = t(`Field.${mapId}`);

  return (
    <AnalysisStatsContinuousUI stats={stats} title={t2(i18nTitleKey, {mapName})}>
      <MapLink mapId={mapId} className="h-full w-full p-1.5">
        <Flex direction="col" center className="z-10 gap-1.5 md:flex-row">
          <h4 className="text-xl">
            {mapName}
          </h4>
          <SnorlaxRankUI rank={stats.snorlaxRank}/>
        </Flex>
      </MapLink>
    </AnalysisStatsContinuousUI>
  );
};
