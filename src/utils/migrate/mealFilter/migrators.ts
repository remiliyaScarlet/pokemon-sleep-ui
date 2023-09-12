import {Migrator} from '@/types/migrate';
import {MealFilter} from '@/ui/meal/index/type';
import {MealFilterMigrateParams} from '@/utils/migrate/mealFilter/type';


export const mealFilterMigrators: Migrator<MealFilter, MealFilterMigrateParams>[] = [
  {
    // no-op, simply add a version number
    toVersion: 1,
    migrate: (old) => old,
  },
];
