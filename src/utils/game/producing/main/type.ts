import {GetPokemonProducingRateBaseOpts} from '@/utils/game/producing/main/base';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/type';


export type GetPokemonProducingRateOpts = Omit<
  GetPokemonProducingRateBaseOpts,
  keyof GetProducingRateSharedOpts | 'helperCount'
>;

export type GetPokemonProducingRateOptsWithPayload<TPayload> = {
  opts: GetPokemonProducingRateOpts,
  payload: TPayload,
};
