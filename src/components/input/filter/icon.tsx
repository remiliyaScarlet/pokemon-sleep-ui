import React from 'react';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {getIconFilterButtonClass} from '@/components/input/filter/utils/props';
import {NextImage} from '@/components/shared/common/image/main';


type Props<TId> = Omit<FilterCategoryInputProps<TId>, 'idToButton' | 'getClassNames'> & {
  idToAlt: (id: TId) => string,
  idToImageSrc: (id: TId) => string,
};

const sizes = [
  '(max-width: 640px) 50vw',
  '(max-width: 768px) 25vw',
  '(max-width: 1024px) 20vw',
  '(max-width: 1280px) 15vw',
  '10vw',
].join(', ');

export const FilterIconInput = <TId, >({idToAlt, idToImageSrc, ...props}: Props<TId>) => {
  return (
    <FilterCategoryInput
      idToButton={(id) => (
        <div className="relative h-7 w-7">
          <NextImage src={idToImageSrc(id)} alt={idToAlt(id)} sizes={sizes}/>
        </div>
      )}
      getClassNames={getIconFilterButtonClass}
      {...props}
    />
  );
};
