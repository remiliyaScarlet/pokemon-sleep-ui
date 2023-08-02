import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {
  TeamAnalysisSlotName,
  teamAnalysisSlotName,
  TeamAnalysisTeamSetup,
} from '@/ui/team/analysis/type';


type Props = {
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisTeamSetup>>,
  isIncluded: FilterInclusionMap<PokemonId>,
  pokemon: PokemonInfo[],
};

export const TeamAnalysisSelectablePokemon = ({setSetup, isIncluded, pokemon}: Props) => {
  const t = useTranslations('Game');

  const putOnTeam = (id: PokemonId) => () => {
    setSetup((original) => {
      let slotToInsert: TeamAnalysisSlotName | null = null;

      for (const slotName of teamAnalysisSlotName) {
        if (original.team[slotName]) {
          continue;
        }
        slotToInsert = slotName;
        break;
      }

      return {
        ...original,
        team: {
          ...original.team,
          [slotToInsert ?? 'E']: {
            pokemonId: id,
            level: 1,
          },
        },
      };
    });
  };

  return (
    <Flex direction="row" center wrap className="gap-1.5">
      {pokemon
        .filter(({id}) => isIncluded[id])
        .map(({id, type}) => (
          <button key={id} onClick={putOnTeam(id)} className="button-clickable relative rounded-lg p-1">
            <div className="absolute left-0.5 top-0.5 z-10">
              <div className="relative h-5 w-5">
                <NextImage
                  src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)}
                  className="drop-shadow-thick" sizes={imageIconSizes}
                />
              </div>
            </div>
            <div className="relative h-14 w-14">
              <NextImage
                src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)}
                sizes={imageIconSizes}
              />
            </div>
          </button>
        ))}
    </Flex>
  );
};
