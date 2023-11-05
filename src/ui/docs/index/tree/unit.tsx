import React from 'react';

import {clsx} from 'clsx';
import {PathTree} from 'treeify-paths';

import {Flex} from '@/components/layout/flex/common';
import {DocsMetaCard} from '@/components/shared/docs/card';
import {DocsMetadata} from '@/types/mongo/docs';


type Props = {
  tree: PathTree,
  lookup: {[path in string]: DocsMetadata},
};

export const DocsIndexTreeUnit = ({tree, lookup}: Props) => {
  const isNode = !!tree.name;

  return (
    <Flex noFullWidth className="gap-1.5">
      {isNode && <DocsMetaCard metadata={lookup[tree.path]}/>}
      {/* No `ml-4` if the node is parent (`tree.path` is an empty string) */}
      <Flex noFullWidth className={clsx('gap-2', tree.path && 'ml-4')}>
        {tree.children.map((tree) => (
          <DocsIndexTreeUnit key={tree.path} tree={tree} lookup={lookup}/>
        ))}
      </Flex>
    </Flex>
  );
};
