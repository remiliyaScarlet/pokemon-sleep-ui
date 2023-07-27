type UiMessages = typeof import('./src/translations/ui-en.json');
type GameMessages = typeof import('./src/translations/ui-en.json');

type I18nMetadata = {
  Title: string,
};

type PageWithIndividual = {
  Index: I18nMetadata,
  Page: I18nMetadata,
};

type GameObjectIdToString = {[id in string]: string};

declare interface IntlMessages extends UiMessages, GameMessages {
  UI: {
    Common: {
      Candy: string,
      DreamShards: string,
      Exp: string,
      Rank: string,
      Rewards: string,
      Shiny: string,
    },
    Metadata: {
      SiteName: string,
      Home: I18nMetadata,
      Pokedex: PageWithIndividual,
      Cooking: I18nMetadata,
      Meal: PageWithIndividual,
      Ingredient: PageWithIndividual,
      Map: PageWithIndividual,
      Skill: PageWithIndividual,
    },
    InPage: {
      Home: {
        Welcome: string,
      },
      Pokedex: {
        Info: {
          Berry: string,
          Ingredient: string,
          MainSkill: string,
          Map: string,
          Name: string,
          PokemonType: string,
          SleepType: string,
          Stats: string,
        },
        Stats: {
          Frequency: string,
          Friendship: string,
          MaxCarry: string,
          Recruit: string,
        }
      },
      Meal: {
        Ingredient: string,
        MealType: string,
      },
    },
    Game: {
      MealType: GameObjectIdToString,
    },
  },
  Game: {
    Berry: GameObjectIdToString,
    Field: GameObjectIdToString,
    Food: GameObjectIdToString,
    MainSkill: {
      Name: GameObjectIdToString,
      Description: GameObjectIdToString,
    },
    PokemonType: GameObjectIdToString,
    PokemonName: GameObjectIdToString,
    RankTitle: GameObjectIdToString,
    SleepFace: {
      onSnorlax: {Default: string},
      [pokemonId: string]: GameObjectIdToString
    },
    SleepType: GameObjectIdToString,
  }
}
