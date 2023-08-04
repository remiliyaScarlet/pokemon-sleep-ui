import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
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
    <>
      <button
        className="button-clickable-border whitespace-nowrap px-2.5 text-sm"
        onClick={() => setShow(true)}
      >
        {nature ? t(`Nature.${nature}`) : <div className="h-6 w-6"><XCircleIcon/></div>}
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
    </>
  );
};
