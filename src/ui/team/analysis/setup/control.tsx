import React from 'react';

import RectangleStackIcon from '@heroicons/react/24/outline/RectangleStackIcon';
import {useSession} from 'next-auth/react';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisCompSelector} from '@/ui/team/analysis/comp/main';
import {TeamAnalysisSetupModifyingProps} from '@/ui/team/analysis/type';
import {getCurrentTeam, getTeamName} from '@/ui/team/analysis/utils';
import {cloneMerge} from '@/utils/object';


type Props = TeamAnalysisSetupModifyingProps & {
  snorlaxFavorite: SnorlaxFavorite,
};

export const TeamAnalysisSetupControl = (props: Props) => {
  const {setup, setSetup, snorlaxFavorite} = props;

  const {status} = useSession();
  const [setupSelector, setSetupSelector] = React.useState({
    show: false,
    setup,
  });

  const currentTeam = getCurrentTeam({setup});

  const onSelect = (selected?: string) => {
    setSetup({
      ...setupSelector.setup,
      current: selected ?? setupSelector.setup.current,
    });
    setSetupSelector((original) => ({
      ...original,
      show: false,
    }));
  };

  return (
    <InputRow className="justify-end gap-1.5">
      <Popup show={setupSelector.show} setShow={() => onSelect()}>
        <TeamAnalysisCompSelector
          setup={setupSelector.setup}
          onUpdated={(setup) => setSetupSelector((original) => ({
            ...original,
            setup,
          }))}
          onPicked={onSelect}
          onDeleted={(deleted) => setSetupSelector((original) => {
            const setup = {...original.setup};
            delete setup.teams[deleted];

            return {show: true, setup};
          })}
          onAdded={(newTeam) => setSetupSelector((original) => cloneMerge(
            original,
            {setup: {teams: {[newTeam.uuid]: newTeam}}},
          ))}
        />
      </Popup>
      <button
        className="enabled:button-clickable-bg disabled:button-disabled relative h-8 px-2"
        disabled={status !== 'authenticated'}
        onClick={() => setSetupSelector({show: true, setup})}
      >
        <Flex direction="row" center className="gap-1.5">
          <div className="h-7 w-7">
            <RectangleStackIcon/>
          </div>
          <div>
            {getTeamName(currentTeam)}
          </div>
        </Flex>
      </button>
      <UserDataUploadButton opts={{type: 'teamAnalysisSetup', data: {...setup, snorlaxFavorite}}}/>
    </InputRow>
  );
};
