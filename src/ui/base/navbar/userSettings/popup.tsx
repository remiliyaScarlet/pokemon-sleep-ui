import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {defaultCookingPreset} from '@/const/user/cooking';
import {defaultUserSettings} from '@/const/user/settings';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {UserSettingsBundle} from '@/types/userData/settings';
import {UserSettingsAccountInfo} from '@/ui/base/navbar/userSettings/sections/account';
import {UserSettingsAppInfo} from '@/ui/base/navbar/userSettings/sections/app/main';
import {UserCalculationBehaviorUI} from '@/ui/base/navbar/userSettings/sections/behavior';
import {UserSettingsBonusUI} from '@/ui/base/navbar/userSettings/sections/bonus';
import {UserSettingsLanguage} from '@/ui/base/navbar/userSettings/sections/language';
import {UserSettingsStamina} from '@/ui/base/navbar/userSettings/sections/stamina';
import {UserSettingsProps} from '@/ui/base/navbar/userSettings/type';
import {migrate} from '@/utils/migrate/main';
import {userSettingsMigrators} from '@/utils/migrate/userSettings/migrators';


type Props = UserSettingsProps & {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
};

export const UserSettingsPopup = ({session, mapIds, show, setShow}: Props) => {
  const {act} = useUserDataActor({statusToast: true});
  const [bundle, setBundle] = React.useState<UserSettingsBundle>({
    settings: migrate({
      original: defaultUserSettings,
      override: session.user.preloaded.settings ?? null,
      migrators: userSettingsMigrators,
      migrateParams: {},
    }),
    cooking: {
      ...defaultCookingPreset,
      ...session.user.preloaded.cooking,
    },
  });

  const {settings} = bundle;

  return (
    <PopupCommon show={show} setShow={(show) => {
      if (show || !act) {
        return;
      }

      act({action: 'upload', options: {type: 'settings', data: bundle}});

      setShow(show);
    }}>
      <Flex className="gap-1.5 sm:w-[70vw]">
        <UserSettingsAccountInfo session={session}/>
        <UserSettingsStamina
          config={settings.stamina}
          setConfig={(stamina) => setBundle(({settings, ...original}) => ({
            ...original,
            settings: {...settings, stamina},
          } satisfies UserSettingsBundle))}
          trigger={settings.staminaSkillTrigger}
          setTrigger={(staminaSkillTrigger) => setBundle(({settings, ...original}) => ({
            ...original,
            settings: {...settings, staminaSkillTrigger},
          } satisfies UserSettingsBundle))}
        />
        <UserCalculationBehaviorUI
          behavior={settings.behavior}
          setBehavior={(behavior) => setBundle(({settings, ...original}) => ({
            ...original,
            settings: {...settings, behavior},
          } satisfies UserSettingsBundle))}
        />
        <UserSettingsBonusUI
          mapIds={mapIds}
          bonus={settings.bonus}
          setBonus={(bonus) => setBundle(({settings, ...original}) => ({
            ...original,
            settings: {...settings, bonus},
          } satisfies UserSettingsBundle))}
          currentMap={settings.currentMap}
          setCurrentMap={(currentMap) => setBundle(({settings, ...original}) => ({
            ...original,
            settings: {...settings, currentMap},
          } satisfies UserSettingsBundle))}
        />
        <UserSettingsLanguage/>
        <UserSettingsAppInfo/>
      </Flex>
    </PopupCommon>
  );
};
