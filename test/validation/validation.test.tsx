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
import DatePicker from '../../src/components/input/date-picker';
import TimePicker from '../../src/components/input/time-picker';
import Option from '../../src/components/input/option';
import Select from '../../src/components/input/select';
import Section from '../../src/components/layout/section';
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

  test('error.rule is correct for length violation', () => {
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
    expect(error_?.rule).toBe('value-too-long');
  });

  test('error.rule is correct for count violation', () => {
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

    expect(error_?.rule).toBe('too-many-items');
  });

  test('error.rule is correct for invalid date format', () => {
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

    expect(error_?.rule).toBe('invalid-date-format');
  });

  test('error.rule is correct for invalid time format', () => {
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

    expect(error_?.rule).toBe('invalid-time-format');
  });

  test('error.rule is correct for required field', () => {
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

    expect(error_?.rule).toBe('action-id-required');
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
});

// ─── section fields validation ───────────────────────────────────────────────

describe('section fields count', () => {
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

  test('strict mode: error.rule is unknown-type', () => {
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

    expect(error_?.rule).toBe('unknown-type');
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
