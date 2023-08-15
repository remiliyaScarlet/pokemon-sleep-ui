import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {PokeInBox} from '@/types/game/pokebox';
import {SubSkillMap} from '@/types/game/pokemon/subskill';
import {PokedexMap} from '@/types/mongo/pokemon';
import {PokeboxPokeInBoxDetails} from '@/ui/team/pokebox/content/details/main';
import {PokeboxPokeInBoxFixedInfo} from '@/ui/team/pokebox/content/fixed';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';


type Props = {
  pokeInBox: PokeInBox,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  displayType: PokeboxDisplayType,
};

// FIXME: Click to show popup for edit
export const PokeboxContentPokeInBox = (props: Props) => {
  const {pokeInBox, pokedexMap, displayType} = props;
  const {pokemon: pokemonId} = pokeInBox;
  const pokemon = pokedexMap[pokemonId];

  const t = useTranslations('Game');

  if (!pokemon) {
    return <></>;
  }

  const pokemonName = t(`PokemonName.${pokemonId}`);

  const pokeInBoxProps: PokeboxPokeInBoxCommonProps = {
    ...props,
    pokemon,
    displayType,
  };

  return (
    <Flex direction="col" noFullWidth className={clsx(
      'button-bg width-with-gap-sm md:width-with-gap-2-items lg:width-with-gap-3-items gap-1.5 rounded-lg p-2',
    )}>
      <Flex direction="row" className="gap-2">
        <div className="relative h-16 w-16">
          <NextImage src={`/images/pokemon/icons/${pokemonId}.png`} alt={pokemonName} sizes={imageIconSizes}/>
        </div>
        <Flex direction="col" className="gap-1">
          <PokeboxPokeInBoxFixedInfo {...pokeInBoxProps}/>
          <div className="mt-auto">
            <PokeboxPokeInBoxDetails {...pokeInBoxProps}/>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};
