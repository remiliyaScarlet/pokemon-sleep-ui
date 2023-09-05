import {describe, expect, it} from '@jest/globals';

import {getSleepSessionExtraInfo, getSleepSessionInfo} from '@/utils/game/sleep';


describe('Sleep Session Info', () => {
  it('converts correctly for overnight primary with secondary', () => {
    const {session, duration} = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 46800, // 13:00
        end: 52200, // 14:30
      },
    });

    expect(session.primary.adjustedTiming.start).toBe(63000);
    expect(session.primary.adjustedTiming.end).toBe(0);
    expect(session.primary.length).toBe(23400);
    expect(session.secondary?.adjustedTiming.start).toBe(25200);
    expect(session.secondary?.adjustedTiming.end).toBe(30600);
    expect(session.secondary?.length).toBe(5400);
    expect(duration.awake).toBe(57600);
  });

  it('converts correctly for overnight primary without secondary', () => {
    const {session, duration} = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: null,
    });

    expect(session.primary.adjustedTiming.start).toBe(63000);
    expect(session.primary.adjustedTiming.end).toBe(0);
    expect(session.primary.length).toBe(23400);
    expect(session.secondary?.adjustedTiming.start).toBeUndefined();
    expect(session.secondary?.adjustedTiming.end).toBeUndefined();
    expect(session.secondary?.length).toBeUndefined();
    expect(duration.awake).toBe(63000);
  });

  it('converts correctly for same-day primary with secondary', () => {
    const {session, duration} = getSleepSessionInfo({
      primary: {
        start: 21600, // 06:00
        end: 46800, // 13:00
      },
      secondary: {
        start: 61200, // 17:00
        end: 66600, // 18:30
      },
    });

    expect(session.primary.adjustedTiming.start).toBe(61200);
    expect(session.primary.adjustedTiming.end).toBe(0);
    expect(session.primary.length).toBe(25200);
    expect(session.secondary?.adjustedTiming.start).toBe(14400);
    expect(session.secondary?.adjustedTiming.end).toBe(19800);
    expect(session.secondary?.length).toBe(5400);
    expect(duration.awake).toBe(55800);
  });

  it('converts correctly for same-day primary without secondary', () => {
    const {session, duration} = getSleepSessionInfo({
      primary: {
        start: 21600, // 06:00
        end: 46800, // 13:00
      },
      secondary: null,
    });

    expect(session.primary.adjustedTiming.start).toBe(61200);
    expect(session.primary.adjustedTiming.end).toBe(0);
    expect(session.primary.length).toBe(25200);
    expect(session.secondary?.adjustedTiming.start).toBeUndefined();
    expect(session.secondary?.adjustedTiming.end).toBeUndefined();
    expect(session.secondary?.length).toBeUndefined();
    expect(duration.awake).toBe(61200);
  });

  it('gives correct extra sleep session info for overnight session', () => {
    const extra = getSleepSessionExtraInfo({
      start: 82800, // 23:00
      end: 21600, // 06:00
    });

    expect(extra.length).toBe(25200);
    expect(extra.recovery).toBe(83);
  });

  it('gives correct extra sleep session info for same-day session', () => {
    const extra = getSleepSessionExtraInfo({
      start: 21600, // 06:00
      end: 43200, // 12:00
    });

    expect(extra.length).toBe(21600);
    expect(extra.recovery).toBe(71);
  });
});
