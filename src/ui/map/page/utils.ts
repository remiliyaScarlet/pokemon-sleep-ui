import {SnorlaxRank, SnorlaxRankTitleId} from '@/types/game/rank';


const maxRankByTitle: {[title in SnorlaxRankTitleId]?: number} = {
  1: 5,
  2: 5,
  3: 5,
  4: 20,
};

export const getPossibleRanks = (): SnorlaxRank[] => {
  const ranks: SnorlaxRank[] = [];
  let title: SnorlaxRankTitleId = 1;
  let maxRank = maxRankByTitle[title];

  while (maxRank) {
    ranks.push(...[...Array(maxRank).keys()].map((level) => ({
      title,
      number: level + 1,
    })));
    title += 1;
    maxRank = maxRankByTitle[title];
  }

  return ranks;
};
