import React from 'react';

import BeakerIcon from '@heroicons/react/24/outline/BeakerIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {OcrPokemonInfoImporter} from '@/components/ocr/importer/pokemonInfo/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonCarryLimitInput} from '@/components/shared/pokemon/carryLimit/input';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonNameBig} from '@/components/shared/pokemon/name/big';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {RatingSetupExportButton} from '@/ui/rating/setup/export';
import {RatingDataProps, RatingSetupInputs} from '@/ui/rating/type';
import {getCarryLimitFromPokemonInfo} from '@/utils/game/producing/carryLimit';


type Props = RatingDataProps & {
  initialSetup: RatingSetupInputs,
  onInitiate: (setup: RatingSetupInputs) => void,
};

export const RatingSetup = React.forwardRef<HTMLDivElement, Props>(({
  initialSetup,
  onInitiate,
  pokemonList,
  ingredientChainMap,
  subSkillMap,
  mapMeta,
  pokemonMaxLevel,
  ocrTranslations,
}, ref) => {
  const [setup, setSetup] = React.useState(initialSetup);
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  const t = useTranslations('UI.Metadata');
  const t2 = useTranslations('Game.PokemonName');

  const {pokemon} = setup;
  const {
    ingredients,
    subSkill,
    nature,
    carryLimit,
  } = setup;

  React.useEffect(() => setSetup(initialSetup), [initialSetup]);

  return (
    <Flex ref={ref} direction="col" center className="relative gap-1.5">
      <PokemonLinkPopup state={state} setState={setState}/>
      <button
        className="button-clickable group absolute left-1 top-1 h-8 w-8 rounded-full"
        onClick={() => showPokemon(pokemon)}
      >
        <GenericPokeballIcon alt={t('Pokedex.Page.Title', {name: t2(pokemon.id.toString())})} noWrap/>
      </button>
      <PokemonNameBig pokemon={pokemon}/>
      <div className="relative h-48 w-48">
        <PokemonImage pokemonId={pokemon.id} image="portrait" isShiny={false}/>
      </div>
      <SnorlaxFavoriteInput
        mapMeta={mapMeta}
        pokemonList={pokemonList}
        filter={setup}
        setFilter={setSetup}
        filterKey="snorlaxFavorite"
      />
      <PokemonIngredientPicker
        chain={ingredientChainMap[pokemon.ingredientChain]}
        ingredients={ingredients}
        idPrefix={pokemon.id.toString()}
        onSelect={(production, level) => setSetup((setup) => ({
          ...setup,
          ingredients: {
            ...setup.ingredients,
            [level]: production,
          },
        }))}
      />
      <Flex direction="row" className="h-8 gap-1.5">
        <PokemonSubSkillSelector
          subSkill={subSkill}
          setSubSkill={(subSkill) => setSetup((setup) => ({
            ...setup,
            subSkill,
          }))}
          subSkillMap={subSkillMap}
        />
        <PokemonNatureSelector
          nature={nature}
          setNature={(nature) => setSetup((setup) => ({
            ...setup,
            nature,
          }))}
        />
      </Flex>
      <PokemonCarryLimitInput
        carryLimit={carryLimit}
        setCarryLimit={(carryLimit) => setSetup((setup) => ({
          ...setup,
          carryLimit,
        }))}
        defaultCarryLimit={getCarryLimitFromPokemonInfo({pokemon})}
      />
      <Flex direction="row" center className="gap-1.5">
        <OcrPokemonInfoImporter
          ocrTranslations={ocrTranslations}
          onCompleteImport={(_, {subSkill, nature}) => setSetup((original) => ({
            ...original,
            subSkill,
            nature,
          }))}
          subSkillMap={subSkillMap}
          pokemonIdOverride={pokemon.id}
        />
        <button onClick={() => onInitiate(setup)} className={clsx(
          'button-base button-bg-hover w-full p-1',
          'bg-purple-400/50 hover:bg-purple-400 dark:bg-purple-600/50 dark:hover:bg-purple-600',
        )}>
          <Flex center>
            <div className="h-9 w-9">
              <BeakerIcon/>
            </div>
          </Flex>
        </button>
        <RatingSetupExportButton setup={setup} pokemon={setup.pokemon} pokemonMaxLevel={pokemonMaxLevel}/>
      </Flex>
    </Flex>
  );
});
RatingSetup.displayName = 'RatingSetup';
