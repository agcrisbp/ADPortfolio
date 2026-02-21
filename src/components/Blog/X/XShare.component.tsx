import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface XShareProps {
	title: string;
	description?: string;
	url?: string;
}

export const XShare = ({ title, description, url }: XShareProps) => {
	const [currentUrl, setCurrentUrl] = useState('');
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		setCurrentUrl(url || window.location.href);
	}, [url]);

	const shareData = {
		twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
		whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + currentUrl)}`,
	};

	const onCopy = () => {
		if (copied) return;
		navigator.clipboard.writeText(currentUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="share-container my-12 py-8 border-y border-gray-100 dark:border-gray-800/50">
			<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
				<div className="text-center sm:text-left">
					<h4 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-1">
						Share Article
					</h4>
					<p className="text-gray-500 dark:text-gray-400 text-sm">
						Enjoyed this post? Spread the knowledge!
					</p>
				</div>

				<div className="flex items-center gap-3">
					<a
						href={shareData.twitter}
						target="_blank"
						rel="noopener noreferrer"
						className="share-icon-btn group hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]"
						title="Share on X (Twitter)"
					>
						<Icon icon="ri:twitter-x-fill" width={20} />
					</a>

					<a
						href={shareData.whatsapp}
						target="_blank"
						rel="noopener noreferrer"
						className="share-icon-btn group hover:bg-[#25D366]/10 hover:text-[#25D366]"
						title="Share on WhatsApp"
					>
						<Icon icon="ri:whatsapp-fill" width={20} />
					</a>

					<a
						href={shareData.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="share-icon-btn group hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
						title="Share on LinkedIn"
					>
						<Icon icon="ri:linkedin-box-fill" width={20} />
					</a>
					
					<div className="relative">
						<button
							onClick={onCopy}
							className={`share-icon-btn group transition-all duration-300 ${
								copied 
									? 'bg-green-500 text-white border-green-500' 
									: 'hover:bg-gray-100 dark:hover:bg-gray-800'
							}`}
						>
							<Icon icon={copied ? 'ri:check-line' : 'ri:link'} width={20} />
						</button>
						
						<div className={`tooltip-copy ${copied ? 'opacity-100 visible -top-10' : 'opacity-0 invisible -top-8'}`}>
							Copied!
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				.share-icon-btn {
					@apply w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-900/50 
                    text-gray-400 dark:text-gray-500 transition-all duration-300 active:scale-95 border border-gray-100 
                    dark:border-gray-800/50 shadow-sm hover:shadow-md;
				}

				.tooltip-copy {
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					
					@apply px-2.5 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 
					text-[10px] font-bold rounded-md shadow-xl transition-all duration-300 pointer-events-none whitespace-nowrap;
					z-index: 1;
				}

				.tooltip-copy::after {
					content: '';
					position: absolute;
					top: 100%;
					left: 50%;
					transform: translateX(-50%);
					@apply border-[5px] border-transparent border-t-gray-900 dark:border-t-white;
				}
			`}</style>
		</div>
	);
};
