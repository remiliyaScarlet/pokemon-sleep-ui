import React from 'react';

import ArrowUpCircleIcon from '@heroicons/react/24/outline/ArrowUpCircleIcon';

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
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Copyable} from '@/components/layout/copyable/main';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {useUserDataActor} from '@/hooks/userData/actor';
import {
  userActivationContact,
  UserActivationProperties,
  userActivationSource,
  userActivationType,
} from '@/types/mongo/user';
import {userActivationContactToText, userActivationTypeToText} from '@/ui/admin/const';
import {toIsoDateString} from '@/utils/date';
import {showToast} from '@/utils/toast';
import {isNotNullish} from '@/utils/type';


export const SiteAdminGenerateActivation = () => {
  const [data, setData] = React.useState<UserActivationProperties>(() => {
    const expiry = new Date();

    expiry.setDate(expiry.getDate() + 183);

    return {
      expiry,
      activation: {
        adsFree: true,
        premium: true,
      },
      source: null,
      contact: {},
      isSpecial: false,
      note: '',
    };
  });
  const [activationLink, setActivationLink] = React.useState<string>();
  const {actAsync} = useUserDataActor();

  if (!actAsync) {
    return null;
  }

  const {
    expiry,
    source,
    contact,
    isSpecial,
    note,
  } = data;
  const commonInputStyle = 'h-8 w-full sm:w-96';

  const onSubmit = async () => {
    if (!source && !note) {
      showToast({
        isAlert: true,
        content: 'Missing subscription source!',
      });
      return;
    }

    if ((source && !contact[source]) || (!source && !Object.values(contact).filter(isNotNullish).length)) {
      showToast({
        isAlert: true,
        content: 'Missing contact of the subscription source!',
      });
      return;
    }

    const updated = await actAsync({
      action: 'load',
      options: {type: 'adminGenerateActivation', opts: data},
      getStatusOnCompleted: (updated) => (
        !!updated?.user.lazyLoaded.adminGenerateActivation ? 'completed' : 'failed'
      ),
    });

    const activationKey = updated?.user.lazyLoaded.adminGenerateActivation;
    if (!activationKey) {
      return;
    }

    setActivationLink(activationKey);
  };

  return (
    <Flex className="info-section gap-1.5">
      <div>
        Activation Key Generator
      </div>
      <FlexForm className="gap-1.5" onSubmit={onSubmit}>
        <InputRowWithTitle title="Expiry">
          <InputBox
            id="expiry"
            type="date"
            value={toIsoDateString(expiry)}
            className={commonInputStyle}
            onChange={({target}) => setData((original) => ({
              ...original,
              expiry: new Date(target.value),
            } satisfies UserActivationProperties))}
          />
        </InputRowWithTitle>
        <FilterTextInput
          title="Activation"
          ids={[...userActivationType]}
          idToButton={(activation) => userActivationTypeToText[activation]}
          idToItemId={(activation) => activation}
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
          idToItemId={(source) => source}
          {...getSingleSelectOnClickProps({
            filter: data,
            setFilter: setData,
            filterKey: 'source',
          })}
        />
        {[...userActivationContact].map((platform) => (
          <InputRowWithTitle key={platform} title={userActivationContactToText[platform]}>
            <InputBox
              id={`contact${platform}`}
              type="text"
              value={contact[platform] ?? ''}
              className={commonInputStyle}
              onChange={({target}) => setData((original) => ({
                ...original,
                contact: {
                  ...original.contact,
                  [platform]: target.value || null,
                },
              } satisfies UserActivationProperties))}
            />
          </InputRowWithTitle>
        ))}
        <InputRowWithTitle title="Properties">
          <ToggleButton
            id="isSpecial"
            active={isSpecial}
            onChange={(isSpecial) => setData((original) => ({
              ...original,
              isSpecial,
            } satisfies UserActivationProperties))}
            className={getTextFilterButtonClass(isSpecial)}
          >
            Special Grant
          </ToggleButton>
        </InputRowWithTitle>
        <InputRowWithTitle title="Note">
          <InputBox
            id="note"
            type="text"
            value={note}
            className={commonInputStyle}
            onChange={({target}) => setData((original) => ({
              ...original,
              note: target.value,
            } satisfies UserActivationProperties))}
          />
        </InputRowWithTitle>
        <InputRow className="justify-end gap-1.5">
          <button type="submit" className="button-clickable-bg h-8 w-8 p-1">
            <ArrowUpCircleIcon/>
          </button>
        </InputRow>
      </FlexForm>
      <AnimatedCollapseQuick show={!!activationLink}>
        {activationLink && <Copyable content={activationLink}/>}
      </AnimatedCollapseQuick>
    </Flex>
  );
};
