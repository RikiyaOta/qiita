-----
title: Qiita への記事投稿を GitHub Actions で自動化してみた
tags: [{"name": "GitHub", "versions": ["0.0.0"]}, {"name": "Deno", "versions": ["0.0.0"]}, {"name": "TypeScript", "versions": ["0.0.0"]}]
private: true
-----

# はじめに

まだまだ暑い日が続きますね。

さて、これから技術記事投稿をちょっとずつやっていこうかな〜なんて考えていたら、

「Qiita と Zenn、どっちにしようかな〜」

なんて考えてました。ちょっと調べていたら、

「お、Zenn は GitHub 連携できるんだ〜」
「Qiita は？」
「公式にはない？けど、GitHub で記事管理してる人はいるみたい」

って感じでした。

なので僕も今回、GitHub Actions 及び Deno/TypeScript の勉強も兼ねて、GitHub で管理する記事を Qiita にデプロイするワークフローを実装してみようと思い立ちました。

そんな記事です。

# やったこと概要

以下のことを実装しました：

- Qiita への記事投稿・記事更新・記事削除を実行する TypeScript コードを実装
- GitHub Actions のワークフロー作成

リポジトリは[こちら](https://github.com/RikiyaOta/qiita)になります。

以下では、実際に作ったものについて、GitHub Actions や Deno, TypeScript の初心者向けに解説してみようと思います。

# やったこと詳細

## TypeScript コード

ゆる〜い気持ちで DDD や CleanArchitecure を頭の片隅に置きつつ、以下のような構成にしました。

```
.
├── .github
│   └── workflows
│       └── deploy-articles-to-qiita.yml
├── main.ts
├── article_mappings.csv
├── articles
│   ├── articles.test.ts
│   └── create-github-workflow-for-deploying-articles-to-qiita.md # ← 今読んでいただいてる記事がこれ。
├── domain
│   ├── constant.ts
│   ├── entities
│   │   ├── createdArticle.ts
│   │   ├── deletedArticle.ts
│   │   ├── modifiedArticle.ts
│   │   ├── rawArticle.test.ts
│   │   └── rawArticle.ts
│   └─── repositories
│       ├── articleRepository.ts
│       └── rawArticleRepository.ts
├── infrastructure
│   └── repositories
│       ├── articleRepository.ts
│       ├── rawArticleRepository.ts
│       └── textFileRepository.ts
└── usecase
    ├── copyArticles.ts
    ├── createArticles.ts
    ├── deleteArticles.ts
    ├── modifyArticles.ts
    ├── renameArticles.ts
    └── usecase.ts
```

`.github/workflows/deploy-articles-to-qiita.yml`がまさに GitHub Actions で稼働させるワークフロー定義になります。これについてはのちに詳細を説明しますね。

### main.ts

ワークフローでの処理におけるエントリーポイントです。

記事が作成・更新・削除されたそれぞれのケースにおいて、`main.ts`に適切な引数を渡して処理を開始します。

### usecase/\*.ts

記事が作成、更新、削除などされるケースが考えられるため、それぞれの処理の概要を表現する層を作成しました。

`UseCaseProcessor` という interface を定義することでポリモーフィズムを実現しています。

### domain/\*\*/\*.ts

今回のドメイン知識は、

- 記事のファイルは Markdown で記述する(*.md)
- 記事のファイルの先頭には、記事のタイトルやタグ、限定公開か否かという情報を指定されたフォーマットで書く

といったところが重要なポイントになると考え、`RawArticle`というクラスにバリデーションの実装を入れ込みました。

また、記事の作成・更新・削除に対応した`CreatedArticle`, `ModifiedArticle`, `DeletedArticle`というクラスを用意しました。

CleanArchitecure を少し意識した点の一つに、「必ず内側のレイヤーに依存させる」という点があります。

つまり、domain や usecase のコードが infrastructure に依存するようなコードを書くことを避けました（今回まともな単体テスト書かなかったので、あんまり有り難みが無かったですが）。

ですので、よくあるやり方の通り、domain に Repository のインターフェースを定義し、Repository を使いたいクラスでは、インターフェースに依存するように定義しました。

### infrastructure/repositories/\*.ts

今回のアプリケーションにおいては、Qiita Web API をインフラ層と捉え、Qiita へのエンティティの永続化（作成、更新、削除）の責務を持つクラスをこちらに定義しました。

前述の通り、domain に定義した Repository Interface の実装になります。

## GitHub Actions

# この後

# おわりに

# 参考資料

