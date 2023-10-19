import {UserActivationDataAtClient} from '@/types/mongo/activation';


export type UserActivationButtonTextGetter = (data: UserActivationDataAtClient) => string;
