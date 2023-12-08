import {describe, expect, it} from '@jest/globals';

import {testExpData, testExpShardConsumption} from '@/tests/data/game/exp';
import {getLevelUpRequirementsAccumulated, getLevelUpRequirementsOfEachLevel} from '@/ui/xp/results/utils';


describe('EXP Calculator / Level Up Requirements (Each Level)', () => {
  it('is correct with everything on default', () => {
    const expItemsRequired = getLevelUpRequirementsOfEachLevel({
      xpData: testExpData,
      xpShardConsumption: testExpShardConsumption,
      xpToNext: 54,
      currentLv: 1,
      multiplier: 1,
      ownedCandies: 0,
      rate: {
        candyExpBoost: 1,
        dreamShardDepletion: 1,
      },
    });

    expect(expItemsRequired[0].lv).toBe(2);
    expect(expItemsRequired[0].xp).toBe(54);
    expect(expItemsRequired[0].candy).toBe(3);
    expect(expItemsRequired[0].shard).toBe(3 * 14);
    expect(expItemsRequired[1].lv).toBe(3);
    expect(expItemsRequired[1].xp).toBe(71);
    expect(expItemsRequired[1].candy).toBe(2);
    expect(expItemsRequired[1].shard).toBe(2 * 18);
    expect(expItemsRequired[2].lv).toBe(4);
    expect(expItemsRequired[2].xp).toBe(108);
    expect(expItemsRequired[2].candy).toBe(5);
    expect(expItemsRequired[2].shard).toBe(5 * 22);
    expect(expItemsRequired[3].lv).toBe(5);
    expect(expItemsRequired[3].xp).toBe(128);
    expect(expItemsRequired[3].candy).toBe(5);
    expect(expItemsRequired[3].shard).toBe(5 * 27);
    expect(expItemsRequired[4].lv).toBe(6);
    expect(expItemsRequired[4].xp).toBe(164);
    expect(expItemsRequired[4].candy).toBe(6);
    expect(expItemsRequired[4].shard).toBe(6 * 30);
    expect(expItemsRequired[5].lv).toBe(7);
    expect(expItemsRequired[5].xp).toBe(202);
    expect(expItemsRequired[5].candy).toBe(9);
    expect(expItemsRequired[5].shard).toBe(9 * 34);
    expect(expItemsRequired[6].lv).toBe(8);
    expect(expItemsRequired[6].xp).toBe(244);
    expect(expItemsRequired[6].candy).toBe(9);
    expect(expItemsRequired[6].shard).toBe(9 * 39);
    expect(expItemsRequired[7].lv).toBe(9);
    expect(expItemsRequired[7].xp).toBe(274);
    expect(expItemsRequired[7].candy).toBe(11);
    expect(expItemsRequired[7].shard).toBe(11 * 44);
    expect(expItemsRequired[8].lv).toBe(10);
    expect(expItemsRequired[8].xp).toBe(315);
    expect(expItemsRequired[8].candy).toBe(13);
    expect(expItemsRequired[8].shard).toBe(13 * 48);
  });

  it('is correct with multiplier > 1', () => {
    const expItemsRequired = getLevelUpRequirementsOfEachLevel({
      xpData: testExpData,
      xpShardConsumption: testExpShardConsumption,
      xpToNext: 54,
      currentLv: 1,
      multiplier: 1.18,
      ownedCandies: 0,
      rate: {
        candyExpBoost: 1,
        dreamShardDepletion: 1,
      },
    });

    expect(expItemsRequired[0].lv).toBe(2);
    expect(expItemsRequired[0].xp).toBe(54);
    expect(expItemsRequired[0].candy).toBe(2);
    expect(expItemsRequired[0].shard).toBe(2 * 14);
    expect(expItemsRequired[1].lv).toBe(3);
    expect(expItemsRequired[1].xp).toBe(71);
    expect(expItemsRequired[1].candy).toBe(3);
    expect(expItemsRequired[1].shard).toBe(3 * 18);
    expect(expItemsRequired[2].lv).toBe(4);
    expect(expItemsRequired[2].xp).toBe(108);
    expect(expItemsRequired[2].candy).toBe(3);
    expect(expItemsRequired[2].shard).toBe(3 * 22);
    expect(expItemsRequired[3].lv).toBe(5);
    expect(expItemsRequired[3].xp).toBe(128);
    expect(expItemsRequired[3].candy).toBe(5);
    expect(expItemsRequired[3].shard).toBe(5 * 27);
    expect(expItemsRequired[4].lv).toBe(6);
    expect(expItemsRequired[4].xp).toBe(164);
    expect(expItemsRequired[4].candy).toBe(5);
    expect(expItemsRequired[4].shard).toBe(5 * 30);
    expect(expItemsRequired[5].lv).toBe(7);
    expect(expItemsRequired[5].xp).toBe(202);
    expect(expItemsRequired[5].candy).toBe(7);
    expect(expItemsRequired[5].shard).toBe(7 * 34);
    expect(expItemsRequired[6].lv).toBe(8);
    expect(expItemsRequired[6].xp).toBe(244);
    expect(expItemsRequired[6].candy).toBe(8);
    expect(expItemsRequired[6].shard).toBe(8 * 39);
    expect(expItemsRequired[7].lv).toBe(9);
    expect(expItemsRequired[7].xp).toBe(274);
    expect(expItemsRequired[7].candy).toBe(9);
    expect(expItemsRequired[7].shard).toBe(9 * 44);
    expect(expItemsRequired[8].lv).toBe(10);
    expect(expItemsRequired[8].xp).toBe(315);
    expect(expItemsRequired[8].candy).toBe(10);
    expect(expItemsRequired[8].shard).toBe(10 * 48);
  });

  it('is correct with multiplier < 1', () => {
    const expItemsRequired = getLevelUpRequirementsOfEachLevel({
      xpData: testExpData,
      xpShardConsumption: testExpShardConsumption,
      xpToNext: 54,
      currentLv: 1,
      multiplier: 0.82,
      ownedCandies: 0,
      rate: {
        candyExpBoost: 1,
        dreamShardDepletion: 1,
      },
    });

    expect(expItemsRequired[0].lv).toBe(2);
    expect(expItemsRequired[0].xp).toBe(54);
    expect(expItemsRequired[0].candy).toBe(3);
    expect(expItemsRequired[0].shard).toBe(3 * 14);
    expect(expItemsRequired[1].lv).toBe(3);
    expect(expItemsRequired[1].xp).toBe(71);
    expect(expItemsRequired[1].candy).toBe(3);
    expect(expItemsRequired[1].shard).toBe(3 * 18);
    expect(expItemsRequired[2].lv).toBe(4);
    expect(expItemsRequired[2].xp).toBe(108);
    expect(expItemsRequired[2].candy).toBe(6);
    expect(expItemsRequired[2].shard).toBe(6 * 22);
    expect(expItemsRequired[3].lv).toBe(5);
    expect(expItemsRequired[3].xp).toBe(128);
    expect(expItemsRequired[3].candy).toBe(6);
    expect(expItemsRequired[3].shard).toBe(6 * 27);
    expect(expItemsRequired[4].lv).toBe(6);
    expect(expItemsRequired[4].xp).toBe(164);
    expect(expItemsRequired[4].candy).toBe(7);
    expect(expItemsRequired[4].shard).toBe(7 * 30);
    expect(expItemsRequired[5].lv).toBe(7);
    expect(expItemsRequired[5].xp).toBe(202);
    expect(expItemsRequired[5].candy).toBe(10);
    expect(expItemsRequired[5].shard).toBe(10 * 34);
    expect(expItemsRequired[6].lv).toBe(8);
    expect(expItemsRequired[6].xp).toBe(244);
    expect(expItemsRequired[6].candy).toBe(12);
    expect(expItemsRequired[6].shard).toBe(12 * 39);
    expect(expItemsRequired[7].lv).toBe(9);
    expect(expItemsRequired[7].xp).toBe(274);
    expect(expItemsRequired[7].candy).toBe(13);
    expect(expItemsRequired[7].shard).toBe(13 * 44);
    expect(expItemsRequired[8].lv).toBe(10);
    expect(expItemsRequired[8].xp).toBe(315);
    expect(expItemsRequired[8].candy).toBe(15);
    expect(expItemsRequired[8].shard).toBe(15 * 48);
  });

  it('is correct with owned candies', () => {
    const expItemsRequired = getLevelUpRequirementsOfEachLevel({
      xpData: testExpData,
      xpShardConsumption: testExpShardConsumption,
      xpToNext: 54,
      currentLv: 1,
      multiplier: 1,
      ownedCandies: 10,
      rate: {
        candyExpBoost: 1,
        dreamShardDepletion: 1,
      },
    });

    expect(expItemsRequired[0].lv).toBe(2);
    expect(expItemsRequired[0].xp).toBe(54);
    expect(expItemsRequired[0].candy).toBe(0);
    expect(expItemsRequired[0].shard).toBe(3 * 14);
    expect(expItemsRequired[1].lv).toBe(3);
    expect(expItemsRequired[1].xp).toBe(71);
    expect(expItemsRequired[1].candy).toBe(0);
    expect(expItemsRequired[1].shard).toBe(2 * 18);
    expect(expItemsRequired[2].lv).toBe(4);
    expect(expItemsRequired[2].xp).toBe(108);
    expect(expItemsRequired[2].candy).toBe(0);
    expect(expItemsRequired[2].shard).toBe(5 * 22);
    expect(expItemsRequired[3].lv).toBe(5);
    expect(expItemsRequired[3].xp).toBe(128);
    expect(expItemsRequired[3].candy).toBe(5);
    expect(expItemsRequired[3].shard).toBe(5 * 27);
    expect(expItemsRequired[4].lv).toBe(6);
    expect(expItemsRequired[4].xp).toBe(164);
    expect(expItemsRequired[4].candy).toBe(6);
    expect(expItemsRequired[4].shard).toBe(6 * 30);
    expect(expItemsRequired[5].lv).toBe(7);
    expect(expItemsRequired[5].xp).toBe(202);
    expect(expItemsRequired[5].candy).toBe(9);
    expect(expItemsRequired[5].shard).toBe(9 * 34);
    expect(expItemsRequired[6].lv).toBe(8);
    expect(expItemsRequired[6].xp).toBe(244);
    expect(expItemsRequired[6].candy).toBe(9);
    expect(expItemsRequired[6].shard).toBe(9 * 39);
    expect(expItemsRequired[7].lv).toBe(9);
    expect(expItemsRequired[7].xp).toBe(274);
    expect(expItemsRequired[7].candy).toBe(11);
    expect(expItemsRequired[7].shard).toBe(11 * 44);
    expect(expItemsRequired[8].lv).toBe(10);
    expect(expItemsRequired[8].xp).toBe(315);
    expect(expItemsRequired[8].candy).toBe(13);
    expect(expItemsRequired[8].shard).toBe(13 * 48);
  });

  it('is correct with non-1 current level', () => {
    const expItemsRequired = getLevelUpRequirementsOfEachLevel({
      xpData: testExpData,
      xpShardConsumption: {data: {}},
      xpToNext: 54,
      currentLv: 1,
      multiplier: 1,
      ownedCandies: 0,
      rate: {
        candyExpBoost: 1,
        dreamShardDepletion: 1,
      },
    });

    expect(expItemsRequired[0].lv).toBe(2);
    expect(expItemsRequired[0].xp).toBe(54);
    expect(expItemsRequired[0].candy).toBe(3);
    expect(expItemsRequired[0].shard).toBeNaN();
    expect(expItemsRequired[1].lv).toBe(3);
    expect(expItemsRequired[1].xp).toBe(71);
    expect(expItemsRequired[1].candy).toBe(2);
    expect(expItemsRequired[1].shard).toBeNaN();
  });

  it('is correct with non-default rates', () => {
    const expItemsRequired = getLevelUpRequirementsOfEachLevel({
      xpData: testExpData,
      xpShardConsumption: testExpShardConsumption,
      xpToNext: 44,
      currentLv: 1,
      multiplier: 1,
      ownedCandies: 0,
      rate: {
        candyExpBoost: 2,
        dreamShardDepletion: 6,
      },
    });

    expect(expItemsRequired[0].lv).toBe(2);
    expect(expItemsRequired[0].xp).toBe(44);
    expect(expItemsRequired[0].candy).toBe(1);
    expect(expItemsRequired[0].shard).toBe(14 * 6);
    expect(expItemsRequired[1].lv).toBe(3);
    expect(expItemsRequired[1].xp).toBe(71);
    expect(expItemsRequired[1].candy).toBe(2);
    expect(expItemsRequired[1].shard).toBe(2 * 18 * 6);
    expect(expItemsRequired[2].lv).toBe(4);
    expect(expItemsRequired[2].xp).toBe(108);
    expect(expItemsRequired[2].candy).toBe(2);
    expect(expItemsRequired[2].shard).toBe(2 * 22 * 6);
    expect(expItemsRequired[3].lv).toBe(5);
    expect(expItemsRequired[3].xp).toBe(128);
    expect(expItemsRequired[3].candy).toBe(3);
    expect(expItemsRequired[3].shard).toBe(3 * 27 * 6);
  });

  it('does not have additional entry at the end', () => {
    const expItemsRequired = getLevelUpRequirementsOfEachLevel({
      xpData: testExpData,
      xpShardConsumption: testExpShardConsumption,
      xpToNext: 44,
      currentLv: 1,
      multiplier: 1,
      ownedCandies: 0,
      rate: {
        candyExpBoost: 1,
        dreamShardDepletion: 1,
      },
    });

    expect(expItemsRequired).toHaveLength(9);
  });

  it('does not have additional entry at max level', () => {
    const expItemsRequired = getLevelUpRequirementsOfEachLevel({
      xpData: testExpData,
      xpShardConsumption: testExpShardConsumption,
      xpToNext: 44,
      currentLv: 10,
      multiplier: 1,
      ownedCandies: 0,
      rate: {
        candyExpBoost: 1,
        dreamShardDepletion: 1,
      },
    });

    expect(expItemsRequired).toHaveLength(0);
  });
});

