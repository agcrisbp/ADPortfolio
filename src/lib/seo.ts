import { useRouter } from 'next/router';
import seo from '~/data/seo.json';

export function useSeoProps(props: any = {}): any {
	const router = useRouter();

	const title = seo.about.name;
	const description = seo.about.description;

	return {
		title,
		description,
		canonical: `/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: seo.about.name,
			url: `/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: seo.ogImage,
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
