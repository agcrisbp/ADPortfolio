import React from 'react';
import Head from 'next/head';
import { Navbar } from '~/components';
import { useSeoProps } from '~/lib';

import type { PropsWithChildren } from 'react';

// Definisi interface lokal supaya tidak perlu import dari 'next-seo'
interface BlogLayoutProps {
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

export function BlogLayout({ children, seo }: PropsWithChildren<BlogLayoutProps>): React.JSX.Element {
	const seoProps = useSeoProps({
		title: 'Blog',
		...seo,
	});

	return (
		<>
			<Head>
				{/* Basic Metadata */}
				<title>{seoProps.title}</title>
				<meta name="description" content={seoProps.description} />
				
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

			<Navbar.Standard />
			<main className="flex flex-col justify-center sm:px-8">
				{children}
			</main>
		</>
	);
}
