---
title: Truth (Java / Android 用アサーションライブラリ) の使い方
emoji: 📚
topics: [android, java, kotlin]
type: tech
published: true

createat: "2019-07-03T12:15:46+09:00"
qiita: https://qiita.com/proudust/items/8af4677a9986ed51f77f
qrunch:
---

## [*Truth*](https://truth.dev/) とは

*Hamcrest* や *AssertJ* と同じアサーションライブラリの一つ。Google 製。
拡張ライブラリが作りやすいらしく、AssertJ の Android 向け拡張だった [*AssertJ Android*](https://github.com/square/assertj-android) でもその代替として挙げられている。
また同じ Google 製ライブラリである [*Google Guava*](https://github.com/google/guava) を標準でサポートしており、専用の検証メソッドが用意されていたり、検証メソッドの引数として用いることができたりする。
一方、メソッドチェーンが使えないので Java だと若干冗長なこと、gg ラビリティの低い名前なので `google truth` や `java truth` などで検索しないと出ないことが欠点。

2019 年 7 月 8 日に正式リリースされ、2020 年 3 月時点での最新バージョンは `1.0.1`。

## 入門

*JUnit4* はインストール済みとする。
Android/Java でしか試したことがないが、*Kotlin* や Android 以外の環境、*JUnit5* でもおおよそ同じはず。

### インストール

`build.gradle` に以下のように書き足す。

``` groovy
dependencies {
    testImplementation 'com.google.truth:truth:1.0.1'
    // Java8 用拡張
    testImplementation 'com.google.truth.extensions:truth-java8-extension:1.0.1'
    // Android 用拡張
    testImplementation 'androidx.test.ext:truth:1.2.0'
}
```

### テストコード

``` java
package sample.truth;

import org.junit.Test;
import static com.google.common.truth.Truth.assertThat;

public class SampleTest {
    @Test
    public void sampleTest() {
        Int x = 1 + 1;
        assertThat(x).isEqualTo(500);
    }
}
```

### 実行結果

```
expected: 500
but was : 2
 at sample.truth.SampleTest.test(SampleTest.java:9)
```

### Kotlin の場合

Kotlin で書く場合もほぼ変わらない。
強いて言うなら 1 つの変数に複数の検証をしたい場合に、`apply` などのスコープ関数が少し便利。

``` kotlin
package sample.truth

import org.junit.Test
import com.google.common.truth.Truth.assertThat

class SampleTest {
    @Test
    fun `sample test`() {
        val x = 1 + 1
        assertThat(x).apply {
            isEqualTo(500)
        }
    }
}
```

## 検証対象の指定

基本的には `Truth.assertThat` に検証したいオブジェクトを渡し、検証メソッドを呼び出す。

``` java
assertThat(1 + 1).isEqualTo(500);
```

また、 `Truth.assertWithMessage(String)` でエラーメッセージに追加の文字列を指定することもできる。
その場合は続けて `that` に検証対象を渡すと `Truth.assertThat` と同様の検証メソッドを呼び出せる。

``` java
assertWithMessage("1 + 1 は 2 じゃない 500 だ").that(1 + 1).isEqualTo(500);
```

```
1 + 1 は 2 じゃない 500 だ
expected: 500
but was : 2
 at sample.truth.SampleTest.test(SampleTest.java:9)
```

拡張ライブラリの検証メソッドを呼び出す場合は少々面倒だが、`about(Subject.Factory)` に対応する `Subject.Factory` を渡すことで呼び出せるようになる。
本当に面倒なので代替手段が欲しいところ。

``` java
OptionalInt value = OptionalInt.empty();
assertWithMessage("value の中身は 500")
        .about(OptionalIntSubject.optionalInts())
        .that(value)
        .hasValue(500);
```

```
value の中身は 500
expected to have value: 500
but was absent
 at sample.truth.SampleTest.test(SampleTest.java:9)
```

## 検証メソッド

### 汎用

基本的にどのオブジェクトを対象にしても使える。

- 等しい (`isEqualTo(Object)`)
- 等しくない (`isNotEqualTo(Object)`)
- == で等しい (`isSameInstanceAs(Object)`)
- == で等しくない (`isNotSameInstanceAs(Object)`)
- 指定されたクラスのインスタンス (`isInstanceOf(Class)`)
- 指定されたクラスのインスタンスではない (`isNotInstanceOf(Class)`)
- いずれかに等しい (`isIn(Iterable<?>)`)
- いずれかに等しい (`isAnyOf(Object...)`)
- いずれも等しくない (`isNotIn(Iterable<?>)`)
- いずれも等しくない (`isNoneOf(Object...)`)

### 値

`Truth.assertThat` の引数が `Comparable` インターフェースを実装している場合に使用できる。
`Integer`, `Long`, `Float`, `Double`, `BigDecimal`, `String` などが対象。

- 指定の範囲内 (`isIn(Range)`)
- 指定の範囲外 (`isNotIn(Range)`)
  - 引数には *Google Guava* の `com.google.common.collect.Range` を渡す
- `Comparable#compareTo` で指定値と等しい (`isEquivalentAccordingToCompareTo(T)`)
- `Comparable#compareTo` で指定値より大きい (`isGreaterThan(T)`)
- `Comparable#compareTo` で指定値より小さい (`isLessThan(T)`)
- `Comparable#compareTo` で指定値以上 (`isAtLeast(T)`)
- `Comparable#compareTo` で指定値以下 (`isAtMost(T)`)

### 真偽値

`Truth.assertThat(Boolean)` で使用できる。

- 値が True (`isTrue()`)
- 値が False (`isFalse()`)

### 文字列

`Truth.assertThat(String)` で使用できる。

- 空 (`isEmpty()`)
- 空ではない (`isNotEmpty()`)
- 指定の長さ (`hasLength()`)
- 指定の文字列を含む (`contains(CharSequence)`)
- 指定の文字列を含まない (`doesNotContain(CharSequence)`)
- 指定の文字列で始まる (`startsWith(String)`)
- 指定の正規表現にマッチ (`matches(String)`)
- 指定の正規表現にマッチ (`matches(Pattern)`)
- 指定の正規表現にマッチしない (`doesNotMatch(String)`)
- 指定の正規表現にマッチしない (`doesNotMatch(Pattern)`)
- 指定の正規表現に一部マッチ (`containsMatch(String)`)
- 指定の正規表現に一部マッチ (`containsMatch(Pattern)`)
- 指定の正規表現に一部マッチしない (`doesNotContainMatch(String)`)
- 指定の正規表現に一部マッチしない (`doesNotContainMatch(Pattern)`)

### 文字列 (大文字・小文字を無視)

`Truth.assertThat(String).ignoringCase()` で使用できる。

- 等しい (`isEqualTo(String)`)
- 等しくない (`isNotEqualTo(String)`)
- 指定の文字列を含む (`contains(CharSequence)`)
- 指定の文字列を含まない (`doesNotContain(CharSequence)`)

### 配列

`Truth.assertThat(T[])` で使用できる。(プリミティブ配列版も用意されている。)
最低限の API しか用意されておらず、配列の中身については `asList()` で Iterable 用の API を利用する必要がある。

- 空 (`isEmpty()`)
- 空ではない (`isNotEmpty()`)
- 指定の長さ (`hasLength()`)

### Iterable

`Truth.assertThat(Iterable<?>)` または `Truth.assertThat(T[]).asList()` で使用できる。

- 空 (`isEmpty()`)
- 空ではない (`isNotEmpty()`)
- 指定の数 (`hasSize()`)
- 指定のオブジェクトを含む (`contains(Object)`)
- 指定のオブジェクトを含まない (`doesNotContain(Object)`)
- 重複しているオブジェクトを含まない (`containsNoDuplicates()`)
- 指定のオブジェクトを 1 つ以上含む (`containsAnyOf(Object...)`)
- 中身のオブジェクトを 1 つ以上含む (`containsAnyIn(Iterable<?>)`)
- 中身のオブジェクトを 1 つ以上含む (`containsAnyIn(Object[])`)
- 指定のオブジェクトを全て含む (`containsAtLeastElementsIn(Object...)`)
- 中身のオブジェクトを全て含む (`containsAtLeastElementsIn(Iterable<?>)`)
- 中身のオブジェクトを全て含む (`containsAtLeastElementsIn(Object[])`)
- 中身が完全に等しい (`isEqualTo(Object)`)
- 中身が完全に等しい (`containsExactly(Object...)`)
- 中身が完全に等しい (`containsExactlyElementsIn(Iterable<?>)`)
- 中身が完全に等しい (`containsExactlyElementsIn(Object[])`)
- 指定のオブジェクトを含まない (`containsNoneIn(Object...)`)
- 指定のオブジェクトを含まない (`containsNoneIn(Iterable<?>)`)
- 指定のオブジェクトを含まない (`containsNoneIn(Object[])`)
- 順番が厳格に `NaturalOrdering` 通り (`isInStrictOrder()`)
  - *Google Guava* の `com.google.common.collect.NaturalOrdering` のこと。
- 順番が厳格に指定の `Comparator` 通り (`isInStrictOrder(Comparator)`)
- 順番が `NaturalOrdering` 通り (`isInOrder()`)
- 順番が指定の `Comparator` 通り (`isInOrder(Comparator)`)

### Map (*Google Guava*)

### Multimap (*Google Guava*)

### Multiset (*Google Guava*)

### Table (*Google Guava*)

### Optional (*Google Guava* または *Java8*)

`Truth.assertThat(com.google.common.base.Optional)` または `Truth8.assertThat(java.util.Optional)` で使用できる。
*Java8* 版 Optional を使う場合は Java8 用拡張が必要。

- Optional またはその中身が null ではない (`isPresent()`)
- 中身が null (Guava: `isAbsent()`, Java8: `isEmpty()`)
- 中身が等しい (`hasValue(Object)`)

### Stream (*Java8*)

`Truth.assertThat(Stream<?>)` で使用できる。Java8 用拡張が必要。
基本的に Iterable と同じだが、`isEqualTo` や `Object[]` 版のメソッドが無いので注意。

- 空 (`isEmpty()`)
- 空ではない (`isNotEmpty()`)
- 指定の数 (`hasSize()`)
- 指定のオブジェクトを含む (`contains(Object)`)
- 指定のオブジェクトを含まない (`doesNotContain(Object)`)
- 重複しているオブジェクトを含まない (`containsNoDuplicates()`)
- 指定のオブジェクトを 1 つ以上含む (`containsAnyOf(Object...)`)
- 中身のオブジェクトを 1 つ以上含む (`containsAnyIn(Iterable<?>)`)
- 指定のオブジェクトを全て含む (`containsAtLeast(Object...)`)
- 中身のオブジェクトを全て含む (`containsAtLeastElementsIn(Iterable<?>)`)
- 中身が完全に等しい (`containsExactly(Object...)`)
- 中身が完全に等しい (`containsExactlyElementsIn(Iterable<?>)`)
- 指定のオブジェクトを含まない (`containsNoneOf(Object...)`)
- 指定のオブジェクトを含まない (`containsNoneIn(Iterable<?>)`)
- 順番が厳格に `NaturalOrdering` 通り (`isInStrictOrder()`)
- 順番が厳格に指定の `Comparator` 通り (`isInStrictOrder(Comparator)`)
- 順番が `NaturalOrdering` 通り (`isInOrder()`)
- 順番が指定の `Comparator` 通り (`isInOrder(Comparator)`)

### Notification (*Android*)

### Notification.Actions (*Android*)

### PendingIntent (*Android*)

### Intent (*Android*)

### Correspondence (*Android*)

### Bundle (*Android*)

### Parcelable (*Android*)

### MotionEvent (*Android*)

### MotionEvent.PointerCoords (*Android*)

### MotionEvent.PointerProperties (*Android*)

### 例外

`Truth.assertThat(Throwable)` で使用できる。

- `Throwable#getMessage()` の戻り値を検証対象にする (`hasMessageThat()`)
- `Throwable#getCause()` の戻り値を検証対象にする (`hasCauseThat()`)

### クラス

`Truth.assertThat(Class)` で使用できる。

- 指定のクラスを継承している (`isAssignableTo(Class)`)

## 参考

- [Truth公式サイト(英)](//truth.dev/)
- [AssertJ 使い方メモ - Qiita](//qiita.com/opengl-8080/items/b07307ab0d33422be9c5)
- [androidx.test.ext.truth.app  |  Android Developers](https://developer.android.com/reference/androidx/test/ext/truth/app/package-summary)
