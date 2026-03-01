/**
 * End-to-end pipeline tests: JSX → parse → transform → JSON.
 * These tests use the public render() API and assert on the final output,
 * unlike the unit tests which test individual transformer functions.
 */
import React from 'react';
import {test, expect, describe} from 'vitest';

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

describe('e2e pipeline: basic layout blocks', () => {
  test('renders a Section with text and fields', () => {
    const result = render(<Message text="Hello">
      <Section text={<Text>Hello *Block Kit*.</Text>}>
        <Text plainText>Field A</Text>
        <Text plainText>Field B</Text>
      </Section>
    </Message>);

    expect(result).toEqual({
      text: 'Hello',
      blocks: [
        {
          type: 'section',
          text: {type: 'mrkdwn', text: 'Hello *Block Kit*.'},
          fields: [
            {type: 'plain_text', text: 'Field A'},
            {type: 'plain_text', text: 'Field B'},
          ],
        },
      ],
    });
  });

  test('renders Header, Divider, and Context', () => {
    const result = render(<Message>
      <Header text="My Header" emoji/>
      <Divider/>
      <Context>
        <Text plainText>Some context</Text>
        <Image url="https://example.com/img.png" alt="logo"/>
      </Context>
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {type: 'header', text: {type: 'plain_text', text: 'My Header', emoji: true}},
        {type: 'divider'},
        {
          type: 'context',
          elements: [
            {type: 'plain_text', text: 'Some context'},
            {type: 'image', image_url: 'https://example.com/img.png', alt_text: 'logo'},
          ],
        },
      ],
    });
  });

  test('renders Actions with Button and Overflow', () => {
    const confirm = (
      <Confirmation title="Sure?" confirm="Yes" deny="No">
        <Text plainText>Are you sure?</Text>
      </Confirmation>
    );

    const result = render(<Message>
      <Actions>
        <Button actionId="approve" style="primary">Approve</Button>
        <Button actionId="deny" style="danger" confirm={confirm}>Deny</Button>
        <Overflow actionId="more">
          <Option value="a">Option A</Option>
          <Option value="b">Option B</Option>
        </Overflow>
      </Actions>
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {
          type: 'actions',
          elements: [
            {
              type: 'button', text: {type: 'plain_text', text: 'Approve'}, action_id: 'approve', style: 'primary',
            },
            {
              type: 'button',
              text: {type: 'plain_text', text: 'Deny'},
              action_id: 'deny',
              style: 'danger',
              confirm: {
                title: {type: 'plain_text', text: 'Sure?'},
                text: {type: 'plain_text', text: 'Are you sure?'},
                confirm: {type: 'plain_text', text: 'Yes'},
                deny: {type: 'plain_text', text: 'No'},
              },
            },
            {
              type: 'overflow',
              action_id: 'more',
              options: [
                {text: {type: 'plain_text', text: 'Option A'}, value: 'a'},
                {text: {type: 'plain_text', text: 'Option B'}, value: 'b'},
              ],
            },
          ],
        },
      ],
    });
  });

  test('renders ImageLayout and Video blocks', () => {
    const result = render(<Message>
      <ImageLayout
        url="https://example.com/img.png"
        alt="sample"
        title="My Image"
      />
      <Video
        title="My Video"
        videoUrl="https://example.com/video.mp4"
        thumbnailUrl="https://example.com/thumb.png"
        altText="Thumb"
      />
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {
          type: 'image', image_url: 'https://example.com/img.png', alt_text: 'sample', title: {type: 'plain_text', text: 'My Image'},
        },
        {type: 'video', title: {type: 'plain_text', text: 'My Video'}, video_url: 'https://example.com/video.mp4'},
      ],
    });
  });
});

