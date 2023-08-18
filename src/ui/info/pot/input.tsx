import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import {clsx} from 'clsx';

import {InputRow} from '@/components/input/filter/row';
import {FilterInputProps} from '@/components/input/filter/type';
import {
  getMultiSelectOnClickProps,
  getSingleSelectOnClickProps,
  getTextFilterButtonClass,
} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {IngredientInput} from '@/components/shared/input/ingredient';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealLinkDisplayTypeInput} from '@/components/shared/meal/displayTypeInput';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {MealTypeId} from '@/types/mongo/meal';
import {PotInfoCommonProps, PotInfoFilter} from '@/ui/info/pot/type';


type Props = FilterInputProps<PotInfoFilter> & Pick<PotInfoCommonProps, 'ingredients'> & {
  mealTypes: MealTypeId[],
};

export const PotInfoInput = ({filter, setFilter, mealTypes, ingredients}: Props) => {
  const {showEmpty} = filter;

  return (
    <>
      <MealTypeInput
        mealTypes={mealTypes}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'mealType',
        })}
      />
      <IngredientInput
        ingredientIds={Object.keys(ingredients).map((id) => Number(id))}
        {...getMultiSelectOnClickProps({
          filter: filter,
          setFilter: setFilter,
          filterKey: 'ingredients',
        })}
      />
      <PotCapacityInput
        {...getSingleSelectOnClickProps({
          filter: filter,
          setFilter: setFilter,
          filterKey: 'capacity',
        })}
      />
      <MealLinkDisplayTypeInput
        displayType={filter.displayType}
        setDisplayType={(displayType) => setFilter((original) => ({
          ...original,
          displayType,
        } satisfies PotInfoFilter))}
      />
      <InputRow>
        <Flex direction="row" noFullWidth className="ml-auto gap-2">
          <ToggleButton
            id="showEmpty"
            active={filter.showEmpty}
            onClick={() => setFilter((original) => ({
              ...original,
              showEmpty: !original.showEmpty,
            } satisfies PotInfoFilter))}
            className={clsx('group', getTextFilterButtonClass(showEmpty))}
          >
            <Flex direction="row" center noFullWidth className="gap-1">
              <div className="h-5 w-5">
                {showEmpty ? <EyeIcon/> : <EyeSlashIcon/>}
              </div>
              <div className="h-7 w-7">
                <XMarkIcon/>
              </div>
            </Flex>
          </ToggleButton>
          <UserDataUploadButton opts={{type: 'potCapacity', data: filter.capacity}}/>
        </Flex>
      </InputRow>
    </>
  );
};
