# pushbullet-to-discord
[![Nodejs](https://img.shields.io/badge/node.js->%3D%2010-brightgreen.svg)](https://nodejs.org/)
![Typescript](https://img.shields.io/badge/%3C/%3E-Typescript-blue.svg)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

pushbullet-to-discord listens to pushbullet's event stream and uses a Discord webhook to post notifications, optionally mentioning a list of users.

## How to

Make sure you have node.js LTS or newer installed
<https://nodejs.org/en/download/>

Open cmd or terminal and install typescript globally:
```
npm install typescript -g
```

Clone the repository and install the packages:
```
git clone https://github.com/fernando/pushbullet-to-discord.git
cd pushbullet-to-discord
npm install
```

Open .env.dev with a text editor and configure it with the proper settings, when you are done, rename it to .env

### Run the script
```
npm run start
```