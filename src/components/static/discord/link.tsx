import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {DiscordIcon} from '@/components/static/discord/icon';
import {discordLink} from '@/const/external';


type Props = {
  className?: string,
};

export const DiscordLink = ({className}: Props) => {
  return (
    <a href={discordLink} className="group" target="_blank">
      <Flex noFullWidth center className={className}>
        <DiscordIcon className="scale-75"/>
      </Flex>
    </a>
  );
};
