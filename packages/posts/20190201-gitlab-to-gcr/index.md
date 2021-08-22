---
title: GitLab.com から Docker イメージを GoogleContainerRegistry に Push する
tags: [GitLab, GitLab CI]
createat: "2019-02-01T22:55:14+09:00"
updateat: "2019-03-03T18:50:29+09:00"
qiita: https://qiita.com/proudust/items/d94c60ec69dead927954
---

## はじめに

GitLab.com で作成したプロジェクトの Docker イメージを GCP で使用するため、Google Container Registry に push します。

## 1. 【GCP】アービスアカウントの取得

GitLab から GCR にアクセスするためのサービスアカウントを発行します。
GCP のプロジェクト > IAM と管理 > サービス アカウント > サービスアカウントを発行 から発行します。
![1-0.png](1-0.png)

### 1-1. サービス アカウントの詳細

サービス アカウント名とサービス アカウント ID、サービスアカウントの説明を設定します。
ここは自由に設定して OK です。
![1-1.png](1-1.png)

### 1-2. このサービス アカウントにプロジェクトへのアクセスを許可する

作成したサービスアカウントに、プロジェクトへのアクセス権を設定します。
ここでは**Project > 編集者**の権限を設定します。
Project > 参照者, Cloud Build > Cloud Build 編集者, ストレージ > ストレージ管理者の 3 つでもできるらしいですが私の環境ではうまく動いてくれませんでした。
![1-2.png](1-2.png)

### 1-3. ユーザーにこのサービス アカウントへのアクセスを許可

アクセス権を付与は無視し、GitLab からサービスアカウントへログインするためのキーの作成を行います。
種類に JSON を選び作成を押すと、JSON キーがダウンロードされます。

## 2. 【GitLab】環境変数の設定

GitLab のプロジェクト > 設定 > CI/CD > 変数から CI で利用する環境変数を設定します。
設定する変数は以下の 2 つです。

| 変数名                | 内容                                 |
| :-------------------- | :----------------------------------- |
| GCLOUD_SERVICE_KEY    | 1.で取得した JSON キーの内容をコピペ |
| PROJECT_ID_PRODUCTION | GCP のプロジェクト名                 |

## 3. 【GitLab】.gitlab-ci.ymlの記述

### 3-1. Cloud Buildを使用する場合

``` yaml:.gitlab-ci.yml
image: google/cloud-sdk:alpine

services:
  - docker:dind

before_script:
  - echo $GCLOUD_SERVICE_KEY > ${HOME}/gcloud-service-key.json
  - gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json
  - gcloud config set project $PROJECT_ID_PRODUCTION

build-master:
  stage: build
  script:
    - gcloud builds submit --tag "asia.gcr.io/$PROJECT_ID_PRODUCTION/$CI_PROJECT_NAME" .
  only:
    - master

build:
  stage: build
  script:
    - gcloud builds submit --tag "asia.gcr.io/$PROJECT_ID_PRODUCTION/$CI_PROJECT_NAME:$CI_COMMIT_REF_SLUG" .
  except:
    - master
```

`before_script` で gcloud の認証を行い、`stage: build` で Cloud Build を起動しています。
`gcloud config set project` を忘れると、権限が足りないというエラーが出るので気をつけましょう。(1 敗)

### 3-2. docker push コマンドを使用する場合

``` yaml:.gitlab-ci.yml
image: docker:latest

variables:
  DOCKER_DRIVER: overlay
  
services:
  - docker:dind

before_script:
  - apk add --update make ca-certificates openssl python
  - update-ca-certificates
  - wget https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz
  - tar zxvf google-cloud-sdk.tar.gz && ./google-cloud-sdk/install.sh --usage-reporting=false --path-update=true
  - google-cloud-sdk/bin/gcloud --quiet components update
  - google-cloud-sdk/bin/gcloud auth configure-docker
  - docker login -u _json_key -p "$GCLOUD_SERVICE_KEY" https://asia.gcr.io

build-master:
  stage: build
  script:
    - docker build --pull -t "asia.gcr.io/$PROJECT_ID_PRODUCTION/$CI_PROJECT_NAME" .
    - docker push "asia.gcr.io/$PROJECT_ID_PRODUCTION/$CI_PROJECT_NAME"
  only:
    - master

build:
  stage: build
  script:
    - docker build --pull -t "asia.gcr.io/$PROJECT_ID_PRODUCTION/$CI_PROJECT_NAME:$CI_COMMIT_REF_SLUG" .
    - docker push "asia.gcr.io/$PROJECT_ID_PRODUCTION/$CI_PROJECT_NAME:$CI_COMMIT_REF_SLUG"
  except:
    - master
```

`google/cloud-sdk:alpine` イメージで `docker build` を動かすほうが早いと思われますが、うまく動いてくれなかったため仕方なく `docker:latest` で `gcloud` をダウンロードしています。

### 参考

- [Build and Push images to GCP Container Registry with Gitlab CI](https://gist.github.com/foklepoint/2f9087375830068ec032ef326d93f423#gistcomment-2629289)
- [Publishing Google Cloud Container Registry Images from Gitlab CI](
https://medium.com/@gaforres/publishing-google-cloud-container-registry-images-from-gitlab-ci-23c45356ff0e)
