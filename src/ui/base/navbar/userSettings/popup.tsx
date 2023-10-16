import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {defaultUserSettings} from '@/const/user/settings';
import {useUserDataActor} from '@/hooks/userData/actor';
import {UserSettings} from '@/types/userData/settings';
import {UserSettingsAccountInfo} from '@/ui/base/navbar/userSettings/sections/account';
import {UserSettingsAppInfo} from '@/ui/base/navbar/userSettings/sections/app/main';
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
  const [settings, setSettings] = React.useState<UserSettings>(migrate({
    original: defaultUserSettings,
    override: session.user.preloaded.settings ?? null,
    migrators: userSettingsMigrators,
    migrateParams: {},
  }));

  return (
    <PopupCommon show={show} setShow={(show) => {
      if (show || !act) {
        return;
      }

      act({action: 'upload', options: {type: 'settings', data: settings}});

      setShow(show);
    }}>
      <Flex className="gap-1.5 sm:w-[70vw]">
        <UserSettingsAccountInfo session={session}/>
        <UserSettingsStamina
          idPrefix="userSettings"
          config={settings.stamina}
          setConfig={(stamina) => setSettings((original) => ({
            ...original,
            stamina,
          }))}
        />
        <UserSettingsBonusUI
          mapIds={mapIds}
          bonus={settings.bonus}
          setBonus={(bonus) => setSettings((original) => ({
            ...original,
            bonus,
          }))}
          currentMap={settings.currentMap}
          setCurrentMap={(currentMap) => setSettings((original) => ({
            ...original,
            currentMap,
          }))}
        />
        <UserSettingsLanguage/>
        <UserSettingsAppInfo/>
      </Flex>
    </PopupCommon>
  );
};
