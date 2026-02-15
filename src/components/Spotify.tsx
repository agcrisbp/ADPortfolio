import { Icon } from '@iconify/react';
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";

import type {
	NowPlayingResponseError,
	NowPlayingResponseSuccess
} from "../pages/api/nowPlaying";

const formatDuration = (ms: number) => {
	const seconds = Math.floor((ms / 1000) % 60)
		.toString()
		.padStart(2, "0");
	const minutes = Math.floor(ms / 1000 / 60);

	return `${minutes}:${seconds}`;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Spotify() {
	const { data } = useSWR<NowPlayingResponseSuccess, NowPlayingResponseError>(
		"/api/nowPlaying",
		fetcher,
		{ refreshInterval: 5000 }
	);

	const [time, setTime] = useState(0);

	useEffect(() => {
		if (!data?.progressMs || !data.item) return;

		const started = Date.now();

		const interval = setInterval(() => {
			setTime(
				data.isPaused
					? data.progressMs
					: Math.min(
							data.progressMs! + Date.now() - started,
							data?.item?.duration_ms
					  )
			);
		}, 100);

		return () => clearInterval(interval);
	}, [data]);

	const item = data?.item;

	const getImageUrl = () => {
		if (!item) return "/images/emptysong.jpg";
		if (item.type === "track") {
			return item.album?.images?.[0]?.url ?? "/images/emptysong.jpg";
		} else if (item.type === "episode") {
			return item.images?.[0]?.url ?? "/images/emptysong.jpg";
		}
		return "/images/emptysong.jpg";
	};

	return (
		<div className="text-gray-900 dark:text-white flex space-x-4 w-full max-w-sm mx-auto px-4 py-4 bg-white/50 dark:bg-gray-900/50 dark:border-gray-600 backdrop-filter backdrop-blur-sm border-2 border-gray-200 rounded-lg hover:shadow-lg default-transition">
			<div>
				<Link href="/spotify">
					<Image
						src={getImageUrl()}
						alt="Spotify Album/Show Art"
						width={256}
						height={256}
						priority={true}
						className="max-w-12.5 max-h-12.5 my-auto rounded select-none ring-2 ring-gray-200 dark:ring-gray-500 w-20 max-h-20 rounded"
					/>
				</Link>
			</div>
			<div className="text-left basis-full flex-col">
				<p>
					{item ? (
						<>
							<a
								href={item.external_urls.spotify}
								target="_blank"
								rel="noopener noreferrer"
								className="text-left font-bold border-b border-[#fff4] transition hover:border-white"
							>
								{item.name}
							</a>
							{item.type === "track" ? (
								<>
									{" "}by{" "}
									{item.artists.map((artist: any, i: number) => (
										<span key={item?.id + artist.id}>
											<a
												href={artist.external_urls.spotify}
												target="_blank"
												rel="noopener noreferrer"
												className="text-gray-900 dark:text-white text-left border-b border-[#fff4] transition hover:border-white"
											>
												{artist.name}
											</a>
											{i < item.artists.length - 1 ? ", " : null}
										</span>
									))}
								</>
							) : (
								<>
									{" "}from{" "}
									<a
										href={item.show.external_urls.spotify}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-900 dark:text-white text-left border-b border-[#fff4] transition hover:border-white"
									>
										{item.show.name}
									</a>
								</>
							)}
						</>
					) : (
						"Not Listening to Anything"
					)}
				</p>
				<p className="text-left">
					{item ? (
						item.type === "track" ? (
							<>
								Album{" "}
								<a
									href={item.album.external_urls.spotify}
									target="_blank"
									rel="noopener noreferrer"
									className="border-b border-[#fff4] transition hover:border-white"
								>
									{item.album.name}
								</a>
							</>
						) : (
							<>
								Podcast{" "}
								<a
									href={item.show.external_urls.spotify}
									target="_blank"
									rel="noopener noreferrer"
									className="border-b border-[#fff4] transition hover:border-white"
								>
									{item.show.name}
								</a>
							</>
						)
					) : null}
				</p>
				<p className="flex items-center gap-1">
					{data?.isPlayingNow && item ? (
						<span className="block w-full max-w-sm mt-2">
							<span className="block h-0.5 rounded overflow-hidden bg-[#D8BFD8]">
								<span
									className="block h-full dark:bg-white bg-black"
									style={{
										width: `${
											(time! / item.duration_ms) *
											100
										}%`
									}}
								/>
							</span>
							<span className="flex items-center text-sm">
								<span className="basis-full text-left">
									{formatDuration(time!)}
								</span>
								<span>
									{data?.isPaused ? (
										<Icon className="text-white h-4 w-4" icon="line-md:pause-to-play-transition" />
									) : (
										<Icon className="text-white h-4 w-4" icon="line-md:play-to-pause-transition" />
									)}
								</span>
								<span className="basis-full text-right">
									{formatDuration(item.duration_ms)}
								</span>
							</span>
						</span>
					) : (
						<>
							<span className="w-4 h-4">
								<Icon
									icon="simple-icons:spotify"
									width={48}
									height={48}
									className="w-4 h-4"
								/>
							</span>
							{item ? <>Last played on </> : null}
							Spotify
						</>
					)}
				</p>
			</div>
		</div>
	);
}