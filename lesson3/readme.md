# Lesson3 routing

## はじめに

```sh
npm init
```

## 目標

- react-router で クライアント側で ルーティング できる

## 解説

### client side routing

SPA 最大のメリットの一つ。  
ページ移動をサーバーへの問い合わせびよる HTML の発行でなく、クライアント側による DOM の書き換えによって表現する。

- サーバーへ問い合わせないのでレスポンスが早い
- 最小限の領域のみ DOM を書き換えるので UX が向上する
- ページ移動しないので状態を保持できる
- 擬似的に URL の書き換えを行うのでブックマークなどの既存機能と共存できる

### react-router

react で client side routing をするためのライブラリ。以下の 3 種類が存在する。

- react-router  
  routing のためのコアロジックを実装したライブラリ。
- react-router-dom  
  web 上での routing を行うためのライブラリ。
- react-router-native  
  react-native アプリでの routing を行うためのライブラリ。

実際にインストールする必要があるのは`react-router-dom` か `react-router-native` のいずれか片方のみになる。

## Hands On

### インストール

```sh
npm i -S react-router-dom query-string @types/react-router-dom @types/query-string
```

### Router を有効にする範囲を定義するために BrowserRouter を実装する

BrowserRouter コンポーネントの children 要素がルーターの有効範囲になる  
今回は全コンポーネントを有効範囲としたいので App の直下に実装する

```tsx
// app.tsx
// BrowserRouter の直下にはコンポーネントを一つしか配置できないため、React.Fragmentを実装する
// React.Fragmentは実際には何もレンダリングされない組み込みのコンポーネント
const App: React.SFC = props => (
  <BrowserRouter>
    <React.Fragment>
      <AppHeader />
      <AppBody />
    </React.Fragment>
  </BrowserRouter>
);
```

### Routing によって切り替えたい場所に、Route コンポーネントを実装する

```tsx
// app-body.tsx
export const AppBody: React.SFC = props => (
  <div className="body">
    <Route path="/contact" component={Contact} />
    <Route path="/about" component={About} />
    <Route path="/" component={Root} />
  </div>
);
```

### Component を排他的に表示したい

- exact を使う

```tsx
<Route exact={true} path="/" component={Root} />
```

- Switch を使う

```tsx
export const AppBody: React.SFC = props => (
  <div className="body">
    <Switch>
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/" component={Root} />
    </Switch>
  </div>
);
```

### クライアント側で DOM を切り替える

a タグや window.location.href を使うとサーバーに問い合わせされてしまうので URL 切替時の実装も変更する必要がある

- a タグの代替実装  
  Link コンポーネントを使う

```tsx
<Link to="/">Application</Link>
```

- window.location.href の代替実装  
  withRouter を使う

```tsx
// app-header.tsx
// withRouterの引数としてこれまでのコンポーネントを与える
export const AppHeader = withRouter(props => {
  // props に historyが注入される
  const { history } = props;
  // history.push でURLが変わる
  const handleClick = () => history.push('/contact');
  return (
    <div className="header">
      <div className="left">
        <Link to="/">Application</Link>
      </div>
      <div className="right">
        <Link className="btn" to="/about">
          About
        </Link>
        <button className="btn" onClick={handleClick}>
          Contact
        </button>
      </div>
    </div>
  );
});
```

### パラメータを取得する

- URL を修正する

```tsx
// app-header.tsx
const handleClick = () => history.push('/contact/1?state=open');
```

- Route コンポーネントで監視する URL を変更する

```tsx
// app-body.tsx
<Route path="/contact/:id" component={Contact} />
```

- パラメータを受け取る

```tsx
// contact.tsx

// パラメータ用のインターフェースを定義
interface Params {
  id: string;
}
// クエリストリング用のインターフェースを定義
// OutputParamsを継承する必要がある(query-string の parse メソッドのindex.d.tsがいけてないため)
interface Query extends OutputParams {
  state: string;
}
// withRouterを使う
export const Contact = withRouter<RouteComponentProps<Params>>(props => {
  const { match, location } = props;
  // params を取得
  const { id } = match.params;
  // query-string を取得
  const { state } = parse(location.search ? location.search.substring(1) : '') as Query;
  return (
    <div>
      <p>contact</p>
      <p>id={id}</p>
      <p>state={state}</p>
    </div>
  );
});
```

### 入れ子のルーティングを作る

**Challenge!!**
