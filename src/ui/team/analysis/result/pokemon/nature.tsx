import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {natureData} from '@/data/nature';
import {NatureId} from '@/types/game/producing/nature';
import {TeamAnalysisNatureButton} from '@/ui/team/analysis/result/pokemon/natureButton';


type Props = {
  nature: NatureId | null,
  setNature: (nature: NatureId | null) => void,
};

export const TeamAnalysisNature = ({nature, setNature}: Props) => {
  const [show, setShow] = React.useState(false);

  const t = useTranslations('Game');

  const onClick = (id: NatureId | null) => {
    setNature(id);
    setShow(false);
  };

  return (
    <Flex direction="row">
      <button
        className="button-clickable-bg whitespace-nowrap px-1.5 text-sm"
        onClick={() => setShow(true)}
      >
        <Flex direction="row" center>
          <div className="h-5 w-5">
            <ChevronUpDownIcon/>
          </div>
          <div className="pr-1">
            {nature ? t(`Nature.${nature}`) : <div className="h-5 w-5"><XCircleIcon/></div>}
          </div>
        </Flex>
      </button>
      <Popup show={show} setShow={setShow}>
        <Flex direction="row" center wrap className="gap-2 pr-2">
          <TeamAnalysisNatureButton data={null} active={nature === null} onClick={() => onClick(null)}/>
          {natureData.map((data) => (
            <TeamAnalysisNatureButton
              key={data.id} data={data} active={nature === data.id} onClick={() => onClick(data.id)}
            />
          ))}
        </Flex>
      </Popup>
    </Flex>
  );
};
