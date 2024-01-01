// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ProcessEnv extends NodeJS.ProcessEnv {
		NEXT_PUBLIC_DISCORD_ID: string;
		GITHUB_PAT: string;
		SPOTIFY_CLIENT_ID: string;
		SPOTIFY_CLIENT_SECRET: string;
		SPOTIFY_REFRESH_TOKEN: string;
	}
}
