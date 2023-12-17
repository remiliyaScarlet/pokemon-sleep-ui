import {TeamMakerBasisValue} from '@/ui/team/maker/type/common';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';


type GetTeamMakerDataSorterOpts<TData> = {
  basis: TeamMakerBasis,
  getBasisValue: (data: TData) => TeamMakerBasisValue,
};

export const getTeamMakerDataSorter = <TData>({
  basis,
  getBasisValue,
}: GetTeamMakerDataSorterOpts<TData>) => (a: TData, b: TData) => {
  const basisValueA = getBasisValue(a);
  const basisValueB = getBasisValue(b);

  if (basis === 'strength') {
    return basisValueB.strength - basisValueA.strength;
  }

  if (basis === 'mealCoverage') {
    const coverageDiff = basisValueB.mealCoverage.total - basisValueA.mealCoverage.total;

    if (Math.abs(coverageDiff) > 0) {
      return coverageDiff;
    }

    return basisValueB.strength - basisValueA.strength;
  }

  throw new Error(`Unhandled team maker basis of ${basis satisfies never} during data sort`);
};
