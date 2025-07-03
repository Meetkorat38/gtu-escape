"use client"
import Link from "next/link";
import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import Image from "next/image";
import { useMemo, useEffect, useState } from "react";
import CodeBlock from "./CodeBlock";
import { useTheme } from "next-themes";

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

  const {theme} = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  const CodeHighlight = useMemo(() => {
    return(
      CodeBlock
    )
  } , [])

  if (!mounted) return null; // Prevent SSR mismatch

  const darkMode = theme === "dark";

  if (!recordMap) {
    return null;
  }


  return (
    <div className="notion__container w-full overflow-x-hidden">
    <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={darkMode}
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
