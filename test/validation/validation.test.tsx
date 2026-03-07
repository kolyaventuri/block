import {
  describe,
  test,
  expect,
  vi,
  beforeEach,
} from 'vitest';

import render, {
  type RenderOptions,
  SlackblockValidationError,
  escapeMrkdwn,
} from '../../src';
import Message from '../../src/components/message';
import Header from '../../src/components/layout/header';
import Actions from '../../src/components/layout/actions';
import Button from '../../src/components/block/button';
import Confirmation from '../../src/components/block/confirmation';
import Image from '../../src/components/block/image';
import DatePicker from '../../src/components/input/date-picker';
import TimePicker from '../../src/components/input/time-picker';
import Option from '../../src/components/input/option';
import Overflow from '../../src/components/input/overflow';
import Select from '../../src/components/input/select';
import TextInput from '../../src/components/input/text';
import Checkboxes from '../../src/components/input/checkboxes';
import Section from '../../src/components/layout/section';
import File from '../../src/components/layout/file';
import ImageLayout from '../../src/components/layout/image';
import Input from '../../src/components/layout/input';
import Text from '../../src/components/block/text';

// ─── helpers ────────────────────────────────────────────────────────────────

const renderWith = (element: JSX.Element, options?: RenderOptions) =>
  () => render(element as never, options);

const longHeaderText = 'a'.repeat(200);

// ─── off mode ───────────────────────────────────────────────────────────────

