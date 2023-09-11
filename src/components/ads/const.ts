import {Locale} from '@/types/next/locale';


export const adsClientId = 'ca-pub-1535004092052078';

export const adsHeight = 'h-48 lg:h-32';

export const adsMessage: {[locale in Locale]: string} = {
  zh: '請解除封鎖廣告，或到關於頁面 (/about) 中的 Discord / Patreon 訂閱網站 (US$3.33+) 以啟用無廣告。',
  en: 'Please allow ads, or check Discord/Patreon in the about page (/about) ' +
    'for subscription (US$3.33+) to activate ads-free.',
  ja: '継続的なサイト運営のため、広告ブロックの解除をお願いします。\n\n' +
    'また、Discord / Patreonにてご支援をいただいた方は、広告なしでサイトをご利用いただけます。\n\n' +
    'ご支援については「このサイトについて」をご確認ください。',
  kr: 'Please allow ads, or check Discord/Patreon in the about page (/about) ' +
    'for subscription (US$3.33+) to activate ads-free.',
  de: 'Bitte erlauben Sie Werbung oder überprüfen Sie Discord/Patreon auf der About-Seite (/about), ' +
    'um ein Abonnement (ab 3,33 US-Dollar) zu erlangen, um die Seite werbefrei zu nutzen.',
};
