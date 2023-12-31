import {ServerRuntime} from 'next';
import nextAuth from 'next-auth';

import {authOptions} from '@/const/auth';


const handler = nextAuth(authOptions);

export const runtime: ServerRuntime = 'edge';

export {handler as GET, handler as POST};
