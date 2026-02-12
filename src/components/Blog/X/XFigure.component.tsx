import React from 'react';
import Image from 'next/image';

interface XFigureProps {
	alt?: string;
	caption?: string;
	src: string;
}

export function XFigure({ alt, caption, src }: XFigureProps): React.JSX.Element {
	return (
		<figure>
			<Image
				alt={alt ?? caption}
				className="rounded-3xl object-cover select-none hover:shadow-xl"
				draggable={false}
				layout="responsive"
				src={src}
				fill
			/>
			<figcaption>{alt ?? caption}</figcaption>
		</figure>
	);
}
