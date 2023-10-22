import {getRequestConfig} from 'next-intl/server';

import {getMessages} from '@/utils/i18n';


export default getRequestConfig(async ({locale}) => ({
  messages: await getMessages(locale),
}));
