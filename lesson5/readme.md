# Lesson5 store

## はじめに

```sh
npm init
```

## 目標

- redux で store 管理できる

## 解説

### store 管理とは

ここでいう store とは、アプリケーション内部で扱うステート(巨大な json みたいなイメージ)を扱うオブジェクトのことを指す。
つまり store 管理とはそのアプリケーションで扱うデータの管理についてを指す。
FRP である Flux アーキテクチャで実装するのがはやり。

#### FRP? Flux?

FRP は Functional reactive programming のこと。
Flux は facebook が提唱する FRP でデータストアを扱うためのアーキテクチャ

- facebook より  
  ![Flux データフロー](https://github.com/facebook/flux/raw/master/examples/flux-concepts/flux-simple-f8-diagram-with-client-action-1300w.png)

#### メリット

- 各 Component 間でのデータ共有がしやすい  
  Component 間の state のバケツリレーを減らせる
- Component をステートレスに実装できる  
  責務分離できる
- データフローが一方通行になるので見通しが良くなる
- ロジックの種類によって定義する場所、命名が決まってくる
- プラグインによって AOP 的な実装ができる

#### ライブラリ

- Flux  
  facebook 公式。
- Redux  
  react で併用することが多い。今回扱う。
- MobX  
  Redux より簡易に実装できる
- Undux  
  MobX よりさらに簡易に実装できる
- Vuex  
  Vue 公式。vue で store 管理するときに使う。

##### 用語集

- State  
  store が管理する Component の状態。
- Dispatch  
  Actions を実行するための命令。
- Actions  
  データ整形や API 問い合わせ、ビジネスロジックとかを記述する。
  key-value を指定して Mutations を実行する。
- Commit  
  key-value(type-payload)をもった Mutations の実行命令。
- Mutations  
  State を変更することができるオブジェクト。type=メソッド,payload=引数のイメージ。  
  非同期処理は実装できない。

## Hands On

準備

```sh
npm i -S react-redux @types/react-redux typescript-fsa typescript-fsa-reducers
```

### store 側の準備

#### state を定義する

管理したい値の型を定義する

```ts
// ./src/stores/account/state.ts
export interface AccountState {
  authenticated: boolean;
}
export default AccountState;
```

#### action を定義する

action は state を変更するための名前(何をするか)と payload(値)の組み合わせのパターン

```ts
// ./src/stores/account/actions.ts
export interface Actions {
  // ここで定義する型がpayloadの型となる。ここでは空のオブジェクトとして定義しておく
  login: {};
  logout: {};
}
export default Actions;
```

#### action-creator を定義する

action を生成するオブジェクトを定義する。  
ビュー側では action-creator で作った action を dispatch(送信) することで state を変更する。

```ts
// ./src/stores/account/index.ts
import { actionCreatorFactory, ActionCreator } from 'typescript-fsa';
import Actions from './actions';

// namespaceを指定して、actionCreatorの factoryメソッドを生成する
const factory = actionCreatorFactory('account');
// このactionCreatorsの型。actionと同じメンバを持っていて、そのメンバの型はactionのメンバの型と紐付いていることを示している
type AccountActionCreators = {
  [K in keyof Actions]: ActionCreator<Actions[K]>
};
// 実体を宣言する
export const accountActionCreators: AccountActionCreators = {
  // payloadの型とアクション名を引き渡す。実際の動作は`${namespace}.${actionName}`と紐づくのでかぶらないように注意する
  login: factory<{}>('login'),
  logout: factory<{}>('logout'),
};
```

#### functions を定義する

action を受け取ったときに state を変更するロジックを定義する

```ts
// ./src/stores/account/functions.ts
import State from './state';
import Actions from './actions';

// このfunctionsの型。actionと同じメンバを持っていて、そのメンバの型はactionのメンバの型と紐付いていることを示している
type Functions = {
  [TKey in keyof Actions]: (state: State, payload: Actions[TKey]) => State
};
export const functions: Functions = {
  login: (state, payload) => {
    // 必ず新しいstateを返す
    return { ...state, authenticated: true };
  },
  logout: (state, payload) => {
    return { ...state, authenticated: false };
  },
};
export default functions;
```

#### reducerBuilder を定義する

reducer は action と state, function をつなぎ合わせるオブジェクト。
action に対してどの function を発火させるか、どの state を更新させるかを定義する

```ts
// ./src/stores/account/index.ts
export const accountsReducerBuilder = (state: State) =>
  reducerWithInitialState(state)
    .case(accountsActionCreators.login, functions.login)
    .case(accountsActionCreators.logout, functions.logout);
```

#### store を定義する

```ts
// ./src/stores/store.ts
// ストアで管理する全てのstateのインターフェース
export interface StoredState {
  accounts: AccountsState;
}
type ReducerBuilders = (
  state: StoredState,
) => {
  [P in keyof StoredState]: ReducerBuilder<StoredState[P], StoredState[P]>
};
const builders: ReducerBuilders = (state: StoredState) => ({
  accounts: accountsReducerBuilder(state.accounts),
});
// store を生成するメソッド
export const createAppStore = (initialState: StoredState) => {
  const reducers = builders(initialState);
  const combinedReducers = combineReducers(reducers);
  return createStore(combinedReducers);
};
```

### component 側の準備

store 管理するスコープを定義する

```tsx
// ./src/web/app.tsx
// 初期値からstoreを生成する
const store = createAppStore({
  accounts: { authenticated: false },
});

export const App: React.SFC = props => {
  const [authenticated, setAuthenticated] = React.useState(false);
  // Providerで囲った範囲がstore管理のスコープになる
  return (
    <Provider store={store}>
      <AppHeader
        authenticated={authenticated}
        onLogout={() => setAuthenticated(false)}
      />
      <AppBody
        authenticated={authenticated}
        onLogin={() => setAuthenticated(true)}
      />
    </Provider>
  );
};
```

### Component と Store を 結合する

`./src/web/app-header.tsx`を例に結合してみる

#### Props を Events と分割する

state や、外部から注入する値を Props に残し、state を変更するためのイベントを Events に移す

```ts
interface Props {
  authenticated: boolean;
}
interface Events {
  onLogout: () => void;
}
export const AppHeader: React.SFC<Props & Events> = ({
  authenticated,
  onLogout,
}) => {
  return (
    <div className="header">
      <div className="left">
        <a href="/">Application</a>
      </div>
      <div className="right">
        {authenticated && (
          <button className="btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
```

#### mapStateToProps を定義する

mapStateToProps は state から値を取り出し、Props に注入するためのロジック

```tsx
// MapStateToPropsParam型の第2引数は外部に propsとして開放する型を指定する
const mapStateToProps: MapStateToPropsParam<Props, {}, StoredState> = ({
  accounts,
}) => {
  const { authenticated } = accounts;
  return { authenticated };
};
```

#### mapDispatchToProps を定義する

mapDispatchToProps は state への変更を行うロジックを Events に注入するためのロジック

```tsx
// MapDispatchToPropsParam型の第2引数は外部に propsとして開放する型を指定する
const mapDispatchToProps: MapDispatchToPropsParam<Events, {}> = dispatch => ({
  onLogout: () => {
    dispatch(accountsActionCreators.logout({}));
  },
});
```

#### connect

```　tsx
// 名前を変える
const InnerAppHeader: React.SFC<Props & Events> = ({
  authenticated,
  onLogout,
}) => {
  return (
    <div className="header">
      <div className="left">
        <a href="/">Application</a>
      </div>
      <div className="right">
        {authenticated && (
          <button className="btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
// connectしたものを公開する
export const AppHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InnerAppHeader);
```

#### Login コンポーネントをストアと結合する

**Challenge!!**

#### AppBody コンポーネントをストアと結合する

**Challenge!!**
