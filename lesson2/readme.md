# Lesson2 Component

## はじめに

```sh
npm install
```

## 目標

- react で Component を作成できる
  - props,state を知る
  - FunctionComponent,class Component,React Hooks で Component を作成できる

## 解説

### Component?

コンポーネントとは、単独で成立するような構成要素のことを指す。  
react では HTML タグ(div とか span とか input とか)と、ロジック、スタイルを組み合わせてコンポーネントを作ることができる。  
作成したコンポーネントは他のコンポーネントから HTML タグのように呼び出すことができる。  
コンポーネントは props と state を持つことができる。

### props? state?

- props
  - Component の外側から渡ってくる値
  - 読み取り専用
  - public get only property
  - HTML タグの属性のように使うことができる
- state
  - Component 内部に保持する状態
  - 変更可能
  - Component の外側からは直接アクセスできない
  - private member variable

Q. Component の外側から state にアクセスできないなら、外側から state の変更をどうやって検知するのか?  
A. Handler を props として渡して、state が変更されたときに Handler を実行する

### FunctionComponent, class Component, React Hooks

- FunctionComponent
  - props を引数として レンダリングを行う純粋な関数
  - state を持たない
  - 軽量
- class Component
  - React.Component を継承した class として定義できる Component
  - state を持つ
  - pops,state が変更されたときに再レンダリングされる
  - Lifecycle フックを持つ
    - https://qiita.com/f-a24/items/40b83d4c6c7d147cda9e
- React hooks
  - FunctionComponent に classComponent 的な振る舞いを持たす記法
  - v16.8 から正式採用

Q.書き分けどうするの?
A.基本 FunctionComponent で書く。hook を使っても無理な場合 class に書き換える

## Hands On

### props の値によって表示色が変わる paragraph (p タグ) を作る

- props の型を定義

```ts
//props は interface として定義する
interface ColoredParagraphProps {
  // ColorProperty は css の color に入るべき文字列の型
  color: ColorProperty;
}
```

- FunctionComponent で実装

```tsx
// React.FunctionComponentとして定義する。ジェネリック型なのでpropsの型を指定する
// Componentは必ず *PascalCase* にする必要がある(でないとComponentとして認識されない)
const ColoredParagraph1: React.FunctionComponent<
  ColoredParagraphProps
> = props => {
  // 親Component の Inner HTML が格納される children というプロパティは自動的に付与される
  const { color, children } = props;
  // {}と書くと中にtypescriptを書ける
  return <p style={{ color }}>{children}</p>;
};
```

- class で実装

```tsx
// React.Componentとして定義する。ジェネリック型なのでpropsの型を指定する
class ColoredParagraph2 extends React.Component<ColoredParagraphProps> {
  constructor(props: any) {
    // super にセットすると this.propsに props が設定される
    super(props);
  }
  public render() {
    const { color, children } = this.props;
    return <p style={{ color }}>{children}</p>;
  }
}
```

#### app.tsx 内から呼び出してみる

```tsx
class App extends Component {
  public render() {
    return (
      <div className="App">
        <ColoredParagraph1 color="red">red</ColoredParagraph1>
        <ColoredParagraph2 color="blue">blue</ColoredParagraph2>
      </div>
    );
  }
}
```

### Counter Component を作る

- counter.tsx を追加する
- import を追加

```tsx
import React from 'react';
```

- props,state を定義

```tsx
// propertyはとりあえず空で作る
interface CounterProps {}
interface CounterState {
  count: number;
}
```

- FunctionComponent で実装

```tsx
export const Counter1: React.FunctionComponent<CounterProps> = props => {
  // useStateで state とstateを変更するメソッド(setState)が生成される。名前は任意。
  const [state, setState] = React.useState<CounterState>({ count: 0 });
  const { count } = state;
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setState({ count: count + 1 })}>+</button>
    </div>
  );
};
```

- class で実装

```tsx
export class Counter2 extends React.Component<CounterProps, CounterState> {
  constructor(props: any) {
    super(props);
    // state を初期化する
    this.state = { count: 0 };
  }
  public render() {
    const { count } = this.state;
    return (
      <div>
        <p>{count}</p>
        <button onClick={() => this.setState({ count: count + 1 })}>+</button>
      </div>
    );
  }
}
```

#### app.tsx 内から呼び出してみる

**Challenge!!**

#### Counter の初期値を app.tsx から設定する

**Challenge!!**

### if や for を試す

tsx 内では{}内部に typescript 書け、その戻り値がそのまま表示される。  
それを利用すると if や for が書ける

- 表示の切り替え

```tsx
const Component: React.FunctionComponent = props => {
  const x = true;
  return (
    <div>
      {x && <p>表示される</p>}
      {!x && <p>表示されない</p>}
      {x ? <p>表示される</p> : <p>表示されない</p>}
      {(() => {
        if (x) {
          return <p>表示される</p>;
        }
        return <p>表示されない</p>;
      })()}
    </div>
  );
};
```

- 繰り返し

```tsx
const Component: React.FunctionComponent = props => {
  const array = [0, 1, 2, 3, 4, 5];
  return (
    <div>
      {array.map(x => (
        <p>{x}</p>
      ))}
    </div>
  );
};
```

#### Counter で count が偶数 の場合赤表示しない

**Challenge!!**

#### Counter でボタンを押した数だけ ★ を表示する

**Challenge!!**

### 非同期で初期化する

- Api サーバの mock を起動する  
  service.ts の getStep メソッドで非同期に step を取得できる

```sh
npm run mock
```

- FunctionComponent で実装  
  useEffect を使う

```tsx
// 初期化したい対象をstateとして扱う
const [step, setStep] = React.useState<number | undefined>(undefined);
// useEffect 内の関数は直接asyncできないので外で定義する
const asyncFunc = async () => {
  setStep(await getStep());
};
// trigger には空の配列を指定する
React.useEffect(() => {
  asyncFunc();
}, []);
```

- class で実装

```tsx
// Lifecycleを使う
public async componentDidMount() {
  const step = await getStep();
  this.setState({ step });
}
```

### Form を作る

**Challenge!!**

- hint

```tsx
// hook の場合の input の値変更したときの handleChange
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.currentTarget;
  setState({ ...state, [name]: value });
};
// class の場合の input の値変更したときの handleChange
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.currentTarget;
  this.setState({ [name]: value });
};
```
