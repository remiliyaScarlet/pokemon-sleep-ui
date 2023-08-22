import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {imageIconSizes} from '@/styles/image';
import {Pokebox} from '@/types/game/pokebox';
import {TeamAnalysisImporterCommonProps} from '@/ui/team/analysis/setup/team/importer/type';
import {toTeamAnalysisMember} from '@/ui/team/analysis/setup/team/importer/utils';
import {isNotNullish} from '@/utils/type';


type Props = TeamAnalysisImporterCommonProps & {
  pokebox: Pokebox | undefined,
};

export const TeamAnalysisPokeboxView = ({pokebox, subSkillMap, onPokeboxPicked}: Props) => {
  const t = useTranslations('UI.Metadata.Team');
  const t2 = useTranslations('Game');

  if (!pokebox || !Object.values(pokebox).length) {
    return (
      <FeatureLinkImage
        href="/team/box"
        imageSrc="/images/generic/bag.png"
        text={t('Box.Title')}
      />
    );
  }

  return (
    <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-2">
      {Object.values(pokebox).filter(isNotNullish).map((pokeInBox) => (
        <button
          key={pokeInBox.uuid} className="button-clickable-bg group p-1"
          onClick={() => onPokeboxPicked(toTeamAnalysisMember(pokeInBox))}
        >
          <Flex direction="row" className="items-center gap-1.5">
            <IconWithInfo
              imageSrc={`/images/pokemon/icons/${pokeInBox.pokemon}.png`}
              imageAlt={t2(`PokemonName.${pokeInBox.pokemon}`)}
              imageDimension="h-10 w-10"
              imageSizes={imageIconSizes}
              info={pokeInBox.level}
            />
            <Flex direction="col" className="items-end md:flex-row">
              <PokemonNatureIndicator nature={pokeInBox.nature} hideName/>
              <div className="ml-auto">
                <PokemonSubSkillIndicator subSkill={pokeInBox.subSkill} subSkillMap={subSkillMap}/>
              </div>
            </Flex>
          </Flex>
        </button>
      ))}
    </Grid>
  );
};
