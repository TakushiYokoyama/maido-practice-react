import { Theme } from './theme';

export type Classes<Style> = Record<keyof Partial<Style>, string>;
export type StyleFactory<T extends object> = (theme: Theme) => T;
export interface StyledProps<TStyles> {
  classes: Record<keyof TStyles, string>;
}
export type StyledComponentType<TStyles, TProps = {}> = React.ComponentType<
  TProps & StyledProps<TStyles>
>;
export interface StylesBase {
  root: any;
}
export interface InjectableStyledProps<TStyles extends StylesBase> {
  className?: string;
  injectClasses?: Record<keyof TStyles, string>;
}
