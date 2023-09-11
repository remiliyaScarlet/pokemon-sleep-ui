import {Migrator} from '@/types/migrate';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';
import {PokeboxViewerDisplayMigrateParams} from '@/utils/migrate/pokeboxDisplay/type';


export const pokeboxDisplayMigrators: Migrator<PokeboxViewerDisplay, PokeboxViewerDisplayMigrateParams>[] = [
  {
    // `frequency` sort type split to `frequencyOfBerry`/`frequencyOfIngredient` addition
    toVersion: 1,
    migrate: ({sort, ...old}): PokeboxViewerDisplay => ({
      ...old,
      // @ts-ignore
      sort: sort === 'frequency' ? 'frequencyOfBerry' : sort,
    }),
  },
];
