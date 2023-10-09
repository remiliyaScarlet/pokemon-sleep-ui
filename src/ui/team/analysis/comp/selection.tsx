import React from 'react';

import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisSetup, TeamAnalysisComp} from '@/types/teamAnalysis';
import {TeamAnalysisCompSelectorProps} from '@/ui/team/analysis/comp/type';
import {getTeamName} from '@/ui/team/analysis/utils';


type Props = TeamAnalysisCompSelectorProps & {
  team: TeamAnalysisComp,
  onClick: () => void,
};

export const TeamAnalysisCompSelection = ({
  setup,
  onUpdated,
  onDeleted,
  onCopied,
  team,
  onClick,
}: Props) => {
  const {config, comps} = setup;

  const t = useTranslations('Game');

  const isCurrent = config.current === team.uuid;

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
            comps: {
              ...comps,
              [team.uuid]: {
                ...team,
                name: target.value,
              },
            },
          } satisfies TeamAnalysisSetup)}
        />
        <button className="button-clickable-bg h-7 w-7 rounded-lg p-1" onClick={() => onCopied(team.uuid)}>
          <DocumentDuplicateIcon/>
        </button>
        {
          config.current !== team.uuid &&
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
