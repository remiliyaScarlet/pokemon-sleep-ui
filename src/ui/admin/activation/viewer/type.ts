import {ActivationKeyAtClient} from '@/types/mongo/activation';


export type ActivationButtonTextGetter = (data: ActivationKeyAtClient) => string | null | undefined;
