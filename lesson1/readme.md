# Lesson1 Hello World

## 目標

- react Web アプリを Typescript で作成できる
  - 実行できる
  - ビルドができる
    - Firebase にデプロイできる
  - テストができる
    - CI でもテストができる
  - Progressive Web Apps を作成できる
  - CI でテストとデプロイができる

## Hands On

### Web アプリの作成〜実行

- create-react-app で 作る
  - create-react-app とは?  
    react のプロジェクトを 1 から作るとしんどいんで雛形を作ってくれる公式のツール
- create-react-app で 実際にプロジェクトを作ってみる

```sh
npm i -g create-react-app
create-react-app react-hands-on-lesson1 --typescript
```

or

```sh
npx create-react-app react-hands-on-lesson1 --typescript
```

- 実行してみる

```sh
cd react-hands-on-lesson1
npm start
```

### tslint をインストール

```sh
npm i -D tslint tslint-config-prettier tslint-react
```

```json
// tslint.json
{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
  "rules": {},
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "dist/**/*",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  }
}
```

### ビルド

```sh
npm run build
# ./buildに成果物ができる
```

#### Firebase の準備

- ブラウザで[Firebase Console](https://console.firebase.google.com)へアクセス
- プロジェクトを任意の名前で作成する
- Firebase CLI でデプロイ

```sh
# CIで自動デプロイするためdevDependenciesにインストール
npm i -D firebase-tools

npx firebase login
# Allow Firebase to collect anonymous CLI usage and error reporting information? : Y
# ブラウザでログインする

npx firebase init
# Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confirm your choices. : Hosting
# Select a default Firebase project for this directory : 作ったプロジェクト
# What do you want to use as your public directory? : build
# Configure as a single-page app (rewrite all urls to /index.html)? : Y
# File build/index.html already exists. Overwrite? : N

npx firebase deploy
```

### テスト

- テストを起動する

```sh
npm test
# System limit for number of file watchers reached が発生した場合下記を実行して再度実行
# $ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
# $ sudo sysctl -p
```

- エラーになるコードを書くとリアルタイムにエラーになる

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(1 + 2).toEqual(3);
  expect(1 + 2).toEqual(4);
});
```

### Progressive Web Apps

- Progressive Web Apps って?  
  https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps
- アイコンを追加するだけで簡単にできる
  - そう、create-react-app ならね
  - ./src/serviceWorker.ts におおよその処理が書いてある
  - ./public/manifest.json の icons で 192x192 と 512x512 のアイコンを定義する
- Lighthouse で有効かどうかをチェックできる

### CI

#### Test を CI モードで実行する

デフォルトだと watch モードで実行されるため、チェックして ExitCode をかえすモードで起動する必要がある
npm scripts に以下の行を追記する

```
"test-ci": "CI=true react-scripts test --env=jsdom",
```

#### Firebase Token の入手

以下のコマンドで Token 入手できる

```sh
npx firebase login:ci
```

#### CircleCI config

```yml
version: 2.1
executors:
  node:
    docker:
      - image: circleci/node:latest
jobs:
  build:
    executor: node
    steps:
      - checkout
      - run:
          name: install packages
          command: npm i
      - run:
          name: build
          command: npm run build
      - run:
          name: test
          command: npm run test-ci
      - run:
          name: publish
          command: npx firebase deploy --only hosting --project ${FIREBASE_PROJECT_ID} --token ${FIREBASE_TOKEN}
```
