import React from 'react';

import {clsx} from 'clsx';

import {AdsUnit} from '@/components/ads/main';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {ProgressBar} from '@/components/progressBar';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {useSleepdexOfSleepType} from '@/ui/sleepStyle/sleepdex/ofType/hook';
import {SleepdexOfPokemon} from '@/ui/sleepStyle/sleepdex/ofType/pokemon';
import {SleepdexOfSleepTypeProps} from '@/ui/sleepStyle/sleepdex/ofType/type';


export const SleepdexOfSleepType = (props: SleepdexOfSleepTypeProps) => {
  const {sleepType} = props;

  const collapsible = useCollapsible(true);
  const {
    availableSleepStyles,
    totalSleepStyles,
    unlockedSleepStyles,
  } = useSleepdexOfSleepType(props);

  return (
    <>
      <AdsUnit/>
      <CollapsibleFull state={collapsible} button={
        <Flex center className="gap-1 p-1 text-lg">
          <Flex direction="row" center className="gap-3">
            <PokemonSleepType sleepType={sleepType} className="invert-hoverable-dark"/>
            <CompletionResultUI completed={unlockedSleepStyles} total={totalSleepStyles}/>
          </Flex>
          <ProgressBar percent={unlockedSleepStyles / totalSleepStyles * 100}/>
        </Flex>
      }>
        <Grid className={clsx(
          'grid-cols-2 gap-2 p-2 xs:grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7',
        )}>
          {availableSleepStyles.map(({pokemon, sleepStyles}) => (
            <SleepdexOfPokemon key={pokemon.id} pokemon={pokemon} sleepStyles={sleepStyles} {...props}/>
          ))}
        </Grid>
      </CollapsibleFull>
    </>
  );
};
