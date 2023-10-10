import React from 'react';

import {InboxArrowDownIcon} from '@heroicons/react/24/outline';
import CloudArrowDownIcon from '@heroicons/react/24/outline/CloudArrowDownIcon';
import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {Popup} from '@/components/popup';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {PokeboxImporter} from '@/components/shared/pokebox/importer/main';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {TeamAnalysisCloudPull} from '@/ui/team/analysis/popup/cloudPull/main';
import {TeamAnalysisEmptySlotPopupType} from '@/ui/team/analysis/setup/team/type';


export const TeamAnalysisEmptySlot = (props: PokeboxImporterCommonProps) => {
  const [popup, setPopup] = React.useState<TeamAnalysisEmptySlotPopupType | null>(null);
  const {status} = useSession();

  const buttonClass = 'enabled:button-clickable-bg disabled:button-disabled p-1 h-9 w-9';
  const buttonDisabled = status !== 'authenticated';

  return (
    <Flex center className="gap-1.5">
      <PokeboxImporter
        show={popup === 'pokebox'}
        setShow={(show) => setPopup(show ? 'pokebox' : null)}
        {...props}
      />
      <Popup show={popup === 'cloudPull'} setShow={(show) => setPopup(show ? 'cloudPull' : null)}>
        <TeamAnalysisCloudPull {...props}/>
      </Popup>
      <UnavailableIcon/>
      <Flex direction="row" center className="gap-1.5">
        <button className={buttonClass} disabled={buttonDisabled} onClick={() => setPopup('pokebox')}>
          <InboxArrowDownIcon/>
        </button>
        <button className={buttonClass} disabled={buttonDisabled} onClick={() => setPopup('cloudPull')}>
          <CloudArrowDownIcon/>
        </button>
      </Flex>
    </Flex>
  );
};
