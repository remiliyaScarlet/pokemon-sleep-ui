import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {Popup} from '@/components/popup';
import {PokeboxImporterView} from '@/components/shared/pokebox/importer/pokebox';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad';
import {PokeInBox} from '@/types/game/pokebox';


type Props = PokeboxImporterCommonProps & {
  show: boolean,
  setShow: (show: boolean) => void,
  isPokeInBoxIncluded?: (pokeInBox: PokeInBox) => boolean,
};

export const PokeboxImporter = ({show, setShow, isPokeInBoxIncluded, ...props}: Props) => {
  const session = useSession();

  return (
    <Popup show={show} setShow={setShow}>
      <Flex className="sm:w-[60vw]">
        <UserDataLazyLoad
          options={{type: 'pokeboxSorted'}}
          loadingText="Pokebox"
          sessionOverride={session}
          actDeps={[show]}
          toAct={() => show}
          content={(data) => (
            <PokeboxImporterView
              pokebox={(data?.pokeboxSorted ?? [])
                .filter((pokeInBox) => isPokeInBoxIncluded ? isPokeInBoxIncluded(pokeInBox) : true)}
              {...props}
            />
          )}
        />
      </Flex>
    </Popup>
  );
};
