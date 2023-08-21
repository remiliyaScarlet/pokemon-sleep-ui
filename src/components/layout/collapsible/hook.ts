import React from 'react';


export const useCollapsible = () => {
  const [show, setShow] = React.useState(false);

  return {show, setShow};
};
