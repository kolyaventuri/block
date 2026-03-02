
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  children: SingleOrArray<JSX.Element | string>;
};

export default class RichTextSection {
  static slackType = 'RichTextSection';
  declare props: Props;
}
