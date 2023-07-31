import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {VerticalSplitter} from '@/components/shared/common/splitter';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty';
import {imageIconSizes} from '@/styles/image';
import {PokedexIngredientIcon} from '@/ui/pokedex/index/linkIngredientIcon';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';


export const PokedexLinkDetail = React.memo(({
  berry,
  skill,
  ingredients,
  specialty,
  display,
}: PokedexLinkProps) => {
  const t = useTranslations('Game');

  if (display === 'berry') {
    return (
      <Flex direction="row" className="gap-0.5">
        <div className="relative h-5 w-5">
          <Image src={`/images/berry/${berry.id}.png`} alt={t(`Berry.${berry.id}`)} fill sizes={imageIconSizes}/>
        </div>
        <div>
          {berry.quantity}
        </div>
      </Flex>
    );
  }

  if (display === 'mainSkill') {
    return (
      <div className="text-xs">
        {t(`MainSkill.Name.${skill}`)}
      </div>
    );
  }

  if (display === 'ingredient') {
    return (
      <Flex direction="row" className="gap-0.5">
        <PokedexIngredientIcon id={ingredients.fixed ?? null}/>
        {ingredients.random && <VerticalSplitter/>}
        {ingredients.random?.map((id) => <PokedexIngredientIcon key={id} id={id}/>)}
      </Flex>
    );
  }

  if (display === 'specialty') {
    return (
      <Flex direction="row">
        <PokemonSpecialty specialty={specialty}/>
      </Flex>
    );
  }
});
PokedexLinkDetail.displayName = 'PokedexLinkDetail';
