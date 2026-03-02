
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  children: SingleOrArray<JSX.Element | string>;
};

export default class RichTextPreformatted {
  static slackType = 'RichTextPreformatted';
  declare props: Props;
}
