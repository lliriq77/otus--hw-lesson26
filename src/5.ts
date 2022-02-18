import * as React from "react";

type FIXME = React.ComponentType extends {
  defaultProps?: infer P;
}
  ? P | undefined
  : never;

// Hint: infer
export const getDefaultProps = (component: React.ComponentType): FIXME =>
  component.defaultProps;
