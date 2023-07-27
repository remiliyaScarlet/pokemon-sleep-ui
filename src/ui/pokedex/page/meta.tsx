import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {sleepTypeBgClass, sleepTypeTextClass} from '@/styles/classes';
import {PokemonStats} from '@/ui/pokedex/page/stats';
import {sectionStyle} from '@/ui/pokedex/page/styles';
import {PokemonProps} from '@/ui/pokedex/page/type';
import {classNames} from '@/utils/react';


export const PokemonMeta = (props: PokemonProps) => {
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');
  const {
    type,
    id,
    berry,
    skill,
    sleepType,
    ingredients,
  } = props.pokemon;

  const metaTitleClass = 'whitespace-nowrap text-sm text-slate-500';

  const name = t(`PokemonName.${id}`);
  const berryName = t(`Berry.${berry.id}`);

  return (
    <Flex direction="col" center className={sectionStyle}>
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
              <Flex direction="row" center className="gap-1">
                <div className="relative h-10 w-10">
                  <Image
                    src={`/images/berry/${berry.id}.png`} alt={berryName}
                    fill sizes="(max-width: 768px) 10vw, 5vw"
                  />
                </div>
                <div className="whitespace-nowrap text-lg">
                  {berryName} &times; {berry.quantity}
                </div>
              </Flex>
            </td>
          </tr>
          <tr>
            <td className={metaTitleClass}>
              {t2('Info.Ingredient')}
            </td>
            <td>
              <Flex direction="row" center className="gap-3">
                {ingredients.map((ingredient) => {
                  const ingredientName = t(`Food.${ingredient}`);

                  return (
                    <Flex key={`${id}-${ingredient}`} direction="col" center className="gap-0.5">
                      <div className="relative h-12 w-12">
                        <Image
                          src={`/images/ingredient/${ingredient}.png`} alt={ingredientName}
                          fill sizes="(max-width: 768px) 10vw, 5vw"
                        />
                      </div>
                      <div className="whitespace-nowrap text-sm">
                        {ingredientName}
                      </div>
                    </Flex>
                  );
                })}
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
