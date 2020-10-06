---
title: winget で vscode をインストールする
tags: [Windows]
---

## 普通にインストール

``` batch
winget install -e vscode
```

## インストーラを表示すらしない

``` batch
winget install -e vscode --override /verysilent
```

## カスタムインストール

``` batch
winget install -e vscode --override "/silent /mergetasks=\"パラメータ\""

REM [Code で開く] を追加する場合
winget install -e vscode --override "/silent /mergetasks=\"addcontextmenufiles,addcontextmenufolders\""
```

### パラメータ

複数指定する場合はカンマ区切り

| パラメータ            | 説明                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------- |
| desktopicon           | デスクトップ上にアイコンを作成する                                                       |
| addcontextmenufiles   | エクスプローラーのファイル コンテキストメニューに [Code で開く] アクションを追加する     |
| addcontextmenufolders | エクスプローラーのディレクトリ コンテキストメニューに [Code で開く] アクションを追加する |
| associatewithfiles    | サポートされているファイルの種類のエディタとして、Code を登録する                        |
| addtopath             | PATH への追加（再起動後に使用可能）                                                      |

## 参考

- [chocolatey-community/chocolatey-coreteampackages](https://github.com/chocolatey-community/chocolatey-coreteampackages/tree/2ba176c9966f116c7e98156060b2035bd3aabc4d/automatic/vscode.install)
