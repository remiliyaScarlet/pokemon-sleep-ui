import React from 'react';

import {ActivationSourceAll} from '@/types/mongo/activation';
import {ActivationUiCommonProps} from '@/ui/admin/activation/type';
import {ActivationViewerCommon} from '@/ui/admin/activation/viewer/main/common';
import {getActivationDataButtonText, getActivationTitle} from '@/ui/admin/activation/viewer/utils';


type Props = ActivationUiCommonProps & {
  source: ActivationSourceAll | null,
};

export const ActivationDataViewer = ({source, ...props}: Props) => {
  const {control} = props;

  return (
    <ActivationViewerCommon
      {...props}
      data={control.state.data.filter((activation) => activation.source === source)}
      title={getActivationTitle(source)}
      getButtonText={(data) => getActivationDataButtonText({data, ...props})}
      getActivationInfo={(data) => ({type: 'data', data})}
    />
  );
};
