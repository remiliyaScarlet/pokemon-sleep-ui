import React from 'react';

import {InboxArrowDownIcon} from '@heroicons/react/24/outline';
import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {TeamAnalysisImporter} from '@/ui/team/analysis/setup/team/importer/main';
import {TeamAnalysisImporterCommonProps} from '@/ui/team/analysis/setup/team/importer/type';


export const TeamAnalysisEmptySlot = (props: TeamAnalysisImporterCommonProps) => {
  const [show, setShow] = React.useState(false);
  const {status} = useSession();

  return (
    <Flex direction="col" center className="gap-1.5">
      <TeamAnalysisImporter show={show} setShow={setShow} {...props}/>
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
