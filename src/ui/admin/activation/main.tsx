import React from 'react';

import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {UserActivationGenerator} from '@/ui/admin/activation/generate/main';
import {useUserActivationUI} from '@/ui/admin/activation/hook';
import {UserActivationStats} from '@/ui/admin/activation/stats/main';
import {UserActivationUiCommonProps} from '@/ui/admin/activation/type';
import {UserActivationViewer} from '@/ui/admin/activation/viewer/main';
import {UserActivationPopup} from '@/ui/admin/activation/viewer/popup/main';
import {SiteAdminServerDataProps} from '@/ui/admin/type';


export const UserActivationUI = (data: SiteAdminServerDataProps) => {
  const {preloaded} = data;

  const control = useUserActivationUI({activations: preloaded.activations});

  if (!control) {
    return <Loading text="User Activation UI"/>;
  }

  const props: UserActivationUiCommonProps = {
    ...data,
    control,
  };

  return (
    <Flex className="gap-2">
      <UserActivationPopup {...props}/>
      <UserActivationGenerator control={control}/>
      <UserActivationStats {...props}/>
      <Flex className="gap-2 lg:flex-row">
        <UserActivationViewer source="discord" {...props}/>
        <UserActivationViewer source="patreon" {...props}/>
      </Flex>
    </Flex>
  );
};
