
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  children: SingleOrArray<JSX.Element | string>;
};

export default class RichTextQuote {
  static slackType = 'RichTextQuote';
  declare props: Props;
}
