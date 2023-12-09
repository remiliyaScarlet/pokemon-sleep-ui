import React from 'react';

import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNameSmall} from '@/components/shared/pokemon/name/small';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonProducingRateWithPayload} from '@/types/game/producing/rate';
import {teamMakerUnitStrengthAtState} from '@/ui/team/maker/result/const';
import {TeamMakerResultUiProps} from '@/ui/team/maker/result/type';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {formatFloat} from '@/utils/number/format';


type Props = TeamMakerDataProps & TeamMakerResultUiProps & {
  rate: PokemonProducingRateWithPayload<PokeInBox>,
  compStrength: number,
};

export const TeamMakerResultUnit = ({
  pokedexMap,
  subSkillMap,
  input,
  rate,
  compStrength,
}: Props) => {
  const pokemonRate = rate.rate.final;
  const {
    pokemon,
    level,
    name,
    ingredients,
    subSkill,
    nature,
  } = rate.payload;
  const {previewLevel} = input;

  const t = useTranslations('UI.Producing');

  const pokemonInfo = pokedexMap[pokemon];
  if (!pokemonInfo) {
    return null;
  }

  const unitStrength = getTotalOfPokemonProducingRate({
    rate: pokemonRate,
    state: teamMakerUnitStrengthAtState,
  }).energy;

  return (
    <Flex className="bg-plate gap-1.5">
      <Flex direction="row" className="items-center gap-1.5">
        <InfoIcon style={previewLevel ? 'warn' : 'glow'}>
          {previewLevel ?? level}
        </InfoIcon>
        <PokemonNameSmall pokemon={pokemonInfo} override={name}/>
      </Flex>
      <Flex direction="row" className="items-center gap-2">
        <PokemonClickableIcons pokemonList={[pokemonInfo]} dimension="h-16 w-16"/>
        <Flex className="gap-1">
          <PokemonIngredientIcons
            ingredients={[Object.values(ingredients).map((production) => production)]}
            dimension="h-5 w-5"
            className="gap-1 self-center"
          />
          <PokemonNatureIndicator nature={nature}/>
          <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap} className="self-center"/>
        </Flex>
      </Flex>
      <PokemonProductionSplitFromPokemonRate
        specialty={pokemonInfo.specialty}
        rate={pokemonRate}
        state={teamMakerUnitStrengthAtState}
      />
      <Flex noFullWidth direction="row" className="items-center self-end">
        <ColoredEnergyIcon dimension="h-5 w-5" alt={t('Total')}/>
        <div>{formatFloat(unitStrength)} ({formatFloat(unitStrength / compStrength * 100)}%)</div>
      </Flex>
    </Flex>
  );
};
