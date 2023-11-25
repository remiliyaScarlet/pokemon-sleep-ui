'use client';
import React from 'react';

import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {activationSourceAll} from '@/types/mongo/activation';
import {ActivationGenerator} from '@/ui/admin/activation/generate/main';
import {useActivationUI} from '@/ui/admin/activation/hook';
import {ActivationSearcher} from '@/ui/admin/activation/search/main';
import {ActivationStats} from '@/ui/admin/activation/stats/main';
import {ActivationUiCommonProps, AdminActivationServerDataProps} from '@/ui/admin/activation/type';
import {ActivationDataViewer} from '@/ui/admin/activation/viewer/main/data';
import {ActivationPopup} from '@/ui/admin/activation/viewer/popup/main';


export const AdminActivationManagementClient = (data: AdminActivationServerDataProps) => {
  const {preloaded} = data;

  const control = useActivationUI({preloaded});

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
      <ActivationSearcher {...props}/>
      <ActivationStats {...props}/>
      <Grid className="grid-cols-1 gap-2 lg:grid-cols-2">
        {activationSourceAll.map((source) => (
          <ActivationDataViewer key={source} source={source} {...props}/>
        ))}
        <ActivationDataViewer source={null} {...props}/>
      </Grid>
    </Flex>
  );
};
