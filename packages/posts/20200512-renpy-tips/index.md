---
title: Ren'Py のかなりマニアックな小ネタ集
tags: [Ren'Py]
createat: "2020-05-12"
updateat: "2020-05-12"
qrunch: https://proudust.qrunch.io/entries/ef5dqZWYJhfbwPLs
---

なにか思いつく度に書き足していきます。
※ Ren'Py v6.99.12 での情報になります。最新バージョンでは使えないネタが含まれている可能性があります。

## 台詞などを囲う記号

Ren'Py 上ではダブルクォート (`"`) やシングルクォート (`'`) 、バッククォート (`) で囲われた文字列はすべて文字列として認識されます。

``` renpy
label start:
    # すべて Hello Ren'Py! と表示される
    "Hello Ren'Py!"
    'Hello Ren\'Py!'
    `Hello Ren'Py!`
```

Python2 上でもダブルクォートやシングルクォートは好きな方を使用することができます。  
一方で、バッククォートは Python 式として評価し、そのオブジェクトの `__repr__` を呼んだ結果を返すという誰得機能が付いています。(Python3 では廃止済み)  

``` renpy
define double = "Hello Ren'Py!"
define single = 'Hello Ren\'Py!'  # この2つは Hello Ren'Py! が代入される
# define back = `Hello Ren'Py!`   # コメントを外すとエラー
define back   = `double`          # double.__repr__() の実行結果である u"Hello Ren'Py!" が代入される
```

混乱しやすいのでバッククォートは使わず、ダブルクォートかシングルクォートで囲うようにしましょう。

## label などに使える文字

label 名には日本語や絵文字も使用することができます。  
より具体的には `[a-zA-Z_\u00a0-\ufffd][0-9a-zA-Z_\u00a0-\ufffd]*` という正規表現に一致すれば使用できるので、Unicode の属性なども無視されます。  

``` renpy
label 日本語が使えます！！！！！:
    pass

label 絵文字も使えます🎉🎉🎉🎉🎉:
    pass
```

また、image 名に限り `-` も使用できます。

``` renpy
image ハイフン-使えます = "unknown.png"
```

なお、Python2 上ではアルファベットと数字、アンダースコア (`_`) のみが使用でき、数字から始まる変数名は NG です。  
しかしなぜか define 文では日本語の変数名が定義できます。何故？

``` renpy
define Ok_ = "Ok"
define 日本語何故か使える🤔🤔🤔 = "🤔🤔🤔" # 何故か正常に定義される
```

※参照: [renpy/renpy:renpy/parser.py@794232f#L552](https://github.com/renpy/renpy/blob/794232f8ba3c71d8c46c4a17e4de5a8c9dbb0c0f/renpy/parser.py#L552)

## define は書き換えられる

Python には基本的に定数が存在しないため、`define` で定義された値は書き換えることが可能です。  
ただし、セーブデータには保存されないので注意しましょう。  

``` renpy
define test = True
init python:
    test = False
    if test:
        raise Exception # 直前に False に再代入されるので絶対に到達しない
```

また同様に renpy の関数のいくつかも上書きが可能です。  
但し不具合を作り込む原因になりやすいので、可能な限り標準の callback などを用いて実装するようにしましょう。  

## 台詞とキャラクターを同時に取得する

`renpy.config.say_menu_text_filter` を使用することで台詞を取得できますが、キャラクターまでは取得できません。  
以下のように `ADVCharacter.do_add` を上書きすることで、表示直前の台詞を取得できます。  

``` renpy
# 予めキャラクターを作成しておく (DynamicCharacter でも可)
define s = Character('Sylvie')

init python:
    """
    表示直前の台詞を取得します。戻り値は無視されます。

    IN:
        self - 台詞に指定されている ADVCharacter オブジェクト
        who - 表示されるキャラクター名
        what - 表示される台詞
    """
    def do_add(self, who, what):
        # 任意のコード

    # メソッドの上書き
    ADVCharacter = type(s)
    ADVCharacter.do_add = do_add
```
