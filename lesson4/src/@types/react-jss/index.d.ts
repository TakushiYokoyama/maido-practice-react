declare module 'react-jss' {
  import * as CSS from 'csstype';
  import { createGenerateClassName, JSS, SheetsRegistry } from 'jss';
  import * as React from 'react';
  import { createTheming, ThemeProvider, withTheme } from 'theming';
  /**
   * omit from T every key K
   *
   * @internal
   */
  export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
  /**
   * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
   * `U`, their value types do not conflict.
   *
   * @internal
   */
  export type ConsistentWith<DecorationTargetProps, InjectedProps> = {
    [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
      ? InjectedProps[P] extends DecorationTargetProps[P]
        ? DecorationTargetProps[P]
        : InjectedProps[P]
      : DecorationTargetProps[P]
  };

  /**
   * Like `T & U`, but using the value types from `U` where their properties overlap.
   *
   * @internal
   */
  export type Overwrite<T, U> = Omit<T, keyof U> & U;

  /**
   * @internal
   */
  export type PropsOf<C> = C extends new (props: infer P) => React.Component
    ? P
    : C extends (props: infer P) => React.ReactElement | null
    ? P
    : never;

  /**
   * a function that takes {component} and returns a component that passes along
   * all the props to {component} except the {InjectedProps} and will accept
   * additional {AdditionalProps}
   *
   * source mui-org/material-ui#12673
   * @internal
   */
  export type PropInjector<InjectedProps, AdditionalProps = {}> = (
    component: React.ComponentType<InjectedProps & AdditionalProps>,
  ) => React.ComponentType<AdditionalProps>;

  export interface CSSProperties<Props = {}>
    extends CSS.Properties<number | string> {
    // Allow pseudo selectors and media queries
    [k: string]:
      | (CSS.Properties<number | string>[keyof CSS.Properties])
      | CSSProperties<Props>;
  }

  export type Styles<
    ClassKey extends string | number | symbol = string,
    Props = {}
  > = Record<
    ClassKey,
    CSSProperties<Props> | ((props: Props) => CSSProperties<Props>)
  >;
  export type StyleCreator<
    C extends string | number | symbol = string,
    T extends {} = {},
    Props = {}
  > = (theme: T) => Styles<C, Props>;

  export interface Theming {
    channel: string;
    createTheming: typeof createTheming;
    ThemeProvider: typeof ThemeProvider;
    withTheme: typeof withTheme;
  }
  export interface InjectOptions extends CreateStyleSheetOptions {
    jss?: JSS;
    theming?: Theming;
  }

  export type ClassNameMap<C extends string | number | symbol> = Record<
    C,
    string
  >;
  export type WithSheet<
    S extends string | number | symbol,
    GivenTheme = {},
    Props = {}
  > = {
    classes: ClassNameMap<S>;
  } & WithTheme<S extends StyleCreator<keyof S, infer T> ? T : GivenTheme>;

  export interface WithTheme<T> {
    theme: T;
    innerRef?: React.Ref<any> | React.RefObject<any>;
  }

  export interface StyledComponentProps<
    ClassKey extends string | number | symbol
  > {
    classes?: Partial<ClassNameMap<ClassKey>>;
    innerRef?: React.Ref<any> | React.RefObject<any>;
  }
  export default function injectSheet<
    TStyleKey extends string | number | symbol,
    T extends object = {},
    Props = {}
  >(
    stylesOrCreator:
      | Styles<TStyleKey, Props>
      | StyleCreator<TStyleKey, T, Props>,
    options?: InjectOptions,
  ): PropInjector<
    WithSheet<TStyleKey, T, Props> & StyledComponentProps<TStyleKey>,
    Props
  >;
  export { JssProviderProps };
  // library implementations
  export const jss: JSS;
  export {
    createGenerateClassName,
    createTheming,
    JssProvider,
    SheetsRegistry,
    ThemeProvider,
    withTheme,
  };
  export default injectSheet;
}
