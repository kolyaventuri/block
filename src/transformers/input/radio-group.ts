import {Element} from '../../constants/types';

export type RadioGroupType = {
  type: 'radio_buttons';
};

export default (child: Element): RadioGroupType => {
  const res: RadioGroupType = {
    type: 'radio_buttons'
  };

  return res;
};
