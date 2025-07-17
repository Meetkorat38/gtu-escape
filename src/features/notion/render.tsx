"use client"
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import Image from "next/image";
import { useMemo } from "react";
import CodeBlock from "./CodeBlock";
import { useTheme } from "next-themes";

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  rootPageId: string;
}
export const NotionPage = ({
  recordMap,
  rootPageId,
}: NotionPageProps) => {

  const {theme} = useTheme()

  const isDark = theme === "dark"
   
  const CodeHighlight = useMemo(() => {
    return(
      CodeBlock
    )
  } , [])


  return (
    <div className="notion__container w-full overflow-x-hidden">
    <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={isDark}
        rootPageId={rootPageId}
        previewImages={false}
        disableHeader
        components={{
          nextImage: Image,
          nextLink: Link,
          Code : CodeHighlight,
        }}
      />
    </div>
  );
};
