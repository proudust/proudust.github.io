---
title: 柄にもなく2020年振り返りと来年の目標
tags: [自分語り]
---

## なにこれ

最近副業[^1]で関わってるプロジェクトの消火でめちゃくちゃ忙しいのですが、その影響なのか何なのかわかりませんが最近怪文書を書きがちです。  
お目汚しして申し訳ないというのもありますが、そろそろ口を滑らせて言ってはいけないことを書いてしまいそうで怖くなってきました。  
なので誰も読まないと思われるここで、一年を振り返るという体で怪文書執筆欲を消化しようという記事です。

私の記憶力の無さは筋金入りのため、事実と違うことを書いている可能性があるため注意してください。  
というかそもそも読まないでください。

[^1]: 本職は無職です（真顔）

## Doki Doki Literature Club!（邦題: ドキドキ文芸部！）関連

### 本編日本語化パッチ

昨年からメンテナンスを再開し、v1.1.1 対応や翻訳の更新、バグ修正などを行っています。  
今年は Ren'Py の仕様上不可能と思われていたヒストリーの言語切替対応を力技で実装しました。  
「文芸部で英語／日本語勉強しました！」とか言ってくださると、とても嬉しいですね！

またあるＶの方が踏んだ不具合を Twitter で偶然見かけて直したこともありました。  
あれは結局本編のバグだったので公式に報告したほうが良かったのかしら……？

大方バグは修正できましたが、パッチの容量大きい問題や、非ＰＣゲーマー以外に導入手順がわかりにくい問題が残っています。  
なんとかしたい、という気持ちはありますが、良さげな方法が思いつかないためおそらく来年もこのままでしょう。

