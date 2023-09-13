import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {imageIconSizes} from '@/styles/image';
import {PokeInBox} from '@/types/game/pokebox';


type Props = PokeboxImporterCommonProps & {
  pokebox: PokeInBox[],
};

export const PokeboxImporterView = ({pokebox, subSkillMap, onPokeboxPicked}: Props) => {
  const t = useTranslations('UI.Metadata.Team');
  const t2 = useTranslations('Game');

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
      name: pokeInBox.name,
      search: pokeInBox.name ?? t2(`PokemonName.${pokeInBox.pokemon}`),
    }))
    .filter((pokeInBox) => {
      if (!search) {
        return true;
      }

      return pokeInBox.search.includes(search);
    });

  return (
    <Flex direction="col" className="gap-1.5">
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
        {filteredPokeBox.map(({search, ...pokeInBox}) => (
          <button
            key={pokeInBox.uuid} className="button-clickable-bg group p-1"
            onClick={() => onPokeboxPicked(pokeInBox)}
          >
            <Flex direction="row" className="items-center gap-1.5">
              <IconWithInfo
                imageSrc={`/images/pokemon/icons/${pokeInBox.pokemon}.png`}
                imageAlt={t2(`PokemonName.${pokeInBox.pokemon}`)}
                imageDimension="h-12 w-12"
                imageSizes={imageIconSizes}
                info={pokeInBox.level}
              />
              <Flex direction="col">
                <div className="truncate">
                  {pokeInBox.name}
                </div>
                <Flex direction="col" className="items-end md:flex-row">
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
