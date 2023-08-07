import React from 'react';

import LinkIcon from '@heroicons/react/24/outline/LinkIcon';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {AnalysisStatsLinkedData} from '@/ui/analysis/page/calc/type';
import {AnalysisPokemonIcon} from '@/ui/analysis/page/result/icon';
import {classOfMarkStyle} from '@/ui/analysis/page/result/style';
import {AnalysisMarkStyle} from '@/ui/analysis/page/result/type';
import {classNames} from '@/utils/react';


type Props<TData> = {
  linked: AnalysisStatsLinkedData<TData>[],
  title: React.ReactNode,
  footer: React.ReactNode,
  mark?: AnalysisMarkStyle,
  renderData?: (data: AnalysisStatsLinkedData<TData>) => React.ReactNode,
};

export const AnalysisLayout = <TData, >({
  linked,
  title,
  footer,
  mark,
  renderData,
  children,
}: React.PropsWithChildren<Props<TData>>) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Popup show={show} setShow={setShow}>
        <Flex direction="row" center wrap className="items-center gap-1">
          {linked.map((linkedData) => (
            <AnalysisPokemonIcon key={linkedData.pokemonId} linked={linkedData} renderData={renderData}/>
          ))}
        </Flex>
      </Popup>
      <Flex direction="col" className={classNames(
        'info-section items-center gap-1 width-with-gap-xs width-with-gap-2-items',
        'md:width-with-gap-3-items lg:width-with-gap-4-items xl:width-with-gap-5-items',
      )}>
        <div className="text-sm text-slate-500">
          {title}
        </div>
        <Flex direction="col" center className="h-16">
          {children}
        </Flex>
        <Flex direction="col" center className={mark ? classOfMarkStyle[mark] : ''}>
          {footer}
        </Flex>
        <Flex direction="row" className="justify-end">
          <button
            className="enabled:button-clickable-border disabled:button-disabled h-6 w-6 p-1"
            disabled={!linked.length} onClick={() => setShow(true)}
          >
            <LinkIcon/>
          </button>
        </Flex>
      </Flex>
    </>
  );
};
