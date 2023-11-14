import React from 'react';


type Props = {
  icon: React.ReactNode,
};

export const UserSettingsAppInfoIcon = ({icon}: Props) => {
  return (
    <div className="h-4 w-4">
      {icon}
    </div>
  );
};
