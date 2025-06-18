'use client';

import React, { useEffect } from 'react';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

// Notion's Code block type
interface NotionCodeBlock {
  block: {
    properties: {
      title?: string[][];
      language?: string[][];
    };
  };
}

export default function CodeHighlight({ block }: NotionCodeBlock) {
  const code: string = block?.properties?.title?.[0]?.[0] || '';
  const language: string = block?.properties?.language?.[0]?.[0]?.toLowerCase() || 'plaintext';

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code).then(() => {
      toast('Copied to clipboard');
    });
  };

  return (
    <div className="relative w-full my-4 rounded-md overflow-hidden">
      <div className="absolute w-1 inset-y-0 bg-gradient-to-b from-blue-500 to-blue-700" />
      <pre className="text-sm sm:text-base bg-[#151515] px-4 py-4 overflow-x-auto whitespace-pre-wrap break-words">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
      <button
        className="absolute top-2 right-2 p-1 rounded hover:bg-white/10 transition"
        onClick={handleCopyClick}
      >
        <Copy className="size-5 text-zinc-50" />
      </button>
    </div>
  );
}
