import React from 'react';

import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon';

import {FlexButton} from '@/components/layout/flex/button';
import {PokeboxImporter} from '@/components/shared/pokebox/importer/main';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {PokeInBox} from '@/types/game/pokebox';
import {Dimension} from '@/types/style';


type Props = Omit<PokeboxImporterCommonProps, 'onPokeboxPicked'> & {
  onPokeboxPicked: (pokeInBox: PokeInBox) => void,
  noFullWidth?: boolean,
  dimension?: Dimension,
};

export const PokeboxImporterButton = ({onPokeboxPicked, noFullWidth, dimension, ...props}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <PokeboxImporter
        {...props}
        show={show}
        setShow={setShow}
        onPokeboxPicked={(pokeInBox) => {
          onPokeboxPicked(pokeInBox);
          setShow(false);
        }}
      />
      <FlexButton
        center
        noFullWidth={noFullWidth}
        className="button-clickable-bg p-1"
        onClick={() => setShow(true)}
      >
        <InboxArrowDownIcon className={dimension ?? 'h-8 w-8'}/>
      </FlexButton>
    </>
  );
};
