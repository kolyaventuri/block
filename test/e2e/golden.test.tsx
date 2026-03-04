/**
 * Golden snapshot tests.
 *
 * Each test mirrors a sample in examples/block-kit/ and asserts the exact
 * render() output. Failures here mean a transformer changed its output shape —
 * update the snapshot intentionally with `pnpm run test:unit -- --update-snapshots`.
 */
import {describe, test, expect} from 'vitest';

import render from '../../src';
import {
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
} from '../../src/components';

// Shared fixtures
const confirm = (
  <Confirmation title="Confirm" confirm="Yes" deny="No">
    <Text plainText>Are you sure?</Text>
  </Confirmation>
);

const optionA = <Option value="opt_a" description="First option">Option A</Option>;
const optionB = <Option value="opt_b">Option B</Option>;
const optionC = <Option value="opt_c" url="https://example.com">Open link</Option>;
const optionGroup = (
  <OptionGroup label="Grouped Options">
    {optionB}
    <Option value="opt_c">Option C</Option>
  </OptionGroup>
);

describe('golden payloads', () => {
  test('basic layout blocks: header, section, divider, context, actions, image, container', () => {
    const result = render(<Message text="Block Kit sample: basic blocks">
      <Header text="Block Kit Sample: Layout" emoji/>
      <Section
        text={<Text verbatim>Hello *Block Kit*.</Text>}
        accessory={<Button actionId="more_info" accessibilityLabel="More info">More info</Button>}
      >
        <Text plainText>Field A</Text>
        <Text plainText>Field B</Text>
      </Section>
      <Divider/>
      <Container>
        <Context>
          <Text plainText>Context detail</Text>
          <Image url="https://placehold.co/48x48/png" alt="Image"/>
        </Context>
        <Actions>
          <Button actionId="approve" style="primary" value="approved">Approve</Button>
          <Button actionId="deny" style="danger" confirm={confirm}>Deny</Button>
          <Button actionId="open_link" url="https://example.com">Open link</Button>
          <Overflow actionId="more_actions" confirm={confirm}>
            {optionA}
            {optionB}
            {optionC}
          </Overflow>
        </Actions>
      </Container>
      <ImageLayout
        url="https://placehold.co/640x320/png"
        alt="Sample image"
        title="Image block title"
      />
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('input blocks: text input, selects, checkboxes, radio, date/time pickers, all select types', () => {
    const result = render(<Message text="Block Kit sample: inputs">
      <Header text="Block Kit Sample: Inputs"/>
      <Input
        label="Your name"
        hint="Use your full name"
        element={
          <TextInput
            actionId="name_input"
            placeholder="Jane Doe"
            initial="Jane"
            focusOnLoad
            minLength={2}
            maxLength={80}
            dispatchActionConfig={{triggerActionsOn: ['on_enter_pressed', 'on_character_entered']}}
          />
        }
      />
      <Input
        label="Notes"
        optional
        element={<TextInput actionId="notes_input" placeholder="Any additional notes..." multiline/>}
      />
      <Input
        label="Choose one"
        element={
          <Select placeholder="Pick one" actionId="select_single" confirm={confirm}>
            {optionA}
            {optionB}
          </Select>
        }
      />
      <Input
        label="Choose many"
        element={
          <Select
            multi
            placeholder="Pick multiple"
            actionId="select_multi"
            maxSelectedItems={2}
            initialOptions={[optionB]}
          >
            {optionGroup}
          </Select>
        }
      />
      <Input
        label="Checkboxes"
        element={
          <Checkboxes actionId="checks" initialOptions={[optionA]} confirm={confirm}>
            {optionA}
            {optionB}
          </Checkboxes>
        }
      />
      <Input
        label="Radio"
        element={
          <RadioGroup actionId="radio" initialOption={optionB} confirm={confirm}>
            {optionA}
            {optionB}
          </RadioGroup>
        }
      />
      <Input
        label="Date"
        element={<DatePicker actionId="date" placeholder="Select a date" initialDate="2024-01-15" confirm={confirm}/>}
      />
      <Input
        label="Time"
        element={<TimePicker actionId="time" placeholder="Select a time" initialTime="12:30" confirm={confirm}/>}
      />
      <Input
        label="Date + time"
        element={<DateTimePicker actionId="date_time" initialDateTime={1_700_000_000} confirm={confirm}/>}
      />
      <Input
        label="External select"
        element={<Select type="external" placeholder="Search..." actionId="select_external" minQueryLength={2}/>}
      />
      <Input
        label="User"
        element={<Select type="user" placeholder="Pick a user" actionId="select_user"/>}
      />
      <Input
        label="Users (multi)"
        element={
          <Select
            type="user"
            multi
            placeholder="Pick users"
            actionId="select_users_multi"
            initialUsers={['U123456']}
          />
        }
      />
      <Input
        label="Channel"
        element={<Select type="channel" placeholder="Pick a channel" actionId="select_channel"/>}
      />
      <Input
        label="Channels (multi)"
        element={
          <Select
            type="channel"
            multi
            placeholder="Pick channels"
            actionId="select_channels_multi"
            initialChannels={['C123456']}
          />
        }
      />
      <Input
        label="Conversation"
        element={
          <Select
            type="conversation"
            placeholder="Pick a conversation"
            actionId="select_conversation"
            defaultToCurrentConversation
            responseUrlEnabled
            filter={{
              include: ['public', 'private'],
              excludeExternalSharedChannels: true,
              excludeBotUsers: true,
            }}
          />
        }
      />
      <Input
        label="Conversations (multi)"
        element={
          <Select
            type="conversation"
            multi
            placeholder="Pick conversations"
            actionId="select_conversations_multi"
            initialConversations={['C123456']}
          />
        }
      />
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('rich text: all element types, styles, bullet and ordered lists, quote, preformatted', () => {
    const result = render(<Message text="Block Kit sample: rich text">
      <Header text="Block Kit Sample: Rich Text"/>
      <RichText>
        <RichTextSection>
          <RichTextText style={{bold: true}}>Bold</RichTextText>
          {' '}
          <RichTextText style={{italic: true}}>italic</RichTextText>
          {' '}
          <RichTextText style={{strike: true}}>strike</RichTextText>
          {' '}
          <RichTextLink url="https://example.com" style={{bold: true}}>bold link</RichTextLink>
          {' '}
          <RichTextEmoji name="wave"/>
          {' '}
          <RichTextUser userId="U123456"/>
          {' '}
          <RichTextChannel channelId="C123456"/>
          {' '}
          <RichTextUserGroup usergroupId="S123456"/>
          {' '}
          <RichTextBroadcast range="here"/>
          {' '}
          <RichTextDate
            timestamp={1_700_000_000}
            format="{date_num} {time}"
            fallback="2024-01-01 12:00"
          />
        </RichTextSection>
        <RichTextList style="bullet" indent={1} border={1}>
          <RichTextSection><RichTextText>List item one</RichTextText></RichTextSection>
          <RichTextSection><RichTextText>List item two</RichTextText></RichTextSection>
        </RichTextList>
        <RichTextList style="ordered">
          <RichTextSection><RichTextText>Ordered item one</RichTextText></RichTextSection>
          <RichTextSection><RichTextText>Ordered item two</RichTextText></RichTextSection>
        </RichTextList>
        <RichTextQuote><RichTextText>Quoted text block</RichTextText></RichTextQuote>
        <RichTextPreformatted>
          <RichTextText style={{code: true}}>preformatted code</RichTextText>
        </RichTextPreformatted>
      </RichText>
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('video block: all props including providerIconUrl', () => {
    const result = render(<Message text="Block Kit sample: video">
      <Header text="Block Kit Sample: Video"/>
      <Video
        title="Video block title"
        videoUrl="https://example.com/video.mp4"
        thumbnailUrl="https://placehold.co/640x360/png"
        altText="Video thumbnail image"
        titleUrl="https://example.com/video"
        description="Demo video description"
        authorName="Block Kit Bot"
        providerName="Example Video"
        providerIconUrl="https://placehold.co/32x32/png"
      />
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('message envelope options: username, iconEmoji, parse, unfurl, thread reply', () => {
    const result = render(<Message
      text="Block Kit sample: message options"
      username="Custom Bot"
      iconEmoji=":robot_face:"
      markdown={false}
      parse="none"
      unfurlLinks
      unfurlMedia={false}
      replyTo="1700000000.000100"
      replyBroadcast
    >
      <Header text="Block Kit Sample: Message Options"/>
      <Section text={<Text>Message with custom username, icon, and thread options.</Text>}/>
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('message with color renders as attachment with asUser', () => {
    const result = render(<Message text="Block Kit sample: attachment" color="#36a64f" asUser>
      <Header text="Block Kit Sample: Attachment"/>
      <Section text={<Text>Message rendered as a colored attachment.</Text>}/>
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('focusOnLoad on static select', () => {
    const result = render(<Message text="Block Kit sample: focusOnLoad select">
      <Input
        label="Choose one"
        element={
          <Select placeholder="Pick one" actionId="select_focus" focusOnLoad>
            {optionA}
            {optionB}
          </Select>
        }
      />
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('focusOnLoad on checkboxes', () => {
    const result = render(<Message text="Block Kit sample: focusOnLoad checkboxes">
      <Input
        label="Checkboxes"
        element={
          <Checkboxes actionId="checks_focus" focusOnLoad>
            {optionA}
            {optionB}
          </Checkboxes>
        }
      />
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('focusOnLoad on radio group', () => {
    const result = render(<Message text="Block Kit sample: focusOnLoad radio">
      <Input
        label="Radio"
        element={
          <RadioGroup actionId="radio_focus" focusOnLoad>
            {optionA}
            {optionB}
          </RadioGroup>
        }
      />
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('focusOnLoad on date picker', () => {
    const result = render(<Message text="Block Kit sample: focusOnLoad date picker">
      <Input label="Date" element={<DatePicker actionId="date_focus" focusOnLoad/>}/>
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('focusOnLoad on time picker', () => {
    const result = render(<Message text="Block Kit sample: focusOnLoad time picker">
      <Input label="Time" element={<TimePicker actionId="time_focus" focusOnLoad/>}/>
    </Message>);

    expect(result).toMatchSnapshot();
  });

  test('focusOnLoad on date-time picker', () => {
    const result = render(<Message text="Block Kit sample: focusOnLoad datetime picker">
      <Input label="Date + time" element={<DateTimePicker actionId="datetime_focus" focusOnLoad/>}/>
    </Message>);

    expect(result).toMatchSnapshot();
  });
});
