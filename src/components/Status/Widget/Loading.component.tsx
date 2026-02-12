import React from 'react';
import clsx from 'clsx';

interface LoadingTypes {
  type?: 'user' | 'music';
}

export function Loading({ type }: LoadingTypes): React.JSX.Element {
  return (
    <div className="flex space-x-4 w-full max-w-sm mx-auto px-4 py-4 bg-white/50 dark:bg-gray-900/50 dark:border-gray-600 backdrop-filter backdrop-blur-sm border-2 border-gray-200 rounded-lg hover:shadow-lg default-transition motion-safe:animate-pulse">
      <div
        className={clsx(
          'w-12 h-12 my-auto bg-gray-200 dark:bg-gray-600',
          type === 'music' ? 'rounded' : 'rounded-full',
        )}
      />
      <div className="flex-1 space-y-4 py-1">
        <div className="w-3/4 h-4 rounded bg-gray-200 dark:bg-gray-600" />
        <div className="h-4 rounded bg-gray-200 dark:bg-gray-600" />
      </div>
    </div>
  );
}