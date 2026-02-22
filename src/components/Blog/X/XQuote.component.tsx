import React from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

interface XQuoteProps {
  children: React.ReactNode;
}

export const XQuote = ({ children }: XQuoteProps) => {
  return (
    <blockquote className={clsx(
      "x-quote relative my-16 rounded-3xl transition-all duration-300 group",
      "bg-gray-50/80 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800",
      "px-8 py-4 sm:px-10",
      "[&_.x-quote]:bg-black/5 [&_.x-quote]:dark:bg-white/5 [&_.x-quote]:my-6 [&_.x-quote]:px-6 [&_.x-quote]:py-5 [&_.x-quote]:border-none [&_.x-quote]:rounded-2xl"
    )}>
      
      <div className="main-quote-icon absolute -top-4 left-6 w-9 h-9 bg-white dark:bg-gray-800 border-2 border-primary-500/20 rounded-xl flex items-center justify-center shadow-lg text-primary-500 transform -rotate-12 group-hover:rotate-0 transition-all duration-500">
        <Icon icon="ri:double-quotes-l" width={20} />
      </div>
      
      <div className="relative z-10 text-gray-700 dark:text-gray-300 leading-relaxed prose-p:my-3 first:prose-p:mt-0 last:prose-p:mb-0 prose-headings:text-gray-900 dark:prose-headings:text-white prose-li:my-1 prose-ul:list-disc prose-ul:ml-4">
        {children}
      </div>
      
      <style jsx>{`
        :global(.x-quote .x-quote .main-quote-icon) {
          display: none;
        }
        
        .x-quote > div > :global(p) {
          font-style: italic;
          font-size: 1.125rem;
        }
        
        :global(.x-quote .x-quote p) {
          font-style: normal;
          font-size: 1rem;
        }
        
        :global(.x-quote .x-quote) {
          transform: none !important;
        }
      `}</style>
    </blockquote>
  );
};
