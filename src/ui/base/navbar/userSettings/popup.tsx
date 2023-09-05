import React from 'react';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {defaultUserSettings} from '@/const/user/settings';
import {useUserDataActor} from '@/hooks/userData/actor';
import {UserSettings} from '@/types/userData/settings';
import {UserSettingsAccountInfo} from '@/ui/base/navbar/userSettings/sections/account';
import {UserSettingsAppInfo} from '@/ui/base/navbar/userSettings/sections/app';
import {UserSettingsBonusUI} from '@/ui/base/navbar/userSettings/sections/bonus';
import {UserSettingsEnergy} from '@/ui/base/navbar/userSettings/sections/energy/main';
import {UserSettingsLanguage} from '@/ui/base/navbar/userSettings/sections/language';
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
    override: session.user.preloaded.settings ?? {},
    migrators: userSettingsMigrators,
    migrateParams: {},
  }));

  return (
    <Popup show={show} setShow={(show) => {
      if (show || !act) {
        return;
      }

      act({action: 'upload', options: {type: 'settings', data: settings}});

      setShow(show);
    }}>
      <Flex direction="col" className="gap-1.5 pr-2 sm:w-[70vw]">
        <UserSettingsAccountInfo session={session}/>
        <UserSettingsEnergy config={settings.stamina} setConfig={(stamina) => setSettings((original) => ({
          ...original,
          stamina,
        }))}/>
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
    </Popup>
  );
};
