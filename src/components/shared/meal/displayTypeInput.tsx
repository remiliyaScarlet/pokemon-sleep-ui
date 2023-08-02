import React from 'react';

import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {Flex} from '@/components/layout/flex';
import {mealDisplayTypeToTranslationId} from '@/components/shared/meal/const';
import {mealLinkDisplayType, MealLinkDisplayType} from '@/components/shared/meal/type';


type Props = {
  displayType: MealLinkDisplayType,
  setDisplayType: (type: MealLinkDisplayType) => void,
};

export const MealLinkDisplayTypeInput = ({displayType, setDisplayType}: Props) => {
  const t = useTranslations('UI.InPage.Cooking.MealDisplayType');

  return (
    <FilterTextInput
      onClick={setDisplayType}
      isActive={(display) => displayType === display}
      title={
        <Flex direction="row" center>
          <div className="h-6 w-6">
            <InformationCircleIcon/>
          </div>
        </Flex>
      }
      ids={[...mealLinkDisplayType]}
      idToButton={(display) => t(mealDisplayTypeToTranslationId[display])}
      idToItemId={(display) => `mealDisplayType-${display}`}
    />
  );
};
