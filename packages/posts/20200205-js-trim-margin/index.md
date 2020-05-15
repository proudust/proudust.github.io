---
title: JavaScript でも Kotlin の trimMargin と trimIndent を使いたい
tags: [JavaScript]
createat: "2020-02-05T15:02:41+09:00"
updateat: "2020-05-16"
qiita: https://qiita.com/proudust/items/98c50480fc7d39845a69
---

Kotlin には `String#trimMargin` や `String#trimIndent` という便利なメソッドがあり、*raw strings* (JS のテンプレートリテラルに近いもの) を使いやすくしています。

`String#trimMargin` は各行の第 2 引数に指定した文字列(省略した場合は `|` ) までの空白を削除し、`String#trimIndent`は各行の左側の空白を一番少ない行に合わせて削除します。
ついでに最初と最後の行が空白のみ場合はその行を削除してくれます。

``` kotlin
println("String#trimMargin()")
val withoutMargin1 = """ABC
            |123
                |456""".trimMargin()
println(withoutMargin1)

println("String#trimMargin(marginPrefix: String)")
val withoutMargin2 = """
#XYZ
    #foo
    #bar
""".trimMargin("#")
println(withoutMargin2)

println("String#trimIndent()")
val withoutIndent = """
        ABC
         123
          456
        """.trimIndent()
println(withoutIndent)
```

```
String#trimMargin()
ABC
123
456
String#trimMargin(marginPrefix: String)
XYZ
foo
bar
String#trimIndent()
ABC
 123
  456
```

これを JavaScript にテンプレートリテラルに付けられるタグ、及び関数として利用できるように再現します。

``` js
console.log('trimMargin`~`')
const withoutMargin1 = trimMargin`ABC
            |123
                |456`
console.log(withoutMargin1)

console.log('trimMargin(str: string, marginPrefix: string)')
const withoutMargin2 = trimMargin(`
#XYZ
    #foo
    #bar
`, '#')
console.log(withoutMargin2)

console.log('String`~`')
const withoutIndent = trimIndent`
        ABC
         123
          456
        `
console.log(withoutIndent)
```

```
trimMargin`~`
ABC
123
456
trimMargin(str: string, marginPrefix: string)
XYZ
foo
bar
String`~`
ABC
 123
  456
```

## 実装

### テンプレートリテラルのタグ

テンプレートリテラルのタグに使える型は `(literals: TemplateStringsArray, ...placeholders: any[]) => any` になります。
`placeholders` や返す値の型は自由に設定することができ、実際に `${}` 内の型検査に使用されます。

``` ts
const noPlaceholders = (l: TemplateStringsArray, ...p: never[]): string => l[0];

// エラー: 型 'number' の引数を型 'never' のパラメーターに割り当てることはできません。
const use = noPlaceholders`${1 + 1}`;
```

また `TemplateStringsArray` は通常の `string[]` に加えて `raw` プロパティが追加されています。
`literals` を参照すればエスケープ処理済みの文字列が、`literals.raw` を参照すればエスケープ処理前の生文字列が取得されます。

``` ts
const t = (l: TemplateStringsArray, ...p: never[]): TemplateStringsArray => l;

const l = t`Don\'t`;
console.log(l[0]);      // Don't
console.log(l.raw[0]);  // Don\'t
```

### trimMargin

第一引数が string かどうかでタグとして呼び出されたか関数として呼び出されたかの判別が付きます。
除去には手っ取り早く正規表現を使用します。

``` ts
// リテラルとプレースホルダーを繋ぎ合わせる
function resolveInterpolation(literals: TSArray, ...placeholders: Placeholders[]): string {
  return literals.raw.reduce((s, l) => (s += l + (placeholders.shift() ?? '')), '');
}

// 通常の関数としての定義
export function trimMargin(string: string, marginPrefix?: string): string;

// テンプレートリテラルのタグとしての定義
export function trimMargin(literals: TemplateStringsArray, ...placeholders: Placeholders[]): string;

// 実装
export function trimMargin(arg1: string | TemplateStringsArray, arg2: Placeholders = '', ...args: Placeholders[]): string {
  // 第一引数の型が string なら通常の関数として呼ばれているのでそのまま
  // 違うならテンプレートリテラルのタグとして呼ばれているので繋ぎ合わせて string にする
  const string = typeof arg1 === 'string' ? arg1 : resolveInterpolation(arg1, arg2, ...args);

  // 行ごとに string を分解し、最初と最後が空行なら削除
  const lines = string.split('\n');
  if (!lines?.[0].trim()) lines.shift();
  if (!lines?.[lines.length - 1].trim()) lines.pop();

  // 通常の関数として呼ばれており、かつ第二引数が Truthy な場合は第二引数が区切り文字
  // それ以外は | が区切り文字
  const marginPrefix = (typeof arg1 === 'string' && arg2) || '|';

  // | 用の正規表現は最初から作成しておき、それ以外はその都度作る。(キャッシュ機構を作ったほうが良いかも)
  const regexp = marginPrefix === '|' ? /^\s*\|/ : new RegExp(`^\\s*${arg2}`);

  // 各行ごとに正規表現で区切り文字までのスペースを除去してつなぎ合わせる。
  return lines.reduce((s, l) => (s += l.replace(regexp, '') + '\n'), '').slice(0, -1);
}
```

### trimIndent

こちらも一応関数として使えるようにオーバーロードを用意します。
正規表現で頭の空白のみを取り出し、その `length` が一番短いものに合わせて `Array#slice` します。

``` ts
// 通常の関数としての定義
export function trimIndent(string: string): string;

// テンプレートリテラルのタグとしての定義
export function trimIndent(literals: TemplateStringsArray, ...placeholders: Placeholders[]): string;

// 実装
export function trimIndent(arg1: string | TemplateStringsArray, ...args: string[]): string {
  const string = typeof arg1 === 'string' ? arg1 : resolveTenplate(arg1, ...args);
  const lines = string.split('\n');
  if (!lines?.[0].trim()) lines.shift();
  if (!lines?.[lines.length - 1].trim()) lines.pop();

  // 各行のインデントの最小値を計算する (空行は無視)
  const indent = Math.min(...lines.filter(s => s.trim()).map(s => /^\s+/.exec(s)?.[0].length ?? 0));

  // 各行ごとにインデントを最小の行に合わせて除去してつなぎ合わせる。
  return lines.reduce((s, l) => (s += l.slice(indent) + '\n'), '').slice(0, -1);
}
```

※あんまり詳しく仕様を調べていないので、Kotlin と挙動が異なるかもしれません。

## 参考文献

- [trimMargin - Kotlin Programming Language](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/trim-margin.html)
- [trimIndent - Kotlin Programming Language](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/trim-indent.html)
