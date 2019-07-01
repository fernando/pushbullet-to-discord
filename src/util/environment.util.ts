import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const DISCORD_WEBHOOK_URL = process.env['DISCORD_WEBHOOK_URL']!;
export const PUSHBULLET_API_TOKEN = process.env['PUSHBULLET_API_TOKEN']!;
