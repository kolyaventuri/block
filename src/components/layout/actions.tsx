
import {type InteractiveBlockElement} from '../../constants/types';

export type Props = {
  children: InteractiveBlockElement | InteractiveBlockElement[];
  blockId?: string;
};

export default class Actions {
  static slackType = 'Actions';
  declare props: Props;
}