describe('e2e pipeline: input blocks', () => {
  test('renders a text input block', () => {
    const result = render(<Message>
      <Input
        label="Your name"
        element={
          <TextInput
            actionId="name"
            placeholder="Jane Doe"
            minLength={2}
            maxLength={80}
          />
        }
      />
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {
          type: 'input',
          label: {type: 'plain_text', text: 'Your name'},
          element: {
            type: 'plain_text_input',
            action_id: 'name',
            placeholder: {type: 'plain_text', text: 'Jane Doe'},
            min_length: 2,
            max_length: 80,
          },
        },
      ],
    });
  });

  test('renders a static Select with Options', () => {
    const result = render(<Message>
      <Input
        label="Choose one"
        element={
          <Select placeholder="Pick one" actionId="sel">
            <Option value="a">Alpha</Option>
            <Option value="b">Beta</Option>
          </Select>
        }
      />
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {
          type: 'input',
          label: {type: 'plain_text', text: 'Choose one'},
          element: {
            type: 'static_select',
            action_id: 'sel',
            placeholder: {type: 'plain_text', text: 'Pick one'},
            options: [
              {text: {type: 'plain_text', text: 'Alpha'}, value: 'a'},
              {text: {type: 'plain_text', text: 'Beta'}, value: 'b'},
            ],
          },
        },
      ],
    });
  });

  test('renders a multi-Select with OptionGroups', () => {
    const result = render(<Message>
      <Input
        label="Choose many"
        element={
          <Select multi placeholder="Pick" actionId="multi">
            <OptionGroup label="Group 1">
              <Option value="a">Alpha</Option>
              <Option value="b">Beta</Option>
            </OptionGroup>
          </Select>
        }
      />
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {
          type: 'input',
          element: {
            type: 'multi_static_select',
            option_groups: [
              {
                label: {type: 'plain_text', text: 'Group 1'},
                options: [
                  {value: 'a'},
                  {value: 'b'},
                ],
              },
            ],
          },
        },
      ],
    });
  });

  test('renders Checkboxes and RadioGroup', () => {
    const optA = <Option value="a">Alpha</Option>;
    const optB = <Option value="b">Beta</Option>;

    const result = render(<Message>
      <Input
        label="Check"
        element={
          <Checkboxes actionId="checks">
            {optA}
            {optB}
          </Checkboxes>
        }
      />
      <Input
        label="Radio"
        element={
          <RadioGroup actionId="radios">
            {optA}
            {optB}
          </RadioGroup>
        }
      />
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {type: 'input', element: {type: 'checkboxes', action_id: 'checks'}},
        {type: 'input', element: {type: 'radio_buttons', action_id: 'radios'}},
      ],
    });
  });

  test('renders DatePicker, TimePicker, DateTimePicker', () => {
    const result = render(<Message>
      <Input label="Date" element={<DatePicker actionId="date" initialDate="2024-06-15"/>}/>
      <Input label="Time" element={<TimePicker actionId="time" initialTime="09:00"/>}/>
      <Input label="DateTime" element={<DateTimePicker actionId="dt" initialDateTime={1_700_000_000}/>}/>
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {type: 'input', element: {type: 'datepicker', initial_date: '2024-06-15'}},
        {type: 'input', element: {type: 'timepicker', initial_time: '09:00'}},
        {type: 'input', element: {type: 'datetimepicker', initial_date_time: 1_700_000_000}},
      ],
    });
  });
});

describe('e2e pipeline: Container with conditional children', () => {
  test('passes through non-falsy children', () => {
    const result = render(<Message>
      <Container>
        <Section text={<Text>Visible</Text>}/>
        <Divider/>
      </Container>
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {type: 'section', text: {type: 'mrkdwn', text: 'Visible'}},
        {type: 'divider'},
      ],
    });
  });

  test('discards null, undefined, and false children', () => {
    const flag = false;

    const result = render(<Message>
      <Container>
        {null}
        {undefined}
        {flag && <Section text={<Text>Hidden</Text>}/>}
        <Section text={<Text>Shown</Text>}/>
      </Container>
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {type: 'section', text: {type: 'mrkdwn', text: 'Shown'}},
      ],
    });
  });

  test('handles mixed falsy/truthy children in nested Container', () => {
    const show = true;
    const hide = false;

    const result = render(<Message>
      <Container>
        {hide && <Divider/>}
        {show && <Section text={<Text>A</Text>}/>}
        {null}
        {show && <Section text={<Text>B</Text>}/>}
      </Container>
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {type: 'section', text: {type: 'mrkdwn', text: 'A'}},
        {type: 'section', text: {type: 'mrkdwn', text: 'B'}},
      ],
    });
  });
});

