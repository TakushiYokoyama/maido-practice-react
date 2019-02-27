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
