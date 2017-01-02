# Tutorial: Tour of Heroes with Angular-CLI

このハンズオンは、Angular公式のチュートリアル「**Tour of Heroes**」をベースに行います。

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
`hello-angular`はただのディレクトリ名なので、好きな名前でかまいません。

```
$ ng new hello-angular
```

しばらく時間がかかりますが、最終的に現在のディレクトリの下に`hello-angular`ディレクトリが生成されているはずです。

最後に、生成したディレクトリに移動しておきます。

```
$ cd hello-angular
```

## 目次

1. [はじめに - Hello World](./ch-1/README.md)
2. [ヒーローエディター](./ch-2/README.md)
3. [たくさんのヒーロー](./ch-3/README.md)
4. [複数のコンポーネント](./ch-4/README.md)
5. [サービス](./ch-5/README.md)
6. [ルーティング](./ch-6/README.md)

## 参考リンク

- [angular/angular](https://github.com/angular/angular)
- [angular/angular\-cli: CLI tool for Angular2](https://github.com/angular/angular-cli)
- [Tutorial: Tour of Heroes \- ts](https://angular.io/docs/ts/latest/tutorial/)
