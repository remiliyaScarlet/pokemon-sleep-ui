import {ActivationKey, activationType} from '@/types/mongo/activation';


const testActivationKey: ActivationKey = {
  key: 'TestKey',
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
  },
  {
    ...testActivationKey,
    source: 'discord',
    contact: {
      discord: '@discord',
    },
  },
  {
    ...testActivationKey,
    source: 'patreon',
    contact: {
      patreon: 'patronPending@email.com',
    },
  },
  {
    ...testActivationKey,
    source: 'patreon',
    contact: {
      patreon: 'patronActive@email.com',
    },
  },
  {
    ...testActivationKey,
    key: 'denied',
    source: 'patreon',
    contact: {
      patreon: 'patronDenied2@email.com',
    },
  },
  {
    ...testActivationKey,
    key: 'denied2',
    source: 'patreon',
    contact: {
      patreon: 'patronDenied@email.com',
    },
  },
  {
    ...testActivationKey,
    key: 'expired',
    source: 'patreon',
    contact: {
      patreon: 'patronExpired@email.com',
    },
  },
  {
    ...testActivationKey,
    key: 'declined',
    source: 'patreon',
    contact: {
      patreon: 'patronDeclined@email.com',
    },
  },
];
