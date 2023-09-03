import {defaultUserSettings} from '@/const/user/settings';
import {userDataSettings, userDataTeamAnalysisSetup} from '@/controller/user/manager';
import {UserSettings} from '@/types/userData/settings';


type TeamAnalysisBonus = {
  ingredient: number,
  overall: number,
};

const toUserSettings = (oldBonus: TeamAnalysisBonus): UserSettings => {
  return {
    ...defaultUserSettings,
    bonus: {
      ...oldBonus,
      map: defaultUserSettings.bonus.map,
    },
  };
};

export const runUserSettingsMigrations = async (userId: string) => {
  const [
    teamSetupCollection,
    settingsCollection,
  ] = await Promise.all([
    userDataTeamAnalysisSetup.getCollection(),
    userDataSettings.getCollection(),
  ]);

  const teamSetup = await teamSetupCollection.findOne({userId, 'data.bonus': {$exists: true}});

  if (!teamSetup) {
    return;
  }

  // @ts-ignore
  const oldBonus = teamSetup.data['bonus'] as TeamAnalysisBonus;
  await Promise.all([
    teamSetupCollection.updateOne({userId}, {$unset: {'data.bonus': true}}),
    settingsCollection.updateOne({userId}, {$set: {userId, data: toUserSettings(oldBonus)}}, {upsert: true}),
  ]);
};
