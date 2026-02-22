import React from 'react';

export function CodeStyles(): React.JSX.Element {
	return (
		<style global jsx>
			{`
				/**
				 * Reset & Positioning remark-code-title
				 */
				.remark-code-title {
					/* Reset */
					border: none !important;
					background: transparent !important;
					box-shadow: none !important;
					border-radius: 0 !important;
					
					/* Positioning */
					position: relative !important;
					z-index: 2 !important;
					margin-bottom: -38px !important;
					padding-top: 12px !important;
					padding-left: 72px !important;
					
					/* Typography */
					@apply text-[12px] font-mono text-gray-500 dark:text-gray-400 pointer-events-none tracking-tight truncate max-w-[65%] !important;
				}

				code[class*='language-'],
				pre[class*='language-'] {
					@apply text-gray-800 dark:text-gray-200;
					font-family: 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace;
					direction: ltr;
					text-align: left;
					white-space: pre;
					word-spacing: normal;
					word-break: normal;
					line-height: 1.6;
					-moz-tab-size: 2;
					-o-tab-size: 2;
					tab-size: 2;
					-webkit-hyphens: none;
					-moz-hyphens: none;
					-ms-hyphens: none;
					hyphens: none;
				}
				
				.code-block-wrapper {
					@apply relative group rounded-xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-[#0d1117] transition-all duration-300;
				}

				.code-header {
					@apply flex items-center justify-between px-4 py-2.5 bg-gray-100/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/50 backdrop-blur-md sticky top-0 !important;
					min-height: 40px !important;
					z-index: 1 !important;
				}

				.mac-dots {
					@apply flex gap-1.5 !important;
				}

				.mac-dots > div {
					@apply w-2.5 h-2.5 rounded-full shadow-sm !important;
				}

				/* Mac Dots Colors */
				.dot-red { @apply bg-[#ff5f56] opacity-90; }
				.dot-yellow { @apply bg-[#ffbd2e] opacity-90; }
				.dot-green { @apply bg-[#27c93f] opacity-90; }

				.copy-button {
					@apply p-1.5 rounded-md opacity-60 group-hover:opacity-100 transition-all duration-200 hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 z-30;
				}
				
				.expand-button {
					@apply absolute right-4 bottom-4 px-3 py-1.5 flex items-center rounded-full opacity-100 bg-blue-600 hover:bg-blue-700 text-white z-20 shadow-lg backdrop-blur-sm transition-all active:scale-95 text-[11px] font-semibold tracking-wide;
				}
				
				.code-block-wrapper.is-collapsed pre {
					mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
					-webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
				}

				/* ===== PLUGIN: Line Numbers ===== */
				pre.line-numbers {
					position: relative;
					padding-left: 3.8em !important;
					counter-reset: linenumber;
				}
				
				pre.line-numbers > code {
					position: relative;
					white-space: inherit;
				}
				
				.line-numbers .line-numbers-rows {
					position: absolute;
					pointer-events: none;
					top: 0 !important;
					font-size: 100%;
					left: -3.8em;
					width: 3em;
					letter-spacing: -1px;
					border-right: 1px solid #4b5563;
					user-select: none;
					padding-top: 0 !important; 
				}
				
				.line-numbers-rows > span {
					display: block;
					counter-increment: linenumber;
					line-height: 1.6;
				}
				
				.line-numbers-rows > span:before {
					content: counter(linenumber);
					color: #9ca3af;
					display: block;
					padding-right: 0.8em;
					text-align: right;
				}

				/* ===== TOKEN COLORS ===== */
				.token.comment { @apply text-gray-500 dark:text-gray-400 italic; }
				.token.punctuation { @apply text-gray-500 dark:text-gray-400; }
				.token.constant, .token.number, .token.boolean { @apply text-orange-600 dark:text-orange-300; }
				.token.tag, .token.keyword { @apply text-purple-600 dark:text-purple-300; }
				.token.variable, .token.function { @apply text-blue-600 dark:text-blue-300; }
				.token.string, .token.char { @apply text-green-600 dark:text-green-300; }
				.token.operator, .token.entity, .token.url { @apply text-cyan-600 dark:text-cyan-300; }
				.token.attr-name { @apply text-yellow-600 dark:text-yellow-200; }

        pre[class*='language-'] {
          @apply m-0 p-5 overflow-auto custom-scrollbar bg-white dark:bg-[#0d1117];
          display: block; 
        }
        
        code[class*='language-'] {
          display: block;
          min-width: fit-content; 
        }
        
				.custom-scrollbar::-webkit-scrollbar {
					width: 10px;
					height: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					@apply bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-solid border-[#f8f9fa] dark:border-[#1e2227];
				}

				.remark-highlight-code-line {
          @apply bg-blue-500/10 border-l-[3px] border-blue-500;
          display: block;
          min-width: 100%;
          margin-left: -1.25rem;
          padding-left: 1rem;
          padding-right: 1.25rem;
        }
			`}
		</style>
	);
}
