---
title: webpack で特定ディレクトリ以下のファイルを全てインポートして配列にする
emoji: 📦
topics: [javascript, webpack]
type: tech
published: true

createat: "2019-03-16T22:17:43+09:00"
updateat: "2019-06-12T15:22:15+09:00"
qiita: https://qiita.com/proudust/items/d716957e243f9e019fda
---

## やりたいこと

```bash
src
├─ template
|  ├─ a.txt
|  ├─ b.txt
|  └─ c.txt
└─ templates.ts
```

こういうディレクトリ構造のとき、template フォルダのファイルを

```ts
[
  {
    name: 'a',
    value: 'a.txtの中身'
  },
  {
    name: 'b',
    value: 'b.txtの中身'
  },
  {
    name: 'c',
    value: 'c.txtの中身'
  }
]
```

みたいな形で取り出したい。

## 方法

### 1. パッケージのインストール

- `raw-loader` ... webpack で txt ファイルを読み込むため
- `@types/webpack-env` ... この後使用する `require.context` の型定義を読み込むため

```bash
npm i -D raw-loader @types/webpack-env
```

### 2. `webpack.config.js` に `raw-loader` を設定

読み込ませたい拡張子が複数ある場合は `/\.txt$/` のところを変更する。
この方法で読み込む場合、TypeScript では必要だった `declare module '*.txt'` のような宣言も必要無さそう。

```js
// webpack.config.js
module.exports = {
  /* 略 */
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      /* 追加 ここから */
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
      /* 追加 ここまで */
    ]
  },
  /* 略 */
};
```

### 3. 読み込み処理の記述

`require.context()` に読み込むフォルダへの相対パスを渡す。
`context.keys()` でそのフォルダ以下のファイルの相対パスが配列で渡されるので、`Array.map()` で欲しい形に変える。

```ts
// templates.ts
interface Files {
  name: string;
  value: string;
}

const context = require.context('./template');
const templates: ReadonlyArray<Files> = context.keys().map(path => {
  return {
    // 拡張子を省いたファイル名のみを抜き出す
    name: path.match(/([^/]*)(?:\.([^.]+$))/)[1],
    // ファイルの中身をstringで読み込み
    value: context(path)
  };
});

export default templates;
```

## 参考

- [Webpackでフォルダ内の全ファイルを一気にrequireする](https://qiita.com/jkr_2255/items/d23e66323857d3189a00)
- [【JavaScript】ファイル名(拡張子あり)からファイル名(拡張子なし)と拡張子に分割する(正規表現)](https://qiita.com/kyoshiro-obj/items/3c59f14b37a0d7b7d59f)