describe('EXP Calculator / Level Up Requirements (Accumulated)', () => {
  it('is correct', () => {
    const accumulated = getLevelUpRequirementsAccumulated([
      {lv: 4, xp: 30, candy: 2, shard: 2 * 22},
      {lv: 5, xp: 128, candy: 5, shard: 5 * 27},
      {lv: 6, xp: 164, candy: 6, shard: 6 * 30},
      {lv: 7, xp: 202, candy: 8, shard: 8 * 34},
    ]);

    expect(accumulated[0].lv).toBe(4);
    expect(accumulated[0].xp).toBe(30);
    expect(accumulated[0].candy).toBe(2);
    expect(accumulated[0].shard).toBe(2 * 22);
    expect(accumulated[1].lv).toBe(5);
    expect(accumulated[1].xp).toBe(158);
    expect(accumulated[1].candy).toBe(7);
    expect(accumulated[1].shard).toBe(2 * 22 + 5 * 27);
    expect(accumulated[2].lv).toBe(6);
    expect(accumulated[2].xp).toBe(322);
    expect(accumulated[2].candy).toBe(13);
    expect(accumulated[2].shard).toBe(2 * 22 + 5 * 27 + 6 * 30);
    expect(accumulated[3].lv).toBe(7);
    expect(accumulated[3].xp).toBe(524);
    expect(accumulated[3].candy).toBe(21);
    expect(accumulated[3].shard).toBe(2 * 22 + 5 * 27 + 6 * 30 + 8 * 34);
  });
});
