"use client"
import Link from "next/link";
import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import Image from "next/image";
import { useMemo } from "react";
import CodeBlock from "./CodeBlock";

// const Code = dynamic(() =>
//   import('react-notion-x/build/third-party/code').then((m) => m.Code)
// )

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
)


interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  rootPageId: string;
}
export const NotionPage = ({
  recordMap,
  rootPageId,
}: NotionPageProps) => {

 
  
  const CodeHighlight = useMemo(() => {
    return(
      CodeBlock
    )
  } , [])

  

  if (!recordMap) {
    return null;
  }


  return (
    <div className="notion__container w-full overflow-x-hidden">
    <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootPageId={rootPageId}
        previewImages={false}
        disableHeader
        components={{
          nextImage: Image,
          nextLink: Link,
          Code : CodeHighlight,
          Collection,
          Equation,
          Modal
        }}
      />
    </div>
  );
};
