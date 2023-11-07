import React from 'react';

import {clsx} from 'clsx';

import {FlexLink} from '@/components/layout/flex/link';
import {DiscordIcon} from '@/components/static/discord/icon';
import {discordLink} from '@/const/external';


type Props = {
  className?: string,
};

export const DiscordLink = ({className}: Props) => {
  return (
    <FlexLink href={discordLink} className={clsx('button-clickable group p-1', className)}>
      <DiscordIcon/>
    </FlexLink>
  );
};
