import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {ActivationEditor} from '@/ui/admin/activation/editor/main';
import {ActivationUiCommonProps, ActivationUiState} from '@/ui/admin/activation/type';
import {ActivationDelete} from '@/ui/admin/activation/viewer/popup/delete';
import {ActivationReadonlyField} from '@/ui/admin/activation/viewer/popup/field/readonly';


export const ActivationPopup = ({userIdEmailMap, control}: ActivationUiCommonProps) => {
  const {
    state,
    setState,
    setPopupShow,
    status,
    updateActivation,
    deleteActivation,
  } = control;

  const info = state.popup.info;
  const {type, data} = info;
  const {
    key,
    generatedAt,
  } = data;

  return (
    <PopupCommon show={state.popup.show} setShow={setPopupShow}>
      <Flex className="gap-1.5">
        {
          type === 'data' &&
          <>
            <ActivationReadonlyField title="User ID" data={data.userId}/>
            <ActivationReadonlyField title="User Email" data={userIdEmailMap[data.userId] ?? '(Unknown)'}/>
          </>
        }
        {
          type === 'key' &&
          <Flex className="text-center text-2xl text-amber-600 dark:text-amber-400">
            Pending Activation
          </Flex>
        }
        <ActivationReadonlyField title="Activation Key" data={key}/>
        <Flex className="text-end">
          {`Subscriber since ${generatedAt}`}
        </Flex>
        <HorizontalSplitter/>
        <ActivationEditor
          data={data}
          setData={(getUpdated) => setState(({popup, ...original}): ActivationUiState => {
            const {info} = popup;
            const {type, data} = info;

            const properties = getUpdated(data);

            if (type === 'key') {
              return {...original, popup: {...popup, info: {...info, data: {...data, ...properties}}}};
            }

            if (type === 'data') {
              return {...original, popup: {...popup, info: {...info, data: {...data, ...properties}}}};
            }

            throw new Error(`Unhandled update type ${type satisfies never}`);
          })}
          status={status}
          onSubmit={(properties) => {
            if (info.type === 'key') {
              updateActivation({...info, data: {...info.data, ...properties}});
            } else if (info.type === 'data') {
              updateActivation({...info, data: {...info.data, ...properties}});
            }
          }}
        />
        {
          type === 'data' &&
          <>
            <HorizontalSplitter/>
            <Flex direction="row" className="justify-end">
              <ActivationDelete data={data} onDelete={deleteActivation}/>
            </Flex>
          </>
        }
      </Flex>
    </PopupCommon>
  );
};
