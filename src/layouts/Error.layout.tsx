import React from 'react';
import Head from 'next/head';
import { useSeoProps } from '~/lib';

import type { WithChildren } from '~/types';

/**
 * Interface DefaultLayoutProps didefinisikan secara lokal untuk menghindari 
 * error referensi silang ke modul 'next-seo' yang bermasalah.
 */
interface DefaultLayoutProps extends WithChildren {
	seo?: {
		title?: string;
		description?: string;
		openGraph?: {
			title?: string;
			description?: string;
			url?: string;
			type?: string;
			images?: Array<{ url: string; alt?: string }>;
		};
		twitter?: {
			cardType?: string;
			site?: string;
			handle?: string;
		};
	};
}

export function ErrorLayout({ children, seo }: DefaultLayoutProps): React.JSX.Element {
	const seoProps = useSeoProps({
		title: 'Whoops!',
		...seo,
	});

	return (
		<>
			<Head>
				{/* Basic Metadata */}
				<title>{seoProps.title}</title>
				{seoProps.description && (
					<meta name="description" content={seoProps.description} />
				)}

				{/* Open Graph / Facebook */}
				{seoProps.openGraph && (
					<>
						<meta property="og:type" content={seoProps.openGraph.type || 'website'} />
						<meta property="og:title" content={seoProps.openGraph.title || seoProps.title} />
						<meta property="og:description" content={seoProps.openGraph.description || seoProps.description} />
						{seoProps.openGraph.url && <meta property="og:url" content={seoProps.openGraph.url} />}
						{seoProps.openGraph.images?.map((img, index) => (
							<meta key={index} property="og:image" content={img.url} />
						))}
					</>
				)}

				{/* Twitter */}
				{seoProps.twitter && (
					<>
						<meta name="twitter:card" content={seoProps.twitter.cardType || 'summary_large_image'} />
						<meta name="twitter:title" content={seoProps.title} />
						<meta name="twitter:description" content={seoProps.description} />
					</>
				)}
			</Head>

			<main className="flex flex-col justify-center px-8">
				<div className="relative h-screen pt-24 sm:pt-16 pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
					{children}
				</div>
			</main>
		</>
	);
}
