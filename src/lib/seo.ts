import { useRouter } from 'next/router';
import { data } from '~/data';

export function useSeoProps(props: any = {}): any {
	const router = useRouter();

	const title = props.title || data.about.name;
	const description = props.description || data.about.description;
	const ogImage = data.ogImage 
		? `https://${data.baseURL}${data.ogImage}`
		: `https://${data.baseURL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

	return {
		title,
		description,
		canonical: `https://${data.baseURL}${router.asPath === '/' ? '' : router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: data.about.name,
			url: `https://${data.baseURL}${router.asPath}`,
			type: 'website',
			images: [
				{
					url: ogImage,
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@charisprod',
			site: '@charisprod',
		},
		...props,
	};
}
