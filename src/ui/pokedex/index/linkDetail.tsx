import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIngredients} from '@/components/shared/pokemon/ingredients';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty';
import {imageIconSizes} from '@/styles/image';
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
          <NextImage src={`/images/berry/${berry.id}.png`} alt={t(`Berry.${berry.id}`)} sizes={imageIconSizes}/>
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
    return <PokemonIngredients ingredients={ingredients}/>;
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
