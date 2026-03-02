
import type Text from '../block/text';
import type Image from '../block/image';

export type ImageOrText = JSX.Element;

export type Props = {
  children: ImageOrText | ImageOrText[];
  blockId?: string;
};

export default class Context {
  static slackType = 'Context';
  declare props: Props;
}
