'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <article className="prose prose-gray max-w-none
      prose-headings:scroll-mt-20
      prose-h1:text-2xl prose-h1:font-bold prose-h1:border-b prose-h1:pb-3 prose-h1:mb-6
      prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
      prose-h3:text-lg prose-h3:font-medium
      prose-table:text-sm
      prose-th:bg-gray-50 prose-th:px-3 prose-th:py-2
      prose-td:px-3 prose-td:py-2
      prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-gray-800
      prose-pre:bg-gray-900 prose-pre:text-gray-100
      [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0
      prose-img:rounded-lg prose-img:shadow-md
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-li:marker:text-gray-400
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => {
            const imgSrc = typeof src === 'string' ? src : '';
            if (!imgSrc) return null;
            if (imgSrc.startsWith('/images/')) {
              return (
                <span className="block my-6">
                  <Image
                    src={imgSrc}
                    alt={alt || ''}
                    width={1920}
                    height={1080}
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </span>
              );
            }
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={imgSrc} alt={alt || ''} className="rounded-lg shadow-md" />;
          },
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
