import assert from 'node:assert/strict';
import {createRequire} from 'node:module';

import render, {
  SlackblockValidationError,
  blockKitBuilderUrl,
  escapeMrkdwn,
  renderToBlocks,
  renderToMessage,
} from 'slackblock';
import {
  Header,
  Message,
  Section,
  Text,
} from 'slackblock/block';
import {jsx, jsxs, Fragment} from 'slackblock/jsx-runtime';
import {jsxDEV} from 'slackblock/jsx-dev-runtime';

const require = createRequire(import.meta.url);
const cjsRoot = require('slackblock');
const cjsRuntime = require('slackblock/jsx-runtime');

assert.equal(typeof render, 'function');
assert.equal(renderToMessage, render);
assert.equal(typeof renderToBlocks, 'function');
assert.equal(typeof escapeMrkdwn, 'function');
assert.equal(typeof blockKitBuilderUrl, 'function');
assert.equal(typeof SlackblockValidationError, 'function');
assert.equal(typeof cjsRoot.default, 'function');
assert.equal(typeof cjsRuntime.jsx, 'function');
assert.equal(Fragment, 'fragment');
assert.equal(typeof jsxDEV, 'function');

const message = jsxs(Message, {
  text: 'Fallback',
  children: [
    jsxDEV(Header, {text: 'Packed artifact header'}),
    jsx(Section, {
      text: jsx(Text, {children: `Escaped: ${escapeMrkdwn('*bold*')}`}),
    }),
  ],
});

const payload = render(message, {channel: 'C123'});
const blocks = renderToBlocks(jsxs(Fragment, {
  children: [
    jsx(Header, {text: 'Blocks header'}),
    jsx(Section, {text: jsx(Text, {children: 'Blocks body'})}),
  ],
}));

assert.equal(payload.channel, 'C123');
assert.equal(payload.blocks.length, 2);
assert.equal(blocks.length, 2);
assert.match(blockKitBuilderUrl(payload), /^https:\/\/app\.slack\.com\/block-kit-builder/u);

console.log('packed artifact smoke test passed');
