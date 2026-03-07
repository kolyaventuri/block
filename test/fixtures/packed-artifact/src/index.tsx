import render, {
  type SlackPostMessagePayload,
  renderToBlocks,
} from 'slackblock';
import {
  Header,
  Message,
  Section,
  Text,
} from 'slackblock/block';

const payload: SlackPostMessagePayload = render(
  <Message text="Fixture fallback">
    <Header text="Fixture header"/>
    <Section text={<Text>Fixture body</Text>}/>
  </Message>,
  {channel: 'C123'},
);

const blocks = renderToBlocks(
  <>
    <Header text="Standalone blocks"/>
    <Section text={<Text>Standalone text</Text>}/>
  </>,
);

void payload;
void blocks;
