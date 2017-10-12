# Tutorial: Tour of Heroes with Angular-CLI

このハンズオンは、Angular公式のチュートリアル「**Tour of Heroes**」をベースに行います。

## ハンズオンを始める前に

ハンズオンを円滑に進行するために、事前に開発環境の準備を行います。

このハンズオンに必要な開発環境は以下のとおりです

- Node.js 6.x
- Angular-CLI 1.3.x

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
$ npm install -g @angular/cli
```

`ng version`コマンドを実行し、正しいバージョンのAngular CLIがインストールされていることを確認してください。

```
$ ng version
    _                      _                 ____ _     ___
   / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
  / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
 / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
/_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
               |___/
@angular/cli: 1.0.1
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

### Appendix: Angular Language Serviceの準備

AngularにはテンプレートHTMLの記述を助ける**Language Service**という仕組みがあります。
使用するエディタがLanguage Serviceに対応していれば、非常にスムーズなAngular開発が可能です

#### Visual Studio Code

Visual Studio CodeにはAngular開発チーム公式のプラグインが用意されています。

[Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

このプラグインをインストールするだけで、Angular Language Serviceが使用可能になります。

#### WebStorm

WebStormの最新バージョンではビルトインでAngular Language Serviceが組み込まれています。
ただし使用するには対象のプロジェクトに `@angular/language-service` パッケージがインストールされている必要があります。
次のコマンドを実行するとパッケージをインストールできます

```
$ npm install --save-dev @angular/language-service
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
- [angular/angular\-cli: CLI tool for Angular](https://github.com/angular/angular-cli)
- [Tutorial: Tour of Heroes \- ts](https://angular.io/docs/ts/latest/tutorial/)
