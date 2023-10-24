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
  Locale: string,
  UI: {
    Ads: {
      AdBlockActive: string,
      Popup: string,
    },
    Auth: {
      EmailSent: string,
    },
    Common: {
      Candy: string,
      Day: string,
      DreamShards: string,
      Exp: string,
      Hour: string,
      Map: string,
      MainSkill: string,
      MaxCarry: string,
      Rank: string,
      Rewards: string,
      Shiny: string,
      SnorlaxFavorite: string,
      Stamina: string,
    },
    Evolution: {
      SleepTime: string,
    },
    MainSkill: {
      EffectType: {
        Strength: string,
        Shards: string,
        Stamina: string,
        Help: string,
        Cooking: string,
        Random: string,
      },
      Target: {
        Self: string,
        Random: string,
        Team: string,
      },
    },
    Metadata: {
      Site: {
        Name: string,
        Description: string,
      },
      Home: I18nMetadata,
      Pokedex: PageWithIndividual,
      Analysis: I18nMetadata,
      Rating: I18nMetadata,
      Cooking: I18nMetadata,
      Meal: PageWithIndividual,
      Ingredient: PageWithIndividual,
      Berry: PageWithIndividual,
      Map: PageWithIndividual,
      Team: {
        Analysis: I18nMetadata,
        Box: I18nMetadata,
        Index: I18nMetadata,
        Maker: I18nMetadata,
        SkillTriggerAnalysis: I18nMetadata,
      },
      Info: {
        Index: I18nMetadata,
        Pot: I18nMetadata,
        Nature: I18nMetadata,
        MainSkill: PageWithIndividual,
        SubSkill: I18nMetadata,
      },
      Item: {
        Index: I18nMetadata,
        Evolution: I18nMetadata,
        Incense: PageWithIndividual,
      },
      PokemonExp: I18nMetadata,
      Stamina: I18nMetadata,
      About: I18nMetadata,
    },
    InPage: {
      Home: {
        Welcome: string,
      },
      Pokedex: {
        Info: {
          Berry: string,
          Evolution: string,
          Ingredient: string,
          MainSkill: string,
          Name: string,
          PokemonLevel: string,
          PokemonType: string,
          Production: string,
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
          FrequencyBase: string,
          FrequencyEquivalent: string,
          Friendship: string,
          Recruit: string,
          TimeToFullPack: string,
          MainSkillValue: string,
          MainSkillTriggerValue: string,
        },
        Sort: {
          Id: string,
          DateRegistered: string,
          IngredientEnergy: string,
          IngredientCount: string,
          IngredientRate: string,
          BerryEnergy: string,
          BerryCount: string,
          FrequencyOfBerry: string,
          FrequencyOfIngredient: string,
          FriendshipPoint: string,
          TotalEnergy: string,
        },
        Input: {
          EvolutionCount: string,
          FinalEvolution: string,
        },
      },
      Analysis: {
        FirstAppearance: string,
        LastSleepStyle: string,
      },
      Cooking: {
        Energy: string,
        Ingredient: string,
        MealType: string,
        PotCapacity: string,
        RecipeLevel: string,
        ToggleUnmakeable: string,
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
        SleepStylesUnlocked: string,
      },
      Team: {
        AnalysisPeriod: string,
        CurrentEnergy: string,
        SubSkill: string,
        NatureEffect: string,
        Box: {
          DisplayType: {
            Frequency: string,
            Info: string,
            MaxCarry: string,
            ProductionBerry: string,
            ProductionIngredient: string,
            ProductionTotal: string,
            Rating: string,
            Skills: string,
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
      PokemonExp: {
        ExpToNext: string,
        OwnedCandies: string,
        NormalCandy: string,
        HandyCandy: string,
      },
    },
    Ocr: {
      Status: {
        Ready: string,
        Thresholding: string,
        LoadingOcr: string,
        Recognizing: string,
        Completed: string,
      },
    },
    Producing: {
      State: {
        Awake: string,
        AsleepUnfilled: string,
        AsleepFilled: string,
      },
      Preset: {
        UnfilledOnly: string,
      },
      Total: string,
    },
    Stamina: {
      Title: string,
      SleepSession: string,
      Chart: {
        Stamina: string,
        Efficiency: string,
      },
      Strategy: {
        Optimistic: string,
        Conservative: string,
      },
      SkillRecovery: {
        Amount: string,
        DailyCount: string,
      },
      EventType: {
        SkillRecovery: string,
        EfficiencyBlock: string,
        Sleep: string,
        Wakeup: string,
      },
      State: {
        Asleep: string,
        Average: string,
        Awake: string,
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
    Item: GameObjectIdToString,
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
