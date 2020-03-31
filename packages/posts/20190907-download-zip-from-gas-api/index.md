---
title: GAS で zip を返す API を作りたかった
createat: "2019-09-07T15:22:25+09:00"
updateat: "2019-09-13T16:53:39+09:00"
qiita: https://qiita.com/proudust/items/5f19501ccb12b7dd0cba
---

ただの備忘録です

## `doGet`から ZIP をダウンロードできるようにしたかった

GAS では HTTP アクセスを受け付けるウェブアプリ的なものが作成できますが、以下の要件を満たす必要があります。

> **Requirements for web apps**
> A script can be published as a web app if it meets these requirements:
>
> - It contains a `doGet(e)` or `doPost(e)` function.
> - The function returns an HTML service `HtmlOutput` object or a Content service `TextOutput` object.
>
> (雑な日本語訳)
> **ウェブアプリの要件**
> 以下の要件を満たしている場合、スクリプトをウェブアプリとして公開できます。
>
> - `doGet(e)`または `doPost(e)` 関数があります。
> - これらの関数は HTML サービスの `HtmlOutput` オブジェクトまたはコンテンツ・サービスの `TextOutput` オブジェクトを返します。
>
> [Web Apps | Apps Script | Google Developers](https://developers.google.com/apps-script/guides/web#requirements_for_web_apps)

つまり HTML ファイルでもプレーンテキストでもない ZIP ファイルを返してダウンロードことはできません。

## base64 エンコードする

仕方ないのでみんな大好き base64 エンコードします。

``` ts
const file = Utilities.newBlob('', 'text/plain', 'test.txt').setDataFromString('test', 'utf-8');
const zip = Utilities.zip([file], 'test');
const base64 = Utilities.base64Encode(zip.getBytes());
return ContentService.createTextOutput()
  .setContent(base64)
  .setMimeType(ContentService.MimeType.TEXT);
```

URL の発行時は**次のユーザーとしてアプリケーションを実行:**を**自分**、**アプリケーションにアクセスできるユーザー:**を**全員（匿名ユーザーを含む）**に設定することで、認証が不要になります。（つまり URL さえ知っていれば誰でもアクセスできてしまうので注意。）

後はダウンロードする側でデコードすれば普通の ZIP になります。

``` bash
GAS_URL=# GAS の URL
curl -L ${GAS_URL} | base64 -d > test.zip
unzip test.zip
cat test.txt
test
```
