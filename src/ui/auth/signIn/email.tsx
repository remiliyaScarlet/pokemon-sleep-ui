'use client';
import React from 'react';

import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import {clsx} from 'clsx';
import {signIn} from 'next-auth/react';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';


export const AuthSignInEmailForm = () => {
  const [email, setEmail] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    void signIn('email', {email});
  };

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={onSubmit}>
      <Flex direction="col" center noFullWidth className="shrink-0">
        <div className="h-10 w-10">
          <EnvelopeIcon/>
        </div>
      </Flex>
      <InputBox
        value={email}
        type="email"
        className="w-full p-1 text-center text-lg"
        placeholder="email@example.com"
        onChange={({target}) => setEmail(target.value)}
        required
      />
      <Flex direction="col" center>
        <button type="submit" disabled={!email} className={clsx(
          'enabled:button-clickable-bg disabled:button-disabled w-1/2 p-2 md:w-1/3',
        )}>
          Email
        </button>
      </Flex>
    </form>
  );
};
