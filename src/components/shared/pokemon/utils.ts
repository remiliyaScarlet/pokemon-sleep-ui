import {clsx} from 'clsx';

import {PokemonPackStatsCommonProps} from '@/components/shared/pokemon/type';


export const getPackStatsStyle = ({normalText, className}: PokemonPackStatsCommonProps) => clsx(
  'items-center gap-0.5',
  !normalText && 'text-sm',
  className,
);
