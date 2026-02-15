import { NextApiRequest, NextApiResponse } from "next";

export type TrackResponseSuccess = any;
export type TrackResponseError = { error: unknown };
export type TrackResponse = TrackResponseSuccess | TrackResponseError;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrackResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  let { id } = req.query;
  if (Array.isArray(id) || !id) {
    return res.status(400).json({ error: "Expected single 'id' query parameter." });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: "Missing Spotify credentials." });
  }

  try {
    const grantRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }),
    });

    if (!grantRes.ok) throw new Error(`Failed to get token: ${await grantRes.text()}`);

    const { access_token: accessToken } = await grantRes.json();

    const trackRes = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!trackRes.ok) throw new Error(`Failed to get track: ${await trackRes.text()}`);

    const data = await trackRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as any)?.message });
  }
}