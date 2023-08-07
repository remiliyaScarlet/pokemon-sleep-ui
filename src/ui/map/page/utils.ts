import {maxSnorlaxRankByTitle} from '@/const/game/rank';
import {SnorlaxRank, SnorlaxRankTitleId} from '@/types/game/rank';


export const getPossibleRanks = (): SnorlaxRank[] => {
  const ranks: SnorlaxRank[] = [];
  let title: SnorlaxRankTitleId = 1;
  let maxRank = maxSnorlaxRankByTitle[title];

  while (maxRank) {
    ranks.push(...[...Array(maxRank).keys()].map((level) => ({
      title,
      number: level + 1,
    })));
    title += 1;
    maxRank = maxSnorlaxRankByTitle[title];
  }

  return ranks;
};
