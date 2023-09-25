import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {natureStyle} from '@/styles/game/nature';
import {NatureData} from '@/types/game/pokemon/nature';
import {NatureInfoEffect} from '@/ui/info/nature/effect';


type Props = {
  nature: NatureData,
};

export const NatureInfoSingle = ({nature}: Props) => {
  const t = useTranslations('Game');

  const {id, buff, nerf} = nature;

  return (
    <Flex direction="col" center className="gap-2 rounded-lg bg-slate-500/20 p-4">
      <div className={clsx('whitespace-nowrap text-2xl', buff && nerf && natureStyle.clean)}>
        {t(`Nature.${id}`)}
      </div>
      <NatureInfoEffect natureId={id} direction="buff" effectId={buff}/>
      <NatureInfoEffect natureId={id} direction="nerf" effectId={nerf}/>
    </Flex>
  );
};
