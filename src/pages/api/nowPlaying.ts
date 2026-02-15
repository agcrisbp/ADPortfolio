import { NextApiRequest, NextApiResponse } from "next";

export interface NowPlayingResponseSuccess {
  /**
   * Whether the item is from recently played or currently playing.
   */
  isPlayingNow: boolean;
  isPaused: boolean;
  progressMs: number;
  item: any | null;
}
export type NowPlayingResponseError = { error: unknown };
export type NowPlayingResponse =
  | NowPlayingResponseSuccess
  | NowPlayingResponseError;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NowPlayingResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return res.status(500).json({ error: "Missing Spotify credentials." });
  }

  try {
    const refreshRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!refreshRes.ok) throw new Error(`Failed to refresh token: ${await refreshRes.text()}`);

    const { access_token: accessToken } = await refreshRes.json();

    const response: NowPlayingResponseSuccess = {
      isPlayingNow: false,
      isPaused: false,
      progressMs: 0,
      item: null,
    };

    const playingRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (playingRes.status !== 204) {
      if (!playingRes.ok) throw new Error(`Currently playing request failed: ${await playingRes.text()}`);
      const playingData = await playingRes.json();
      if (playingData?.item) {
        response.isPlayingNow = true;
        response.isPaused = !playingData.is_playing;
        response.progressMs = playingData.progress_ms ?? 0;
        response.item = playingData.item;
      }
    }

    if (!response.item) {
      const recentRes = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!recentRes.ok) throw new Error(`Recently played request failed: ${await recentRes.text()}`);

      const recentData = await recentRes.json();
      const partialItem = recentData?.items?.[0]?.track;
      if (partialItem) {
        const { type, id } = partialItem;
        const fullRes = await fetch(`https://api.spotify.com/v1/${type}s/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        response.item = fullRes.ok ? await fullRes.json() : partialItem;
      }
    }

    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as any)?.message });
  }
}