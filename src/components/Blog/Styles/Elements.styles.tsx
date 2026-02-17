import React from 'react';

export function ElementsStyles(): React.JSX.Element {
	return (
		<style global jsx>
			{`
				h1,
				h2,
				h3,
				h4,
				h5,
				h6 {
					@apply dark:text-white;

					a {
						@apply float-left mt-0.5 -ml-5 pr-2 border-none opacity-0 no-underline;

						.icon-link:before {
							content: '#';
						}
					}

					&:hover,
					&:focus {
						a {
							@apply opacity-100 no-underline;
						}
					}
				}

				a {
					@apply dark:text-white no-underline rounded transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2;

					.item {
						@apply border-b-0 opacity-60 no-underline transition duration-300 ease-in-out;

						&:hover {
							@apply opacity-100;
						}
					}
				}

				p,
				ul,
				li {
					@apply text-gray-400;
				}

				strong {
					@apply dark:text-white;
				}

				img {
					@apply rounded-3xl object-cover select-none hover:shadow-xl transition ease-in-out duration-300;
				}

				figcaption {
					@apply text-gray-500 dark:text-blue-400 text-center text-sm italic;
				}
				
				.prose figure {
					@apply my-2;
				}

				.prose figure img {
					@apply m-0;
				}
        
        .prose a figure {
            @apply cursor-pointer;
        }

				hr {
					@apply my-4 dark:border-gray-600;
				}

				code {
					@apply bg-gray-100 dark:bg-gray-700 p-1 text-gray-400 dark:text-gray-200 rounded;

					&:after,
					&:before {
						@apply hidden;
					}
				}

				pre {
					@apply bg-gray-200 dark:bg-gray-800 m-0 dark:text-white border-2 border-gray-100 dark:border-gray-500 rounded-lg rounded-t-none;
				}

				.prose table {
					@apply w-full border-collapse border-2 border-gray-300 dark:border-gray-700 overflow-hidden rounded-xl;
					display: table;
				}

				.prose thead {
					@apply bg-gray-100 dark:bg-gray-800/80 border-b-2 border-gray-300 dark:border-gray-700;
				}

				.prose th {
					@apply border border-gray-300 dark:border-gray-700 text-left font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm;
					@apply px-4 py-2 !important;
				}

				.prose td {
					@apply border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300;
					@apply px-4 py-2 !important;
				}

				.prose tbody tr:nth-child(even) {
					@apply bg-gray-50 dark:bg-gray-800/30;
				}

				.prose tbody tr:hover {
					@apply bg-gray-100 dark:bg-gray-700/50 transition-colors;
				}

				ol li::before {
					@apply dark:text-gray-300;
				}

				.remark-code-title {
					@apply light:bg-white px-4 py-2 text-gray-300 dark:text-white font-medium border-2 border-b-0 border-gray-100 dark:border-gray-500 rounded-lg rounded-b-none;
				}
			`}
		</style>
	);
}
