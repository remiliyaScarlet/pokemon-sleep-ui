import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator';
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

  if (!pokebox) {
    return (
      <FeatureLinkImage
        href="/team/box"
        imageSrc="/images/generic/bag.png"
        text={t('Box.Title')}
      />
    );
  }

  return (
    <Flex direction="row" wrap center className="gap-1.5">
      {Object.values(pokebox).filter(isNotNullish).map((pokeInBox) => (
        <button
          key={pokeInBox.uuid} className="button-clickable-bg group p-1"
          onClick={() => onPokeboxPicked(toTeamAnalysisMember(pokeInBox))}
        >
          <Flex direction="col" center className="gap-1.5">
            <IconWithInfo
              imageSrc={`/images/pokemon/icons/${pokeInBox.pokemon}.png`}
              imageAlt={t2(`PokemonName.${pokeInBox.pokemon}`)}
              imageDimension="h-14 w-14"
              imageSizes={imageIconSizes}
              info={pokeInBox.level}
            />
            <PokemonNatureIndicator nature={pokeInBox.nature}/>
            <PokemonSubSkillIndicator subSkill={pokeInBox.subSkill} subSkillMap={subSkillMap}/>
          </Flex>
        </button>
      ))}
    </Flex>
  );
};
