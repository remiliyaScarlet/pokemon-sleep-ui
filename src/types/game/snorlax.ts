import {FilterInclusionMap} from '@/components/input/filter/type';
import {BerryId} from '@/types/mongo/berry';


export type SnorlaxFavorite = FilterInclusionMap<BerryId>;

export type FilterWithSnorlaxFavorite = Record<string, SnorlaxFavorite>;
