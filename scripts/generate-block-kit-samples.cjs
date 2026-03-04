#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

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
  Container,
  Context,
  DatePicker,
  DateTimePicker,
  Divider,
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

const h = (component, props, ...children) => {
  const propsChildren = children.length === 0 ? undefined : children.length === 1 ? children[0] : children;
  return {
    type: component,
    props: propsChildren === undefined ? (props ?? {}) : {...(props ?? {}), children: propsChildren},
    children: children.length === 0 ? [] : children,
  };
};
const text = (content, options) => h(Text, options, content);

const confirm = h(
  Confirmation,
  { title: 'Confirm', confirm: 'Yes', deny: 'No' },
  text('Are you sure?', { plainText: true }),
);

const optionA = h(Option, { value: 'opt_a', description: 'First option' }, 'Option A');
const optionB = h(Option, { value: 'opt_b' }, 'Option B');
const optionC = h(Option, { value: 'opt_c', url: 'https://example.com' }, 'Open link');
const optionGroup = h(OptionGroup, { label: 'Grouped Options' }, optionB, h(Option, { value: 'opt_c' }, 'Option C'));

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
          Container,
          null,
          h(
            Context,
            null,
            text('Context detail', { plainText: true }),
            h(Image, { url: 'https://placehold.co/48x48/png', alt: 'Image' }),
          ),
          h(
            Actions,
            null,
            h(Button, { actionId: 'approve', style: 'primary', value: 'approved' }, 'Approve'),
            h(Button, { actionId: 'deny', style: 'danger', confirm }, 'Deny'),
            h(Button, { actionId: 'open_link', url: 'https://example.com' }, 'Open link'),
            h(Overflow, { actionId: 'more_actions', confirm }, optionA, optionB, optionC),
          ),
        ),
        h(ImageLayout, {
          url: 'https://placehold.co/640x320/png',
          alt: 'Sample image',
          title: 'Image block title',
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
            initial: 'Jane',
            focusOnLoad: true,
            minLength: 2,
            maxLength: 80,
            dispatchActionConfig: { triggerActionsOn: ['on_enter_pressed', 'on_character_entered'] },
          }),
        }),
        h(Input, {
          label: 'Notes',
          optional: true,
          element: h(TextInput, {
            actionId: 'notes_input',
            placeholder: 'Any additional notes...',
            multiline: true,
          }),
        }),
        h(Input, {
          label: 'Choose one',
          element: h(Select, { placeholder: 'Pick one', actionId: 'select_single', confirm }, optionA, optionB),
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
          element: h(Checkboxes, { actionId: 'checks', initialOptions: [optionA], confirm }, optionA, optionB),
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
            confirm,
          }),
        }),
        h(Input, {
          label: 'Time',
          element: h(TimePicker, {
            actionId: 'time',
            placeholder: 'Select a time',
            initialTime: '12:30',
            confirm,
          }),
        }),
        h(Input, {
          label: 'Date + time',
          element: h(DateTimePicker, {
            actionId: 'date_time',
            initialDateTime: 1700000000,
            confirm,
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
          label: 'User',
          element: h(Select, {
            type: 'user',
            placeholder: 'Pick a user',
            actionId: 'select_user',
          }),
        }),
        h(Input, {
          label: 'Users (multi)',
          element: h(Select, {
            type: 'user',
            multi: true,
            placeholder: 'Pick users',
            actionId: 'select_users_multi',
            initialUsers: ['U123456'],
          }),
        }),
        h(Input, {
          label: 'Channel',
          element: h(Select, {
            type: 'channel',
            placeholder: 'Pick a channel',
            actionId: 'select_channel',
          }),
        }),
        h(Input, {
          label: 'Channels (multi)',
          element: h(Select, {
            type: 'channel',
            multi: true,
            placeholder: 'Pick channels',
            actionId: 'select_channels_multi',
            initialChannels: ['C123456'],
          }),
        }),
        h(Input, {
          label: 'Conversation',
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
        h(Input, {
          label: 'Conversations (multi)',
          element: h(Select, {
            type: 'conversation',
            multi: true,
            placeholder: 'Pick conversations',
            actionId: 'select_conversations_multi',
            initialConversations: ['C123456'],
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
            h(RichTextText, { style: { strike: true } }, 'strike'),
            ' ',
            h(RichTextLink, { url: 'https://example.com', style: { bold: true } }, 'bold link'),
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
            { style: 'bullet', indent: 1, border: 1 },
            h(RichTextSection, null, h(RichTextText, null, 'List item one')),
            h(RichTextSection, null, h(RichTextText, null, 'List item two')),
          ),
          h(
            RichTextList,
            { style: 'ordered' },
            h(RichTextSection, null, h(RichTextText, null, 'Ordered item one')),
            h(RichTextSection, null, h(RichTextText, null, 'Ordered item two')),
          ),
          h(RichTextQuote, null, h(RichTextText, null, 'Quoted text block')),
          h(RichTextPreformatted, null, h(RichTextText, { style: { code: true } }, 'preformatted code')),
        ),
      ),
    ),
  },
  {
    name: '04-video.json',
    message: render(
      h(
        Message,
        { text: 'Block Kit sample: video' },
        h(Header, { text: 'Block Kit Sample: Video' }),
        h(Video, {
          title: 'Video block title',
          videoUrl: 'https://example.com/video.mp4',
          thumbnailUrl: 'https://placehold.co/640x360/png',
          altText: 'Video thumbnail image',
          titleUrl: 'https://example.com/video',
          description: 'Demo video description',
          authorName: 'Block Kit Bot',
          providerName: 'Example Video',
          providerIconUrl: 'https://placehold.co/32x32/png',
        }),
      ),
    ),
  },
  {
    name: '05-message-options.json',
    message: render(
      h(
        Message,
        {
          text: 'Block Kit sample: message options',
          username: 'Custom Bot',
          iconEmoji: ':robot_face:',
          markdown: false,
          parse: 'none',
          unfurlLinks: true,
          unfurlMedia: false,
          replyTo: '1700000000.000100',
          replyBroadcast: true,
        },
        h(Header, { text: 'Block Kit Sample: Message Options' }),
        h(Section, { text: text('Message with custom username, icon, and thread options.') }),
      ),
    ),
  },
  {
    name: '06-message-attachment.json',
    message: render(
      h(
        Message,
        {
          text: 'Block Kit sample: attachment',
          color: '#36a64f',
          asUser: true,
        },
        h(Header, { text: 'Block Kit Sample: Attachment' }),
        h(Section, { text: text('Message rendered as a colored attachment.') }),
      ),
    ),
  },
  {
    name: '07-focus-select.json',
    message: render(
      h(
        Message,
        { text: 'Block Kit sample: focusOnLoad select' },
        h(Input, {
          label: 'Choose one',
          element: h(Select, { placeholder: 'Pick one', actionId: 'select_focus', focusOnLoad: true }, optionA, optionB),
        }),
      ),
    ),
  },
  {
    name: '08-focus-checkboxes.json',
    message: render(
      h(
        Message,
        { text: 'Block Kit sample: focusOnLoad checkboxes' },
        h(Input, {
          label: 'Checkboxes',
          element: h(Checkboxes, { actionId: 'checks_focus', focusOnLoad: true }, optionA, optionB),
        }),
      ),
    ),
  },
  {
    name: '09-focus-radio.json',
    message: render(
      h(
        Message,
        { text: 'Block Kit sample: focusOnLoad radio' },
        h(Input, {
          label: 'Radio',
          element: h(RadioGroup, { actionId: 'radio_focus', focusOnLoad: true }, optionA, optionB),
        }),
      ),
    ),
  },
  {
    name: '10-focus-datepicker.json',
    message: render(
      h(
        Message,
        { text: 'Block Kit sample: focusOnLoad date picker' },
        h(Input, {
          label: 'Date',
          element: h(DatePicker, { actionId: 'date_focus', focusOnLoad: true }),
        }),
      ),
    ),
  },
  {
    name: '11-focus-timepicker.json',
    message: render(
      h(
        Message,
        { text: 'Block Kit sample: focusOnLoad time picker' },
        h(Input, {
          label: 'Time',
          element: h(TimePicker, { actionId: 'time_focus', focusOnLoad: true }),
        }),
      ),
    ),
  },
  {
    name: '12-focus-datetimepicker.json',
    message: render(
      h(
        Message,
        { text: 'Block Kit sample: focusOnLoad datetime picker' },
        h(Input, {
          label: 'Date + time',
          element: h(DateTimePicker, { actionId: 'datetime_focus', focusOnLoad: true }),
        }),
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

  const payload = sample.message.attachments
    ? { attachments: sample.message.attachments }
    : { blocks: sample.message.blocks };

  const outputPath = path.join(outputDir, sample.name);
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2) + '\n', 'utf8');
}

console.log(`Generated ${samples.length} Block Kit samples in ${outputDir}`);
