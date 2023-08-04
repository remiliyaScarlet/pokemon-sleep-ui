'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty';
import {specialtyIdMap} from '@/const/game/pokemon';
import {sleepTypeBgClass, sleepTypeTextClass, specialtyTextClass} from '@/styles/classes';
import {imageSmallIconSizes} from '@/styles/image';
import {PokemonBerryMeta} from '@/ui/pokedex/page/meta/berry';
import {PokemonIngredientMeta} from '@/ui/pokedex/page/meta/ingredient';
import {PokemonStats} from '@/ui/pokedex/page/meta/stats';
import {PokemonProps} from '@/ui/pokedex/page/type';
import {classNames} from '@/utils/react';


export const PokemonMeta = (props: PokemonProps) => {
  const {pokemon, berryData, ingredientMap} = props;
  const {
    id,
    type,
    specialty,
    sleepType,
    berry,
    skill,
  } = pokemon;

  const [level, setLevel] = React.useState(1);

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');

  const metaTitleClass = 'whitespace-nowrap text-sm text-slate-500';

  const name = t(`PokemonName.${id}`);
  const berryName = t(`Berry.${berry.id}`);

  return (
    <Flex direction="col" center className="info-section-md-fit">
      <Flex direction="row" className="items-end justify-center gap-1 p-2.5 text-2xl">
        <div className="relative h-8 w-8">
          <NextImage src={`/images/type/${type}.png`} alt={name} sizes={imageSmallIconSizes}/>
        </div>
        <div>
          {name}
        </div>
        <div className="text-sm text-slate-500">
          #{id}
        </div>
      </Flex>
      <Flex direction="row" className="justify-end gap-1">
        <div className="whitespace-nowrap">
          {t2('Info.PokemonLevel')}
        </div>
        <div>
          {level}
        </div>
      </Flex>
      <Slider
        id="Level"
        value={level}
        setValue={setLevel}
        min={1}
        max={berryData.energy.length}
      />
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
              {t2('Info.Specialty')}
            </td>
            <td className={classNames('text-lg', specialty ? specialtyTextClass[specialty] : undefined)}>
              <PokemonSpecialty specialty={specialty} dimension="h-5 w-5"/>
            </td>
          </tr>
          <tr>
            <td className={classNames(metaTitleClass, specialty === specialtyIdMap.berry ? 'bg-blink' : '')}>
              {t2('Info.Berry')}
            </td>
            <td>
              <PokemonBerryMeta pokemon={pokemon} level={level} berryData={berryData} berryName={berryName}/>
            </td>
          </tr>
          <tr>
            <td className={classNames(metaTitleClass, specialty === specialtyIdMap.ingredient ? 'bg-blink' : '')}>
              {t2('Info.Ingredient')}
            </td>
            <td>
              <PokemonIngredientMeta pokemon={pokemon} level={level} ingredientMap={ingredientMap}/>
            </td>
          </tr>
          <tr>
            <td className={classNames(metaTitleClass, specialty === specialtyIdMap.skill ? 'bg-blink' : '')}>
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
