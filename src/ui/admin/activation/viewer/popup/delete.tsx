import React from 'react';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {userActivationContact, UserActivationDataAtClient} from '@/types/mongo/activation';
import {userActivationContactToText} from '@/ui/admin/activation/const';
import {UserActivationReadonlyField} from '@/ui/admin/activation/viewer/popup/field/readonly';
import {isNotNullish} from '@/utils/type';


type Props = {
  data: UserActivationDataAtClient,
  onDelete: () => void,
};

export const UserActivationDelete = ({data, onDelete}: Props) => {
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);

  const contactInfo = userActivationContact
    .map((channel) => {
      const contact = data.contact[channel];

      if (!contact) {
        return null;
      }

      return {channel: userActivationContactToText[channel], contact};
    })
    .filter(isNotNullish);

  return (
    <>
      <PopupCommon show={deleteConfirmation} setShow={setDeleteConfirmation}>
        <Flex className="gap-1.5 p-3">
          <div className="text-xl">Confirm Deleting Activation</div>
          <Flex className="info-section">
            {contactInfo.map(({channel, contact}) => (
              <UserActivationReadonlyField key={channel} title={channel} data={contact}/>
            ))}
          </Flex>
          <button className="button-alert-bg rounded-lg p-1" onClick={() => {
            onDelete();
            setDeleteConfirmation(false);
          }}>
            Delete Activation
          </button>
        </Flex>
      </PopupCommon>
      <button className="button-alert-bg h-7 w-7 rounded-lg p-1" onClick={() => setDeleteConfirmation(true)}>
        <TrashIcon/>
      </button>
    </>
  );
};
