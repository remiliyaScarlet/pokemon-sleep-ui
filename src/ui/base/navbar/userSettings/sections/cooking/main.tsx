import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {UserCookingByMealType} from '@/ui/base/navbar/userSettings/sections/cooking/mealType';
import {UserSettingsCookingCommonProps} from '@/ui/base/navbar/userSettings/sections/cooking/type';
import {usePossibleMealTypes} from '@/ui/cooking/common/hook/mealType';
import {isNotNullish} from '@/utils/type';


export const UserSettingsCooking = (props: UserSettingsCookingCommonProps) => {
  const {cookingPreset, setCookingPreset, mealMap} = props;

  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const t = useTranslations('UI.UserSettings');

  return (
    <UserSettingsSection titleIcon={<GenericIngredientIcon alt={t('Cooking.Title')} dimension="h-10 w-10"/>}>
      <PotCapacityInput
        isActive={(potCapacity) => potCapacity === cookingPreset.potCapacity}
        onClick={(potCapacity) => setCookingPreset({potCapacity})}
      />
      {mealTypes.map((type) => <UserCookingByMealType key={type} {...props} mealType={type}/>)}
    </UserSettingsSection>
  );
};
