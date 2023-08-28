import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {PokeboxImporterView} from '@/components/shared/pokebox/importer/pokebox';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad';


type Props = PokeboxImporterCommonProps & {
  show: boolean,
  setShow: (show: boolean) => void,
};

export const PokeboxImporter = ({show, setShow, ...props}: Props) => {
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
            <PokeboxImporterView pokebox={data?.pokebox} {...props}/>
          )}
        />
      </Flex>
    </Popup>
  );
};
