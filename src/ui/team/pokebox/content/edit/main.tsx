import React from 'react';

import {Popup} from '@/components/popup';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {PokeboxPokeInBoxUpdateLayout} from '@/ui/team/pokebox/content/edit/layout';
import {PokeboxPokeInBoxEditCommonProps} from '@/ui/team/pokebox/content/edit/type';


type Props = PokeboxPokeInBoxEditCommonProps & {
  pokebox: Pokebox,
  editingUuid: string | undefined,
  onUpdateCompleted: (updated: PokeInBox) => void,
  onCopyPokeInBox: (pokeInBox: PokeInBox) => void,
};

export const PokeboxPokeInBoxUpdatePopup = ({
  pokebox,
  editingUuid,
  onUpdateCompleted,
  onCopyPokeInBox,
  ...props
}: Props) => {
  const [data, setData] = React.useState<PokeInBox>();

  React.useEffect(() => {
    if (editingUuid === undefined) {
      return;
    }

    setData(pokebox[editingUuid]);
  }, [editingUuid]);

  return (
    <Popup show={editingUuid !== undefined} setShow={() => {
      if (!data) {
        return;
      }

      onUpdateCompleted(data);
    }}>
      {
        data &&
        <PokeboxPokeInBoxUpdateLayout
          pokeInBox={data}
          setPokeInBox={setData}
          onCopyPokeInBox={() => onCopyPokeInBox(data)}
          {...props}
        />
      }
    </Popup>
  );
};
