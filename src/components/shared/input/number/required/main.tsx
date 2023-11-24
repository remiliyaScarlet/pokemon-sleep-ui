import React from 'react';

import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {NumberInputLayout} from '@/components/shared/input/number/common/layout';
import {NumberInputLayoutProps} from '@/components/shared/input/number/common/type';


export const NumberInputRequired = ({
  min = 1,
  max = Infinity,
  ...props
}: NumberInputLayoutProps<number>) => {
  const {value, setValue, disabled} = props;

  return (
    <NumberInputLayout {...props} min={min} max={max} setValue={(value) => value && setValue(value)}>
      <InputBox
        value={value.toString()}
        type="number"
        className={clsx('w-12 text-center', disabled && 'text-disabled')}
        onChange={({target}) => {
          const value = parseInt(target.value || '0');

          if (isNaN(value)) {
            return;
          }

          setValue(Math.max(min, Math.min(value, max)));
        }}
        disabled={disabled}
      />
    </NumberInputLayout>
  );
};
