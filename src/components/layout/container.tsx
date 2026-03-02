
import {type SingleOrArray} from '../../utils/type-helpers';
import {type Child} from '../../constants/types';

export type Props = {
  children: SingleOrArray<Child>;
};

export default class Container {
  static slackType = 'Container';
  declare props: Props;
}
