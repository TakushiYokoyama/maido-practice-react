import * as React from 'react';
import injectSheet, {
  WithSheet,
  Styles,
  StyleCreator,
  ThemeProvider,
} from 'react-jss';
import { ButtonProps } from './common';
import { ColorProperty } from 'csstype';

const createStyles = <TStyleKey extends string | number | symbol, TProps = {}>(
  s: Styles<TStyleKey, TProps>,
) => s;
const createStylesWithTheme = <
  TStyleKey extends string | number | symbol,
  TProps = {},
  TTheme = {}
>(
  s: StyleCreator<TStyleKey, TTheme, TProps>,
) => s;

const styles = createStyles({
  button5: {
    color: 'red',
  },
});
const InnerButtonSFC: React.SFC<
  ButtonProps & WithSheet<keyof typeof styles>
> = props => {
  const { classes, ...others } = props;
  const { button5 } = classes;
  return <button {...others} className={button5} />;
};
class InnerButtonClass extends React.Component<
  ButtonProps & WithSheet<keyof typeof styles>
> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    const { classes, ...others } = this.props;
    const { button5 } = classes;
    return <button {...others} className={button5} />;
  }
}
export const Button51 = injectSheet(styles)(InnerButtonSFC);
export const Button52 = injectSheet(styles)(InnerButtonClass);
interface Theme {
  color: ColorProperty;
}
const stylesWithTheme = createStylesWithTheme((t: Theme) => ({
  button5: {
    color: t.color,
  },
}));
const InnerButtonSFCWithTheme: React.SFC<
  ButtonProps & WithSheet<keyof ReturnType<typeof stylesWithTheme>, Theme>
> = props => {
  const { classes, ...others } = props;
  const { button5 } = classes;
  return <button {...others} className={button5} />;
};
class InnerButtonClassWithTheme extends React.Component<
  ButtonProps & WithSheet<keyof ReturnType<typeof stylesWithTheme>, Theme>
> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    const { classes, ...others } = this.props;
    const { button5 } = classes;
    return <button {...others} className={button5} />;
  }
}
const StyledButtonSFCWithTheme = injectSheet(stylesWithTheme)(
  InnerButtonSFCWithTheme,
);
const StyledButtonClassWithTheme = injectSheet(stylesWithTheme)(
  InnerButtonClassWithTheme,
);
const theme: Theme = { color: 'red' };
export const Button53: React.SFC<ButtonProps> = props => (
  <ThemeProvider theme={theme}>
    <StyledButtonSFCWithTheme {...props} />
  </ThemeProvider>
);
export const Button54: React.SFC<ButtonProps> = props => (
  <ThemeProvider theme={theme}>
    <StyledButtonClassWithTheme {...props} />
  </ThemeProvider>
);

interface Props {
  color: ColorProperty;
}
const stylesWithProps = createStyles({
  button5: (p: Props) => ({
    color: p.color,
  }),
});
const InnerButtonSFCWithProps: React.SFC<
  Props & ButtonProps & WithSheet<keyof typeof stylesWithProps, {}, Props>
> = props => {
  const { classes, color, ...others } = props;
  const { button5 } = classes;
  return <button {...others} className={button5} />;
};
class InnerButtonClassWithProps extends React.Component<
  Props & ButtonProps & WithSheet<keyof typeof stylesWithProps, {}, Props>
> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    const { classes, color, ...others } = this.props;
    const { button5 } = classes;
    return <button {...others} className={button5} />;
  }
}
const StyledButtonSFCWithProps = injectSheet(stylesWithProps)(
  InnerButtonSFCWithProps,
);
const StyledButtonClassWithProps = injectSheet(stylesWithProps)(
  InnerButtonClassWithProps,
);
export const Button55: React.SFC<ButtonProps> = props => (
  <StyledButtonSFCWithProps {...props} color="red" />
);
export const Button56: React.SFC<ButtonProps> = props => (
  <StyledButtonClassWithProps {...props} color="red" />
);
