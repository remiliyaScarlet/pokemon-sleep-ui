import React from 'react';

import Image from 'next/image';

import {PokedexCategoryInput} from '@/ui/pokedex/index/input/category';
import {buttonInactiveBgClass, toggleClass} from '@/ui/pokedex/index/input/const';
import {PokedexCategoryInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexFilter} from '@/ui/pokedex/index/type';
import {classNames} from '@/utils/react';
import {KeysOfType} from '@/utils/type';


type Props<T, K extends KeysOfType<PokedexFilter, T | null>> = Omit<
  PokedexCategoryInputProps<T, K>,
  'idToButton' | 'getClassNames'
> & {
  getAlt: (id: T) => string,
};

const sizes = [
  '(max-width: 640px) 50vw',
  '(max-width: 768px) 25vw',
  '(max-width: 1024px) 20vw',
  '(max-width: 1280px) 15vw',
  '10vw',
].join(', ');

export const PokedexIconInput = <T, K extends KeysOfType<PokedexFilter, T | null>>({
  getAlt,
  ...props
}: Props<T, K>) => {
  return (
    <PokedexCategoryInput
      idToButton={(id) => (
        <div className="relative h-7 w-7">
          <Image src={`/images/type/${id}.png`} alt={getAlt(id)} fill sizes={sizes}/>
        </div>
      )}
      getClassNames={(isActive) => classNames(
        'relative h-8 w-8 rounded-full',
        isActive ? toggleClass.active.hover : toggleClass.inactive.hover,
        isActive ? toggleClass.active.background : toggleClass.inactive.background,
      )}
      {...props}
    />
  );
};
