import {describe, expect, it} from '@jest/globals';

import {scanPatron} from '@/handler/call/activation/poll/scan/patron';
import {testActivations} from '@/tests/data/activation/generic';
import {testPatreonMemberData} from '@/tests/data/activation/patreon';


describe('Patreon Campaign Member Poll / Scan Patron', () => {
  // Intentionally squashing all types of test into 1
  // because all types of matches/mismatches happen within a single list
  it('is correct', () => {
    const {
      toUpdateExpiry,
      toSendActivation,
      toDeactivate,
    } = scanPatron({
      memberData: testPatreonMemberData,
      activations: testActivations,
    });

    expect(toSendActivation[0].member.attributes.email).toBe('patronNoActivation@email.com');
    expect(toSendActivation).toHaveLength(1);
    expect(toUpdateExpiry[0].member.attributes.email).toBe('patronPending@email.com');
    expect(toUpdateExpiry[1].member.attributes.email).toBe('patronActive@email.com');
    expect(toUpdateExpiry).toHaveLength(2);
    expect(toDeactivate[0]).toBe('patreonExpired');
    expect(toDeactivate[1]).toBe('patreonDeclined');
    expect(toDeactivate).toHaveLength(2);
  });
});
