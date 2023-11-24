import React from 'react';

import {InfoIcon} from '@/components/icons/info';
import {InputBox} from '@/components/input/box';
import {InputRow} from '@/components/input/filter/row';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {ActivationSourceAll} from '@/types/mongo/activation';
import {ActivationUiCommonProps, ActivationUiControl} from '@/ui/admin/activation/type';
import {ActivationUnit} from '@/ui/admin/activation/viewer/unit';
import {getActivationButtonText, getActivationTitle} from '@/ui/admin/activation/viewer/utils';
import {isActivationSource} from '@/utils/user/activation/type';


type Props = ActivationUiCommonProps & {
  source: ActivationSourceAll | null,
  control: ActivationUiControl,
};

export const ActivationViewer = (props: Props) => {
  const {source, control} = props;

  const collapsible = useCollapsible();
  const [search, setSearch] = React.useState('');

  let activationsOfSource = control.state.data
    .filter((activation) => activation.source === source)
    .map((data) => ({
      ...data,
      buttonText: getActivationButtonText({data, ...props}),
    }))
    .sort((a, b) => a.buttonText.localeCompare(b.buttonText));

  if (search) {
    activationsOfSource = activationsOfSource.filter(({buttonText, contact}) => (
      buttonText.includes(search) || (isActivationSource(source) && contact[source]?.includes(search))
    ));
  }

  return (
    <Collapsible state={collapsible} classNameForHeight="h-80" button={
      <Flex direction="row" center className="gap-1.5 p-2">
        <div>{getActivationTitle(source)}</div>
        <InfoIcon>{activationsOfSource.length}</InfoIcon>
      </Flex>
    }>
      <Flex className="gap-1.5 pr-1.5">
        <InputRow>
          <InputBox
            type="text"
            value={search}
            onChange={({target}) => setSearch(target.value)}
            className="w-full"
          />
        </InputRow>
        <HorizontalSplitter/>
        <Grid className="grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          {activationsOfSource.map((data) => (
            <ActivationUnit key={data.userId} control={control} data={data} button={data.buttonText}/>
          ))}
        </Grid>
      </Flex>
    </Collapsible>
  );
};