describe('off mode', () => {
  test('does not warn or throw on length violation', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(() =>
      render(
        <Message>
          <Header text={longHeaderText}/>
        </Message>,
        {validate: 'off'},
      )).not.toThrow();

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test('does not throw on invalid date format', () => {
    expect(() =>
      render(
        <Message>
          <Actions>
            <DatePicker actionId="aid" initialDate="not-a-date"/>
          </Actions>
        </Message>,
        {validate: 'off'},
      )).not.toThrow();
  });

  test('does not throw on missing required field', () => {
    expect(() =>
      render(
        <Message>
          <Header text={undefined as unknown as string}/>
        </Message>,
        {validate: 'off'},
      )).not.toThrow();
  });
});

// ─── warn mode (default) ────────────────────────────────────────────────────

describe('warn mode', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  test('warns on length violation and does not throw', () => {
    expect(() =>
      render(
        <Message>
          <Header text={longHeaderText}/>
        </Message>,
        {validate: 'warn'},
      )).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[slackblock]'));
    consoleSpy.mockRestore();
  });

  test('warns on too-many violation and does not throw', () => {
    const manyButtons = Array.from({length: 30}, (_, index) => (
      <Button actionId={`btn-${index}`}>Click</Button>
    ));

    expect(() =>
      render(
        <Message>
          <Actions>{manyButtons}</Actions>
        </Message>,
        {validate: 'warn'},
      )).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[slackblock]'));
    consoleSpy.mockRestore();
  });

  test('warns on invalid date format and does not throw', () => {
    expect(() =>
      render(
        <Message>
          <Actions>
            <DatePicker actionId="aid" initialDate="not-a-date"/>
          </Actions>
        </Message>,
        {validate: 'warn'},
      )).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[slackblock]'));
    consoleSpy.mockRestore();
  });

  test('warns on invalid time format and does not throw', () => {
    expect(() =>
      render(
        <Message>
          <Actions>
            <TimePicker actionId="aid" initialTime="99:99"/>
          </Actions>
        </Message>,
        {validate: 'warn'},
      )).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[slackblock]'));
    consoleSpy.mockRestore();
  });

  test('default render() is equivalent to validate: warn', () => {
    // Default (no options) should warn, not throw
    expect(() =>
      render(<Message>
        <Header text={longHeaderText}/>
      </Message>)).not.toThrow();

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test('warns on missing required field and does not throw', () => {
    expect(() =>
      render(
        <Message>
          <Header text={undefined as unknown as string}/>
        </Message>,
        {validate: 'warn'},
      )).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[slackblock]'));
    consoleSpy.mockRestore();
  });
});

// ─── strict mode ────────────────────────────────────────────────────────────

describe('strict mode', () => {
  test('throws SlackblockValidationError on length violation', () => {
    expect(() =>
      render(
        <Message>
          <Header text={longHeaderText}/>
        </Message>,
        {validate: 'strict'},
      )).toThrow(SlackblockValidationError);
  });

  test('throws on too-many violation', () => {
    const manyButtons = Array.from({length: 30}, (_, index) => (
      <Button actionId={`btn-${index}`}>Click</Button>
    ));

    expect(() =>
      render(
        <Message>
          <Actions>{manyButtons}</Actions>
        </Message>,
        {validate: 'strict'},
      )).toThrow(SlackblockValidationError);
  });

  test('throws on invalid date format', () => {
    expect(() =>
      render(
        <Message>
          <Actions>
            <DatePicker actionId="aid" initialDate="not-a-date"/>
          </Actions>
        </Message>,
        {validate: 'strict'},
      )).toThrow(SlackblockValidationError);
  });

  test('throws on invalid time format', () => {
    expect(() =>
      render(
        <Message>
          <Actions>
            <TimePicker actionId="aid" initialTime="99:99"/>
          </Actions>
        </Message>,
        {validate: 'strict'},
      )).toThrow(SlackblockValidationError);
  });

  test('error.rule is normalized for length violation', () => {
    let error_: SlackblockValidationError | undefined;

    try {
      render(
        <Message>
          <Header text={longHeaderText}/>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      if (error instanceof SlackblockValidationError) {
        error_ = error;
      }
    }

    expect(error_).toBeInstanceOf(SlackblockValidationError);
    expect(error_?.rule).toBe('too-long');
    expect(error_?.subcode).toBe('value-too-long');
  });

  test('error.rule is normalized for count violation', () => {
    const manyButtons = Array.from({length: 30}, (_, index) => (
      <Button actionId={`btn-${index}`}>Click</Button>
    ));
    let error_: SlackblockValidationError | undefined;

    try {
      render(
        <Message>
          <Actions>{manyButtons}</Actions>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      if (error instanceof SlackblockValidationError) {
        error_ = error;
      }
    }

    expect(error_?.rule).toBe('too-many');
    expect(error_?.subcode).toBe('too-many-items');
  });

  test('error.rule is normalized for invalid date format', () => {
    let error_: SlackblockValidationError | undefined;

    try {
      render(
        <Message>
          <Actions>
            <DatePicker actionId="aid" initialDate="not-a-date"/>
          </Actions>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      if (error instanceof SlackblockValidationError) {
        error_ = error;
      }
    }

    expect(error_?.rule).toBe('invalid-format');
    expect(error_?.subcode).toBe('invalid-date-format');
    expect(error_?.field).toBe('initialDate');
  });

  test('error.rule is normalized for invalid time format', () => {
    let error_: SlackblockValidationError | undefined;

    try {
      render(
        <Message>
          <Actions>
            <TimePicker actionId="aid" initialTime="99:99"/>
          </Actions>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      if (error instanceof SlackblockValidationError) {
        error_ = error;
      }
    }

    expect(error_?.rule).toBe('invalid-format');
    expect(error_?.subcode).toBe('invalid-time-format');
    expect(error_?.field).toBe('initialTime');
  });

  test('error.rule is normalized for required fields', () => {
    let error_: SlackblockValidationError | undefined;

    try {
      render(
        <Message>
          <Actions>
            {/* @ts-expect-error - intentionally omit actionId */}
            <Button actionId={undefined}>Click</Button>
          </Actions>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      if (error instanceof SlackblockValidationError) {
        error_ = error;
      }
    }

    expect(error_?.rule).toBe('required-field');
    expect(error_?.subcode).toBe('action-id-required');
    expect(error_?.field).toBe('actionId');
    expect(error_?.component).toBe('Button');
  });

  test('error.path includes component context', () => {
    let error_: SlackblockValidationError | undefined;

    try {
      render(
        <Message>
          <Header text={longHeaderText}/>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      if (error instanceof SlackblockValidationError) {
        error_ = error;
      }
    }

    expect(error_?.path).toContain('Header');
  });

  test('error.path includes Message context', () => {
    let error_: SlackblockValidationError | undefined;

    try {
      render(
        <Message>
          <Header text={longHeaderText}/>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      if (error instanceof SlackblockValidationError) {
        error_ = error;
      }
    }

    expect(error_?.path).toContain('Message');
  });

  test('throws on missing option value', () => {
    expect(renderWith(
      <Message>
        <Actions>
          <Select actionId="sel" placeholder="Pick">
            {/* @ts-expect-error - intentionally omit value */}
            <Option value={undefined}>Item</Option>
          </Select>
        </Actions>
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });

  test('throws on missing button actionId', () => {
    expect(renderWith(
      <Message>
        <Actions>
          {/* @ts-expect-error - intentionally omit actionId */}
          <Button actionId={undefined}>Click</Button>
        </Actions>
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });

  test('error is instance of Error', () => {
    let error_: unknown;
    try {
      render(
        <Message>
          <Header text={longHeaderText}/>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      error_ = error;
    }

    expect(error_).toBeInstanceOf(Error);
    expect(error_).toBeInstanceOf(SlackblockValidationError);
  });

  test('error.name is SlackblockValidationError', () => {
    let error_: SlackblockValidationError | undefined;

    try {
      render(
        <Message>
          <Header text={longHeaderText}/>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      if (error instanceof SlackblockValidationError) {
        error_ = error;
      }
    }

    expect(error_?.name).toBe('SlackblockValidationError');
  });

  test('throws on missing text input actionId', () => {
    expect(renderWith(
      <Message>
        <Input
          label="Name"
          element={
            // @ts-expect-error - intentionally omit actionId
            <TextInput actionId={undefined}/>
          }
        />
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });

  test('throws on missing overflow actionId', () => {
    expect(renderWith(
      <Message>
        <Actions>
          {/* @ts-expect-error - intentionally omit actionId */}
          <Overflow actionId={undefined}>
            <Option value="edit">Edit</Option>
          </Overflow>
        </Actions>
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });

  test('throws on missing file externalId', () => {
    expect(renderWith(
      <Message>
        {/* @ts-expect-error - intentionally omit externalId */}
        <File externalId={undefined}/>
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });

  test('throws on missing image block url', () => {
    expect(renderWith(
      <Message>
        {/* @ts-expect-error - intentionally omit url */}
        <ImageLayout url={undefined} alt="Chart"/>
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });

  test('throws on missing image element alt text', () => {
    expect(renderWith(
      <Message>
        <Section
          text={<Text>Hello</Text>}
          accessory={
            // @ts-expect-error - intentionally omit alt
            <Image url="https://example.com/icon.png" alt={undefined}/>
          }
        />
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });

  test('throws on missing input label', () => {
    expect(renderWith(
      <Message>
        <Input
          // @ts-expect-error - intentionally omit label
          label={undefined}
          element={<TextInput actionId="name"/>}
        />
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });

  test('throws on missing input element', () => {
    expect(renderWith(
      <Message>
        <Input
          label="Name"
          // @ts-expect-error - intentionally omit element
          element={undefined}
        />
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });

  test('throws on missing confirmation title', () => {
    expect(renderWith(
      <Message>
        <Actions>
          <Button
            actionId="delete"
            confirm={
              <Confirmation
                // @ts-expect-error - intentionally omit title
                title={undefined}
                confirm="Delete"
                deny="Cancel"
              >
                <Text plainText>Delete it?</Text>
              </Confirmation>
            }
          >
            Delete
          </Button>
        </Actions>
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });

  test('throws on missing confirmation body text', () => {
    expect(renderWith(
      <Message>
        <Actions>
          <Button
            actionId="delete"
            confirm={
              <Confirmation title="Confirm" confirm="Delete" deny="Cancel">
                {/* @ts-expect-error - intentionally omit body text */}
                {undefined}
              </Confirmation>
            }
          >
            Delete
          </Button>
        </Actions>
      </Message>,
      {validate: 'strict'},
    )).toThrow(SlackblockValidationError);
  });
});

// ─── section fields validation ───────────────────────────────────────────────

describe('section fields count', () => {
  test('allows fields-only sections', () => {
    expect(() =>
      render(
        <Message>
          <Section text={undefined as unknown as JSX.Element}>
            <Text>Field only</Text>
          </Section>
        </Message>,
        {validate: 'strict'},
      )).not.toThrow();
  });

  test('warns when section is missing both text and fields', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(() =>
      render(
        <Message>
          <Section text={undefined as unknown as JSX.Element}/>
        </Message>,
        {validate: 'warn'},
      )).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[slackblock]'));
    consoleSpy.mockRestore();
  });

  test('throws in strict mode when section is missing both text and fields', () => {
    expect(() =>
      render(
        <Message>
          <Section text={undefined as unknown as JSX.Element}/>
        </Message>,
        {validate: 'strict'},
      )).toThrow(SlackblockValidationError);
  });

  test('warns in warn mode when too many fields', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const fields = Array.from({length: 15}, (_, index) => (
      <Text>{`field ${index}`}</Text>
    ));

    expect(() =>
      render(
        <Message>
          <Section text={<Text>Hello</Text>}>{fields}</Section>
        </Message>,
        {validate: 'warn'},
      )).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[slackblock]'));
    consoleSpy.mockRestore();
  });

  test('throws in strict mode when too many fields', () => {
    const fields = Array.from({length: 15}, (_, index) => (
      <Text>{`field ${index}`}</Text>
    ));

    expect(() =>
      render(
        <Message>
          <Section text={<Text>Hello</Text>}>{fields}</Section>
        </Message>,
        {validate: 'strict'},
      )).toThrow(SlackblockValidationError);
  });

  test('error.rule is normalized when section is missing both text and fields', () => {
    let error_: SlackblockValidationError | undefined;

    try {
      render(
        <Message>
          <Section text={undefined as unknown as JSX.Element}/>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      if (error instanceof SlackblockValidationError) {
        error_ = error;
      }
    }

    expect(error_?.rule).toBe('invalid-structure');
    expect(error_?.subcode).toBe('text-or-fields-required');
  });
});

describe('count validation gaps', () => {
  test('throws in strict mode when overflow has too many options', () => {
    const options = Array.from({length: 6}, (_, index) => (
      <Option value={`value-${index}`}>{`Option ${index}`}</Option>
    ));

    expect(() =>
      render(
        <Message>
          <Actions>
            <Overflow actionId="more">{options}</Overflow>
          </Actions>
        </Message>,
        {validate: 'strict'},
      )).toThrow(SlackblockValidationError);
  });

  test('throws in strict mode when checkboxes exceed max options', () => {
    const options = Array.from({length: 11}, (_, index) => (
      <Option value={`value-${index}`}>{`Option ${index}`}</Option>
    ));

    expect(() =>
      render(
        <Message>
          <Input label="Choices" element={<Checkboxes actionId="prefs">{options}</Checkboxes>}/>
        </Message>,
        {validate: 'strict'},
      )).toThrow(SlackblockValidationError);
  });
});

// ─── unknown-type rule ───────────────────────────────────────────────────────

function UnknownWidget() {
  return null as unknown as JSX.Element;
}

describe('unknown-type rule', () => {
  test('off mode: silently ignores unknown top-level component', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(() =>
      render(
        <Message>
          <UnknownWidget/>
        </Message>,
        {validate: 'off'},
      )).not.toThrow();

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test('warn mode: warns on unknown top-level component and does not throw', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(() =>
      render(
        <Message>
          <UnknownWidget/>
        </Message>,
        {validate: 'warn'},
      )).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[slackblock]'));
    consoleSpy.mockRestore();
  });

  test('strict mode: throws SlackblockValidationError on unknown top-level component', () => {
    expect(() =>
      render(
        <Message>
          <UnknownWidget/>
        </Message>,
        {validate: 'strict'},
      )).toThrow(SlackblockValidationError);
  });

  test('strict mode: error.rule is normalized for unknown components', () => {
    let error_: SlackblockValidationError | undefined;

    try {
      render(
        <Message>
          <UnknownWidget/>
        </Message>,
        {validate: 'strict'},
      );
    } catch (error) {
      if (error instanceof SlackblockValidationError) {
        error_ = error;
      }
    }

    expect(error_?.rule).toBe('unsupported-child');
    expect(error_?.subcode).toBe('unknown-type');
    expect(error_?.component).toBe('UnknownWidget');
  });

  test('warn mode: warns on unknown nested component and does not throw', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(() =>
      render(
        <Message>
          <Actions>
            <UnknownWidget/>
          </Actions>
        </Message>,
        {validate: 'warn'},
      )).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[slackblock]'));
    consoleSpy.mockRestore();
  });

  test('strict mode: throws on unknown nested component', () => {
    expect(() =>
      render(
        <Message>
          <Actions>
            <UnknownWidget/>
          </Actions>
        </Message>,
        {validate: 'strict'},
      )).toThrow(SlackblockValidationError);
  });
});

// ─── escapeMrkdwn ────────────────────────────────────────────────────────────

describe('escapeMrkdwn', () => {
  test('escapes & to &amp;', () => {
    expect(escapeMrkdwn('foo & bar')).toBe('foo &amp; bar');
  });

  test('escapes < to &lt;', () => {
    expect(escapeMrkdwn('foo < bar')).toBe('foo &lt; bar');
  });

  test('escapes > to &gt;', () => {
    expect(escapeMrkdwn('foo > bar')).toBe('foo &gt; bar');
  });

  test('breaks bold marker *', () => {
    expect(escapeMrkdwn('*bold*')).toBe('\u200B*bold\u200B*');
  });

  test('breaks italic marker _', () => {
    expect(escapeMrkdwn('_italic_')).toBe('\u200B_italic\u200B_');
  });

  test('breaks strikethrough marker ~', () => {
    expect(escapeMrkdwn('~strike~')).toBe('\u200B~strike\u200B~');
  });

  test('breaks code marker `', () => {
    expect(escapeMrkdwn('`code`')).toBe('\u200B`code\u200B`');
  });

  test('handles combined escaping', () => {
    const result = escapeMrkdwn('<b> & *bold*');
    expect(result).toBe('&lt;b&gt; &amp; \u200B*bold\u200B*');
  });

  test('leaves plain text unchanged', () => {
    expect(escapeMrkdwn('Hello World')).toBe('Hello World');
  });
});
