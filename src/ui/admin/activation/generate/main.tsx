import React from 'react';

import {Loading} from '@/components/icons/loading';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Copyable} from '@/components/layout/copyable/main';
import {Flex} from '@/components/layout/flex/common';
import {useUserDataActor} from '@/hooks/userData/actor';
import {UserActivationPropertiesAtClient} from '@/types/mongo/activation';
import {UserActivationEditor} from '@/ui/admin/activation/editor/main';
import {generateInitialUserActivationPropertiesAtClient} from '@/ui/admin/activation/utils';


export const UserActivationGenerator = () => {
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
    return <Loading text="Activation Key Generator"/>;
  }

  const {
    expiry,
    contact,
    isSpecial,
    note,
  } = data;
  const commonInputStyle = 'h-8 w-full sm:w-96';

  const onSubmit = async () => {
    const activationDataValid = isActivationDataValid(data);
    if (!activationDataValid) {
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
