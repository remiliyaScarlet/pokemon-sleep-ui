import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {UserActivationEditor} from '@/ui/admin/activation/editor/main';
import {UserActivationUiControl} from '@/ui/admin/activation/type';
import {UserActivationDelete} from '@/ui/admin/activation/viewer/popup/delete';
import {UserActivationReadonlyField} from '@/ui/admin/activation/viewer/popup/field/readonly';
import {SiteAdminDataProps} from '@/ui/admin/type';


type Props = {
  state: UseUserActivationPopupReturn,
};

export const UserActivationPopup = ({state}: Props) => {
  const {data} = state;

  if (!data) {
    return null;
  }

  return (
    <PopupCommon {...state}>
      {data.userId}
    </PopupCommon>
  );
};
