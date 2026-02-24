import Head from "next/head";
import { data } from '~/data';

interface GenericMetaProps {
	title: string;
	description: string;
	image?: string;
}

export default function GenericMeta({ title, description, image }: GenericMetaProps) {
  
	const ogImage = image 
		? `https://${data.baseURL}${image}`
		: `https://${data.baseURL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

	return (
		<Head>
			<title>{title}</title>
			<meta property="og:title" content={title} />
			<meta name="description" content={description} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content="/" />
			<meta property="og:image" content={ogImage} />
			<meta name="twitter:image" content={ogImage} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={"https://" + data.baseURL} />
			<meta name="twitter:creator" content="@charisprod" />
			<meta name="google-adsense-account" content="ca-pub-5238358527901368" />
		</Head>
	);
}
