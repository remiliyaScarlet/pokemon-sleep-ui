import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NatureId} from '@/types/game/producing/nature';


type Props = {
  nature: NatureId | null,
};

export const PokemonNatureIndicator = ({nature}: Props) => {
  const t = useTranslations('Game');

  return (
    <Flex direction="row" center>
      <div className="h-5 w-5">
        <ChevronUpDownIcon/>
      </div>
      <div className="pr-1">
        {nature ? t(`Nature.${nature}`) : <div className="h-5 w-5"><XCircleIcon/></div>}
      </div>
    </Flex>
  );
};
