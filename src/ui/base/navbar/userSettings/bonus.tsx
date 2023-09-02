import React from 'react';

import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';
import ArrowUpCircleIcon from '@heroicons/react/24/outline/ArrowUpCircleIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {IngredientBonusSlider} from '@/components/shared/production/bonus/ingredient';
import {MapBonusSlider} from '@/components/shared/production/bonus/map';
import {OverallBonusSlider} from '@/components/shared/production/bonus/overall';
import {discordLink} from '@/const/external';
import {UserBonus} from '@/types/game/bonus';
import {SleepMapId} from '@/types/game/sleepStyle';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/section';


type Props = {
  mapIds: SleepMapId[],
  bonus: UserBonus,
  setBonus: (newBonus: UserBonus) => void,
  currentMap: SleepMapId,
  setCurrentMap: (map: SleepMapId) => void,
};

export const UserSettingsBonusUI = ({mapIds, bonus, setBonus, currentMap, setCurrentMap}: Props) => {
  return (
    <UserSettingsSection titleIcon={<ArrowUpCircleIcon/>}>
      <IngredientBonusSlider value={bonus.ingredient} setValue={(ingredient) => setBonus({
        ...bonus,
        ingredient,
      })}/>
      <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-2">
        {mapIds.map((mapId) => (
          <MapBonusSlider
            key={mapId}
            mapId={mapId}
            value={bonus.map[mapId] ?? 0}
            setValue={(value) => setBonus({
              ...bonus,
              map: {
                [mapId]: value,
              },
            })}
            isCurrent={currentMap === mapId}
            onMapClicked={() => setCurrentMap(mapId)}
          />
        ))}
      </Grid>
      <OverallBonusSlider value={bonus.overall} setValue={(overall) => setBonus({
        ...bonus,
        overall,
      })}/>
      <Flex direction="row" className="items-center justify-end gap-1">
        <div className="h-6 w-6">
          <QuestionMarkCircleIcon/>
        </div>
        <div className="h-6 w-6">
          <ArrowRightIcon/>
        </div>
        <Link href={discordLink} className="border-link">
          Discord
        </Link>
      </Flex>
    </UserSettingsSection>
  );
};
