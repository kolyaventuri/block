import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';

import render, {SlackblockValidationError} from '../../src';
import {
  Actions,
  Button,
  Checkboxes,
  Confirmation,
  Context,
  DatePicker,
  DateTimePicker,
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
  RichTextSection,
  RichTextText,
  Section,
  Select,
  Text,
  TextInput,
  TimePicker,
  Video,
} from '../../src/components';

type ValidationCase = {
  name: string;
  component: string;
  valid: JSX.Element;
  invalid: JSX.Element;
  rule: 'required-field' | 'invalid-structure';
  subcode: string;
  field?: string;
};

const option = <Option value="opt-1">Option 1</Option>;
const missingString = undefined as never;
const missingElement = undefined as never;

const validationCases: ValidationCase[] = [
  {
    name: 'Actions',
    component: 'Actions',
    valid: <Message><Actions><Button actionId="approve">Approve</Button></Actions></Message>,
    invalid: <Message><Actions>{missingElement}</Actions></Message>,
    rule: 'required-field',
    subcode: 'elements-required',
    field: 'elements',
  },
  {
    name: 'Context',
    component: 'Context',
    valid: <Message><Context><Text plainText>Context</Text></Context></Message>,
    invalid: <Message><Context>{missingElement}</Context></Message>,
    rule: 'required-field',
    subcode: 'elements-required',
    field: 'elements',
  },
  {
    name: 'File',
    component: 'File',
    valid: <Message><File externalId="ext-1"/></Message>,
    invalid: <Message><File externalId={missingString}/></Message>,
    rule: 'required-field',
    subcode: 'external-id-required',
    field: 'externalId',
  },
  {
    name: 'Header',
    component: 'Header',
    valid: <Message><Header text="Hello"/></Message>,
    invalid: <Message><Header text={missingString}/></Message>,
    rule: 'required-field',
    subcode: 'text-required',
    field: 'text',
  },
  {
    name: 'ImageLayout',
    component: 'ImageLayout',
    valid: <Message><ImageLayout url="https://example.com/image.png" alt="Chart"/></Message>,
    invalid: <Message><ImageLayout url={missingString} alt="Chart"/></Message>,
    rule: 'required-field',
    subcode: 'url-required',
    field: 'url',
  },
  {
    name: 'Input',
    component: 'Input',
    valid: <Message><Input label="Name" element={<TextInput actionId="name"/>}/></Message>,
    invalid: <Message><Input label={missingString} element={<TextInput actionId="name"/>}/></Message>,
    rule: 'required-field',
    subcode: 'label-required',
    field: 'label',
  },
  {
    name: 'RichText',
    component: 'RichText',
    valid: <Message><RichText><RichTextSection><RichTextText>Hi</RichTextText></RichTextSection></RichText></Message>,
    invalid: <Message><RichText/></Message>,
    rule: 'required-field',
    subcode: 'elements-required',
    field: 'elements',
  },
  {
    name: 'Section',
    component: 'Section',
    valid: <Message><Section text={<Text>Hello</Text>}/></Message>,
    invalid: <Message><Section/></Message>,
    rule: 'invalid-structure',
    subcode: 'text-or-fields-required',
  },
  {
    name: 'Video',
    component: 'Video',
    valid: <Message><Video title="Demo" videoUrl="https://example.com/video" thumbnailUrl="https://example.com/thumb" altText="Video thumbnail"/></Message>,
    invalid: <Message><Video title={missingString} videoUrl="https://example.com/video" thumbnailUrl="https://example.com/thumb" altText="Video thumbnail"/></Message>,
    rule: 'required-field',
    subcode: 'title-required',
    field: 'title',
  },
  {
    name: 'Button',
    component: 'Button',
    valid: <Message><Actions><Button actionId="approve">Approve</Button></Actions></Message>,
    invalid: <Message><Actions><Button actionId={missingString}>Approve</Button></Actions></Message>,
    rule: 'required-field',
    subcode: 'action-id-required',
    field: 'actionId',
  },
  {
    name: 'Confirmation',
    component: 'Confirmation',
    valid: <Message>
      <Actions>
        <Button
          actionId="delete"
          confirm={<Confirmation title="Confirm" confirm="Delete" deny="Cancel"><Text plainText>Delete it?</Text></Confirmation>}
        >
          Delete
        </Button>
      </Actions>
    </Message>,
    invalid: <Message>
      <Actions>
        <Button
          actionId="delete"
          confirm={<Confirmation title="Confirm" confirm="Delete" deny="Cancel">{missingElement}</Confirmation>}
        >
          Delete
        </Button>
      </Actions>
    </Message>,
    rule: 'required-field',
    subcode: 'text-required',
    field: 'text',
  },
  {
    name: 'Image',
    component: 'Image',
    valid: <Message><Section text={<Text>Hello</Text>} accessory={<Image url="https://example.com/icon.png" alt="Icon"/>}/></Message>,
    invalid: <Message><Section text={<Text>Hello</Text>} accessory={<Image url="https://example.com/icon.png" alt={missingString}/>}/></Message>,
    rule: 'required-field',
    subcode: 'alt-required',
    field: 'alt',
  },
  {
    name: 'Text',
    component: 'Text',
    valid: <Message><Section text={<Text>Hello</Text>}/></Message>,
    invalid: <Message><Section text={<Text>{missingString}</Text>}/></Message>,
    rule: 'required-field',
    subcode: 'text-required',
    field: 'text',
  },
  {
    name: 'Checkboxes',
    component: 'Checkboxes',
    valid: <Message><Input label="Choices" element={<Checkboxes actionId="choices">{option}</Checkboxes>}/></Message>,
    invalid: <Message><Input label="Choices" element={<Checkboxes actionId={missingString}>{option}</Checkboxes>}/></Message>,
    rule: 'required-field',
    subcode: 'action-id-required',
    field: 'actionId',
  },
  {
    name: 'DatePicker',
    component: 'DatePicker',
    valid: <Message><Actions><DatePicker actionId="date"/></Actions></Message>,
    invalid: <Message><Actions><DatePicker actionId={missingString}/></Actions></Message>,
    rule: 'required-field',
    subcode: 'action-id-required',
    field: 'actionId',
  },
  {
    name: 'DateTimePicker',
    component: 'DateTimePicker',
    valid: <Message><Actions><DateTimePicker actionId="date-time"/></Actions></Message>,
    invalid: <Message><Actions><DateTimePicker actionId={missingString}/></Actions></Message>,
    rule: 'required-field',
    subcode: 'action-id-required',
    field: 'actionId',
  },
  {
    name: 'Option',
    component: 'Option',
    valid: <Message><Actions><Overflow actionId="overflow">{option}</Overflow></Actions></Message>,
    invalid: <Message><Actions><Overflow actionId="overflow"><Option value={missingString}>Option 1</Option></Overflow></Actions></Message>,
    rule: 'required-field',
    subcode: 'value-required',
    field: 'value',
  },
  {
    name: 'OptionGroup',
    component: 'OptionGroup',
    valid: <Message><Input label="Grouped" element={<Select placeholder="Choose" actionId="grouped"><OptionGroup label="Group">{option}</OptionGroup></Select>}/></Message>,
    invalid: <Message><Input label="Grouped" element={<Select placeholder="Choose" actionId="grouped"><OptionGroup label={missingString}>{option}</OptionGroup></Select>}/></Message>,
    rule: 'required-field',
    subcode: 'label-required',
    field: 'label',
  },
  {
    name: 'Overflow',
    component: 'Overflow',
    valid: <Message><Actions><Overflow actionId="overflow">{option}</Overflow></Actions></Message>,
    invalid: <Message><Actions><Overflow actionId={missingString}>{option}</Overflow></Actions></Message>,
    rule: 'required-field',
    subcode: 'action-id-required',
    field: 'actionId',
  },
  {
    name: 'RadioGroup',
    component: 'RadioGroup',
    valid: <Message><Input label="Pick one" element={<RadioGroup actionId="radio">{option}</RadioGroup>}/></Message>,
    invalid: <Message><Input label="Pick one" element={<RadioGroup actionId={missingString}>{option}</RadioGroup>}/></Message>,
    rule: 'required-field',
    subcode: 'action-id-required',
    field: 'actionId',
  },
  {
    name: 'Select',
    component: 'Select',
    valid: <Message><Input label="Select" element={<Select placeholder="Choose" actionId="select">{option}</Select>}/></Message>,
    invalid: <Message><Input label="Select" element={<Select placeholder={missingString} actionId="select">{option}</Select>}/></Message>,
    rule: 'required-field',
    subcode: 'placeholder-required',
    field: 'placeholder',
  },
  {
    name: 'TextInput',
    component: 'TextInput',
    valid: <Message><Input label="Name" element={<TextInput actionId="name"/>}/></Message>,
    invalid: <Message><Input label="Name" element={<TextInput actionId={missingString}/>}/></Message>,
    rule: 'required-field',
    subcode: 'action-id-required',
    field: 'actionId',
  },
  {
    name: 'TimePicker',
    component: 'TimePicker',
    valid: <Message><Actions><TimePicker actionId="time"/></Actions></Message>,
    invalid: <Message><Actions><TimePicker actionId={missingString}/></Actions></Message>,
    rule: 'required-field',
    subcode: 'action-id-required',
    field: 'actionId',
  },
];

