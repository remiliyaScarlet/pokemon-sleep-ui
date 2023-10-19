import React from 'react';

import {Loading} from '@/components/icons/loading';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Copyable} from '@/components/layout/copyable/main';
import {Flex} from '@/components/layout/flex/common';
import {useUserDataActor} from '@/hooks/userData/actor';
import {UserActivationPropertiesAtClient} from '@/types/mongo/activation';
import {UserActivationEditor} from '@/ui/admin/activation/editor/main';
import {generateInitialUserActivationPropertiesAtClient} from '@/ui/admin/activation/utils';


export const UserActivationGenerator = () => {
  const [data, setData] = React.useState<UserActivationPropertiesAtClient>(
    generateInitialUserActivationPropertiesAtClient,
  );
  const [activationLink, setActivationLink] = React.useState<string>();
  const {actAsync} = useUserDataActor();

  if (!actAsync) {
    return <Loading text="Activation Key Generator"/>;
  }

  return (
    <Flex className="info-section gap-1.5">
      <div className="text-2xl">
        Activation Key Generator
      </div>
      <UserActivationEditor
        data={data}
        setData={setData}
        onSubmit={async (data) => {
          const updated = await actAsync({
            action: 'load',
            options: {type: 'adminActivationCreate', opts: data},
            getStatusOnCompleted: (updated) => (
              !!updated?.user.lazyLoaded.adminActivationCreate ? 'completed' : 'failed'
            ),
          });

          const activationKey = updated?.user.lazyLoaded.adminActivationCreate;
          if (!activationKey) {
            return;
          }

          setActivationLink(activationKey);
        }}
      />
      <AnimatedCollapseQuick show={!!activationLink}>
        {activationLink && <Copyable content={activationLink}/>}
      </AnimatedCollapseQuick>
    </Flex>
  );
};
