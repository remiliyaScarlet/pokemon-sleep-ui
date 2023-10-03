import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {Popup} from '@/components/popup';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {useUserDataActor} from '@/hooks/userData/actor';
import {PokemonInfo} from '@/types/game/pokemon';
import {toPokeInBox} from '@/ui/rating/setup/utils';
import {RatingSetupInputs} from '@/ui/rating/type';


type Props = {
  setup: RatingSetupInputs,
  pokemon: PokemonInfo,
  pokemonMaxLevel: number,
};

export const RatingSetupExportButton = ({setup, pokemon, pokemonMaxLevel}: Props) => {
  const [level, setLevel] = React.useState(1);
  const [name, setName] = React.useState<string | null>(null);
  const [show, setShow] = React.useState(false);
  const {act, status} = useUserDataActor();
  const t = useTranslations('UI.Metadata');
  const t2 = useTranslations('Game');

  React.useEffect(() => {
    if (status === 'completed') {
      setShow(false);
    }
  }, [status]);

  return (
    <>
      <Popup show={show} setShow={setShow}>
        <Flex className="max-w-2xl gap-2 overflow-hidden sm:min-w-[24rem]">
          <InputBox
            value={name ?? ''}
            type="text"
            placeholder={t2(`PokemonName.${pokemon.id}`)}
            className="w-full"
            onChange={({target}) => setName(target.value || null)}
          />
          <PokemonLevelSlider level={level} maxLevel={pokemonMaxLevel} setLevel={setLevel} noSameLine/>
          <Flex>
            <button
              className="button-clickable-bg disabled:button-disabled ml-auto p-1"
              disabled={status === 'processing'}
              onClick={() => {
                if (!act) {
                  return;
                }

                act({
                  action: 'upload',
                  options: {
                    type: 'pokebox.create',
                    data: toPokeInBox({
                      pokemon,
                      name,
                      level,
                      setup,
                    }),
                  },
                });
              }}
            >
              <div className="relative h-8 w-8">
                {actionStatusIcon[status]}
              </div>
            </button>
          </Flex>
        </Flex>
      </Popup>
      <button
        className="button-clickable-bg disabled:button-disabled w-32 p-1"
        disabled={!act || status === 'processing'}
        onClick={() => setShow(true)}
      >
        <Flex direction="row" center className="group gap-1">
          {status !== 'waiting' ?
            <div className="h-9 w-9">
              {actionStatusIcon[status]}
            </div> :
            <>
              <div className="relative h-9 w-9">
                <ArrowTopRightOnSquareIcon/>
              </div>
              <PokemonDataIcon
                src="/images/generic/pokemonbox.png"
                alt={t('Team.Box.Title')}
                dimension="h-9 w-9"
                invert
              />
            </>}
        </Flex>
      </button>
    </>
  );
};