describe('e2e pipeline: RichText', () => {
  test('renders a full RichText block', () => {
    const result = render(<Message>
      <RichText>
        <RichTextSection>
          <RichTextText style={{bold: true}}>Bold</RichTextText>
          {' '}
          <RichTextLink url="https://example.com">link</RichTextLink>
          {' '}
          <RichTextEmoji name="wave"/>
          {' '}
          <RichTextUser userId="U123"/>
          {' '}
          <RichTextChannel channelId="C123"/>
          {' '}
          <RichTextUserGroup usergroupId="S123"/>
          {' '}
          <RichTextBroadcast range="here"/>
          {' '}
          <RichTextDate
            timestamp={1_700_000_000}
            format="{date_num}"
            fallback="2024-01-01"
          />
        </RichTextSection>
        <RichTextList style="bullet" indent={1}>
          <RichTextSection>
            <RichTextText>Item one</RichTextText>
          </RichTextSection>
          <RichTextSection>
            <RichTextText>Item two</RichTextText>
          </RichTextSection>
        </RichTextList>
        <RichTextQuote>
          <RichTextText>Quoted text</RichTextText>
        </RichTextQuote>
        <RichTextPreformatted>
          <RichTextText style={{code: true}}>code here</RichTextText>
        </RichTextPreformatted>
      </RichText>
    </Message>);

    expect(result).toMatchObject({
      blocks: [
        {
          type: 'rich_text',
          elements: [
            {
              type: 'rich_text_section',
              elements: [
                {type: 'text', text: 'Bold', style: {bold: true}},
                {type: 'text', text: ' '},
                {type: 'link', url: 'https://example.com', text: 'link'},
                {type: 'text', text: ' '},
                {type: 'emoji', name: 'wave'},
                {type: 'text', text: ' '},
                {type: 'user', user_id: 'U123'},
                {type: 'text', text: ' '},
                {type: 'channel', channel_id: 'C123'},
                {type: 'text', text: ' '},
                {type: 'usergroup', usergroup_id: 'S123'},
                {type: 'text', text: ' '},
                {type: 'broadcast', range: 'here'},
                {type: 'text', text: ' '},
                {
                  type: 'date', timestamp: 1_700_000_000, format: '{date_num}', fallback: '2024-01-01',
                },
              ],
            },
            {
              type: 'rich_text_list',
              style: 'bullet',
              indent: 1,
              elements: [
                {type: 'rich_text_section', elements: [{type: 'text', text: 'Item one'}]},
                {type: 'rich_text_section', elements: [{type: 'text', text: 'Item two'}]},
              ],
            },
            {
              type: 'rich_text_quote',
              elements: [{type: 'text', text: 'Quoted text'}],
            },
            {
              type: 'rich_text_preformatted',
              elements: [{type: 'text', text: 'code here', style: {code: true}}],
            },
          ],
        },
      ],
    });
  });
});

describe('e2e pipeline: plain text message', () => {
  test('renders a text-only message with no blocks', () => {
    // The text prop on Message is the Slack message text field.
    // String children are parsed but the text prop always wins.
    const result = render(<Message text="Hello Slack!">Hello Slack!</Message>);

    expect(result).toMatchObject({text: 'Hello Slack!'});
    expect((result as any).blocks).toBeUndefined();
  });
});
