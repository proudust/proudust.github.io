---
title: JavaScript でも Kotlin の trimMargin と trimIndent を使いたい
tags: [JavaScript]
createat: "2020-02-05T15:02:41+09:00"
updateat: "2020-02-16T13:38:07+09:00"
qiita: https://qiita.com/proudust/items/98c50480fc7d39845a69
---

Kotlin には `String#trimMargin` や `String#trimIndent` という便利なメソッドがあり、*raw strings* (JS のテンプレートリテラルに近いもの) を使いやすくしています。

`String#trimMargin`は各行の第 2 引数に指定した文字列(省略した場合は `|` ) までの空白を削除し、`String#trimIndent`は各行の左側の空白を一番少ない行に合わせて削除します。
ついでに最初と最後の行が空白のみ場合はその行を削除してくれます。

``` kotlin:Kotlin
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

``` :Output
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

``` js:JavaScript
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

``` :Output
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

テンプレートリテラル付けられるタグを作成する場合、関数に渡る引数は `(literals: TemplateStringsArray, ...placeholders: string[])` になります。
今回の場合は普通に展開してくれれば良いので、愚直に展開する関数を作成します。

``` ts
function resolveTenplate(literals: TemplateStringsArray, ...placeholders: string[]): string {
  return literals.reduce((str, literal) => (str += literal + (placeholders.shift() ?? '')), '');
}
```

### trimMargin

第一引数が string かどうかでタグとして呼び出されたか関数として呼び出されたかの判別が付きます。
除去には手っ取り早く正規表現を使用します。

``` ts
export function trimMargin(string: string, marginPrefix?: string): string;
export function trimMargin(literals: TemplateStringsArray, ...placeholders: string[]): string;
export function trimMargin(
  arg1: string | TemplateStringsArray,
  arg2 = '',
  ...args: string[]
): string {
  const string = typeof arg1 === 'string' ? arg1 : resolveTenplate(arg1, arg2, ...args);
  const strings = string.split('\n');
  if (!strings?.[0].trim()) strings.shift();
  if (!strings?.[strings.length - 1].trim()) strings.pop();
  const marginPrefix = (typeof arg1 === 'string' && arg2) || '|';
  const regexp = marginPrefix === '|' ? /^\s*\|/ : new RegExp(`^\\s*${arg2}`);
  return strings.map(s => s.replace(regexp, '')).join('\n');
}
```

### trimIndent

こちらも一応関数として使えるようにオーバーロードを用意します。
正規表現で頭の空白のみを取り出し、その `length` が一番短いものに合わせて `Array#slice` します。

``` ts
export function trimIndent(string: string): string;
export function trimIndent(literals: TemplateStringsArray, ...placeholders: string[]): string;
export function trimIndent(arg1: string | TemplateStringsArray, ...args: string[]): string {
  const string = typeof arg1 === 'string' ? arg1 : resolveTenplate(arg1, ...args);
  const strings = string.split('\n');
  if (!strings?.[0].trim()) strings.shift();
  if (!strings?.[strings.length - 1].trim()) strings.pop();
  const indent = Math.min(...strings.map(s => /^\s+/.exec(s)?.[0].length ?? 0));
  return strings.map(s => s.slice(indent)).join('\n');
}
```

※あんまり詳しく仕様を調べていないので、Kotlin と挙動が異なるかもしれません。

## 参考文献

- [trimMargin - Kotlin Programming Language](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/trim-margin.html)
- [trimIndent - Kotlin Programming Language](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/trim-indent.html)
