#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const React = require('react');

const distRoot = path.join(__dirname, '..', 'dist');
const renderPath = path.join(distRoot, 'index.cjs');
const blockPath = path.join(distRoot, 'block.cjs');

if (!fs.existsSync(renderPath) || !fs.existsSync(blockPath)) {
  console.error('Build output not found. Run `pnpm run build` first.');
  process.exit(1);
}

const render = require(renderPath).default;
const {
  Actions,
  Button,
  Checkboxes,
  Confirmation,
  Context,
  DatePicker,
  DateTimePicker,
  Divider,
  File,
  Header,
  Image,
  ImageLayout,
  Input,
  Message,
  Option,
  OptionGroup,
  Overflow,
  RadioGroup,
  RichText,
  RichTextBroadcast,
  RichTextChannel,
  RichTextDate,
  RichTextEmoji,
  RichTextLink,
  RichTextList,
  RichTextPreformatted,
  RichTextQuote,
  RichTextSection,
  RichTextText,
  RichTextUser,
  RichTextUserGroup,
  Section,
  Select,
  Text,
  TextInput,
  TimePicker,
  Video,
} = require(blockPath);

const h = (component, props, ...children) => React.createElement(component, props, ...children);
const text = (content, options) => h(Text, options, content);

const confirm = h(
  Confirmation,
  { title: 'Confirm', confirm: 'Yes', deny: 'No' },
  text('Are you sure?', { plainText: true }),
);

const optionA = h(Option, { value: 'opt_a', description: 'First option' }, 'Option A');
const optionB = h(Option, { value: 'opt_b' }, 'Option B');
const optionC = h(Option, { value: 'opt_c' }, 'Option C');
const optionGroup = h(OptionGroup, { label: 'Grouped Options' }, optionB, optionC);

