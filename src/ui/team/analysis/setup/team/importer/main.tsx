import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad';
import {TeamAnalysisPokeboxView} from '@/ui/team/analysis/setup/team/importer/pokebox';
import {TeamAnalysisImporterCommonProps} from '@/ui/team/analysis/setup/team/importer/type';


type Props = TeamAnalysisImporterCommonProps & {
  show: boolean,
  setShow: (show: boolean) => void,
};

export const TeamAnalysisImporter = ({show, setShow, ...props}: Props) => {
  const session = useSession();

  return (
    <Popup show={show} setShow={setShow}>
      <Flex direction="col" noFullWidth className="min-w-[50vw]">
        <UserDataLazyLoad
          type="pokebox"
          loadingText="Pokebox"
          sessionOverride={session}
          actDeps={[show]}
          toAct={() => show}
          content={(data) => (
            <TeamAnalysisPokeboxView pokebox={data?.pokebox} {...props}/>
          )}
        />
      </Flex>
    </Popup>
  );
};
