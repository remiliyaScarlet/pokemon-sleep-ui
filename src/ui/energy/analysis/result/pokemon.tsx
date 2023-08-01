import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonIngredients} from '@/components/shared/pokemon/ingredients';
import {imageIconSizes, imagePortraitSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {EnergyAnalysisOnBerry} from '@/ui/energy/analysis/result/berry';
import {EnergyAnalysisLevelSlider} from '@/ui/energy/analysis/result/level';
import {ProductionStatsSingle} from '@/ui/energy/analysis/result/type';
import {EnergyAnalysisDataProps, EnergyAnalysisMember, EnergyAnalysisSlotName} from '@/ui/energy/analysis/type';


type Props = Pick<EnergyAnalysisDataProps, 'berryMap'> & {
  setLevel: (newLevel: number) => void,
  slotName: EnergyAnalysisSlotName,
  slot: EnergyAnalysisMember,
  pokemon: PokemonInfo,
  productionStats: ProductionStatsSingle,
};

export const EnergyAnalysisPokemon = ({
  setLevel,
  slot,
  pokemon,
  berryMap,
  productionStats,
}: Props) => {
  const t = useTranslations('Game');

  const {id, type, berry, ingredients, skill} = pokemon;
  const berryData = berryMap[berry.id];
  const maxLevel = berryData.energy.length;

  return (
    <>
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
        <div className="relative h-28 w-28">
          <Image
            src={`/images/pokemon/portrait/${id}.png`} alt={t(`PokemonName.${id}`)}
            fill sizes={imagePortraitSizes}
          />
        </div>
      </Flex>
      <Flex direction="row" className="justify-end">
        <PokemonIngredients ingredients={ingredients}/>
      </Flex>
      <Flex direction="row" className="justify-end text-xs">
        {t(`MainSkill.Name.${skill}`)}
      </Flex>
      <EnergyAnalysisLevelSlider level={slot.level} setLevel={setLevel} maxLevel={maxLevel}/>
      <EnergyAnalysisOnBerry berryData={berryData} rate={productionStats.berry}/>
    </>
  );
};
