import { useRouter } from 'next/router';

export function useSeoProps(props: any = {}): any {
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
