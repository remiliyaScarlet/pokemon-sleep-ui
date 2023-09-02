import React from 'react';

import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import {Session} from 'next-auth';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {defaultUserSettings} from '@/const/user/settings';
import {useUserDataActor} from '@/hooks/userData/actor';
import {UserSettings} from '@/types/userData/settings';
import {UserSettingsBonusUI} from '@/ui/base/navbar/userSettings/bonus';
import {UserSettingsLanguage} from '@/ui/base/navbar/userSettings/language';
import {UserSettingsProps} from '@/ui/base/navbar/userSettings/type';
import {migrate} from '@/utils/migrate/main';
import {userSettingsMigrators} from '@/utils/migrate/userSettings/migrators';


type Props = UserSettingsProps & {
  session: Session,
};

export const UserSettingsUI = ({session, mapIds}: Props) => {
  const [show, setShow] = React.useState(false);
  const [settings, setSettings] = React.useState<UserSettings>(migrate({
    original: defaultUserSettings,
    override: session.user.preloaded.settings ?? {},
    migrators: userSettingsMigrators,
    migrateParams: {},
  }));
  const {act} = useUserDataActor({statusToast: true});

  React.useEffect(() => {
    if (show || !act) {
      return;
    }

    act({action: 'upload', options: {type: 'settings', data: settings}});
  }, [show]);

  return (
    <>
      <button className="button-clickable-bg nav-height w-8 p-1" onClick={() => setShow(true)}>
        <Cog6ToothIcon/>
      </button>
      <Popup show={show} setShow={setShow}>
        <Flex direction="col" className="gap-1.5 sm:w-[70vw]">
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
        </Flex>
      </Popup>
    </>
  );
};
