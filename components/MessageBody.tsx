"use client";
import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';

export default function MessageBody({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  return (
    // <div className="parsed-html">
    <div className="prose dark:prose-invert max-w-none w-full break-words">
      {parse(clean)}
    </div>
  );
}