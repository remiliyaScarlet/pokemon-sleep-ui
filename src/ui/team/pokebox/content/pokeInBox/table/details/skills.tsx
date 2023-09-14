import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxTableSkills = (props: PokeInBoxTableDetailsProps) => {
  const {
    pokeInBox,
    pokemon,
    subSkillMap,
  } = props;
  const {
    nature,
    subSkill,
  } = pokeInBox;

  const t = useTranslations('Game');

  return (
    <>
      <Flex direction="row" center noFullWidth className="w-56">
        <PokemonNatureIndicator nature={nature}/>
      </Flex>
      <Flex direction="row" center noFullWidth className="w-36">
        <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
      </Flex>
      <Link href={`/info/mainskill/${pokemon.skill}`} className={clsx(
        'w-60 whitespace-nowrap p-1 text-sm',
        pokemon.specialty === specialtyIdMap.skill && 'bg-blink',
      )}>
        <Flex direction="row" center>
          {t(`MainSkill.Name.${pokemon.skill}`)}
        </Flex>
      </Link>
    </>
  );
};
