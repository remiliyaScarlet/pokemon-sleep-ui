'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonProducingRate} from '@/components/shared/pokemon/rate/main';
import {imageSmallIconSizes} from '@/styles/image';
import {getPokemonBerryProducingRate, GetPokemonBerryProducingRateOpts} from '@/utils/game/pokemon';


type Props = Omit<GetPokemonBerryProducingRateOpts, 'level'> & {
  berryName: string,
};

export const PokemonBerryMeta = (props: Props) => {
  const {berry, berryData, berryName} = props;
  const [level, setLevel] = React.useState(1);

  const t = useTranslations('UI.InPage.Pokedex');

  const atLevel = getPokemonBerryProducingRate({level, ...props});

  return (
    <Flex direction="col" center className="gap-1">
      <Flex direction="row" center className="gap-1">
        <div className="relative h-10 w-10">
          <NextImage src={`/images/berry/${berry.id}.png`} alt={berryName} sizes={imageSmallIconSizes}/>
        </div>
        <div className="whitespace-nowrap text-lg">
          {berryName} &times; {berry.quantity}
        </div>
      </Flex>
      <Flex direction="col" className="gap-1">
        <Flex direction="row" className="gap-1">
          <div className="whitespace-nowrap">
            {t('Info.PokemonLevel')}
          </div>
          <div>
            {level}
          </div>
        </Flex>
        <Slider
          id="BerryEnergy"
          value={level}
          setValue={setLevel}
          min={1}
          max={berryData.energy.length}
        />
        <PokemonProducingRate
          rate={atLevel}
          icon={<NextImage src={`/images/berry/${berry.id}.png`} alt={berryName} sizes={imageSmallIconSizes}/>}
        />
      </Flex>
    </Flex>
  );
};
