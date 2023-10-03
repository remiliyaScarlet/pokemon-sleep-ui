import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/main';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {defaultCookingPreset} from '@/const/user/cooking';
import {CookingCommonProps} from '@/ui/cooking/type';


export const CookingInputControl = ({filter, setFilter, preloaded}: CookingCommonProps) => {
  const {showUnmakeableRecipe} = filter;

  const t = useTranslations('UI.InPage.Cooking');

  return (
    <InputRow>
      <Flex direction="row" className="justify-end gap-2">
        <ToggleButton
          id="makeableRecipe"
          active={showUnmakeableRecipe}
          onClick={() => setFilter((original) => ({
            ...original,
            showUnmakeableRecipe: !showUnmakeableRecipe,
          }))}
          className={getTextFilterButtonClass(showUnmakeableRecipe)}
        >
          <Flex direction="row" noFullWidth className="gap-1">
            <div className="h-5 w-5">
              {showUnmakeableRecipe ? <EyeIcon/> : <EyeSlashIcon/>}
            </div>
            <GenericIcon
              src="/images/generic/ingredient_slash.png"
              alt={t('ToggleUnmakeable')}
              dimension="h-5 w-5"
              noInvert
              className={showUnmakeableRecipe ? 'invert-on-dark' : 'invert-on-light'}
            />
          </Flex>
        </ToggleButton>
        <UserDataUploadButton opts={{
          type: 'cooking',
          data: {
            ...defaultCookingPreset,
            ...preloaded,
            potCapacity: filter.capacity,
            mealType: filter.type,
            ingredients: filter.ingredient,
            ingredientCount: filter.ingredientCount,
            recipeLevel: filter.recipeLevel,
            showUnmakeableRecipe: filter.showUnmakeableRecipe,
          },
        }}/>
      </Flex>
    </InputRow>
  );
};
