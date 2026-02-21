import { useRouter } from 'next/router';
import { data } from '~/data';

export function useSeoProps(props: any = {}): any {
	const router = useRouter();

	const title = data.about.name;
	const description = data.about.description;

	return {
		title,
		description,
		canonical: `/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: data.about.name,
			url: `/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: data.ogImage,
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
