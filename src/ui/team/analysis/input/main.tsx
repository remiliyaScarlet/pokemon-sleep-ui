import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useTranslations} from 'next-intl';

import {FilterInclusionMap, FilterInputProps} from '@/components/input/filter/type';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {imageIconSizes} from '@/styles/image';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {TeamAnalysisSelectablePokemon} from '@/ui/team/analysis/selectable';
import {
  TeamAnalysisDataProps,
  TeamAnalysisFilter,
  TeamAnalysisMember,
  TeamAnalysisSetup,
  TeamAnalysisSetupModifyingProps,
  TeamAnalysisSlotName,
} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {showToast} from '@/utils/toast';


type Props = FilterInputProps<TeamAnalysisFilter> & TeamAnalysisDataProps & TeamAnalysisSetupModifyingProps & {
  pokemonList: PokemonInfo[],
  isIncluded: FilterInclusionMap<PokemonId>,
};

export const TeamAnalysisPokemonFilter = ({pokemonList, setup, setSetup, isIncluded, ...props}: Props) => {
  const {filter} = props;

  const t = useTranslations('Game');

  const filterCollapsible = useCollapsible();
  const pickerCollapsible = useCollapsible();

  React.useEffect(() => {
    pickerCollapsible.setShow(true);
  }, [filter]);

  const setMember = (slot: TeamAnalysisSlotName, member: TeamAnalysisMember) => {
    setSetup((original) => ({
      ...original,
      teams: {
        ...original.teams,
        [original.current]: getCurrentTeam({
          setup: original,
          overrideSlot: slot,
          overrideMember: member,
        }),
      },
    } satisfies TeamAnalysisSetup));
    showToast({content: (
      <Flex direction="row" className="gap-1.5">
        <div className="relative h-9 w-9">
          <PlusCircleIcon/>
        </div>
        <div className="relative h-9 w-9">
          <NextImage
            src={`/images/pokemon/icons/${member.pokemonId}.png`} alt={t(`PokemonName.${member.pokemonId}`)}
            sizes={imageIconSizes}
          />
        </div>
        <div className="self-end text-sm">
            #{member.pokemonId} @ {slot}
        </div>
      </Flex>
    )});
  };

  return (
    <Flex direction="col" className="gap-1.5 lg:flex-row">
      <Collapsible state={filterCollapsible} classNameForHeight="h-60" button={
        <Flex direction="row" center className="gap-0.5">
          <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
          <div className="h-6 w-6">
            <PlusCircleIcon/>
          </div>
          <div className="h-6 w-6">
            <FunnelIcon/>
          </div>
        </Flex>
      }>
        <Flex direction="col" className="gap-1">
          {pokemonInputType.map((type) => (
            <PokemonFilter
              key={type}
              type={type}
              filterKey={type}
              pokemonList={pokemonList}
              {...props}
            />
          ))}
        </Flex>
      </Collapsible>
      <Collapsible state={pickerCollapsible} classNameForHeight="h-60" button={
        <Flex direction="row" center className="gap-0.5">
          <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
          <div className="h-6 w-6">
            <PlusCircleIcon/>
          </div>
        </Flex>
      }>
        <TeamAnalysisSelectablePokemon
          team={getCurrentTeam({setup})}
          setMember={setMember}
          isIncluded={isIncluded}
          pokemonList={pokemonList}
          {...props}
        />
      </Collapsible>
    </Flex>
  );
};
