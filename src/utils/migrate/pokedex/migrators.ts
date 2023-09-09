import {Migrator} from '@/types/migrate';
import {PokedexFilter} from '@/ui/pokedex/index/type';
import {PokedexFilterMigrateParams} from '@/utils/migrate/pokedex/type';


export const pokedexMigrators: Migrator<PokedexFilter, PokedexFilterMigrateParams>[] = [
  {
    // `frequency` sort type split to `frequencyOfBerry`/`frequencyOfIngredient` addition
    toVersion: 1,
    migrate: ({sort, display, ...old}): PokedexFilter => ({
      ...old,
      // @ts-ignore
      sort: sort === 'frequency' ? 'frequencyOfBerry' : sort,
      // @ts-ignore
      display: display === 'frequency' ? 'frequencyOfBerry' : display,
    }),
  },
];
