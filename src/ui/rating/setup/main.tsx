import React from 'react';

import BeakerIcon from '@heroicons/react/24/outline/BeakerIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonNameBig} from '@/components/shared/pokemon/name/big';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {IngredientBonusSlider} from '@/components/shared/production/bonus/ingredient';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {PokemonInfo} from '@/types/game/pokemon';
import {RatingSetupData} from '@/ui/rating/setup/type';
import {generateRatingSetup} from '@/ui/rating/setup/utils';
import {RatingDataProps} from '@/ui/rating/type';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type Props = RatingDataProps & {
  pokemon: PokemonInfo,
  onInitiate: (setup: RatingSetupData) => void,
};

export const RatingSetup = React.forwardRef<HTMLDivElement, Props>(({
  pokemon,
  onInitiate,
  pokedex,
  ingredientChainMap,
  subSkillMap,
  mapMeta,
  preloadSetupBonus,
}, ref) => {
  const {ingredientChain} = pokemon;
  const chain = ingredientChainMap[ingredientChain];

  const [setup, setSetup] = React.useState<RatingSetupData>(generateRatingSetup({
    chain,
    preloadSetupBonus,
  }));
  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const t = useTranslations('UI.Metadata.Pokedex');
  const t2 = useTranslations('Game.PokemonName');

  // If Pokémon changes, `ingredients` has to be updated because it's Pokemon-dependent
  React.useEffect(() => {
    setSetup((setup) => ({
      ...setup,
      ingredients: generateIngredientProductionAtLevels(chain),
    }));
  }, [pokemon.id]);

  const {
    ingredients,
    subSkill,
    nature,
    bonus,
  } = setup;

  return (
    <Flex ref={ref} direction="col" center className="relative gap-1.5">
      <PokemonLinkPopup state={state} setState={setState}/>
      <button
        className="button-clickable group absolute left-1 top-1 h-8 w-8 rounded-full"
        onClick={() => showPokemon(pokemon)}
      >
        <GenericPokeballIcon alt={t('Page.Title', {name: t2(pokemon.id.toString())})} noWrap/>
      </button>
      <PokemonNameBig pokemon={pokemon}/>
      <div className="relative h-48 w-48">
        <PokemonImage pokemon={pokemon} image="portrait" isShiny={false}/>
      </div>
      <SnorlaxFavoriteInput
        mapMeta={mapMeta}
        pokemon={pokedex}
        filter={setup}
        setFilter={setSetup}
        filterKey="snorlaxFavorite"
      />
      <PokemonIngredientPicker
        chain={chain}
        ingredients={ingredients}
        idPrefix={pokemon.id.toString()}
        onSelect={(production, level) => setSetup({
          ...setup,
          ingredients: {
            ...setup?.ingredients,
            [level]: production,
          },
        })}
      />
      <Flex direction="row" className="h-8 gap-1.5">
        <PokemonSubSkillSelector
          subSkill={subSkill}
          setSubSkill={(subSkill) => setSetup({
            ...setup,
            subSkill,
          })}
          subSkillMap={subSkillMap}
        />
        <PokemonNatureSelector nature={nature} setNature={(nature) => setSetup({
          ...setup,
          nature,
        })}/>
      </Flex>
      <IngredientBonusSlider
        value={bonus.ingredient}
        setValue={(ingredient) => setSetup((setup) => ({
          ...setup,
          bonus: {
            ...setup.bonus,
            ingredient,
          },
        }))}
      />
      <Flex direction="row" center>
        <button onClick={() => onInitiate(setup)} className={clsx(
          'button-base button-bg-hover w-2/3 p-1',
          'bg-purple-400/50 hover:bg-purple-400 dark:bg-purple-600/50 dark:hover:bg-purple-600',
        )}>
          <Flex direction="col" center>
            <div className="relative h-9 w-9">
              <BeakerIcon/>
            </div>
          </Flex>
        </button>
      </Flex>
    </Flex>
  );
});
RatingSetup.displayName = 'RatingSetup';
