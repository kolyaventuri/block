import {SlackComponent} from '../base';
import {type TextElement} from '../../constants/types';

type TopProperties = {
  title: string;
  confirm: string;
  deny: string;
};

/* This is a dumb workaround to merging props */
export type ConfirmationProps = TopProperties & {
  children: TextElement;
};

type Properties = ConfirmationProps;

/**
 * A confirmation dialog — shown before an interactive action is triggered.
 *
 * Pass a `<Confirmation>` element to the `confirm` prop of interactive
 * elements such as `<Button>`, `<Select>`, `<Overflow>`, etc.
 *
 * @example
 * ```tsx
 * const dialog = (
 *   <Confirmation title="Are you sure?" confirm="Yes, delete" deny="Cancel">
 *     <Text plainText>This action cannot be undone.</Text>
 *   </Confirmation>
 * );
 *
 * <Button actionId="delete" confirm={dialog} style="danger">Delete</Button>
 * ```
 */
export default class Confirmation extends SlackComponent {
  static slackType = 'Confirmation';
  declare props: Properties;
}
