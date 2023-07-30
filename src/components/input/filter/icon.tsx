import React from 'react';

import Image from 'next/image';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {toggleClass} from '@/components/input/filter/const';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {classNames} from '@/utils/react';


type Props<TId> = Omit< FilterCategoryInputProps<TId>, 'idToButton' | 'getClassNames'> & {
  getAlt: (id: TId) => string,
  idToImageSrc: (id: TId) => string,
};

const sizes = [
  '(max-width: 640px) 50vw',
  '(max-width: 768px) 25vw',
  '(max-width: 1024px) 20vw',
  '(max-width: 1280px) 15vw',
  '10vw',
].join(', ');

export const FilterIconInput = <TId, >({getAlt, idToImageSrc, ...props}: Props<TId>) => {
  return (
    <FilterCategoryInput
      idToButton={(id) => (
        <div className="relative h-7 w-7">
          <Image src={idToImageSrc(id)} alt={getAlt(id)} fill sizes={sizes}/>
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
