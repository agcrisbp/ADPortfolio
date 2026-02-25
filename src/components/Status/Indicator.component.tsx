import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { colors } from '~/lib';
import type { WithClassName } from '~/types';
import { READABLE_DISCORD_STATUS, type DiscordStatus } from '~/types/charis';
import { useStatus } from '~/lib/charis';

interface IndicatorProps extends WithClassName {
	color?: string;
	pulse?: boolean;
	status?: DiscordStatus;
}

export function Indicator({
	className,
	color: propColor = 'gray',
	pulse = false,
	status: propStatus = 'offline',
}: IndicatorProps): React.JSX.Element {
	const [tooltip, setTooltip] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { status: realtimeStatus } = useStatus();
	const actualStatus = (realtimeStatus?.discord_status as DiscordStatus) || propStatus;

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setTooltip(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div 
			ref={containerRef}
			className={clsx(
				'relative inline-flex flex-col items-center justify-center min-w-[20px] h-5', 
				className
			)}
		>
			<button
				onClick={() => setTooltip(!tooltip)}
				type="button"
				className="relative flex items-center justify-center w-3 h-3 focus:outline-none transition-transform active:scale-90 z-10"
				aria-label="Toggle status"
			>
				<span className="absolute flex h-3 w-3">
					{pulse && (
						<span
							className="absolute inline-flex w-full h-full opacity-75 rounded-full motion-safe:animate-ping"
							style={{ backgroundColor: colors?.[propColor]?.['400'] }}
						/>
					)}
					<span
						className="relative inline-flex w-3 h-3 rounded-full"
						style={{ backgroundColor: colors?.[propColor]?.['500'] }}
					/>
				</span>
			</button>
			
			{tooltip && (
				<div 
					className="absolute bottom-full flex flex-col items-center z-[9999]"
				>
					<div className="px-2 py-1 bg-black dark:bg-white text-gray-300 dark:text-black text-[10px] font-extrabold uppercase tracking-tight rounded shadow-2xl border border-gray-200 dark:border-white/10 whitespace-nowrap animate-in fade-in zoom-in-95 duration-100">
						{READABLE_DISCORD_STATUS[actualStatus]}
					</div>
					
					<div 
						className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-black dark:border-t-white -mt-[1px]" 
					/>
				</div>
			)}
		</div>
	);
}
