# Tutorial: Tour of Heroes with Angular-CLI

このハンズオンは、Angular公式のチュートリアル「**Tour of Heroes**」をベースに行います。

## ハンズオンを始める前に

ハンズオンを円滑に進行するために、事前に開発環境の準備を行います。

### Node.jsのインストール

[Node.js](http://nodejs.org/)からお使いのOSに合わせたNode.jsをインストールしてください。

ターミナル(コマンドプロンプト)を開いて以下のコマンドが実行できればインストール成功です

```
$ node -v
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

1. [はじめに - Hello World](./ch-1)
2. [ヒーローエディター](./ch-2)
3. [たくさんのヒーロー](./ch-3)
4. [複数のコンポーネント](./ch-4)
5. [サービス](./ch-5)
6. [ルーティング](./ch-6)

## 参考リンク

- [angular/angular](https://github.com/angular/angular)
- [angular/angular\-cli: CLI tool for Angular2](https://github.com/angular/angular-cli)
- [Tutorial: Tour of Heroes \- ts](https://angular.io/docs/ts/latest/tutorial/)
