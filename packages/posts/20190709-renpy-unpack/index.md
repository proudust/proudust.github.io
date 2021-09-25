---
title: Ren'Py 製ゲームのソースコードを覗く
emoji: 👀
topics: [renpy]
type:
published: true

createat: "2019-07-09T09:59:38+09:00"
updateat: "2019-11-26T01:36:27+09:00"
qiita: https://qiita.com/proudust/items/0f7aa74ade8f7f946223
---

翻訳のため、あるいは純粋な興味のために Ren'Py 製ゲームをアンパック・デコンパイルし、ソースコードを取り出す方法です。

## Ren'Py 製ゲームであることの確認方法

PC 版の場合、`exe` と同じ階層に `renpy` フォルダがあります。

```
[Ren'Py Game]
├ game/
├ lib/
│ └ windows-i686/
│   └ python.exe
├ renpy/
├ [Ren'Py Game].exe
└ [Ren'Py Game].sh
```

## Windows の場合

### 1. UnRen.bat を配置

[UnRen.bat](https://f95zone.to/threads/unren-bat-v0-7-rpa-extractor-rpyc-decompiler-console-developer-menu-enabler.3083/) をダウンロードし、 `game` フォルダに配置します。  
この時、PowerShell が無い、または `../lib/windows-i686/python.exe` が存在しない場合、エラーとなるので注意してください。  

### 2. `Extract RPA packages` を実行

UnRen.bat を起動し、`Enter a number:` が表示されたら、`1` を入力して `Enter` を押します。  
すると `game` フォルダ内の `.rpa` ファイルがアンパックされ、中の `.rpyc` ファイルやリソースファイルが展開されます。  

### 3. `Decompile rpyc files` を実行

続けて `key to exit:` で `1` を入力し、`Enter a number:` が表示されたら、`2` を入力して `Enter` を押します。  
すると `game` フォルダ内の `.rpyc` ファイルがデコンパイルされ、`.rpy` ファイルが展開されます。  

## Mac/Linux の場合

### 1. rpatool と unrpyc のダウンロード

[Shizmob/rpatool](https://github.com/Shizmob/rpatool) と [CensoredUsername/unrpyc](https://github.com/CensoredUsername/unrpyc) をダウンロードします。

### 2. `.rpa` ファイルをアンパック

以下のようなコマンドで rpatool を実行します。

```bash
python rpatool -x "アンパックするrpaファイル"
```

### 3. `.rpyc` ファイルをデコンパイル

同様に unrpyc も実行します。

```bash
python un.rpyc "デコンパイルしたいrpycファイル"
```

### 注意点

- python2 をインストールしていない場合は Ren'Py に同梱されている Python2 を利用してください。(`./lib/linux-x86_64/python`)
- rpatool や un.rpyc に path を通していない場合は相対パスに直してください。
- エラーになってしまう場合、ソースコードをダウンロードして実行するとうまくいくことがあります。

## ソースコードを覗く

`.rpy` ファイルは普通のテキストファイルなので、好きなエディタで編集できます。
 Ren'Py 用の拡張機能がある以下のエディタがおすすめです。

- [Atom](https://atom.io/) - [language-renpy](https://atom.io/packages/language-renpy)
- [VSCode](https://visualstudio.microsoft.com/ja/) - [Ren'Py Language](https://marketplace.visualstudio.com/items?itemName=LuqueDaniel.languague-renpy)
- [Sublime Text](https://www.sublimetext.com/) - [Renpy Language](https://packagecontrol.io/packages/Renpy%20Language)

### 参考

- [Ren'Py製ゲームの翻訳パッチ作成方法](https://steamcommunity.com/sharedfiles/filedetails/?id=1198526520)
