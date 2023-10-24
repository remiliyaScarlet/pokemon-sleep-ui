import React from 'react';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Copyable} from '@/components/layout/copyable/main';
import {Flex} from '@/components/layout/flex/common';
import {ActivationPropertiesAtClient} from '@/types/mongo/activation';
import {ActivationEditor} from '@/ui/admin/activation/editor/main';
import {ActivationUiControl} from '@/ui/admin/activation/type';
import {generateInitialActivationPropertiesAtClient} from '@/ui/admin/activation/utils';


type Props = {
  control: ActivationUiControl,
};

export const ActivationGenerator = ({control}: Props) => {
  const {actAsync, status} = control;

  const [data, setData] = React.useState<ActivationPropertiesAtClient>(
    generateInitialActivationPropertiesAtClient,
  );
  const [activationLink, setActivationLink] = React.useState<string>();

  return (
    <Flex className="info-section">
      <div className="text-2xl">
        Activation Key Generator
      </div>
      <ActivationEditor
        data={data}
        setData={setData}
        idPrefix="generator"
        status={status}
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
