import React from 'react';


export const HorizontalMarquee = ({children}: React.PropsWithChildren) => {
  return (
    <div className="overflow-hidden">
      <div className="animate-marquee-x">
        {children}
      </div>
    </div>
  );
};
