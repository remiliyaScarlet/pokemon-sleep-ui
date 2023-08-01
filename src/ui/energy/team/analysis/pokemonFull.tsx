import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {imageIconSizes, imagePortraitSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {EnergyAnalysisOnBerry} from '@/ui/energy/team/analysis/berry';
import {EnergyTeamLevelSlider} from '@/ui/energy/team/analysis/level';
import {teamSlotStyle} from '@/ui/energy/team/analysis/style';
import {EnergyAnalysisPokemonProps} from '@/ui/energy/team/analysis/type';


type Props = EnergyAnalysisPokemonProps & {
  pokemon: PokemonInfo,
};

export const EnergyTeamAnalysisPokemonFull = ({
  setFilter,
  slot,
  slotName,
  pokemon,
  berryMap,
  productionStats,
}: Props) => {
  const t = useTranslations('Game');

  const {id, type, berry} = pokemon;
  const berryData = berryMap[berry.id];
  const maxLevel = berryData.energy.length;

  const setLevel = (newLevel: number) => setFilter((original) => ({
    ...original,
    team: {
      ...original.team,
      [slotName]: {
        ...original.team[slotName],
        level: newLevel,
      },
    },
  }));

  return (
    <Flex direction="col" center className={teamSlotStyle}>
      <Flex direction="row" center className="gap-0.5 whitespace-nowrap">
        <div className="relative h-5 w-5">
          <Image
            src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)} fill
            className="drop-shadow-thick" sizes={imageIconSizes}
          />
        </div>
        <div>
          {t(`PokemonName.${id}`)}
        </div>
      </Flex>
      <Flex direction="row" center>
        <div className="relative h-24 w-24">
          <Image
            src={`/images/pokemon/portrait/${id}.png`} alt={t(`PokemonName.${id}`)}
            fill sizes={imagePortraitSizes}
          />
        </div>
      </Flex>
      <EnergyTeamLevelSlider level={slot.level} setLevel={setLevel} maxLevel={maxLevel}/>
      <EnergyAnalysisOnBerry berryData={berryData} rate={productionStats.berry}/>
    </Flex>
  );
};
