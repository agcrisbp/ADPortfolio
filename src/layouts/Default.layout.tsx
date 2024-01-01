import dynamic from 'next/dynamic';

import { Navbar } from '~/components';
import { usePersistantState } from '~/lib';

import type { WithChildren } from '~/types';

const Background = dynamic(() =>
	import('~/components/Background/Standard.component').then(({ Standard }) => Standard),
);

interface DefaultLayoutProps extends WithChildren {
	background?: boolean;
}

export function DefaultLayout({
	background: overrideBackground,
	children,
}: DefaultLayoutProps): JSX.Element {
	const { animations: background } = usePersistantState().get();
	const showBackground = overrideBackground ?? background;

	return (
		<>
			<Navbar.Standard />
			<main className="flex flex-col justify-center px-8">
				{showBackground && <Background />}
				{children}
			</main>
		</>
	);
}
