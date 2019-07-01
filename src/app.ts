import * as request from 'request-promise-native';
import * as WebSocket from 'ws';
import { Event } from './pushbullet/pushbullet.interface';
import {
  PUSHBULLET_API_TOKEN,
  DISCORD_WEBHOOK_URL,
} from './util/environment.util';

if (!DISCORD_WEBHOOK_URL || !PUSHBULLET_API_TOKEN) {
  console.log(`Invalid settings, exiting...`);
  process.exit();
}

const websocket = new WebSocket(
  `wss://stream.pushbullet.com/websocket/${PUSHBULLET_API_TOKEN}`
);

function postToDiscord(message: string) {
  request({
    method: 'POST',
    url: DISCORD_WEBHOOK_URL,
    json: {
      content: message,
    },
  });
  console.log(message);
}

websocket.on('open', () => {
  console.log('Pushbullet event stream has started.');
});

websocket.on('message', (data: WebSocket.Data) => {
  const event: Event = JSON.parse(data.toString());

  switch (event.type) {
    case 'tickle':
      postToDiscord('Test successful!');
      break;
    case 'push':
      postToDiscord(`${event.push}`);
      break;
    default:
  }
});

websocket.on('error', (error: Error) => {
  postToDiscord(`Pushbullet event stream error: ${error.message}.`);
});

websocket.on('close', (code: number, reason: string) => {
  postToDiscord(
    `Pushbullet event stream has closed.\nCode: ${code}\nReason: ${reason}.`
  );
  process.exit();
});
