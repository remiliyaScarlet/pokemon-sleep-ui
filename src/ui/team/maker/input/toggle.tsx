import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {ToggleButton} from '@/components/input/toggleButton';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {textFilterButtonStyle} from '@/styles/input';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';


export const TeamMakerInputToggles = ({
  input,
  setInput,
}: TeamMakerInputCommonProps) => {
  const {
    previewFinalEvolution,
    showInsufficientIngredients,
  } = input;

  const t = useTranslations('UI.InPage.Team');
  const t2 = useTranslations('UI.InPage.Pokedex.Input');

  return (
    <>
      <InputRow className="justify-end">
        <ToggleButton
          active={previewFinalEvolution}
          onClick={() => setInput((original) => ({
            ...original,
            previewFinalEvolution: !original.previewFinalEvolution,
          }))}
          className={clsx('group gap-1', textFilterButtonStyle)}
        >
          {t2('FinalEvolution')}
        </ToggleButton>
        <ToggleButton
          active={showInsufficientIngredients}
          onClick={() => setInput(({showInsufficientIngredients, ...original}) => ({
            ...original,
            showInsufficientIngredients: !showInsufficientIngredients,
          }))}
          className={clsx('gap-1', textFilterButtonStyle)}
        >
          <div className="h-5 w-5">
            {showInsufficientIngredients ? <EyeIcon/> : <EyeSlashIcon/>}
          </div>
          <GenericIcon
            src="/images/generic/ingredientSlash.png"
            alt={t('Maker.Behavior.ToggleInsufficientIngredients')}
            dimension="h-5 w-5"
            noInvert
            isActive={showInsufficientIngredients}
          />
        </ToggleButton>
      </InputRow>
    </>
  );
};
