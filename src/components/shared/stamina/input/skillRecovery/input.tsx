import React from 'react';

import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {StaminaCalcSkillRecoveryConfig} from '@/types/game/producing/stamina';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


type Props = StaminaConfigProps & {
  id: string,
  iconI18nId: I18nMessageKeysOfNamespace<'UI.Stamina.SkillRecovery'>,
  iconSrc: string,
  configTarget: keyof StaminaCalcSkillRecoveryConfig,
};

export const StaminaConfigSkillRecoveryInput = ({config, setConfig, id, iconI18nId, iconSrc, configTarget}: Props) => {
  const {skillRecovery} = config;
  const t = useTranslations('UI.Stamina.SkillRecovery');

  return (
    <Flex direction="row" noFullWidth className="gap-1.5">
      <GenericIcon alt={t(iconI18nId)} src={iconSrc} dimension="h-7 w-7"/>
      <InputBox
        id={id}
        type="number"
        step="any"
        min={0}
        className="w-20 text-center"
        value={skillRecovery[configTarget].toString()}
        onChange={({target}) => setConfig({
          ...config,
          skillRecovery: {
            ...skillRecovery,
            [configTarget]: Number(target.value),
          },
        })}
      />
    </Flex>
  );
};
