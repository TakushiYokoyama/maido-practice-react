# Lesson3 Routing

## はじめに

```sh
npm init
```

## 目標

- スタイルを適用できる

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
npm i -S react-jss csstype theming @types/jss
```

```tsx
```
