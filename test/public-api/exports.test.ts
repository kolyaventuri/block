import {expect, test} from 'vitest';

import render, {
  SlackblockValidationError,
  blockKitBuilderUrl,
  escapeMrkdwn,
  renderToBlocks,
  renderToMessage,
  type ValidationReporter,
} from '../../src';
import * as block from '../../src/block';
import * as jsxDevRuntime from '../../src/jsx-dev-runtime';
import * as jsxRuntime from '../../src/jsx-runtime';

test('root entrypoint exports renderer and helpers', () => {
  expect(render).toBeTypeOf('function');
  expect(renderToMessage).toBe(render);
  expect(renderToBlocks).toBeTypeOf('function');
  expect(escapeMrkdwn).toBeTypeOf('function');
  expect(blockKitBuilderUrl).toBeTypeOf('function');
  expect(SlackblockValidationError).toBeTypeOf('function');
});

test('root entrypoint exports validation reporter type compatibility', () => {
  const reporter: ValidationReporter = issue => {
    expect(issue.rule).toBeTypeOf('string');
  };

  expect(reporter).toBeTypeOf('function');
});

test('block entrypoint exports the public component barrel', () => {
  expect(block.Message.slackType).toBe('Message');
  expect(block.Actions.slackType).toBe('Actions');
  expect(block.Button.slackType).toBe('Button');
  expect(block.Container.slackType).toBe('Container');
  expect(block.Header.slackType).toBe('Header');
  expect(block.Input.slackType).toBe('Input');
  expect(block.Section.slackType).toBe('Section');
  expect(block.Text.slackType).toBe('Text');
});

test('jsx-runtime exports the automatic runtime helpers', () => {
  const element = jsxRuntime.jsxs(block.Message, {
    text: 'Fallback',
    children: [
      jsxRuntime.jsx(block.Header, {text: 'Packed artifact'}),
      jsxRuntime.jsx(block.Section, {
        text: jsxRuntime.jsx(block.Text, {children: 'Hello'}),
      }),
    ],
  });

  expect(jsxRuntime.jsx).toBeTypeOf('function');
  expect(jsxRuntime.jsxs).toBeTypeOf('function');
  expect(jsxRuntime.Fragment).toBe('fragment');
  expect(element.type).toBe(block.Message);
  expect(element.children).toHaveLength(2);
});

test('jsx-dev-runtime re-exports jsxDEV and Fragment', () => {
  const element = jsxDevRuntime.jsxDEV(block.Header, {text: 'Hello'});

  expect(jsxDevRuntime.jsxDEV).toBe(jsxRuntime.jsx);
  expect(jsxDevRuntime.Fragment).toBe(jsxRuntime.Fragment);
  expect(element.type).toBe(block.Header);
});
