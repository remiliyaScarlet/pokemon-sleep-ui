import {ActivationKey, activationType} from '@/types/mongo/activation';


const testActivationKey: Omit<ActivationKey, 'key'> = {
  generatedAt: new Date(),
  activation: Object.fromEntries(activationType.map((type) => [type, true])),
  expiry: new Date(),
  source: 'patreon',
  contact: {
    patreon: 'test@email.com',
  },
  isSpecial: false,
  note: '',
};

export const testActivations: ActivationKey[] = [
  {
    ...testActivationKey,
    key: 'default',
  },
  {
    ...testActivationKey,
    key: 'discord',
    source: 'discord',
    contact: {
      discord: '@discord',
    },
  },
  {
    ...testActivationKey,
    key: 'patreonPending',
    source: 'patreon',
    contact: {
      patreon: 'patronPending@email.com',
    },
  },
  {
    ...testActivationKey,
    key: 'patreonActive',
    source: 'patreon',
    contact: {
      patreon: 'patronActive@email.com',
    },
  },
  {
    ...testActivationKey,
    key: 'patreonDeclined',
    source: 'patreon',
    contact: {
      patreon: 'patronDeclined@email.com',
    },
  },
  {
    ...testActivationKey,
    key: 'patreonExpired',
    source: 'patreon',
    contact: {
      patreon: 'patronExpired@email.com',
    },
  },
];
