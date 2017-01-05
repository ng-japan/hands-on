# Todo App with Angular-CLI + Angular Material

このハンズオンは、**Angular-CLI**と**Angular Material** を使ったTODOアプリケーションを作成します。

## ハンズオンを始める前に

ハンズオンを円滑に進行するために、事前に開発環境の準備を行います。

このハンズオンに必要な開発環境は以下のとおりです

- Node.js 6.x
- Angular-CLI 1.0.0-beta.24

### Node.jsのインストール

[Node.js](https://nodejs.org/ja/)からお使いのOSに合わせたNode.jsをインストールしてください。

ターミナル(コマンドプロンプト)を開いて以下のコマンドが実行できればインストール成功です

```
$ node -v
v6.9.1
```

### Angular-CLIのインストール

このハンズオンでは、AngularのコマンドラインツールであるAngular-CLIを使います。
次のコマンドを実行してインストールしてください。

```
$ npm install -g angular-cli
```

### ハンズオン用のプロジェクトを作成

ハンズオンで開発するプロジェクトを、Angular-CLIを使って生成します。
作業用のディレクトリを作成したい場所で、次のコマンドを実行してください。
`todo-app`はただのディレクトリ名なので、好きな名前でかまいません。

```
$ ng new todo-app
```

しばらく時間がかかりますが、最終的に現在のディレクトリの下に`todo-app`ディレクトリが生成されているはずです。

最後に、生成したディレクトリに移動しておきます。

```
$ cd todo-app
```

## 目次

1. [はじめに - Hello World]
2. [TODOタスクを表示しよう]
3. [ツールバーを追加しよう]
4. [TODOタスク作成画面を作ろう]
4. [レイアウトを整えよう]

## 参考リンク

- [angular/angular](https://github.com/angular/angular)
- [angular/angular\-cli: CLI tool for Angular2](https://github.com/angular/angular-cli)
- [Angular Material](https://material.angular.io)
- [angular/material2](https://github.com/angular/material2)
