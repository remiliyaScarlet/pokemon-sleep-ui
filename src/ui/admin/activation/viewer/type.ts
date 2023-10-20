import {ActivationDataAtClient} from '@/types/mongo/activation';


export type ActivationButtonTextGetter = (data: ActivationDataAtClient) => string;
