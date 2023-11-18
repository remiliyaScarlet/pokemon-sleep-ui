import {clsx} from 'clsx';

import {trustedDataCount} from '@/const/game/producingParams';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';


export const isParamsTrustWorthy = (dataCount: number): boolean => dataCount > trustedDataCount;

export const getProducingParamsSectionStyle = ({dataCount}: PokemonProducingParams): string => clsx(
  'items-center gap-1',
  !isParamsTrustWorthy(dataCount) && 'text-danger',
);
