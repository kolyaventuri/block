/**
 * Practical Bolt app — consumes the *built* slackblock package.
 *
 * Requires these env vars (copy .env.example to .env and fill in):
 *   SLACK_BOT_TOKEN   — xoxb-... token
 *   SLACK_SIGNING_SECRET
 *   SLACK_APP_TOKEN   — xapp-... (Socket Mode)
 *   SLACK_TEST_CHANNEL — channel ID for postMessage demos
 *
 * Run (after `pnpm build` in the root):
 *   cd example && pnpm install && pnpm start
 */

import {App} from '@slack/bolt';
import {registerMessageCommands} from './handlers/message-commands.js';
import {registerEphemeralCommands} from './handlers/ephemeral-commands.js';
import {registerDmCommands} from './handlers/dm-commands.js';
import {registerAppHome} from './handlers/app-home.js';

const app = new App({
  token: process.env['SLACK_BOT_TOKEN'],
  signingSecret: process.env['SLACK_SIGNING_SECRET'],
  socketMode: true,
  appToken: process.env['SLACK_APP_TOKEN'],
});

registerMessageCommands(app);
registerEphemeralCommands(app);
registerDmCommands(app);
registerAppHome(app);

await app.start();
console.log('⚡ Bolt app running (Socket Mode)');
