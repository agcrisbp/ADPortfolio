import React from 'react';

interface XFigureProps {
	alt?: string;
	caption?: string;
	src: string;
}

export function XFigure({ alt, caption, src }: XFigureProps): React.JSX.Element {
	const label = alt || caption;
	
	return (
		<figure>
			<img
				alt={label ?? ''}
				src={src}
				className="w-full h-auto"
				draggable={false}
				loading="lazy"
			/>
			{label && (
				<figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 italic">
					{label}
				</figcaption>
			)}
		</figure>
	);
}
