import React from 'react';
import { Element } from "../../constants/types";
import { TextProps as TextType } from "./text";
import { transform } from "..";
import {ConfirmationProps} from '../../components/block/confirmation';
import Text from "../../components/block/text";

type Confirmation = {
  title: TextType;
  text: TextType;
  confirm: TextType;
  deny: TextType;
};

export default (child: Element): Confirmation=> {
  const { title, confirm, deny, children }: ConfirmationProps = child.props;

  const res: Confirmation = {
    title: transform(<Text plainText>{title}</Text>) as TextType,
    text: transform(children) as TextType,
    confirm: transform(<Text plainText>{confirm}</Text>) as TextType,
    deny: transform(<Text plainText>{deny}</Text>) as TextType
  };

  return res;
};
