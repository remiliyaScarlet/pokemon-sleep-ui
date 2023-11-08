import {ActivationSource} from '@/types/mongo/activation';
import {ActivationPresetData, ActivationPresetMap} from '@/types/mongo/activationPreset';


export type AdminActivationPresetServerDataProps = {
  preloaded: ActivationPresetMap,
};

export type AdminActivationPresetModifyProps = {
  onUpdate: (uuid: string, update: Partial<ActivationPresetData>) => void,
  onCreate: (source: ActivationSource) => void,
  onDelete: (uuid: string) => void,
};
