import {SlackComponent} from '../base';
import {type InteractiveBlockElement} from '../../constants/types';

export type Props = {
  children: InteractiveBlockElement | InteractiveBlockElement[];
  blockId?: string;
};

/**
 * An actions block — displays interactive elements in a horizontal row.
 *
 * Accepts up to 25 interactive elements as children: `<Button>`, `<Select>`,
 * `<Overflow>`, `<DatePicker>`, `<TimePicker>`, `<DateTimePicker>`.
 *
 * @example
 * ```tsx
 * <Actions>
 *   <Button actionId="approve" style="primary">Approve</Button>
 *   <Button actionId="deny" style="danger">Deny</Button>
 * </Actions>
 * ```
 */
export default class Actions extends SlackComponent {
  static slackType = 'Actions';
  declare props: Props;
}