- [proudust/ddlc-jp-patch](https://github.com/proudust/ddlc-jp-patch)

### Blinky Flappers

某カエルの人が面白そうなことをしていたので協力しました。  
と言ってもバグとかドキュメントの修正したくらいだった気がしますが。

口パク瞬きというのはかなり地味ではありますが、これがあるのとないのとでは読み手の印象が大分変わるように思います。  
特に追加要素があるわけではありませんが、再履修のお供にどうぞ。

- [yamamotoNEW/Blinky-Flappers-MOD: A fan-made mod which adds some face animations to all of the DDLC sprites and CGs.](https://github.com/yamamotoNEW/Blinky-Flappers-MOD)

### 三周年記念放送

公式の三周年記念放送が大方の予想を良い意味で裏切り、大いに盛り上がりました。  
私もあまりのことに興奮しすぎて、記念放送で行われた企画 *Twitch Writes*
の完成版を再現する MOD を配信終了から数時間で公開するという奇行に走っていました。  
この奇行に協力していただいた翻訳者の方々、本当にありがとうございました。

- [DDLC 3rd-anniversary Twitch Writes](https://github.com/proudust/ddlc-3rd-anniv-twitch-writes)

### Monika After Story 日本語化パッチ

三周年記念放送後くらいから有志の方々が再集結し、すごい勢いで翻訳が進んでいます。  
ただその勢いに私のチェックが追いついていないため、ちょびちょびクラッシュバグが発生しています。すみません。  
来年はこの問題にエンジニアらしく、プログラムによる自動チェックによって対策していきたいですね。

- [proudust/ddlc-mas-jp-patch](https://github.com/proudust/ddlc-mas-jp-patch)

## Dweller’s シリーズ

### Dweller’s Empty Path

本当は日本語化パッチ製作に深入りせず、某カエルの人に方法だけ伝えてトンズラするつもりでしたが、
ツクールが未だに多言語対応をサボってることが発覚したのでガッツリ関わらせてもらいました。  
ご協力いただいた翻訳者の方々、ありがとうございました。

全エンディング観られたわけではないですが、ヨキと個性豊かな住民たちの掛け合いがかなり好みです。  
次回作に向けて日本語化補助ツールの作成を思案中ですが、間に合うかな？

- [proudust/dwellers-empty-path-jp-patch](https://github.com/proudust/dwellers-empty-path-jp-patch)

### Escaped Chasm

スルーしていましたが、Dweller’s Empty Path にも登場するあるキャラクターの過去話なことが発覚したため、急遽プレイ＆日本語化が始まりました。  
このゲーム単品では雰囲気ゲーとしか言いようがありませんが、
Dweller’s Empty Path を先にプレイすることでようやく意味がわかったりわからなかったりするとんでも構成な話でした。  
Dweller’s Empty Path がグッと来た人にはぜひプレイしていただきたいですね。

- [proudust/escaped-chasm-jp-patch](https://github.com/proudust/escaped-chasm-jp-patch)

## プログラミング関係

### GitHub Actions で PR 自動作成時の問題の回避策考えた

[GitHub Actions](https://github.co.jp/features/actions) はくっそ便利で、DDLC 日本語化関連でもかなり活用させてもらっています。  
ただ一つ問題なのは、GitHub Actions からのコミットには Actions が走らないという仕様です。  
流石にそれは困るので回避策を調べたところ、以下の二つの方法がありました。

1. GitHub Actions 提供の Personal access tokens（以下 PAT）とは別に、手動で作成した PAT を作成し、それでコミットする。
2. SSH 鍵ペアを作成し、リポジトリごとに設定できる Deploy keys に公開鍵、Secret に秘密鍵を登録し、それでコミットする。

ぶっちゃけどちらでも良いのですが、PAT はユーザー単位、Deploy keys はリポジトリ単位のため、セキュリティ的に後者を選択するのが良いだろうという判断をしました。  
使用していた PR 自動作成 Action の [peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request)
に SSH 対応して❤という旨の Issue を立てたら良い感じに対応していただけたため現在に至ります。

何の話でしたっけ？まあ要するに PR 送るだけがコントリビュートじゃないぜという話ですね。そうだっけ？

- [Support push using ssh · Issue #103 · peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request/issues/103)

### Logicool ゲーミングソフトウェアの Chocolatey パッケージ作った

[Chocolatey](https://chocolatey.org/) は Windows 用パッケージマネジャです。Homebrew とか apt とか pacman とかの Windows 版ですね。  
新しいＰＣのセットアップの自動化のためや、純粋にアプリのインストールを楽にする目的で使用していました。  
なお、MS 公式が [アプリ インストーラー (winget)](https://www.microsoft.com/ja-jp/p/app-installer/9nblggh4nns1)
とかいうものを作ったので今はあまり使用していません。

で、こいつには Logicool ゲーミングソフトウェアが登録されておらず、代わりに海外版の Logitech Gaming Software[^2]
を使用していたのです。  
しかしいつの日からか文字化けするようになったので、仕方なく日本語版を別に登録してもらいました。

ちなみに G HUB とかいう後継ソフトも使ってみましたが、うまく動かなかったので諦めました。  
見た目は嫌いじゃないので今後の改善に期待したいです。

- [Chocolatey Software | Logicool Gaming Software 9.02.65](https://chocolatey.org/packages/logicoolgaming)

[^2]: 我々の知っている Logicool は海外メーカー Logitech の日本支社。エレコムの子会社のロジテックとは無関係なので注意。

### PrismJS に少し貢献した

ブログで Ren'Py のコード書いたらハイライトされなかったり、コマンドプロンプトのハイライトが若干バグってたので直しました。  
見返りに正規表現の難しさを教わりました。正規表現なんもわからん。

- [Ren'Py: Added `rpy` alias by proudust · Pull Request #2385 · PrismJS/prism](https://github.com/PrismJS/prism/pull/2385)
- [Batch: Fix escaped double quote by proudust · Pull Request #2485 · PrismJS/prism](https://github.com/PrismJS/prism/pull/2485)

### react-fontawesome に少し貢献した

これもブログ周りで困ったので、マージされてなかった PR を少し直して送りました。  
結局直した部分は使わなくなりましたが、まあ良いんじゃないかな、と。

- [Support for prop ref by proudust · Pull Request #341 · FortAwesome/react-fontawesome](https://github.com/FortAwesome/react-fontawesome/pull/341)
- [Accept rotation 0 by proudust · Pull Request #344 · FortAwesome/react-fontawesome](https://github.com/FortAwesome/react-fontawesome/pull/344)

### Ocelot1210/X4_ComplexCalculator で暴れまわった

友人の作ったスタンドアロン版 [X4: Foundations](https://store.steampowered.com/app/392160)
用計算機をリファクタリングしたり改造したり好き勝手しました。  
ぜんぜん物足りないので来年はもっと改造したいのですが、時間次第ですね……  
ちなみに好き勝手した報酬に X4: Foundations 本体と DLC の X4: Split Vendetta を貰いました。  
お前適当な理由をつけて布教したかっただけだろ！

ちなみに X4 の MOD、[Civilian Fleets](https://github.com/Vectorial1024/v1024_civilian_fleets)
に申し訳程度の日本語対応を追加したのは私です。  
その勢いで [Mules-and-Warehouses-Extended](https://github.com/proudust/Mules-and-Warehouses-Extended)
も日本語対応させようとしましたが、日本語にしたところでなんもわからんので止めました。

X4 は良くも悪くも洋ゲーといった感じのゲームでとにかく説明が無い！  
都合よく[つー助教授の動画シリーズ](www.nicovideo.jp/series/116190)が始まったのでなんとかなりましたが、
このとっつきにくさをなんとかしないと布教するのも大変です。  
またスペースコンバットシムというよりは経営シムの側面が強く、なんというかこの、欲張りさんめ！という感じのゲームです。  
動画見て面白そうかも！と思ったロールプレイ好きのあなたにだけおすすめしたいゲームですね。

- [Ocelot1210/X4_ComplexCalculator](https://github.com/Ocelot1210/X4_ComplexCalculator)

## 来年の目標

こいつ今年何もしてねえじゃん！ということを確認した上で来年の目標です。

### 翻訳補助ツールの作成

上記の通り最近チェック不足による不具合が多いため、チェックの自動化を進めています。  
自分用のツールのくせにやたら UI 凝ろうとしてるので少し時間かかるでしょうが、
集まってくださった女子Ｃ愛好家の皆様の熱意に追いつくためにも頑張りたい所存です……！

また、Dweller’s Empty Path の原文抽出は Translater++ というツールを使用していましたが、とにかく安定動作しません。  
手ミーさんゲー新作が出るまでに原文抽出ツールを作成しないと次作の翻訳も大変つらみにあふれてしまうので頑張ります。

後、最悪私が失踪しても次の人が引き継ぎやすい環境づくりをしておきたいですね。  
GitHub にソース置いているのはその一環なんですが、開発方法をドキュメント化していないので、
一部のエスパーにしかメンテナンス不可能になっています。  
なのでＰＣゲーマーがこのドキュメントの通りにやれば、
Win でも Mac でも Linux でも翻訳の更新反映とテストプレイ、ビルドくらいはできるぜ！
というくらいにしておきたいですね、と思っています。できるのか？無理でしょ。上手い方法考えます。

### X4_ComplexCalculator の改善

機能的には友人が頑張ったのでかなり良い感じだとは思うのですが、
やはり Windows でしか動かなかったり、いかにもレガシーウインドウズアプリケーションという外観がちょいつらみです。  
X4 がプレイできない Mac はともかく、スマホや Linux でも動作させたいなあというところに MS が新 UI ライブラリを
.NET 6 で出す、という話が出たため、それに向けてコードの整理をしていきたいなあと思っています。

また X4 内部のデータはほぼ全て XML で表現され、現在は XDocument を使用してパースしているのですが、
.NET 5 で null 許容参照型に対応した結果、真面目に警告を潰そうとするとなかなかつらい感じになってしまいました。  
一応 XmlSerializer を使えば任意のクラスにマッピングできますが、
こいつはデシリアライズ先クラスに引数なしコンストラクタが無いと使えない残念なやつなのであまり使いたくありません。  
勉強も兼ねて自力で良い感じの XML シリアライザ・デシリアライザを作って解決したいなあと思っていますが、
果たして来年中になんとかできるかどうか……

### AWS と和解する

趣味では無料範囲が多い Google Cloud のほうが好みなのですが、お仕事の場合はユーザー数の多く API が事実上の業界標準になった AWS のほうが有利です。  
日本政府もオンプレ AWS を採用するらしいため、AWS を学んだほうがお仕事いっぱいお金いっぱい夢いっぱいになりそうです。  
というわけでまずは AWS 認定頑張ろうと思います。  
とりあえず買った書籍を読み進めてますが、IPA 試験と同じで案外雰囲気でなんとかなったりするんですかね……？

## 長い

かなり長くなりました。怪文書書きたい欲もかなり発散できたのでは、と思います。  
後日冷静になって消すかもしれませんが、誰も読まないはずなので問題無いでしょう。  
本当は今年見たアニメや漫画の話でも書こうかとも思ったのですが、開発関係の話だけで長くなりすぎたので止めておきます。  
オタクさんそういうところあるよね……

まさかここまで読んで時間を無駄にした人類はいないと思いますが、一応ちゃんとしたあいさつで締めます。  
今年一年ありがとうございました。良いお年を。
