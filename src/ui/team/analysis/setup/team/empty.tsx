import React from 'react';

import {InboxArrowDownIcon} from '@heroicons/react/24/outline';
import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {PokeboxImporter} from '@/components/shared/pokebox/importer/main';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';


export const TeamAnalysisEmptySlot = (props: PokeboxImporterCommonProps) => {
  const [show, setShow] = React.useState(false);
  const {status} = useSession();

  return (
    <Flex direction="col" center className="gap-1.5">
      <PokeboxImporter show={show} setShow={setShow} {...props}/>
      <UnavailableIcon/>
      <button
        className="enabled:button-clickable-bg disabled:button-disabled p-1"
        onClick={() => setShow(true)}
        disabled={status !== 'authenticated'}
      >
        <div className="h-7 w-7">
          <InboxArrowDownIcon/>
        </div>
      </button>
    </Flex>
  );
};
