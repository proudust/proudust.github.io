---
title: JavaScript で ISO 8601 に準拠した週番号を計算する
tags: [JavaScript]
createat: "2019-06-25T11:02:03+09:00"
updateat: "2019-06-25T11:03:45+09:00"
qiita: https://qiita.com/proudust/items/a85b386b9899356b4c9c
---

ISO 8601 と言えば日付や時刻を `20190624` や `2019-06-24` 、`2019-06-24T09:00:00+09:00`というように表現する規格だ。
ISO 8601 では日付を表す方法は一般的な年月日による表現の他にも以下のような表現が用意されている。

- 年とその年の 1 月 1 日からの経過日数 (例: `2019-175`)
- 年と週番号、曜日番号(1=月曜日, 7=日曜日) (例: `2019-W26-1`)

今回は JavaScript を用いて、渡された `Date` から ISO 8601 の週番号を用いた文字列を返す関数を作成する。

## 定義

週番号を用いた表記は以下のように定義される

- 一週間は**月曜日**で始まり、**日曜日**で終わる
- その年の第一週は**最初の木曜日**を含む週
- そのため年の境目では、年月日の場合と異なる年を表記する場合がある (例: 2018 年 12 月 31 日は `2019-W01-1` となる)

## 実装

``` js
function dateToIso8601Week(date){
  // 引数のDateと同じ週の木曜日を計算
  // 259200000 = 3days * 24hour * 60min * 60s * 1000ms
  // 604800000 = 1week * 7days * 24hour * 60min * 60s * 1000ms
  const thursday = new Date(Math.ceil((date.getTime() - 259200000) / 604800000) * 604800000);

  // 木曜日と同じ年の1月1日を計算
  const firstDayOfYear = new Date(thursday.getFullYear(), 0, 1);

  // 木曜日がその年の第何週かを計算する
  const weekOfYear = Math.floor((thursday.getTime() - firstDayOfYear.getTime()) / 604800000) + 1;

  // 曜日をISO 8601に直す (jsは0=日~6=金、ISO 8601は1=月~7=日)
  const dayOfWeek = date.getDay() !== 0 ? date.getDay() : 7;

  // yyyy-Www-D 形式に直す
  return `${thursday.getFullYear()}-W${('0' + weekOfYear).slice(-2)}-${dayOfWeek}`;
}

// input: 2018-12-31
// output: 2019-W01-1
console.log(dateToIso8601Week(new Date(2018, 11, 31)));
```

## 参考文献

- [ISO 8601 - Wikipedia](https://ja.wikipedia.org/wiki/ISO_8601)
- [Date.prototype.getTime() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
- [JavaScriptでISO 8601形式の週番号を取得する - ltd.hatenablog.com](http://ltd.hatenablog.com/entry/2014/07/02/181833)
