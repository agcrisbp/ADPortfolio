import React from 'react';
import { Layout } from '~/layouts';
import { Status } from '~/components';
import GenericMeta from "../components/GenericMeta";

export default function StatusPage(): React.JSX.Element {
	return (
		<Layout.Default>
		  <GenericMeta
				title="Status"
				description="Discord Status."
			/>
			<div className="flex flex-grow min-h-screen pt-16 pb-12">
				<div className="flex-grow flex flex-col justify-center max-w-sm sm:max-w-lg w-full mx-auto px-0 sm:px-16">
					<Status.Widget />
				</div>
			</div>
		</Layout.Default>
	);
}
