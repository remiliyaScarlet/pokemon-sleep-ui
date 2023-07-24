type UiMessages = typeof import('./src/translations/ui-en.json');
type GameMessages = typeof import('./src/translations/ui-en.json');

type I18nMetadata = {
  Title: string,
};

type PageWithIndividual = {
  Index: I18nMetadata,
  Page: I18nMetadata,
};

declare interface IntlMessages extends UiMessages, GameMessages {
  UI: {
    Metadata: {
      Home: I18nMetadata,
      Pokedex: PageWithIndividual,
      Map: PageWithIndividual,
    },
    InPage: {
      Home: {
        Welcome: string,
      },
    },
  },
}
