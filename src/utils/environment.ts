import {Session} from 'next-auth';


export const isProduction = () => process.env.NODE_ENV === 'production';

export const isAdsShouldShow = (session: Session | null) => isProduction() && !session?.user.activation?.adsFree;
