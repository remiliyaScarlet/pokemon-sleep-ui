import React from 'react';

import {toast} from 'react-hot-toast';

import {Toast} from '@/components/toast';


type ShowToastOpts = {
  content: React.ReactNode,
};

export const showToast = ({content}: ShowToastOpts) => {
  toast.custom(({visible}) => <Toast visible={visible}>{content}</Toast>);
};
