import React from 'react';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';
import {FlexButton} from '@/components/layout/flexButton';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisCompSelectorProps} from '@/ui/team/analysis/comp/type';
import {TeamAnalysisSetup, TeamAnalysisSingleTeam} from '@/ui/team/analysis/type';
import {getTeamName} from '@/ui/team/analysis/utils';


type Props = TeamAnalysisCompSelectorProps & {
  team: TeamAnalysisSingleTeam,
  onClick: () => void,
};

export const TeamAnalysisCompSelection = ({
  setup,
  onUpdated,
  onDeleted,
  team,
  onClick,
}: Props) => {
  const {current, teams} = setup;

  const t = useTranslations('Game');

  const isCurrent = current === team.uuid;

  return (
    <Flex center direction="col" className={clsx(
      'border-button-clickable h-full rounded-lg border',
      isCurrent && 'button-bg',
    )}>
      <Flex direction="row" className="gap-2 p-2">
        <InputBox
          type="text"
          value={team.name}
          placeholder={getTeamName(team)}
          className="w-full"
          onChange={({target}) => onUpdated({
            ...setup,
            teams: {
              ...teams,
              [team.uuid]: {
                ...team,
                name: target.value,
              },
            },
          } satisfies TeamAnalysisSetup)}
        />
        {
          current !== team.uuid &&
          <button className="button-alert-bg h-7 w-7 rounded-lg p-1" onClick={() => onDeleted(team.uuid)}>
            <TrashIcon/>
          </button>
        }
      </Flex>
      <FlexButton className="enabled:button-clickable gap-1.5 p-2" disabled={isCurrent} onClick={onClick}>
        {Object.entries(team.members).map(([slot, member]) => (
          member ?
            <IconWithInfo
              key={slot}
              imageSrc={`/images/pokemon/icons/${member.pokemonId}.png`}
              imageAlt={member.name || t(`PokemonName.${member.pokemonId}`)}
              imageDimension="h-12 w-12"
              imageSizes={imageIconSizes}
              info={member.level}
            /> :
            <UnavailableIcon key={slot}/>
        ))}
      </FlexButton>
    </Flex>
  );
};
