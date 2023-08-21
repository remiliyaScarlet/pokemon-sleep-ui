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
    Auth: {
      EmailSent: string,
    },
    Common: {
      Candy: string,
      Day: string,
      DreamShards: string,
      Exp: string,
      Map: string,
      Rank: string,
      Rewards: string,
      Shiny: string,
      SnorlaxFavorite: string,
    },
    Metadata: {
      SiteName: string,
      Home: I18nMetadata,
      Pokedex: PageWithIndividual,
      Analysis: I18nMetadata,
      Cooking: I18nMetadata,
      Meal: PageWithIndividual,
      Ingredient: PageWithIndividual,
      Berry: PageWithIndividual,
      Map: PageWithIndividual,
      Team: {
        Box: I18nMetadata,
        Calculate: I18nMetadata,
        Index: I18nMetadata,
        Maker: I18nMetadata,
      },
      Info: {
        Index: I18nMetadata,
        Pot: I18nMetadata,
        Nature: I18nMetadata,
        SubSkill: I18nMetadata,
      },
      Skill: PageWithIndividual,
      Incense: PageWithIndividual,
      About: I18nMetadata,
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
          Name: string,
          PokemonLevel: string,
          PokemonType: string,
          SleepType: string,
          Specialty: string,
          Stats: string,
        },
        Stats: {
          Energy: {
            Daily: string,
            Name: string,
            Weekly: string,
          },
          Frequency: string,
          Friendship: string,
          MaxCarry: string,
          Recruit: string,
        },
        Sort: {
          Id: string,
          IngredientEnergy: string,
          IngredientCount: string,
          BerryEnergy: string,
          BerryCount: string,
          FriendshipPoint: string,
          TotalEnergy: string,
        },
      },
      Analysis: {
        FirstAppearance: string,
        LastSleepStyle: string,
      },
      Cooking: {
        Energy: string,
        Ingredient: string,
        MealDisplayType: {
          EnergyRange: string,
          Ingredient: string,
        },
        MealType: string,
        PotCapacity: string,
        RecipeLevel: string,
      },
      Berry: {
        Energy: string,
      },
      Ingredient: {
        Energy: string,
      },
      Map: {
        Energy: string,
        Pokemon: string,
        SleepStyle: string,
      },
      Team: {
        CurrentEnergy: string,
        SubSkill: string,
        Box: {
          DisplayType: {
            Info: string,
            ProductionBerry: string,
            ProductionIngredient: string,
            ProductionTotal: string,
            Skills: string,
            Stats: string,
          },
        },
      },
      Info: {
        Pot: {
          Capacity: string,
          Expand: string,
          UnlockedRecipes: string,
        },
      },
    },
    UserControl: {
      Login: string,
      Logout: string,
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
    MealType: GameObjectIdToString,
    Nature: GameObjectIdToString,
    NatureEffect: GameObjectIdToString,
    PokemonType: GameObjectIdToString,
    PokemonName: GameObjectIdToString,
    RankTitle: GameObjectIdToString,
    SleepFace: {
      onSnorlax: {Default: string},
      [pokemonId: string]: GameObjectIdToString
    },
    SleepType: GameObjectIdToString,
    Specialty: GameObjectIdToString,
    SubSkill: {
      Name: GameObjectIdToString,
      Description: GameObjectIdToString,
    },
  }
}
