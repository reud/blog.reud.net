# reud.net

ブログ管理用プロジェクト

```
(base) reud@MacBook-Pro-2 reud.net % tree -L 1
.
├── README.md: これ
├── contents(private submodule): ブログの記事が入っているリポジトリ
└── theme(public submodule): ブログのテーマが入っているリポジトリ 
```

## 運用方針メモ

submodule周りは分かりにくいのでやりたいことが出来るスクリプトをここに置いておく。

themeをpublic submoduleにしているのは、元リポジトリの変更に追従できるようにするため。

contentsをprivate submoduleにしているのは分かりやすさから。ディレクトリレベルで分けることでテーマを変えたりアプデした時の負担を大幅に減らすことが出来るはず

## テーマの更新


rebaseを基本的使って、相手のコミットを正として入れ込んだ後に自分のコミットを入れ込む

git fetchでmaster(main)のブランチを最新にした後にgit rebase master(main)で行けるはず

