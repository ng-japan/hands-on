# Todo App with Angular-CLI + Angular Material

このハンズオンは、**Angular-CLI**と**Angular Material**を使ったTODOアプリケーションを作成します。

## ハンズオンを始める前に

ハンズオンを円滑に進行するために、事前に開発環境の準備を行います。

このハンズオンに必要な開発環境は以下のとおりです

- Node.js 6系
- Angular-CLI
- JavaScript/TypeScriptのコーディングに適したテキストエディタ（[Visual Studio Code](https://code.visualstudio.com/)の使用をおすすめします。）

### Node.jsのインストール

[Node.js](https://nodejs.org/ja/)からお使いのOSに合わせたNode.jsをインストールしてください。

ターミナル(コマンドプロンプト)を開いて以下のコマンドが実行できればインストール成功です

```
$ node -v
v6.9.5
```

### Angular-CLIのインストール

このハンズオンでは、AngularのコマンドラインツールであるAngular-CLIを使います。
次のコマンドを実行してインストールしてください。

```
$ npm install -g @angular/cli
```

ただしくインストールされたかどうかを確認するために`ng version`コマンドを実行します

```
$ ng version
                             _                           _  _
  __ _  _ __    __ _  _   _ | |  __ _  _ __         ___ | |(_)
 / _` || '_ \  / _` || | | || | / _` || '__|_____  / __|| || |
| (_| || | | || (_| || |_| || || (_| || |  |_____|| (__ | || |
 \__,_||_| |_| \__, | \__,_||_| \__,_||_|          \___||_||_|
               |___/
@angular/cli: 1.0.0-beta.30
node: 6.9.5
os: darwin x64
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

1. [はじめに - Hello World](./ch-1/README.md)
1. [Todoタスクを表示しよう](./ch-2/README.md)
1. [Todoの状態を更新しよう](./ch-3/README.md)
1. [Todo作成フォームを作ろう](./ch-4/README.md)
1. [マテリアルデザインのライブラリを使おう](./ch-5/README.md)

## 参考リンク

- [angular/angular](https://github.com/angular/angular)
- [angular/angular\-cli: CLI tool for Angular2](https://github.com/angular/angular-cli)
- [Angular Material](https://material.angular.io)
- [angular/material2](https://github.com/angular/material2)
