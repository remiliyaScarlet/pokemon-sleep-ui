import {ActivationStatus} from '@/types/mongo/activation';


export const patreonTierActivationLookup: {[id in string]?: ActivationStatus} = {
  // [Archived] Shiny Eevee
  6736957: {
    adsFree: true,
    premium: true,
  },
  // [Archived] Bean Sausage
  10210709: {
    adsFree: true,
    premium: true,
  },
  // [Archived] Shiny Sylveon
  10073892: {
    adsFree: true,
    premium: true,
  },
  // [Archived] Shiny Glaceon
  10073905: {
    adsFree: true,
    premium: true,
  },
  // [Archived] Shiny Vaporeon
  10073912: {
    adsFree: true,
    premium: true,
  },
  // T1A - Shiny Eevee
  21558636: {
    adsFree: true,
    premium: false,
  },
  // T1P - Shiny Leafeon
  21558647: {
    adsFree: false,
    premium: true,
  },
  // T2 - Shiny Flareon
  21559581: {
    adsFree: true,
    premium: true,
  },
  // T3 - Shiny Sylveon
  21558666: {
    adsFree: true,
    premium: true,
  },
  // T4 - Shiny Glaceon
  21558673: {
    adsFree: true,
    premium: true,
  },
  // T5 - Shiny Umbreon
  21558681: {
    adsFree: true,
    premium: true,
  },
  // T99 - Absol
  21559682: {
    adsFree: true,
    premium: true,
  },
};
