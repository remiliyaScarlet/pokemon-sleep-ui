import {activationSource, ActivationSource} from '@/types/mongo/activation';


export const isActivationSource = (source: string | null | undefined): source is ActivationSource => {
  if (!source) {
    return false;
  }

  return activationSource.includes(source as ActivationSource);
};
