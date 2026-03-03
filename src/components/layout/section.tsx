
import {type BlockElement} from '../../constants/types';
import {type SingleOrArray} from '../../utils/type-helpers';

type TextElement = JSX.Element;

export type Props = {
  text: JSX.Element;
  blockId?: string;
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- We actually want to handle null children
  children?: SingleOrArray<TextElement | null | undefined | false>;
  accessory?: BlockElement;
};

export default class Section {
  static slackType = 'Section';
  declare props: Props;
}
