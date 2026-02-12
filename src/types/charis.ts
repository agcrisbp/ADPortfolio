export type DiscordStatus = 'dnd' | 'idle' | 'offline' | 'online';

export const READABLE_DISCORD_STATUS: {
  [S in DiscordStatus]: string;
} = {
  ['dnd']: 'Do Not Disturb',
  ['idle']: 'Away',
  ['offline']: 'Offline',
  ['online']: 'Online',
};

export const DISCORD_STATUS_COLOR: {
  [S in DiscordStatus]: string;
} = {
  ['dnd']: 'red',
  ['idle']: 'yellow',
  ['offline']: 'gray',
  ['online']: 'green',
};