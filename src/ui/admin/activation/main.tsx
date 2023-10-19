import React from 'react';

import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {UserActivationGenerator} from '@/ui/admin/activation/generate/main';
import {useUserActivationUI} from '@/ui/admin/activation/hook';
import {UserActivationStats} from '@/ui/admin/activation/stats/main';
import {UserActivationViewer} from '@/ui/admin/activation/viewer/main';
import {UserActivationPopup} from '@/ui/admin/activation/viewer/popup/main';
import {SiteAdminDataProps} from '@/ui/admin/type';


export const UserActivationUI = (props: SiteAdminDataProps) => {
  const control = useUserActivationUI();

  if (!control) {
    return <Loading text="User Activation UI"/>;
  }

  return (
    <Flex className="gap-2">
      <UserActivationPopup control={control} {...props}/>
      <UserActivationGenerator control={control}/>
      <UserActivationStats {...props}/>
      <Flex className="gap-2 lg:flex-row">
        <UserActivationViewer source="discord" control={control} {...props}/>
        <UserActivationViewer source="patreon" control={control} {...props}/>
      </Flex>
    </Flex>
  );
};
