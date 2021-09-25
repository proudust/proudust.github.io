---
title: GitHub Actions で手動トリガーのワークフローを作る
emoji: 👷
topics: [github, githubactions]
type: tech
published: true

createat: "2019-11-26T14:58:06+09:00"
updateat: "2020-02-17T10:05:20+09:00"
qiita: https://qiita.com/proudust/items/51599abd2b107b708e1e
---

GitHub Actions は GitHub 内の様々なイベントをトリガーとして実行されるワークフローを設定できますが、現状手動で実行可能なワークフローを作成することはできません。
ですが、`repository_dispatch` や `deployment` イベントを使うことで、擬似的に手動で実行可能なワークフローを作成することができます。

## `repository_dispatch` と `deployment` の比較

| event               | 権限            | 発火ブランチ | 備考                          |
| ------------------- | --------------- | ------------ | ----------------------------- |
| repository_dispatch | public_repo     | master のみ  | `types:` による絞り込みが可能  |
| deployment          | repo_deployment | 指定ブランチ | GitHub Pages などとの併用不可 |

## `repository_dispatch` の場合

### 1. ワークフローのトリガーに `repository_dispatch` イベントを追加

今回は cron で毎日 0 時に実行されるワークフローを手動でも実行可能にしてみます。
`on:` に `repository_dispatch:` `types: [test_trigger]` を書き足して下さい。

``` diff
  name: Example workflow

  on:
+   repository_dispatch:
+     types: [test_trigger]
    schedule:
      - cron: "0 15 * * *"

  jobs:
    example:
      runs-on: ubuntu-latest

      steps:
        # 省略
```

### 2. 任意の HTTP クライアントで Repository API を叩く

GitHub の [Create a repository dispatch event](https://developer.github.com/v3/repos/#create-a-repository-dispatch-event) の API を叩きます。
curl の場合以下のようになります。

``` bash
curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
             -H "Content-Type: application/json" \
             https://api.github.com/repos/:user/:repo/dispatches \
             --data '{"event_type":"test_trigger","client_payload":{"test":true}}'
```

- `-H "Authorization: token $GITHUB_TOKEN"`  
  認証用の Personal access token を渡す。`$GITHUB_TOKEN` は `public_repo` の権限を持つ Personal access token に置き換えてください。(プライベートリポジトリの場合は `repo` 権限が必要です。)
- `--data '{"event_type":"test_trigger","client_payload":{"test":true}}'`  
  *event_type* は必須で、1.の `types:` で指定した文字列のいずれかにに完全一致する必要があります。  
  *client_payload* は省略可能で、ここに渡したデータは `${{ github.event.client_payload }}` から参照できます。

## `deployment` の場合

### 1. ワークフローのトリガーに `deployment` イベントを追加

`on:` に `deployment:` を書き足して下さい。

``` diff
  name: Example workflow

  on:
+   deployment:
    schedule:
      - cron: "0 15 * * *"

  jobs:
    example:
      runs-on: ubuntu-latest

      steps:
        # 省略
```

### 2. 任意の HTTP クライアントで Deployment API を叩く

GitHub の [Create a deployment](https://developer.github.com/v3/repos/deployments/#create-a-deployment) の API を叩きます。
curl の場合以下のようになります。

``` bash
curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
             -H "Content-Type: application/json" \
             https://api.github.com/repos/:user/:repo/deployments \
             --data '{"ref": "master"}'
```

- `-H "Authorization: token $GITHUB_TOKEN"`  
  認証用の Personal access token を渡す。`$GITHUB_TOKEN` は `repo_deployment` の権限を持つ Personal access token に置き換えてください。
- `--data '{"ref": "master"}'`  
  *ref* に指定されたコミットを対象にワークフローが実行されます。ブランチ名かタグ名、コミットハッシュを指定します。
  省略可能な *payload* や *environment* などの値は `${{ github.event.deployment }}` から参照できます。

### 注意点

- GitHub Pages が有効になっている場合、ソースブランチに指定されているブランチにコミットされることでも `deployment` イベントが発火されてしまいます。

## メモ

~~2019 年 11 月現在、`repository_dispatch` や `deployment` トリガーを `event_type` や `environment` などの値でフィルタリングしたり、ワークフロー内で参照したりはできないようです。
あるいはドキュメントに書かれていないだけかも？~~

(2019 年 2 月 3 日追記) 上記ドキュメントに書かれていないだけなことを [Repository Dispatch · Actions · GitHub Marketplace](https://github.com/marketplace/actions/repository-dispatch) で知ったので記事を大幅に更新しました。

## 元ネタ

- [Solved: GitHub Actions Manual Trigger / Approvals - GitHub Community Forum](https://github.community/t5/GitHub-Actions/GitHub-Actions-Manual-Trigger-Approvals/td-p/31504)
- [ブログのビルドをCircleCIからGitHub Actionsに変更した](https://blog.x39.dev/post/ci-chenge/)
