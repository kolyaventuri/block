import React from 'react';
import { Element } from "../../constants/types";

import {ButtonProps} from '../../components/block/button';
import { TextProps as TextType } from "./text";
import { ConfirmationType } from "./confirmation";
import { transform } from "..";
import Text from "../../components/block/text";
import Confirmation from '../../components/block/confirmation';

type Button = {
  type: 'button';
  text: TextType;
  actionId: string;
  url?: string;
  value?: string;
  style?: 'primary' | 'danger';
  confirm?: ConfirmationType;
};

export default (child: Element): Button => {
  const {actionId, children, url, value, style, confirm}: ButtonProps = child.props;

  const res: Button = {
    type: 'button',
    text: transform(<Text plainText>{children}</Text>) as TextType,
    actionId
  };

  if (url) {
    res.url = url;
  }

  if (value) {
    res.value = value;
  }

  if (style) {
    res.style = style;
  }

  if (confirm) {
    res.confirm = transform(confirm) as ConfirmationType;
  }

  return res;
};
