import React from 'react';

import CloudArrowDownIcon from '@heroicons/react/24/outline/CloudArrowDownIcon';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {useUserDataActor} from '@/hooks/userData/actor';


export const TeamAnalysisCloudPull = ({onCloudPulled}: PokeboxImporterCommonProps) => {
  const [memberId, setMemberId] = React.useState('');
  const {actAsync, status} = useUserDataActor();

  if (!actAsync) {
    return <></>;
  }

  return (
    <Flex className="gap-1.5 sm:w-96">
      <Flex>
        <InputBox
          type="text"
          value={memberId}
          onChange={({target}) => setMemberId(target.value)}
        />
      </Flex>
      <Flex className="items-end">
        <button className="button-clickable-bg h-9 w-9 p-1" onClick={async () => {
          const updated = await actAsync({
            action: 'load',
            options: {
              type: 'teamAnalysisMember',
              opts: {
                teamMemberId: memberId,
              },
            },
            getStatusOnCompleted: (updated) => (
              !!updated?.user.lazyLoaded.teamAnalysisMember ? 'completed' : 'failed'
            ),
          });
          if (!updated) {
            return;
          }

          const member = updated.user.lazyLoaded.teamAnalysisMember;
          if (!member) {
            return;
          }

          onCloudPulled(member);
        }}>
          {status !== 'waiting' ? actionStatusIcon[status] : <CloudArrowDownIcon/>}
        </button>
      </Flex>
    </Flex>
  );
};
