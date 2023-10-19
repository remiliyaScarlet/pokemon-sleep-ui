import React from 'react';

import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {InputRow} from '@/components/input/filter/row';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterTextInput} from '@/components/input/filter/text';
import {
  getMultiSelectOnClickProps,
  getSingleSelectOnClickProps,
  getTextFilterButtonClass,
} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {FlexForm} from '@/components/layout/flex/form';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {IsoDateString} from '@/types/date';
import {
  userActivationContact,
  UserActivationPropertiesAtClient,
  userActivationSource,
  userActivationType,
} from '@/types/mongo/activation';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserDataActionStatus} from '@/types/userData/main';
import {userActivationContactToText, userActivationTypeToText} from '@/ui/admin/activation/const';
import {isActivationDataValid} from '@/utils/user/activation';


type Props = {
  data: UserActivationPropertiesAtClient,
  setData: ReactStateUpdaterFromOriginal<UserActivationPropertiesAtClient>,
  idPrefix: string,
  status: UserDataActionStatus,
  onSubmit: (data: UserActivationPropertiesAtClient) => void,
};

export const UserActivationEditor = ({
  data,
  setData,
  idPrefix,
  status,
  onSubmit,
}: Props) => {
  const {
    expiry,
    contact,
    isSpecial,
    note,
  } = data;
  const commonInputStyle = 'h-8 w-full sm:w-96';

  return (
    <FlexForm className="gap-1.5" onSubmit={async () => {
      const activationDataValid = isActivationDataValid(data);
      if (!activationDataValid) {
        return;
      }

      onSubmit(data);
    }}>
      <InputRowWithTitle title="Expiry">
        <InputBox
          id={`${idPrefix}expiry`}
          type="date"
          value={expiry}
          className={commonInputStyle}
          onChange={({target}) => setData((original) => ({
            ...original,
            expiry: target.value as IsoDateString,
          } satisfies UserActivationPropertiesAtClient))}
        />
      </InputRowWithTitle>
      <FilterTextInput
        title="Activation"
        ids={[...userActivationType]}
        idToButton={(activation) => userActivationTypeToText[activation]}
        idToItemId={(activation) => `${idPrefix}activation${activation}`}
        {...getMultiSelectOnClickProps({
          filter: data,
          setFilter: setData,
          filterKey: 'activation',
        })}
      />
      <FilterTextInput
        title="Source"
        ids={[...userActivationSource]}
        idToButton={(source) => userActivationContactToText[source]}
        idToItemId={(source) => `${idPrefix}source${source}`}
        {...getSingleSelectOnClickProps({
          filter: data,
          setFilter: setData,
          filterKey: 'source',
        })}
      />
      {[...userActivationContact].map((platform) => (
        <InputRowWithTitle key={platform} title={userActivationContactToText[platform]}>
          <InputBox
            id={`${idPrefix}contact${platform}`}
            type="text"
            value={contact[platform] ?? ''}
            className={commonInputStyle}
            onChange={({target}) => setData((original) => ({
              ...original,
              contact: {
                ...original.contact,
                [platform]: target.value || null,
              },
            } satisfies UserActivationPropertiesAtClient))}
          />
        </InputRowWithTitle>
      ))}
      <InputRowWithTitle title="Properties">
        <ToggleButton
          id={`${idPrefix}isSpecial`}
          active={isSpecial}
          onChange={(isSpecial) => setData((original) => ({
            ...original,
            isSpecial,
          } satisfies UserActivationPropertiesAtClient))}
          className={getTextFilterButtonClass(isSpecial)}
        >
          Special Grant
        </ToggleButton>
      </InputRowWithTitle>
      <InputRowWithTitle title="Note">
        <InputBox
          id={`${idPrefix}note`}
          type="text"
          value={note}
          className={commonInputStyle}
          onChange={({target}) => setData((original) => ({
            ...original,
            note: target.value,
          } satisfies UserActivationPropertiesAtClient))}
        />
      </InputRowWithTitle>
      <InputRow className="justify-end gap-1.5">
        <button type="submit" disabled={status !== 'waiting'} className={clsx(
          'button-clickable-bg disabled:button-disabled h-8 w-8 p-1',
        )}>
          {actionStatusIcon[status]}
        </button>
      </InputRow>
    </FlexForm>
  );
};
