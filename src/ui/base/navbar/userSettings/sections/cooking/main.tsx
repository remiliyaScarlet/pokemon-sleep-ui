import React from 'react';

import LockOpenIcon from '@heroicons/react/24/outline/LockOpenIcon';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/preset/icon';
import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {UserCookingByMealType} from '@/ui/base/navbar/userSettings/sections/cooking/mealType';
import {UserSettingsCookingCommonProps} from '@/ui/base/navbar/userSettings/sections/cooking/type';
import {usePossibleMealTypes} from '@/ui/cooking/common/hook/mealType';
import {isNotNullish} from '@/utils/type';


export const UserSettingsCooking = (props: UserSettingsCookingCommonProps) => {
  const {
    cookingPreset,
    setCookingPreset,
    mealMap,
    ingredientIds,
  } = props;
  const {unlockedIngredients} = cookingPreset;

  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const t = useTranslations('UI.UserSettings');
  const t2 = useTranslations('Game');

  return (
    <UserSettingsSection titleIcon={<GenericIngredientIcon alt={t('Cooking.Title')} dimension="h-10 w-10"/>}>
      <PotCapacityInput
        isActive={(potCapacity) => potCapacity === cookingPreset.potCapacity}
        onClick={(potCapacity) => setCookingPreset({potCapacity})}
      />
      <FilterIconInput
        idToAlt={(id) => t2(`Food.${id}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        ids={ingredientIds}
        title={
          <Flex center>
            <LockOpenIcon className="h-5 w-5"/>
          </Flex>
        }
        isActive={(id) => !!unlockedIngredients[id]}
        onClick={(id) => setCookingPreset({unlockedIngredients: {[id]: !unlockedIngredients[id]}})}
      />
      {mealTypes.map((type) => <UserCookingByMealType key={type} {...props} mealType={type}/>)}
    </UserSettingsSection>
  );
};
