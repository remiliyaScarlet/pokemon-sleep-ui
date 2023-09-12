import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {EnergyIcon} from '@/components/shared/icon/energy';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {UserCookingPreset} from '@/types/userData/cooking';


type Props = {
  showEnergy: boolean,
  setShowEnergy: (updated: boolean) => void,
  uploadData: UserCookingPreset,
};

export const MealDisplayControl = ({showEnergy, setShowEnergy, uploadData}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <InputRow>
      <Flex direction="row" noFullWidth className="ml-auto gap-2">
        <ToggleButton
          id="showEmpty"
          active={showEnergy}
          onClick={() => setShowEnergy(!showEnergy)}
          className={clsx('group', getTextFilterButtonClass(showEnergy))}
        >
          <Flex direction="row" center noFullWidth className="gap-1">
            <div className="h-5 w-5">
              {showEnergy ? <EyeIcon/> : <EyeSlashIcon/>}
            </div>
            <EnergyIcon alt={t('Energy')} noInvert className={showEnergy ? 'invert-on-dark' : 'invert-on-light'}/>
          </Flex>
        </ToggleButton>
        <UserDataUploadButton opts={{type: 'cooking', data: uploadData}}/>
      </Flex>
    </InputRow>
  );
};
