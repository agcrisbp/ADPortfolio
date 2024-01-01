import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'Your name.';
	const description = "About you.";

	return {
		title,
		description,
		canonical: `/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'Your Site',
			url: `/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: '/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@crisminolog',
			site: '@crisminolog',
		},
		...props,
	};
}
