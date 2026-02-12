import useSWR from 'swr';

import { DISCORD_STATUS_COLOR } from '~/types';

const fetcher = async (url: string) => (await fetch(url)).json();

interface DiscordStatusData {
  discord_user: {
    id: string;
    username: string;
    global_name: string;
    avatar: {
      hash: string;
      url: string;
      animated: boolean;
    };
  };
  activities: any[];
  discord_status: string;
}

export function useStatus(): {
  color: string;
  loading: boolean;
  status?: DiscordStatusData;
} {
  const userId = process.env.NEXT_PUBLIC_DISCORD_ID;
  const { data: apiData, isLoading } = useSWR(
    `https://api.charisprod.xyz/v1/discord/${userId}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  const status = apiData?.data;

  return {
    color:
      status && !isLoading
        ? DISCORD_STATUS_COLOR[status.discord_status]
        : null,
    loading: isLoading,
    status,
  };
}
