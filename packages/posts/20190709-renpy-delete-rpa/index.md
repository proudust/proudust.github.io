---
title: Ren'Py の実行中に rpa を削除する
createat: "2019-07-09T13:11:38+09:00"
updateat: "2019-07-09T13:11:38+09:00"
qiita: https://qiita.com/proudust/items/ac70cd6ae523e0fd9acf
---

実行中に rpa を削除するという暴挙をした時のメモ

# 結論

## `init python` ブロック で削除する
この場合 rpa 内のスクリプトが読み込まれてしまっているので、再起動または終了する必要がある。

**1.** persistent に削除フラグを保存してスクリプトの再読み込み

```py
persistent.uninstall = True
renpy.save_persistent()
renpy.utter_restart()
```

**2.** `init python` ブロックで persistent の削除フラグが立っていたら、 rpa と persistent の削除フラグを削除

```py
import os
try: os.unlink(config.basedir + "/game/*.rpa")
except: pass
persistent.uninstall = False
renpy.save_persistent()
```

**3.** 終了・または再起動
終了の場合は `renpy.quit()`、再起動ならタイトル表示後に `renpy.utter_restart()`
タイトル表示後で再起動処理を挟める場所が思いつかないので、終了してしまうのが一番早いと思う。


# スクリプトの実行タイミング

## 起動時

- `python early` ブロックconfig は使える
- `init * python` ブロック (* の数値が小さい順)
- `translate * python` ブロック (* は現在の言語)
  + リソースがロードされ、以降リソース入り rpa はロックされて削除できない

## タイトルへ戻った時

- `translate * python` ブロック (* は現在の言語)

## `renpy.change_language(*)` 時

- `translate * python` ブロック (* は変更後の言語)

## `renpy.utter_restart()` 時
起動時と同じ
※ `renpy.utter_restart()` はタイトル前に実行すると無言で落ちる

## `renpy.reload_script()` 時
起動時と同じだが、`translate * python` ブロックがなぜか 3 回くらい呼ばれる
あと画面にリロード中であることがデカデカと表示される
※ `renpy.reload_script()` はタイトル前に実行すると無言で落ちる

## `renpy.full_restart()` 時
タイトルへ戻った時と同じ
※ `renpy.full_restart()` は `python early` ブロック、`init * python` ブロックで実行すると落ちる。`translate * python` ブロック では落ちない。

## `renpy.quit(relaunch=True)`
そもそも再起動されない。ソースコードを読む限り、起動時と同じはず。
