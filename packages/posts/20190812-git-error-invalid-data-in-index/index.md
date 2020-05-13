---
title: Git リポジトリが "invalid data in index - incorrect header signature" と言われて開けない場合
tags: [Git]
createat: "2019-08-12T19:12:14+09:00"
updateat: "2019-08-12T19:12:14+09:00"
qiita: https://qiita.com/proudust/items/aee37867a10221b7b6f6
---

インデックスが壊れているだけなので、一度消した後に `git reset` すると直る。

```bash
rm .git/index
git reset
```
