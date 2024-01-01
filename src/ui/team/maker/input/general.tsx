import React from 'react';

import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {PokemonPreviewLevelInput} from '@/components/shared/pokemon/level/previewInput';
import {textFilterButtonStyle} from '@/styles/input';
import {TeamMakerBasisOption} from '@/ui/team/maker/input/basis';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';
import {teamMakerMemberCount} from '@/ui/team/maker/type/common';
import {teamMakerBasis} from '@/ui/team/maker/type/input';


export const TeamMakerInputGeneral = (props: TeamMakerInputCommonProps) => {
  const {
    input,
    setInput,
  } = props;

  const t = useTranslations('UI.InPage.Team');

  return (
    <>
      <FilterExpandedInput
        title={
          <Flex center>
            <UserCircleIcon className="h-6 w-6"/>
          </Flex>
        }
        ids={[...teamMakerMemberCount]}
        idToButton={(memberCount) => memberCount}
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'memberCount',
          allowNull: false,
        })}
      />
      <FilterExpandedInput
        title={t('Maker.Basis')}
        ids={[...teamMakerBasis]}
        idToButton={(basis) => (
          <TeamMakerBasisOption basis={basis} isActive={basis === input.basis}/>
        )}
        className={textFilterButtonStyle}
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'basis',
          allowNull: false,
        })}
      />
      <PokemonPreviewLevelInput
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'previewLevel',
          allowNull: false,
        })}
      />
    </>
  );
};
