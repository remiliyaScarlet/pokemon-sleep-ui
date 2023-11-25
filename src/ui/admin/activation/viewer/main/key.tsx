import React from 'react';

import {ActivationUiCommonProps, ActivationUiControl} from '@/ui/admin/activation/type';
import {ActivationViewerCommon} from '@/ui/admin/activation/viewer/main/common';
import {getActivationKeyButtonText} from '@/ui/admin/activation/viewer/utils';


type Props = ActivationUiCommonProps & {
  control: ActivationUiControl,
};

export const ActivationKeyViewer = (props: Props) => {
  const {control} = props;

  return (
    <ActivationViewerCommon
      {...props}
      data={control.state.key}
      title="Pending"
      getButtonText={(data) => getActivationKeyButtonText({
        data,
        defaultOnNotFound: data.key.slice(0, 8),
      })}
      getActivationInfo={(data) => ({type: 'key', data})}
    />
  );
};
