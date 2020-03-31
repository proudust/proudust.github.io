---
title: Ren’Py の多言語対応について
createat: "2019-08-06T12:03:25+09:00"
updateat: "2019-10-23T09:56:07+09:00"
qiita: https://qiita.com/proudust/items/e59a2ea833187d67e704
---

Ren'Py には多言語対応のための機能があらかじめ用意されており、簡単に多言語対応することができます。
また、[ソースコードのデコンパイルも容易に行うことができる](https://qiita.com/proudust/items/0f7aa74ade8f7f946223)ので、翻訳パッチの作成も簡単に行うことができます。

なお、この記事中の Ren'Py のバージョンは 6.99.12 (DDLC で使用されているバージョン) であり、最新版では異なる場合がありますのでご注意ください。

## 翻訳の生成と台詞の抽出

Ren'Py SDK には多言語対応を支援するための機能として、`.rpy`ファイルから翻訳可能な台詞と文字列を抽出する機能があります。
翻訳の生成の場合は**翻訳スクリプト**を、台詞の抽出の場合は **TSV** (タブ区切りの CSV ) を生成します。
`.rpyc`や `.rpa` からは抽出できませんので、予めデコンパイルする必要があります。

## スタイルの翻訳 `translate [言語名] style [style名]`

``` overrides.rpy
translate Japanese style _default:
    font "gui/font/VL-Gothic-Regular.ttf"
```

その言語に設定されている間、style の任意のパラメータを上書きすることができます。
大抵の場合はフォントを置き換えることになると思います。

## 台詞の翻訳 `translate [言語名] [ID]`

``` script.rpy
translate Japanese start_00000000:
    e "ゲームを作成しました"
```

label 内の台詞を任意の Ren'Py スクリプトに置き換えます。
この翻訳は**必ずしも 1 対 1 である必要は無く**、台詞を 2 つに分割したり、逆に `pass` で台詞を削除することもできます。

ただし、ヒストリーの対応は完全ではなく、**言語を切り替えてもヒストリーは変更前の言語のまま表示されてしまう**ので注意が必要です。
また台詞中に `[変数名]` で埋め込まれた文字列を翻訳したい場合は、台詞の方では `[変数名!t]` に翻訳し、文字列の翻訳に対応する翻訳を追加することで反映されます。

### ID 名部分について

ID 名は基本的に以下のような規則に従っています。

```sh
[直近のlabel名]_[MD5の頭8文字]
```

- **直近の label 名**
最後に定義されたラベル名がそのまま入ります。
場合によっては台詞が実際に属するラベルと異なるラベル名になる場合があるので注意が必要です。

``` py
label hoge:
    e "hoge label"     # hoge_b4d70893
    label fuga:
        e "fuga label" # fuga_48575dlc
        return
    e "hoge label"     # fuga_b4d70893 <- fuga ラベルに jump しても呼ばれないが、ID は fuga になる
    call fuga from foo
    e "hoge label"     # foo_b4d70893 <- from 文によりラベル名が foo に変更
    label .bar:
        e "bar label"  # foo_bar_57f61541 <- ピリオドで始まるラベルは翻訳から見ると不思議な挙動をする（要調査）
    return
```

- **MD5 の頭 8 文字**

台詞から余計な空白を削除し、省略された属性や改行 (`\n\r`) を加えた文字列の MD5 ハッシュの頭 8 文字のみを取り出したものになります。

``` py
label hoge
    e "hoge label"
```

例えば上記のコードの場合、台詞の行のみを取り出し、文頭の空白を削除し、改行を加えた

```py
"e \"hoge label\"\n\r"
```

の MD5 ハッシュ `b4d70893d07c7ce0c24ddfa74f0612b8` の頭 8 文字を取り出して `b4d70893` となります。

よくある例外として、`menu`内に台詞がある場合が挙げられます。`menu`内の台詞は必ず `nointeract` と付いていることになります。

``` py
menu
    e "Okey?" # deb0e853
    "Okey.":
        pass
    "Wait.":
        pass
```

この場合は文頭の空白を削除と改行に加え、省略されている `nointeract` を加えた

```py
"e \"Okey?\" nointeract\n\r"
```

の MD5 ハッシュ `deb0e85395ca2a578d34919945c586fd` の頭 8 文字を取り出して `deb0e853` となります。

- **ID が重複している場合**
同じ台詞が連続している場合、ID 名が重複することが多々あります。
その場合は 2 つ目以降の ID の末尾には `_[1から始まる連番]` が付けられます。

``` py
label hoge
    e "hoge label"     # hoge_b4d70893
    e "hoge label"     # hoge_b4d70893_1
    e "hoge label"     # hoge_b4d70893_2
```

## 文字列の翻訳 `translate [言語名] strings`

```py
translate Japanese strings:
    old "History"
    new "ヒストリー"

    old "Skip"
    new "スキップ"
```

原文と翻訳の 1 対 1 で置き換えます。
メニューの文字列や選択肢など、台詞以外の文字列はここに追加するとだいたい反映されます。

```py
translate Japanese strings:
    old "New"
    new "新しい"

    old "New{#project}"
    new "新規"
```

場合によっては同じ文字列でも別の訳を設定したいことがあります。
その場合は label や screen の置き換えで原文の後ろに {#[任意の文字列]} を追加することで、同じ文字列を区別することができます。

```py
sys.modules['renpy.error'].report_exception(__("..."), False)
```

流石に Python 組み込みの関数 (スタックトレースの出力やファイルの出力など) には反映されないので、その場合は label の置き換えで該当箇所を `__([原文])` で括る必要があります。
※ `__(string)`引数の文字列を翻訳して返す Ren'Py 組み込みの関数。

## 画像や BGM などの翻訳

```sh
game/
├ gui/
| └ poem_dismiss.png ← これを置き換えたい場合
└ tl/
  └ Japanese/
    └ gui/
      └ poem_dismiss.png ← ここに置くと反映される
```

言語によって画像や BGM を置き換えたい場合、`game/tl/[言語名]/`に画像を配置することで置き換えることができます。
こちらは Python 組み込みの関数でも置き換わるようです。

## label や screen の置き換え

```py
translate None screen:
    screen preferences() tag menu:
        # ...
        textbutton _("English") action Language(None)
        $ languages = renpy.known_languages()
        for language in languages:
            textbutton _(language) action Language(language)
```

すでに宣言された label や screen を置き換えることができます。
オプション画面に言語選択を追加したり、入力欄に日本語を入力できるようにするなどに使います。
ただし、**label を置き換えてしまうと、言語を切り替えても置換前のラベルに自動で切り替わるわけではない**ので、言語切替を実装する場合は注意が必要です。
また言語名を `None` に指定すると、言語に関係なく置き換わります。
