"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Icon } from '@iconify/react';

export interface AccordionHandle {
	toggle: () => void;
	open: () => void;
	close: () => void;
}

interface XAccordionProps {
	title: React.ReactNode;
	children: React.ReactNode;
	id?: string;
	open?: boolean;
	onToggle?: () => void;
	isInsideGroup?: boolean;
}

export type AccordionItem = {
    title: string;
    content: React.ReactNode;
};

export interface XAccordionGroupProps {
    items?: AccordionItem[] | string;
    close?: boolean;
}

const parseItems = (items: AccordionItem[] | string | undefined): AccordionItem[] => {
    if (!items) return [];

    if (Array.isArray(items)) return items;

    if (typeof items === 'string') {
        try {
            const parsed = JSON.parse(items);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    return [];
};

export const XAccordion = forwardRef<AccordionHandle, XAccordionProps>(
	({ title, children, id, open = false, onToggle, isInsideGroup = false }, ref) => {
		const [internalOpen, setInternalOpen] = useState(open);
		const contentRef = useRef<HTMLDivElement>(null);
		const [contentHeight, setContentHeight] = useState<string | number>(0);
		
		useEffect(() => {
			setInternalOpen(open);
		}, [open]);

		const isOpen = onToggle ? open : internalOpen;

		const handleToggle = useCallback(() => {
			if (onToggle) {
				onToggle();
			} else {
				setInternalOpen((prev) => !prev);
			}
		}, [onToggle]);
		
		useImperativeHandle(ref, () => ({
			toggle: handleToggle,
			open: () => setInternalOpen(true),
			close: () => setInternalOpen(false),
		}));

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
			<div className={containerClasses} id={id}>
				<button
					onClick={handleToggle}
					aria-expanded={isOpen}
					className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors focus:outline-none ${
						isOpen ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
					}`}
				>
					<div className={`font-bold transition-colors ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
						{title}
					</div>
					<Icon
						icon="mdi:chevron-down"
						className={`text-gray-500 transition-transform duration-300`}
						style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
						width={22}
						height={22}
					/>
				</button>

				<div
					ref={contentRef}
					style={{ maxHeight: contentHeight }}
					className="overflow-hidden transition-all duration-300 ease-in-out"
				>
					<div className="px-5 py-4 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-600/50 whitespace-pre-line">
						{children}
					</div>
				</div>
			</div>
		);
	}
);

export const XAccordionGroup = ({ items, close = true }: XAccordionGroupProps) => {
    const parsedItems = parseItems(items);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = useCallback(
        (index: number) => {
            if (close) {
                setOpenIndex((prev) => (prev === index ? null : index));
            }
        },
        [close],
    );
    
    return (
        <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
            {parsedItems.map((item, index) => (
                <XAccordion
                    key={index}
                    title={item.title}
                    isInsideGroup={true}
                    open={openIndex === index}
                    onToggle={() => handleToggle(index)}
                >
                    {item.content}
                </XAccordion>
            ))}
        </div>
    );
};
