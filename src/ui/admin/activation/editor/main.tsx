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
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {activationContactToText, activationTypeToText} from '@/const/activation/common';
import {IsoDateString} from '@/types/date';
import {
  activationContact,
  ActivationPropertiesAtClient,
  activationSource,
  activationType,
} from '@/types/mongo/activation';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserDataActionStatus} from '@/types/userData/main';
import {isActivationDataValid} from '@/utils/user/activation/utils';


type Props = {
  data: ActivationPropertiesAtClient,
  setData: ReactStateUpdaterFromOriginal<ActivationPropertiesAtClient>,
  idPrefix: string,
  status: UserDataActionStatus,
  onSubmit: (data: ActivationPropertiesAtClient) => void,
};

export const ActivationEditor = ({
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

  const isCmsMod = data.isCmsMod ?? false;

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
          } satisfies ActivationPropertiesAtClient))}
        />
      </InputRowWithTitle>
      <FilterTextInput
        title="Activation"
        ids={[...activationType]}
        idToButton={(activation) => activationTypeToText[activation]}
        idToItemId={(activation) => `${idPrefix}activation${activation}`}
        {...getMultiSelectOnClickProps({
          filter: data,
          setFilter: setData,
          filterKey: 'activation',
        })}
      />
      <FilterTextInput
        title="Source"
        ids={[...activationSource]}
        idToButton={(source) => activationContactToText[source]}
        idToItemId={(source) => `${idPrefix}source${source}`}
        {...getSingleSelectOnClickProps({
          filter: data,
          setFilter: setData,
          filterKey: 'source',
        })}
      />
      {[...activationContact].map((platform) => (
        <InputRowWithTitle key={platform} title={activationContactToText[platform]}>
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
            } satisfies ActivationPropertiesAtClient))}
          />
        </InputRowWithTitle>
      ))}
      <InputRowWithTitle title="Properties">
        <Flex direction="row" noFullWidth className="gap-1">
          <ToggleButton
            id={`${idPrefix}isSpecial`}
            active={isSpecial}
            onChange={(isSpecial) => setData((original) => ({
              ...original,
              isSpecial,
            } satisfies ActivationPropertiesAtClient))}
            className={getTextFilterButtonClass(isSpecial)}
          >
            Special Grant
          </ToggleButton>
          <ToggleButton
            id={`${idPrefix}isCmsMod`}
            active={isCmsMod}
            onChange={(isCmsMod) => setData((original) => ({
              ...original,
              isCmsMod,
            } satisfies ActivationPropertiesAtClient))}
            className={getTextFilterButtonClass(isCmsMod)}
          >
            CMS Mod
          </ToggleButton>
        </Flex>
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
          } satisfies ActivationPropertiesAtClient))}
        />
      </InputRowWithTitle>
      <InputRow className="justify-end gap-1.5">
        <button type="submit" disabled={status !== 'waiting'} className={clsx(
          'button-clickable-bg disabled:button-disabled h-8 w-8 p-1',
        )}>
          <UserActionStatusIcon status={status}/>
        </button>
      </InputRow>
    </FlexForm>
  );
};
