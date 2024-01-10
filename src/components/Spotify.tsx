import { Icon } from '@iconify/react';
import Image from "next/future/image";
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
		if (!data?.progessMs || !data.track) return;

		const started = Date.now();

		const interval = setInterval(() => {
			setTime(
				data.isPaused
					? data.progessMs
					: Math.min(
							data.progessMs! + Date.now() - started,
							data?.track?.duration_ms
					  )
			);
		}, 100);

		return () => clearInterval(interval);
	}, [data]);

	return (
		<div className="text-gray-900 dark:text-white flex space-x-4 w-full max-w-sm mx-auto px-4 py-4 bg-white/50 dark:bg-gray-900/50 dark:border-gray-600 backdrop-filter backdrop-blur-sm border-2 border-gray-200 rounded-lg hover:shadow-lg default-transition">
			<div>
				  <Link href="/spotify">
				  <Image
					  src={
						  data?.track?.album.images[0]?.url ??
						  "/images/emptysong.jpg"
					  }
					  alt="Spotify Album Art"
					  width={256}
					  height={256}
					  priority={true}
					  className="max-w-12.5 max-h-12.5 my-auto rounded select-none ring-2 ring-gray-200 dark:ring-gray-500 w-20 max-h-20 rounded"
				  />
				  </Link>
			</div>
			<div className="text-left basis-full flex-col">
				<p>
					{data?.track ? (
						<>
							<a
								href={data.track.external_urls.spotify}
								target="_blank"
								rel="noopener noreferrer"
								className="text-left font-bold border-b border-[#fff4] transition hover:border-white"
							>
								{data.track.name}
							</a>{" "}
							oleh{" "}
							{data.track.artists.map((artist, i) => (
								<span key={data.track?.id + artist.id}>
									<a
										href={artist.external_urls.spotify}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-900 dark:text-white text-left border-b border-[#fff4] transition hover:border-white"
									>
										{artist.name}
									</a>
									{i < data.track?.artists.length - 1
										? ", "
										: null}
								</span>
							))}
						</>
					) : (
						"Not Listening to Anything"
					)}
				</p>
				<p className="text-left">
					{data?.track ? (
						<>
							Album{" "}
							<a
								href={data.track.album.external_urls.spotify}
								target="_blank"
								rel="noopener noreferrer"
								className="border-b border-[#fff4] transition hover:border-white"
							>
								{data.track.album.name}
							</a>
						</>
					) : null}
				</p>
				<p className="flex items-center gap-1">
					{data?.isPlayingNow && data.track ? (
						<span className="block w-full max-w-sm mt-2">
							<span className="block h-0.5 rounded overflow-hidden bg-[#D8BFD8]">
								<span
									className="block h-full dark:bg-white bg-black"
									style={{
										width: `${
											(time! / data.track.duration_ms) *
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
									{formatDuration(data.track.duration_ms)}
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
							{data?.track ? <>Terakhir diputar di </> : null}
							Spotify
						</>
					)}
				</p>
			</div>
		</div>
	);
}
