import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokemonComplexFilter} from '@/components/shared/pokemon/predefined/complexPicker/main';
import {PokemonComplexFilterOnSelectOpts} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonOnDesk, PokemonOnDeskProps} from '@/components/shared/pokemon/predefined/lab/onDesk/main';
import {PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {PokemonLabDataProps} from '@/components/shared/pokemon/predefined/lab/type';


type Props = PokemonLabDataProps & Pick<PokemonOnDeskProps, 'onRun' | 'immediateUpdate'> & {
  renderResult: (initialSetup: PokemonOnDeskState) => React.ReactNode,
  getDeskOnPokemonPicked: (opts: PokemonComplexFilterOnSelectOpts) => PokemonOnDeskState,
  onPokemonPicked: (setup: PokemonOnDeskState, opts: PokemonComplexFilterOnSelectOpts) => void,
};

export const PokemonLab = (props: Props) => {
  const {
    renderResult,
    getDeskOnPokemonPicked,
    onPokemonPicked,
  } = props;
  const [initialSetup, setInitialSetup] = React.useState<PokemonOnDeskState>();

  const onDeskRef = React.useRef<HTMLDivElement>(null);

  const scrollToSetup = () => onDeskRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});

  return (
    <Flex className="gap-1.5">
      <Flex className="gap-1.5 md:flex-row">
        <PokemonComplexFilter {...props} onPokemonPicked={(opts) => {
          if (initialSetup) {
            scrollToSetup();
          } else {
            setTimeout(scrollToSetup, 500);
          }

          const setup = getDeskOnPokemonPicked(opts);

          setInitialSetup(setup);

          onPokemonPicked(setup, opts);
        }}/>
        <AdsUnit className="block md:hidden"/>
        <AnimatedCollapse show={!!initialSetup}>
          {
            initialSetup &&
            <PokemonOnDesk
              ref={onDeskRef}
              initialSetup={initialSetup}
              {...props}
            />
          }
        </AnimatedCollapse>
      </Flex>
      <AnimatedCollapse show={!!initialSetup}>
        {initialSetup && renderResult(initialSetup)}
      </AnimatedCollapse>
    </Flex>
  );
};
