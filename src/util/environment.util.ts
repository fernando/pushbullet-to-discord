import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const DISCORD_WEBHOOK_URL = process.env['DISCORD_WEBHOOK_URL']!;
export const PUSHBULLET_API_TOKEN = process.env['PUSHBULLET_API_TOKEN']!;
export const EMBED_COLOR = Number(process.env['EMBED_COLOR']) || 44678;
export const USERS_NOTIFY = process.env['USERS_NOTIFY'];