const captureValidationError = (element: JSX.Element): SlackblockValidationError | undefined => {
  try {
    render(element, {validate: 'strict'});
  } catch (error) {
    if (error instanceof SlackblockValidationError) {
      return error;
    }

    throw error;
  }

  return undefined;
};

describe('supported component validation conformance', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test.each(validationCases)('accepts minimal valid payload for $name', ({valid}) => {
    expect(() => render(valid, {validate: 'strict'})).not.toThrow();
  });

  test.each(validationCases)('normalizes missing required validation for $name', ({
    invalid,
    component,
    field,
    rule,
    subcode,
  }) => {
    const error = captureValidationError(invalid);

    expect(error).toBeInstanceOf(SlackblockValidationError);
    expect(error?.component).toBe(component);
    expect(error?.field).toBe(field);
    expect(error?.rule).toBe(rule);
    expect(error?.subcode).toBe(subcode);
  });

  test.each(validationCases)('warn mode emits a warning for invalid $name payloads', ({invalid}) => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(() => render(invalid, {validate: 'warn'})).not.toThrow();
    expect(warning).toHaveBeenCalledWith(expect.stringContaining('[slackblock]'));
  });

  test.each(validationCases)('off mode ignores invalid $name payloads', ({invalid}) => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(() => render(invalid, {validate: 'off'})).not.toThrow();
    expect(warning).not.toHaveBeenCalled();
  });
});

