
type TopProperties = {
  children: string;
  actionId: string;
  url?: string;
  value?: string;
  style?: 'primary' | 'danger';
  accessibilityLabel?: string;
};

export type ButtonProps = TopProperties & {
  confirm?: JSX.Element;
};

type Properties = ButtonProps;

/**
 * A button element — clickable button used in `<Actions>` blocks or as a
 * `<Section>` accessory.
 *
 * @example
 * ```tsx
 * <Button actionId="submit" style="primary" value="yes">Submit</Button>
 * <Button actionId="delete" style="danger" confirm={confirmDialog}>Delete</Button>
 * <Button actionId="docs" url="https://example.com">View docs</Button>
 * ```
 */
export default class Button {
  static slackType = 'Button';
  declare props: Properties;
}
