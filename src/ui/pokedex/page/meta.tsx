import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {VerticalSplitter} from '@/components/shared/common/splitter';
import {IngredientTypeIcon} from '@/components/shared/pokemon/ingredientTypeIcon';
import {I18nProvider} from '@/contexts/i18n';
import {sleepTypeBgClass, sleepTypeTextClass} from '@/styles/classes';
import {imageSmallIconSizes} from '@/styles/image';
import {PokemonBerryEnergy} from '@/ui/pokedex/page/berry';
import {PokemonIngredient} from '@/ui/pokedex/page/ingredient';
import {PokemonStats} from '@/ui/pokedex/page/stats';
import {PokemonProps} from '@/ui/pokedex/page/type';
import {classNames} from '@/utils/react';


export const PokemonMeta = (props: PokemonProps) => {
  const {pokemon, berryData} = props;
  const {
    type,
    id,
    berry,
    skill,
    sleepType,
    stats,
    ingredients,
  } = pokemon;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');

  const metaTitleClass = 'whitespace-nowrap text-sm text-slate-500';

  const name = t(`PokemonName.${id}`);
  const berryName = t(`Berry.${berry.id}`);

  return (
    <Flex direction="col" center className="info-section-md-fit">
      <Flex direction="row" className="items-end justify-center gap-1 p-2.5 text-2xl">
        <div className="relative h-8 w-8">
          <Image
            src={`/images/type/${type}.png`} alt={name}
            fill sizes="(max-width: 768px) 15vw, 10vw"
          />
        </div>
        <div>
          {name}
        </div>
        <div className="text-sm text-slate-500">
          #{id}
        </div>
      </Flex>
      <table className="border-separate border-spacing-3">
        <tbody>
          <tr>
            <td className={metaTitleClass}>
              {t2('Info.SleepType')}
            </td>
            <td className="text-lg">
              <Flex direction="row" className="gap-1" center>
                <div className={classNames('h-5 w-5 rounded-full', sleepTypeBgClass[sleepType])}/>
                <div className={sleepTypeTextClass[sleepType]}>
                  {t(`SleepType.${sleepType}`)}
                </div>
              </Flex>
            </td>
          </tr>
          <tr>
            <td className={metaTitleClass}>
              {t2('Info.Berry')}
            </td>
            <td>
              <Flex direction="col" center className="gap-1">
                <Flex direction="row" center className="gap-1">
                  <div className="relative h-10 w-10">
                    <Image src={`/images/berry/${berry.id}.png`} alt={berryName} fill sizes={imageSmallIconSizes}/>
                  </div>
                  <div className="whitespace-nowrap text-lg">
                    {berryName} &times; {berry.quantity}
                  </div>
                </Flex>
                <I18nProvider namespaces={['UI.InPage.Pokedex']}>
                  <PokemonBerryEnergy frequency={stats.frequency} berry={berry} berryData={berryData}/>
                </I18nProvider>
              </Flex>
            </td>
          </tr>
          <tr>
            <td className={metaTitleClass}>
              {t2('Info.Ingredient')}
            </td>
            <td>
              <Flex direction="row" className="justify-center gap-1">
                <Flex direction="col" center noFullWidth className="gap-1">
                  <div className="h-5 w-5">
                    <IngredientTypeIcon type="fixed"/>
                  </div>
                  <PokemonIngredient id={ingredients.fixed}/>
                </Flex>
                <VerticalSplitter/>
                <Flex direction="col" center noFullWidth className="gap-1">
                  <div className="h-5 w-5">
                    <IngredientTypeIcon type="random"/>
                  </div>
                  <Flex direction="row" className="gap-1">
                    {ingredients.random ?
                      ingredients.random.map((ingredient) => (
                        <PokemonIngredient key={ingredient} id={ingredient}/>
                      )) :
                      <PokemonIngredient id={undefined}/>}
                  </Flex>
                </Flex>
              </Flex>
            </td>
          </tr>
          <tr>
            <td className={metaTitleClass}>
              {t2('Info.MainSkill')}
            </td>
            <td>
              <Flex direction="col">
                <div className="text-lg">
                  {t(`MainSkill.Name.${skill}`)}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t(`MainSkill.Description.${skill}`)}
                </div>
              </Flex>
            </td>
          </tr>
          <tr>
            <td className={metaTitleClass}>
              {t2('Info.Stats')}
            </td>
            <td className="flex justify-center">
              <PokemonStats {...props}/>
            </td>
          </tr>
        </tbody>
      </table>
    </Flex>
  );
};