describe('validation boundary conformance', () => {
  test('enforces max action elements', () => {
    const buttons = Array.from({length: 30}, (_, index) => (
      <Button actionId={`action-${index}`}>{`Action ${index}`}</Button>
    ));

    const error = captureValidationError(<Message>
      <Actions>{buttons}</Actions>
    </Message>);

    expect(error?.component).toBe('Actions');
    expect(error?.rule).toBe('too-many');
    expect(error?.subcode).toBe('too-many-items');
  });

  test('enforces max section fields', () => {
    const fields = Array.from({length: 11}, (_, index) => (
      <Text>{`Field ${index}`}</Text>
    ));

    const error = captureValidationError(<Message>
      <Section text={<Text>Body</Text>}>{fields}</Section>
    </Message>);

    expect(error?.component).toBe('Section');
    expect(error?.rule).toBe('too-many');
    expect(error?.subcode).toBe('too-many-items');
  });

  test('enforces max overflow options', () => {
    const options = Array.from({length: 6}, (_, index) => (
      <Option value={`overflow-${index}`}>{`Overflow ${index}`}</Option>
    ));

    const error = captureValidationError(<Message>
      <Actions>
        <Overflow actionId="overflow">{options}</Overflow>
      </Actions>
    </Message>);

    expect(error?.component).toBe('Overflow');
    expect(error?.rule).toBe('too-many');
    expect(error?.subcode).toBe('too-many-items');
  });

  test('enforces max checkboxes options', () => {
    const options = Array.from({length: 11}, (_, index) => (
      <Option value={`checkbox-${index}`}>{`Checkbox ${index}`}</Option>
    ));

    const error = captureValidationError(<Message>
      <Input label="Choices" element={<Checkboxes actionId="checks">{options}</Checkboxes>}/>
    </Message>);

    expect(error?.component).toBe('Checkboxes');
    expect(error?.rule).toBe('too-many');
    expect(error?.subcode).toBe('too-many-items');
  });

  test('enforces max radio options', () => {
    const options = Array.from({length: 11}, (_, index) => (
      <Option value={`radio-${index}`}>{`Radio ${index}`}</Option>
    ));

    const error = captureValidationError(<Message>
      <Input label="Pick one" element={<RadioGroup actionId="radio">{options}</RadioGroup>}/>
    </Message>);

    expect(error?.component).toBe('RadioGroup');
    expect(error?.rule).toBe('too-many');
    expect(error?.subcode).toBe('too-many-items');
  });

  test('enforces max select options', () => {
    const options = Array.from({length: 101}, (_, index) => (
      <Option value={`select-${index}`}>{`Select ${index}`}</Option>
    ));

    const error = captureValidationError(<Message>
      <Input label="Pick one" element={<Select placeholder="Pick" actionId="select">{options}</Select>}/>
    </Message>);

    expect(error?.component).toBe('Select');
    expect(error?.rule).toBe('too-many');
    expect(error?.subcode).toBe('too-many-items');
  });

  test('enforces max option group options', () => {
    const options = Array.from({length: 101}, (_, index) => (
      <Option value={`group-${index}`}>{`Group ${index}`}</Option>
    ));

    const error = captureValidationError(<Message>
      <Input label="Grouped" element={<Select placeholder="Choose" actionId="grouped"><OptionGroup label="Group">{options}</OptionGroup></Select>}/>
    </Message>);

    expect(error?.component).toBe('OptionGroup');
    expect(error?.rule).toBe('too-many');
    expect(error?.subcode).toBe('too-many-items');
  });

  test('enforces max header length', () => {
    const error = captureValidationError(<Message>
      <Header text={'A'.repeat(151)}/>
    </Message>);

    expect(error?.component).toBe('Header');
    expect(error?.rule).toBe('too-long');
    expect(error?.subcode).toBe('value-too-long');
  });

  test('enforces date format', () => {
    const error = captureValidationError(<Message>
      <Actions>
        <DatePicker actionId="date" initialDate="2026/03/07"/>
      </Actions>
    </Message>);

    expect(error?.component).toBe('DatePicker');
    expect(error?.field).toBe('initialDate');
    expect(error?.rule).toBe('invalid-format');
    expect(error?.subcode).toBe('invalid-date-format');
  });

  test('enforces time format', () => {
    const error = captureValidationError(<Message>
      <Actions>
        <TimePicker actionId="time" initialTime="25:99"/>
      </Actions>
    </Message>);

    expect(error?.component).toBe('TimePicker');
    expect(error?.field).toBe('initialTime');
    expect(error?.rule).toBe('invalid-format');
    expect(error?.subcode).toBe('invalid-time-format');
  });
});
