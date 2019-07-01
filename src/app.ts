import * as request from 'request-promise-native';
import * as WebSocket from 'ws';
import { Event, Push } from './pushbullet/pushbullet.interface';
import {
  PUSHBULLET_API_TOKEN,
  DISCORD_WEBHOOK_URL,
  USERS_NOTIFY,
  EMBED_COLOR,
} from './util/environment.util';

if (!DISCORD_WEBHOOK_URL || !PUSHBULLET_API_TOKEN) {
  console.log('Invalid settings, exiting...');
  process.exit();
}

let seen: string[] = [];
const websocket = new WebSocket(
  `wss://stream.pushbullet.com/websocket/${PUSHBULLET_API_TOKEN}`
);

function notifyBuild(users: string[]) {
  let notify = '';
  users.forEach((user: string) => {
    notify += `<@${user}> `;
  });

  return notify;
}

function postToDiscord(messageTitle: string, messageDescr: string) {
  const users = USERS_NOTIFY ? USERS_NOTIFY.split(',') : [];
  const notify = users.length > 0 ? notifyBuild(users) : undefined;

  request({
    method: 'POST',
    url: DISCORD_WEBHOOK_URL,
    json: {
      content: notify,
      embeds: [
        {
          title: messageTitle,
          description: messageDescr,
          color: EMBED_COLOR,
        },
      ],
    },
  });

  console.log(`${messageTitle}: ${messageDescr}`);
}

async function getPushes(sinceSeconds: number): Promise<Push[]> {
  const thirtySecondsAgo = (Date.now() - sinceSeconds) / 1000;

  const pushes: Push[] = (await request({
    method: 'GET',
    url: 'https://api.pushbullet.com/v2/pushes',
    headers: {
      'Access-Token': PUSHBULLET_API_TOKEN,
    },
    qs: {
      active: true,
      modified_after: thirtySecondsAgo,
    },
    json: true,
  })).pushes;

  return pushes;
}

websocket.on('open', () => {
  console.log('Pushbullet event stream has started.');
});

websocket.on('message', async (data: WebSocket.Data) => {
  const event: Event = JSON.parse(data.toString());

  if (event.type === 'tickle' && event.subtype === 'push') {
    const pushes: Push[] = await getPushes(30);

    pushes.forEach((push: Push) => {
      if (!seen.includes(push.iden)) {
        seen.push(push.iden);
        postToDiscord(push.title, push.body);
        setTimeout(() => (seen = []), 31 * 1000);
      }
    });
  }
});

websocket.on('error', (error: Error) => {
  postToDiscord('Pushbullet event stream error', error.message);
});

websocket.on('close', (code: number, reason: string) => {
  postToDiscord(
    'Pushbullet event stream has closed',
    `\nCode: ${code}\nReason: ${reason}.`
  );
  process.exit();
});
