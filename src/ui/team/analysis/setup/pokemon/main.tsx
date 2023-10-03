import React from 'react';

import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisPokemonPopup} from '@/ui/team/analysis/setup/pokemon/popup';
import {TeamAnalysisPokemonProduction} from '@/ui/team/analysis/setup/pokemon/production';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {toRatingSetup} from '@/ui/team/analysis/setup/pokemon/utils';


export const TeamAnalysisPokemon = (props: TeamAnalysisPokemonProps) => {
  const {
    pokemon,
    member,
    snorlaxFavorite,
    calculatedSettings,
    subSkillMap,
  } = props;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Metadata');
  const [showMemberConfig, setShowMemberConfig] = React.useState(false);
  const ratingControl = useRatingPopup();

  const {id, type, skill} = pokemon;
  const {level, nature, subSkill} = member;

  return (
    <Flex className="gap-1 sm:flex-row lg:flex-col">
      <TeamAnalysisPokemonPopup
        showMemberConfig={showMemberConfig}
        setShowMemberConfig={setShowMemberConfig}
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
        <Flex direction="row" className="items-center justify-between gap-1.5">
          <Flex direction="row" noFullWidth>
            <button className="button-clickable-bg group p-1" onClick={() => ratingControl.sendRequest(toRatingSetup({
              member,
              pokemon,
              snorlaxFavorite,
              ...calculatedSettings,
            }))}>
              <PokemonDataIcon src="/images/generic/search.png" alt={t2('Rating.Title')} invert dimension="h-5 w-5"/>
            </button>
          </Flex>
          <Flex direction="row" noFullWidth>
            <button className="button-clickable-bg p-1" onClick={() => setShowMemberConfig(true)}>
              <PencilIcon className="h-5 w-5"/>
            </button>
          </Flex>
        </Flex>
      </Flex>
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
      <HorizontalSplitter/>
      <PokemonNatureIndicator nature={nature}/>
      <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap} className="justify-center"/>
      <HorizontalSplitter/>
      <Flex center className="gap-1">
        <TeamAnalysisPokemonProduction {...props}/>
      </Flex>
    </Flex>
  );
};
