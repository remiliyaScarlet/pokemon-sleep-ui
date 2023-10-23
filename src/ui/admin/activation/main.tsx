import React from 'react';

import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {ActivationGenerator} from '@/ui/admin/activation/generate/main';
import {useActivationUI} from '@/ui/admin/activation/hook';
import {ActivationSearcher} from '@/ui/admin/activation/search/main';
import {ActivationStats} from '@/ui/admin/activation/stats/main';
import {ActivationUiCommonProps} from '@/ui/admin/activation/type';
import {ActivationViewer} from '@/ui/admin/activation/viewer/main';
import {ActivationPopup} from '@/ui/admin/activation/viewer/popup/main';
import {SiteAdminServerDataProps} from '@/ui/admin/type';


export const ActivationUI = (data: SiteAdminServerDataProps) => {
  const {preloaded} = data;

  const control = useActivationUI({activations: preloaded.activations});

  if (!control) {
    return <Loading text="User Activation UI"/>;
  }

  const props: ActivationUiCommonProps = {
    ...data,
    control,
  };

  return (
    <Flex className="gap-2">
      <ActivationPopup {...props}/>
      <ActivationGenerator control={control}/>
      <ActivationSearcher control={control}/>
      <ActivationStats {...props}/>
      <Grid className="grid-cols-1 gap-2 lg:grid-cols-2">
        <ActivationViewer source="discord" {...props}/>
        <ActivationViewer source="patreon" {...props}/>
        <ActivationViewer source={null} {...props}/>
      </Grid>
    </Flex>
  );
};
