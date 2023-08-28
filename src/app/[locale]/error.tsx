'use client';
import React from 'react';

import {Failed} from '@/components/icons/failed';


type Props = {
  error: Error,
};

const Error = ({error}: Props) => {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Failed text={`${error.name}: ${error.message}`}/>
  );
};

export default Error;
