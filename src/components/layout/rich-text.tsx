
import {type SingleOrArray} from '../../utils/type-helpers';

export type RichTextElement = Record<string, any>;

export type Props = {
  elements?: RichTextElement[];
  children?: SingleOrArray<JSX.Element | string>;
  blockId?: string;
};

export default class RichText {
  static slackType = 'RichText';
  declare props: Props;
}
