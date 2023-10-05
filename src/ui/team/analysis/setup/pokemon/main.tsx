import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisPokemonControl} from '@/ui/team/analysis/setup/pokemon/control';
import {useTeamAnalysisPokemonPopup} from '@/ui/team/analysis/setup/pokemon/popup/hook';
import {TeamAnalysisPokemonPopup} from '@/ui/team/analysis/setup/pokemon/popup/main';
import {TeamAnalysisPokemonProduction} from '@/ui/team/analysis/setup/pokemon/production';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';


export const TeamAnalysisPokemon = (props: TeamAnalysisPokemonProps) => {
  const {
    pokemon,
    member,
    subSkillMap,
  } = props;

  const t = useTranslations('Game');
  const pokemonPopup = useTeamAnalysisPokemonPopup();
  const ratingControl = useRatingPopup();

  const {id, type, skill} = pokemon;
  const {level, nature, subSkill} = member;

  return (
    <Flex className="gap-1 sm:flex-row lg:flex-col">
      <TeamAnalysisPokemonPopup
        state={pokemonPopup}
        ratingControl={ratingControl}
        {...props}
      />
      <Flex className="gap-1">
        <Flex direction="row" center className="gap-0.5 whitespace-nowrap">
          <div className="relative h-5 w-5">
            <NextImage
              src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)}
              className="drop-shadow-thick" sizes={imageIconSizes}
            />
          </div>
          <div>
            {member.name ?? t(`PokemonName.${id}`)}
          </div>
        </Flex>
        <Flex direction="row" center>
          <div className="relative h-28 w-28">
            <PokemonImage pokemonId={pokemon.id} image="portrait" isShiny={false}/>
            <InfoIcon className="absolute bottom-0 right-0">
              {level}
            </InfoIcon>
          </div>
        </Flex>
        <TeamAnalysisPokemonControl
          ratingControl={ratingControl}
          onEditClick={() => pokemonPopup.show('memberConfig')}
          onDetailsClick={() => pokemonPopup.show('detailedStats')}
          {...props}
        />
        <Flex>
          <Flex className={clsx(
            'items-end px-2 py-1 text-sm',
            pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink',
          )}>
            <PokemonIngredientIcons
              ingredients={[Object.values(member.ingredients).map((production) => production)]}
            />
          </Flex>
          <div className={clsx(
            'px-2 py-1 text-end text-sm',
            pokemon.specialty === specialtyIdMap.skill && 'bg-blink',
          )}>
            {t(`MainSkill.Name.${skill}`)}
          </div>
        </Flex>
      </Flex>
      <Flex center className="gap-1">
        <PokemonNatureIndicator nature={nature}/>
        <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap} className="justify-center"/>
        <HorizontalSplitter/>
        <TeamAnalysisPokemonProduction {...props}/>
      </Flex>
    </Flex>
  );
};
