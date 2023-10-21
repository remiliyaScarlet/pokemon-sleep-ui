import {describe, expect, it} from '@jest/globals';

import {scanActivations} from '@/handler/call/activation/poll/scan/activation';
import {testActivations} from '@/tests/data/activation/generic';
import {testPatreonMemberData} from '@/tests/data/activation/patreon';


describe('Patreon Campaign Member Poll / Scan Activation', () => {
  // Intentionally squashing all types of test into 1
  // because all types of matches/mismatches happen within a single list
  it('is correct', () => {
    const {
      toUpdateExpiry,
      toSendActivation,
      toDeactivate,
    } = scanActivations({
      memberData: testPatreonMemberData,
      activations: testActivations,
    });

    expect(toUpdateExpiry).toHaveLength(0);
    expect(toSendActivation).toHaveLength(0);
    expect(toDeactivate[0]).toBe('patreonDeclined');
    expect(toDeactivate[1]).toBe('patreonExpired');
    expect(toDeactivate).toHaveLength(2);
  });
});
