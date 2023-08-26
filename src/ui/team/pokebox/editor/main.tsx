import React from 'react';

import {Popup} from '@/components/popup';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {PokeboxPokeInBoxEditLayout} from '@/ui/team/pokebox/editor/layout';
import {PokeboxPokeInBoxEditCommonProps} from '@/ui/team/pokebox/editor/type';


type Props = PokeboxPokeInBoxEditCommonProps & {
  pokebox: Pokebox,
  editingPokeInBox: PokeInBox | undefined,
  setEditingPokeInBox: React.Dispatch<React.SetStateAction<PokeInBox | undefined>>,
  onUpdateCompleted: () => void,
  onCopyPokeInBox: () => void,
};

export const PokeboxPokeInBoxEditPopup = ({
  pokebox,
  editingPokeInBox,
  setEditingPokeInBox,
  onUpdateCompleted,
  onCopyPokeInBox,
  ...props
}: Props) => {
  return (
    <Popup show={editingPokeInBox !== undefined} setShow={() => onUpdateCompleted()}>
      {
        editingPokeInBox &&
        <PokeboxPokeInBoxEditLayout
          pokeInBox={editingPokeInBox}
          setPokeInBox={setEditingPokeInBox}
          onCopyPokeInBox={() => onCopyPokeInBox()}
          {...props}
        />
      }
    </Popup>
  );
};