const samples = [
  {
    name: '01-basic.json',
    message: render(
      h(
        Message,
        { text: 'Block Kit sample: basic blocks' },
        h(Header, { text: 'Block Kit Sample: Layout', emoji: true }),
        h(
          Section,
          {
            text: text('Hello *Block Kit*.', { verbatim: true }),
            accessory: h(Button, { actionId: 'more_info', accessibilityLabel: 'More info' }, 'More info'),
          },
          text('Field A', { plainText: true }),
          text('Field B', { plainText: true }),
        ),
        h(Divider),
        h(
          Context,
          null,
          text('Context detail', { plainText: true }),
          h(Image, { url: 'https://placehold.co/48x48/png', alt: 'Image' }),
        ),
        h(
          Actions,
          null,
          h(Button, { actionId: 'approve', style: 'primary' }, 'Approve'),
          h(Button, { actionId: 'deny', style: 'danger', confirm }, 'Deny'),
          h(Overflow, { actionId: 'more_actions' }, optionA, optionB),
        ),
        h(ImageLayout, {
          url: 'https://placehold.co/640x320/png',
          alt: 'Sample image',
          title: 'Image block title',
        }),
        h(File, { externalId: 'FILE_EXTERNAL_ID' }),
        h(Video, {
          title: 'Video block title',
          videoUrl: 'https://example.com/video.mp4',
          thumbnailUrl: 'https://placehold.co/640x360/png',
          altText: 'Video thumbnail image',
          titleUrl: 'https://example.com/video',
          description: 'Demo video description',
          authorName: 'Block Kit Bot',
          providerName: 'Example Video',
        }),
      ),
    ),
  },
  {
    name: '02-inputs.json',
    message: render(
      h(
        Message,
        { text: 'Block Kit sample: inputs' },
        h(Header, { text: 'Block Kit Sample: Inputs' }),
        h(Input, {
          label: 'Your name',
          hint: 'Use your full name',
          element: h(TextInput, {
            actionId: 'name_input',
            placeholder: 'Jane Doe',
            focusOnLoad: true,
            minLength: 2,
            maxLength: 80,
            dispatchActionConfig: { triggerActionsOn: ['on_enter_pressed', 'on_character_entered'] },
          }),
        }),
        h(Input, {
          label: 'Choose one',
          element: h(Select, { placeholder: 'Pick one', actionId: 'select_single' }, optionA, optionB),
        }),
        h(Input, {
          label: 'Choose many',
          element: h(
            Select,
            {
              multi: true,
              placeholder: 'Pick multiple',
              actionId: 'select_multi',
              maxSelectedItems: 2,
              initialOptions: [optionB],
            },
            optionGroup,
          ),
        }),
        h(Input, {
          label: 'Checkboxes',
          element: h(Checkboxes, { actionId: 'checks', initialOptions: [optionA] }, optionA, optionB),
        }),
        h(Input, {
          label: 'Radio',
          element: h(RadioGroup, { actionId: 'radio', initialOption: optionB, confirm }, optionA, optionB),
        }),
        h(Input, {
          label: 'Date',
          element: h(DatePicker, {
            actionId: 'date',
            placeholder: 'Select a date',
            initialDate: '2024-01-15',
          }),
        }),
        h(Input, {
          label: 'Time',
          element: h(TimePicker, {
            actionId: 'time',
            placeholder: 'Select a time',
            initialTime: '12:30',
          }),
        }),
        h(Input, {
          label: 'Date + time',
          element: h(DateTimePicker, {
            actionId: 'date_time',
            initialDateTime: 1700000000,
          }),
        }),
        h(Input, {
          label: 'External select',
          element: h(Select, {
            type: 'external',
            placeholder: 'Search...',
            actionId: 'select_external',
            minQueryLength: 2,
          }),
        }),
        h(Input, {
          label: 'Users select',
          element: h(Select, {
            type: 'user',
            placeholder: 'Pick a user',
            actionId: 'select_user',
          }),
        }),
        h(Input, {
          label: 'Channels select',
          element: h(Select, {
            type: 'channel',
            placeholder: 'Pick a channel',
            actionId: 'select_channel',
          }),
        }),
        h(Input, {
          label: 'Conversations select',
          element: h(Select, {
            type: 'conversation',
            placeholder: 'Pick a conversation',
            actionId: 'select_conversation',
            defaultToCurrentConversation: true,
            responseUrlEnabled: true,
            filter: {
              include: ['public', 'private'],
              excludeExternalSharedChannels: true,
              excludeBotUsers: true,
            },
          }),
        }),
      ),
    ),
  },
  {
    name: '03-rich-text.json',
    message: render(
      h(
        Message,
        { text: 'Block Kit sample: rich text' },
        h(Header, { text: 'Block Kit Sample: Rich Text' }),
        h(
          RichText,
          null,
          h(
            RichTextSection,
            null,
            h(RichTextText, { style: { bold: true } }, 'Bold'),
            ' ',
            h(RichTextText, { style: { italic: true } }, 'italic'),
            ' ',
            h(RichTextLink, { url: 'https://example.com' }, 'link'),
            ' ',
            h(RichTextEmoji, { name: 'wave' }),
            ' ',
            h(RichTextUser, { userId: 'U123456' }),
            ' ',
            h(RichTextChannel, { channelId: 'C123456' }),
            ' ',
            h(RichTextUserGroup, { usergroupId: 'S123456' }),
            ' ',
            h(RichTextBroadcast, { range: 'here' }),
            ' ',
            h(RichTextDate, {
              timestamp: 1700000000,
              format: '{date_num} {time}',
              fallback: '2024-01-01 12:00',
            }),
          ),
          h(
            RichTextList,
            { style: 'bullet', indent: 1 },
            h(RichTextSection, null, h(RichTextText, null, 'List item one')),
            h(RichTextSection, null, h(RichTextText, null, 'List item two')),
          ),
          h(RichTextQuote, null, h(RichTextText, null, 'Quoted text block')),
          h(RichTextPreformatted, null, h(RichTextText, { style: { code: true } }, 'preformatted code')),
        ),
      ),
    ),
  },
];

const outputDir = path.join(__dirname, '..', 'examples', 'block-kit');
fs.mkdirSync(outputDir, { recursive: true });

const getBlocks = message => {
  if (message?.blocks) {
    return message.blocks;
  }

  if (message?.attachments?.[0]?.blocks) {
    return message.attachments[0].blocks;
  }

  return null;
};

for (const sample of samples) {
  const blocks = getBlocks(sample.message);
  if (!blocks) {
    throw new Error(`No blocks found for sample ${sample.name}`);
  }

  if (blocks.length > 50) {
    throw new Error(`Sample ${sample.name} has ${blocks.length} blocks (limit 50).`);
  }

  const outputPath = path.join(outputDir, sample.name);
  fs.writeFileSync(outputPath, JSON.stringify({ blocks }, null, 2) + '\n', 'utf8');
}

console.log(`Generated ${samples.length} Block Kit samples in ${outputDir}`);
