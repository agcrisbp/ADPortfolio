import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

export const XCode = ({ children, ...props }: any) => {
	const preRef = useRef<HTMLPreElement>(null);
	const [copied, setCopied] = useState(false);
	const [collapsed, setCollapsed] = useState(true);
	const [height, setHeight] = useState(false);

	useEffect(() => {
		if (preRef.current) {
			if (preRef.current.scrollHeight > 350) {
				setHeight(true);
			}
		}
	}, [children]);

	const onCopy = () => {
		if (copied) return;
		setCopied(true);
		if (preRef.current) {
			navigator.clipboard.writeText(preRef.current.innerText);
		}
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className={`code-block-wrapper ${height && collapsed ? 'is-collapsed' : ''}`}>
			<div className="code-header">
				<div className="flex items-center gap-4 min-w-0">
					<div className="mac-dots flex-shrink-0">
						<div className="bg-[#ff5f56]" />
						<div className="bg-[#ffbd2e]" />
						<div className="bg-[#27c93f]" />
					</div>
					<div className="w-[1px] h-3 bg-gray-300 dark:bg-gray-700/50 ml-2 hidden sm:block" />
				</div>
				
				<button
					onClick={onCopy}
					className="copy-button flex-shrink-0"
					title={copied ? 'Copied!' : 'Copy to clipboard'}
				>
					<div className="flex items-center gap-1.5 px-1">
						<Icon
							icon={copied ? 'mdi:check-all' : 'mdi:content-copy'}
							width={14}
							height={14}
							className={copied ? 'text-green-500' : ''}
						/>
					</div>
				</button>
			</div>

			<pre 
				ref={preRef}
				{...props}
				className={`custom-scrollbar ${props.className || ''}`}
				style={{ 
					maxHeight: height && collapsed ? "350px" : 'none',
					overflowY: height && !collapsed ? 'auto' : 'hidden',
					transition: 'max-height 0.3s ease-in-out',
					position: 'relative'
				}}
			>
				{children}
			</pre>
			
			{height && (
				<button 
					onClick={() => setCollapsed(!collapsed)}
					className="expand-button"
				>
          <Icon 
            icon="solar:alt-arrow-up-bold"
            width={16}
            height={16}
            style={{ 
              transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          />
				</button>
			)}
		</div>
	);
};
