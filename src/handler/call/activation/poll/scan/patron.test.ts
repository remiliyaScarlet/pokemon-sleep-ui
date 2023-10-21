import {describe, expect, it} from '@jest/globals';
import {v4} from 'uuid';

import {scanPatron} from '@/handler/call/activation/poll/scan/patron';
import {IsoUtcTimestampString} from '@/types/date';
import {ActivationKey, activationType} from '@/types/mongo/activation';
import {PatreonMember} from '@/types/patreon/common/member';
import {PatreonUser} from '@/types/patreon/common/user';


const baseMember: PatreonMember = {
  attributes: {
    email: 'test@email.com',
    last_charge_date: new Date('2023-10-01').toISOString() as IsoUtcTimestampString,
    last_charge_status: 'Paid',
    patron_status: 'active_patron',
    pledge_cadence: 0,
  },
  id: v4(),
  type: 'member',
};

const baseUser: PatreonUser = {
  attributes: {
    social_connections: {
      discord: {
        user_id: '@test',
      },
    },
  },
  id: v4(),
  type: 'user',
};

const baseTestActivationKey: ActivationKey = {
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

describe('Scan Patron', () => {
  // Intentionally squashing all types of test into 1
  // because all types of matches/mismatches happen within a single list
  it('is correct', () => {
    const {
      toUpdateExpiry,
      toSendActivation,
      toDeactivate,
    } = scanPatron({
      memberData: [
        // Is Patron, but not in activations
        {
          member: {
            ...baseMember,
            attributes: {
              ...baseMember.attributes,
              email: 'patronNoActivation@email.com',
            },
          },
          user: baseUser,
        },
        // Is Patron, got pending activation key
        {
          member: {
            ...baseMember,
            attributes: {
              ...baseMember.attributes,
              email: 'patronPending@email.com',
            },
          },
          user: baseUser,
        },
        // Is Patron, got active activation
        {
          member: {
            ...baseMember,
            attributes: {
              ...baseMember.attributes,
              email: 'patronActive@email.com',
            },
          },
          user: baseUser,
        },
        // Is Patron, got denied but have a pending activation
        {
          member: {
            ...baseMember,
            attributes: {
              ...baseMember.attributes,
              email: 'patronDenied@email.com',
              last_charge_status: 'Declined',
            },
          },
          user: baseUser,
        },
        // Is Patron, got denied but is activated
        {
          member: {
            ...baseMember,
            attributes: {
              ...baseMember.attributes,
              email: 'patronDenied2@email.com',
              last_charge_status: 'Declined',
            },
          },
          user: baseUser,
        },
      ],
      activations: [
        {
          ...baseTestActivationKey,
        },
        {
          ...baseTestActivationKey,
          source: 'patreon',
          contact: {
            patreon: 'patronPending@email.com',
          },
        },
        {
          ...baseTestActivationKey,
          key: 'denied2',
          source: 'patreon',
          contact: {
            patreon: 'patronDenied@email.com',
          },
        },
        {
          ...baseTestActivationKey,
          source: 'discord',
          contact: {
            discord: '@discord',
          },
        },
        {
          ...baseTestActivationKey,
          source: 'patreon',
          contact: {
            patreon: 'patronActive@email.com',
          },
        },
        {
          ...baseTestActivationKey,
          key: 'denied',
          source: 'patreon',
          contact: {
            patreon: 'patronDenied2@email.com',
          },
        },
        {
          ...baseTestActivationKey,
          source: 'discord',
          contact: {
            discord: '@discord',
          },
        },
      ],
    });

    expect(toSendActivation[0].member.attributes.email).toBe('patronNoActivation@email.com');
    expect(toUpdateExpiry[0].member.attributes.email).toBe('patronPending@email.com');
    expect(toUpdateExpiry[1].member.attributes.email).toBe('patronActive@email.com');
    expect(toDeactivate[0]).toBe('denied2');
    expect(toDeactivate[1]).toBe('denied');
  });
});
