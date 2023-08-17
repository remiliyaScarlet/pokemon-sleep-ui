import React from 'react';

import {Popup} from '@/components/popup';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {SubSkillMap} from '@/types/game/pokemon/subskill';
import {PokedexMap} from '@/types/mongo/pokemon';
import {PokeboxPokeInBoxUpdateLayout} from '@/ui/team/pokebox/content/edit/layout';


type Props = {
  pokebox: Pokebox,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  editingUuid: string | undefined,
  onUpdateCompleted: (updated: PokeInBox) => void,
  onCopyPokeInBox: (pokeInBox: PokeInBox) => void,
  onRemovePokeInBox: () => void,
};

export const PokeboxPokeInBoxUpdatePopup = ({
  pokebox,
  pokedexMap,
  subSkillMap,
  editingUuid,
  onUpdateCompleted,
  onCopyPokeInBox,
  onRemovePokeInBox,
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
          pokedexMap={pokedexMap}
          subSkillMap={subSkillMap}
          setPokeInBox={setData}
          onCopyPokeInBox={() => onCopyPokeInBox(data)}
          onRemovePokeInBox={onRemovePokeInBox}
        />
      }
    </Popup>
  );
};
