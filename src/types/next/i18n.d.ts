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
    Metadata: {
      SiteName: string,
      Home: I18nMetadata,
      Pokedex: PageWithIndividual,
      Map: PageWithIndividual,
    },
    InPage: {
      Home: {
        Welcome: string,
      },
      Pokedex: {
        Input: {
          Map: string,
          Name: string,
          PokemonType: string,
          Skill: string,
          SleepType: string,
        },
        Pokemon: {
          Info: {
            Berry: string,
          },
        },
      },
    },
  },
  Game: {
    Berry: GameObjectIdToString,
    Field: GameObjectIdToString,
    Food: GameObjectIdToString,
    MainSkill: GameObjectIdToString,
    PokemonType: GameObjectIdToString,
    PokemonName: GameObjectIdToString,
    RankTitle: GameObjectIdToString,
    SleepType: GameObjectIdToString,
  }
}
