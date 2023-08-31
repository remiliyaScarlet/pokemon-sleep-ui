import React from 'react';

import {Popup} from '@/components/popup';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {PokeboxPokeInBoxEditLayout} from '@/ui/team/pokebox/editor/layout';
import {PokeInBoxEditCommonProps, PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {generateNewPokeInBox} from '@/ui/team/pokebox/utils';


type Props = PokeInBoxEditCommonProps & {
  pokebox: Pokebox,
  editingPokeInBox: PokeInBoxEditorState | undefined,
  setEditingPokeInBox: React.Dispatch<React.SetStateAction<PokeInBoxEditorState | undefined>>,
  onUpdateCompleted: (pokeInBox: PokeInBox) => void,
  onCopyPokeInBox: (original: PokeInBox) => void,
};

export const PokeboxPokeInBoxEditPopup = ({
  pokebox,
  editingPokeInBox,
  setEditingPokeInBox,
  onUpdateCompleted,
  onCopyPokeInBox,
  ...props
}: Props) => {
  // Keeping a copy of the current editing Pokebox data as state,
  // so the parent layout won't keep getting re-rendered when some changes are made in the editing popup
  // (because of the data holding state change)
  const {pokedexMap} = props;

  const [pokeInBox, setPokeInBox] = React.useState<PokeInBox>();

  React.useEffect(() => {
    if (!editingPokeInBox) {
      return;
    }

    const {action} = editingPokeInBox;

    if (action === 'create') {
      const pokemon = pokedexMap[editingPokeInBox.pokemonId];

      if (!pokemon) {
        return;
      }

      setPokeInBox(generateNewPokeInBox({pokemon, ...props}));
      return;
    }

    if (action === 'update') {
      setPokeInBox(pokebox[editingPokeInBox.uuid]);
      return;
    }

    console.error(`Unhandled Poke-in-box editing action [${action satisfies never}]`);
  }, [!editingPokeInBox]);

  return (
    <Popup show={editingPokeInBox !== undefined} setShow={() => pokeInBox && onUpdateCompleted(pokeInBox)}>
      {
        pokeInBox &&
        <PokeboxPokeInBoxEditLayout
          pokeInBox={pokeInBox}
          setPokeInBox={setPokeInBox}
          onCopyPokeInBox={onCopyPokeInBox}
          {...props}
        />
      }
    </Popup>
  );
};
