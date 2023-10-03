import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokeInBox} from '@/types/game/pokebox';


type Props = PokeboxImporterCommonProps & {
  pokebox: PokeInBox[],
};

export const PokeboxImporterView = ({pokebox, subSkillMap, onPokeboxPicked}: Props) => {
  const t = useTranslations('UI.Metadata.Team');
  const t2 = useTranslations('Game');
  const t3 = useTranslations('UI.Common');

  const [search, setSearch] = React.useState('');

  if (!pokebox.length) {
    return (
      <FeatureLinkImage
        href="/team/box"
        imageSrc="/images/generic/bag.png"
        text={t('Box.Title')}
      />
    );
  }

  const filteredPokeBox = pokebox
    .map((pokeInBox) => ({
      ...pokeInBox,
      name: pokeInBox.name ?? t2(`PokemonName.${pokeInBox.pokemon}`),
      search: `${t2(`PokemonName.${pokeInBox.pokemon}`)} ${pokeInBox.name ?? ''}`,
    }))
    .filter((pokeInBox) => {
      if (!search) {
        return true;
      }

      return pokeInBox.search.includes(search);
    });

  return (
    <Flex className="gap-1.5">
      <Flex direction="row" center className="gap-1.5">
        <div className="h-6 w-6">
          <MagnifyingGlassIcon/>
        </div>
        <InputBox
          type="text"
          value={search}
          onChange={({target}) => setSearch(target.value)}
          className="w-full"
        />
      </Flex>
      <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-2">
        {filteredPokeBox.map(({search, name, isShiny, ...pokeInBox}) => (
          <button
            key={pokeInBox.uuid} className="button-clickable-bg group p-1"
            onClick={() => onPokeboxPicked({name, ...pokeInBox})}
          >
            <Flex direction="row" className="items-center gap-1.5">
              <IconWithInfo
                imageSrc={`/images/pokemon/icons/${pokeInBox.pokemon}.png`}
                imageAlt={t2(`PokemonName.${pokeInBox.pokemon}`)}
                imageDimension="h-12 w-12"
                imageSizes={imageIconSizes}
                info={pokeInBox.level}
              />
              <Flex>
                <Flex direction="row" center className="gap-1">
                  {
                    isShiny &&
                    <InfoIcon>
                      <div className="relative h-4 w-4">
                        <NextImage
                          src="/images/generic/flash.png" alt={t3('Shiny')}
                          sizes={imageSmallIconSizes} className="invert-on-light"
                        />
                      </div>
                    </InfoIcon>
                  }
                  <div className="truncate">
                    {name}
                  </div>
                </Flex>
                <Flex className="items-end md:flex-row">
                  <PokemonNatureIndicator nature={pokeInBox.nature} hideName/>
                  <div className="ml-auto">
                    <PokemonSubSkillIndicator subSkill={pokeInBox.subSkill} subSkillMap={subSkillMap}/>
                  </div>
                </Flex>
              </Flex>
            </Flex>
          </button>
        ))}
      </Grid>
    </Flex>
  );
};
