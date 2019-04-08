# Lesson4 style

## はじめに

```sh
npm install
```

## 目標

- スタイルを適用できる
  - style
  - css
  - sass
  - css modules
  - css in js

## Hands On

react でスタイルを適用するには様々な方法がある。

### style を直で書く

HTML の組み込みコンポーネントには props に style が存在するのでそこにオブジェクトを渡す

```tsx
export const Button1: React.SFC<ButtonProps> = props => (
  <button {...props} style={{ color: 'red' }} />
);
```

### css で書く

css を書いて読み込む。読み込んだ css はグローバルなスコープになる。

```css
/*button2.css*/
.button2 {
  color: red;
}
```

```tsx
// 読み込む。読み込まれる場所ならばどこに書いても良い
import './button2.css';

// jsx では class は予約語なのでclassNameを使う
export const Button2: React.SFC<ButtonProps> = props => (
  <button {...props} className="button2" />
);
```

### sass で書く

準備。

```sh
npm i -S node-sass
```

基本的に css とほぼ変わらないが sass の機能が使える

```scss
/*button3.scss*/
.button3 {
  color: red;
}
```

```tsx
// 読み込む。読み込まれる場所ならばどこに書いても良い
import './button3.scss';

export const Button3: React.SFC<ButtonProps> = props => (
  <button {...props} className="button3" />
);
```

### css-modules + sass

css-modules を使うことでファイル単位にスコープ化される
こちらも node-sass が入っていることが前提となる。

```scss
/*button4.module.scss*/
.button4 {
  color: red;
}
```

```tsx
// 名前を指定して読み込む。
import styles from './button4.module.scss';

// ここで補完がきかないのは残念。(補完させる方法もある)
const { button4 } = styles;

// このコンポーネントにはスタイルが適用される
export const Button41: React.SFC<ButtonProps> = props => (
  <button {...props} className={button4} />
);
// Button41と同じクラスが適用される
export const Button42: React.SFC<ButtonProps> = props => (
  <button {...props} className={button4} />
);
// このコンポーネントにはスタイルが適用されない
export const Button43: React.SFC<ButtonProps> = props => (
  <button {...props} className="button4" />
);
```

### css-in-js

js オブジェクトで css を表現するためのライブラリ。  
Component 単位のスコープ化、テーマ注入、プロパティ注入が行える。
css を書く必要がなく全て tpescript で書けるため、tsx ファイル一つでコンポーネントが完結するようになる。  
react は論理的に分割されているがテクノロジーで分割されないコンポーネントを表現するのが目的だからよりそれに近い形になったと言える。

- 準備。

```sh
# @types/react-jssはなんか変だったので使わない
# ./src/@types/react-jss/index.d.tsに定義済み
npm i -S react-jss csstype theming @types/jss
```

```tsx
// 型補完をいい感じにするための便利メソッド
const createStyles = <TStyleKey extends string | number | symbol, TProps = {}>(
  s: Styles<TStyleKey, TProps>,
) => s;
// css の内容を定義
const styles = createStyles({
  // ここにclass名を書く ※メディアクエリや疑似クラスも書ける
  button5: {
    color: 'red',
  },
});
// SFCの場合
const InnerButtonSFC: React.SFC<
  ButtonProps & WithSheet<keyof typeof styles>
> = props => {
  // props.classes.button5 に class 名が生成されるのでclassNameに値を入れる
  const { classes, ...others } = props;
  const { button5 } = classes;
  return <button {...others} className={button5} />;
};
// classの場合
class InnerButtonClass extends React.Component<
  ButtonProps & WithSheet<keyof typeof styles>
> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    // this.props.classes.button5 に class 名が生成されるのでclassNameに値を入れる
    const { classes, ...others } = this.props;
    const { button5 } = classes;
    return <button {...others} className={button5} />;
  }
}
// injectSheet で紐付ける
export const Button51 = injectSheet(styles)(InnerButtonSFC);
export const Button52 = injectSheet(styles)(InnerButtonClass);
```

#### テーマ注入

```tsx
// 型補完をいい感じにするための便利メソッド(テーマ注入用)
const createStylesWithTheme = <
  TStyleKey extends string | number | symbol,
  TProps = {},
  TTheme = {}
>(
  s: StyleCreator<TStyleKey, TTheme, TProps>,
) => s;
interface Theme {
  color: ColorProperty;
}
// テーマを注入する function としてスタイルを定義する
const stylesWithTheme = createStylesWithTheme((t: Theme) => ({
  button5: {
    color: t.color,
  },
}));
// SFCの場合
// ReturnType は戻り値の型を推論する組み込み型
const InnerButtonSFCWithTheme: React.SFC<
  ButtonProps & WithSheet<keyof ReturnType<typeof stylesWithTheme>, Theme>
> = props => {
  // theme は button に引き渡したくないため定義する
  const { classes, theme: t, ...others } = props;
  const { button5 } = classes;
  return <button {...others} className={button5} />;
};
// classの場合
class InnerButtonClassWithTheme extends React.Component<
  ButtonProps & WithSheet<keyof ReturnType<typeof stylesWithTheme>, Theme>
> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    const { classes, theme: t, ...others } = this.props;
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
// theme を定義
const theme: Theme = { color: 'red' };
// ThemeProviderにテーマを渡すとその子コンポーネントで injectSheetされたとき themeが注入される
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
```

#### プロパティ注入

```tsx
// プロパティを定義
interface Props {
  color: ColorProperty;
}
// style を定義
const stylesWithProps = createStyles({
  // class毎に Propsを渡せるようになる
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
  <StyledButtonSFCWithProps color="red" {...props} />
);
export const Button56: React.SFC<ButtonProps> = props => (
  <StyledButtonClassWithProps color="red" {...props} />
);
```

### 各種法毎にボタンを押したら色を変えたい

**Challenge!!**
