import React from 'react';

import {useTranslations} from 'next-intl';

import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {InfoSlider} from '@/components/shared/input/infoSlider';
import {BerryData} from '@/types/game/berry';
import {getBerryEnergyInfo} from '@/utils/game/berry';
import {formatInt} from '@/utils/number/format';


type Props = {
  berryData: BerryData,
  level: number,
  setLevel: (level: number) => void,
};

export const BerryLevelSlider = ({berryData, level, setLevel}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');
  const t2 = useTranslations('UI.InPage.Berry');

  const {atLevel, diffVal, diffPct} = React.useMemo(() => getBerryEnergyInfo({
    berryData,
    level,
  }), [berryData, level]);

  return (
    <InfoSlider
      title={t('Info.PokemonLevel')} id="berryLevel"
      level={level} setLevel={setLevel} maxLevel={berryData.energy.length}
    >
      <ColoredEnergyIcon dimension="h-4 w-4" alt={t2('Energy')}/>
      <div className="text-sm">
        {formatInt(atLevel.energy)} (+{formatInt(diffVal)} / +{diffPct.toFixed(0)}%)
      </div>
    </InfoSlider>
  );
};
