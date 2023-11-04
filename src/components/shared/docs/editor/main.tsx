import React from 'react';

import LanguageIcon from '@heroicons/react/24/outline/LanguageIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {useRouter} from '@/components/i18n';
import {InputBox} from '@/components/input/box';
import {InputRow} from '@/components/input/filter/row';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterTextInput} from '@/components/input/filter/text';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {InputTextArea} from '@/components/input/textarea';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {Grid} from '@/components/layout/grid';
import {DocRenderingCommonProps} from '@/components/shared/docs/type';
import {tableOfContentsText} from '@/components/shared/docs/view/const';
import {DocsContentView} from '@/components/shared/docs/view/main';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {regexDocPath} from '@/const/regex';
import {localeName} from '@/const/website';
import {useUserDataActor} from '@/hooks/userData/actor';
import {DocsDataEditable} from '@/types/mongo/docs';
import {locales} from '@/types/next/locale';
import {UserDataAction} from '@/types/userData/main';


type Props = DocRenderingCommonProps & {
  idPrefix: string,
  onDocUpdated: (updated: DocsDataEditable) => void,
  getUserDataAction: (data: DocsDataEditable) => UserDataAction,
};

export const DocsEditor = ({idPrefix, onDocUpdated, getUserDataAction, ...props}: Props) => {
  const {locale, doc} = props;
  const {path, title, content, showIndex} = doc;

  const {push} = useRouter();
  const {actAsync, status} = useUserDataActor({
    statusToast: true,
    statusNoReset: true,
  });
  const t = useTranslations('UI.InPage.Docs');

  if (!actAsync) {
    return null;
  }

  return (
    <FlexForm className="gap-1.5" onSubmit={async () => {
      const {status} = await actAsync(getUserDataAction(doc));

      if (status === 'completed') {
        push(`/docs/view/${path}`);
      }
    }}>
      <InputRowWithTitle title="URL">
        <InputBox
          type="text"
          value={path}
          onChange={({target}) => {
            const path = target.value;

            // `!!path` to allow empty string
            if (!!path && !regexDocPath.test(path)) {
              return;
            }

            onDocUpdated({...doc, path});
          }}
          className="w-full"
          pattern={regexDocPath.source}
          required
        />
      </InputRowWithTitle>
      <InputRowWithTitle title={t('Title')}>
        <InputBox
          type="text"
          value={title}
          onChange={({target}) => onDocUpdated({
            ...doc,
            title: target.value,
          })}
          className="w-full"
          required
        />
      </InputRowWithTitle>
      <FilterTextInput
        onClick={(locale) => onDocUpdated({...doc, locale})}
        isActive={(locale) => locale === doc.locale}
        title={
          <Flex center>
            <LanguageIcon className="h-6 w-6"/>
          </Flex>
        }
        ids={[...locales]}
        idToButton={(locale) => localeName[locale]}
        idToItemId={(locale) => locale}
      />
      <InputRow>
        <ToggleButton
          id={`${idPrefix}ShowIndex`}
          active={showIndex}
          onClick={() => onDocUpdated({...doc, showIndex: !showIndex})}
          className={clsx('group', getTextFilterButtonClass(showIndex))}
        >
          {tableOfContentsText[locale]}
        </ToggleButton>
      </InputRow>
      <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-2">
        <InputTextArea
          value={content}
          setValue={(content) => onDocUpdated({...doc, content})}
          required
        />
        <DocsContentView className="info-section-bg rounded-lg" {...props}/>
      </Grid>
      <InputRow className="justify-end">
        <UserDataUploadButton isSubmit statusOverride={status}/>
      </InputRow>
    </FlexForm>
  );
};
