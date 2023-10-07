import {StaminaEventLog, StaminaEventType} from '@/types/game/producing/stamina';


export type StaminaEventLogFlattened = Omit<StaminaEventLog, 'stamina' | 'type'> & {
  stamina: number,
  type: StaminaEventType | null,
};
