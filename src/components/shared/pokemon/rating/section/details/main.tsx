import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {RatingDetailsEntry} from '@/components/shared/pokemon/rating/section/details/entry';
import {RatingResultMap, RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';


type Props = Omit<RatingResultProps, 'pokemonMaxLevel'> & {
  activeKeyLevels: PokemonKeyLevel[],
  resultMap: RatingResultMap,
  onRated: (result: RatingResultOfLevel) => void,
};

export const RatingDetails = ({activeKeyLevels, resultMap, onRated, ...props}: Props) => {
  return (
    <Flex className="gap-1.5">
      {activeKeyLevels.map((level) => {
        const result = resultMap[level];

        if (!result) {
          return null;
        }

        return (
          <RatingDetailsEntry
            key={level}
            level={level}
            result={result}
            onRated={onRated}
            {...props}
          />
        );
      })}
    </Flex>
  );
};
