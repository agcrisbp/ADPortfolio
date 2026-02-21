import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Icon } from '@iconify/react';

interface AccordionContextType {
	activeId: string | null;
	toggleAccordion: (id: string) => void;
	registerActive: (id: string) => void;
	isGroup: boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const XAccordionGroup = ({ children }: { children: React.ReactNode }) => {
	const [activeId, setActiveId] = useState<string | null>(null);
	
	const registerActive = (id: string) => {
		if (activeId === null) {
			setActiveId(id);
		}
	};

	const toggleAccordion = (id: string) => {
		setActiveId((prev) => (prev === id ? null : id));
	};

	return (
		<AccordionContext.Provider value={{ activeId, toggleAccordion, registerActive, isGroup: true }}>
			<div className="my-6 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
				{children}
			</div>
		</AccordionContext.Provider>
	);
};

export const XAccordion = ({ title, children, id, open = false }: { title: string, children: React.ReactNode, id?: string, open?: boolean }) => {
	const context = useContext(AccordionContext);
	const isInsideGroup = context?.isGroup ?? false;
	const [selfId] = useState(() => id || Math.random().toString(36).substring(7));
	
	const [internalOpen, setInternalOpen] = useState(open);
	const contentRef = useRef<HTMLDivElement>(null);
	const [contentHeight, setContentHeight] = useState<string | number>(0);
	
	useEffect(() => {
		if (isInsideGroup && open) {
			context?.registerActive(selfId);
		}
	}, []);
	
	const isOpen = isInsideGroup
		? context?.activeId === selfId
		: internalOpen;

	const handleToggle = () => {
		if (isInsideGroup) {
			context?.toggleAccordion(selfId);
		} else {
			setInternalOpen(!internalOpen);
		}
	};

	useEffect(() => {
		if (isOpen) {
			setContentHeight(contentRef.current?.scrollHeight ? `${contentRef.current.scrollHeight}px` : 'auto');
		} else {
			setContentHeight(0);
		}
	}, [isOpen]);
	
	const containerClasses = isInsideGroup
		? "w-full overflow-hidden bg-white dark:bg-gray-900/50"
		: "w-full my-6 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900/50";

	return (
		<div className={containerClasses}>
			<button
				onClick={handleToggle}
				className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors focus:outline-none ${
					isOpen ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
				}`}
			>
				<span className={`font-bold transition-colors ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
					{title}
				</span>
				<Icon
					icon="mdi:chevron-down"
					className={`text-gray-500 transition-transform duration-300`}
					style={{ 
						transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
					}}
					width={22}
					height={22}
				/>
			</button>

			<div
				ref={contentRef}
				style={{ maxHeight: contentHeight }}
				className="overflow-hidden transition-all duration-300 ease-in-out"
			>
				<div className="px-5 py-4 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-600/50">
					{children}
				</div>
			</div>
		</div>
	);
};
