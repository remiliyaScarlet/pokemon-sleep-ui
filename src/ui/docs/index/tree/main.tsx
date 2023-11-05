import React from 'react';

import treeifyPaths from 'treeify-paths';

import {DocsMetadata} from '@/types/mongo/docs';
import {DocsIndexTreeUnit} from '@/ui/docs/index/tree/unit';


type Props = {
  docsMetadataList: DocsMetadata[],
};

export const DocsIndexTree = ({docsMetadataList}: Props) => {
  const lookup = Object.fromEntries(docsMetadataList.map((doc) => [
    doc.path,
    doc,
  ]));

  const tree = treeifyPaths(docsMetadataList.map(({path}) => path));

  return <DocsIndexTreeUnit tree={tree} lookup={lookup}/>;
};
