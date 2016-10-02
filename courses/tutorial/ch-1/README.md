# Chapter 1: はじめに - Hello World

まずはAngularに慣れるために、はじめてのアプリケーションを動かしてみましょう。
Angular-CLIで生成したアプリケーションを起動するには、次のコマンドを実行します。

```
$ ng serve
```

コマンドを実行したら、Webブラウザで `http://localhost:4200` にアクセスしてみましょう。

「app works!」と表示されればアプリケーションが起動できています。

## AppComponent

それでは、アプリケーションを動かしたままソースコードを見てみましょう。
まず `src/app/app.component.ts` ファイルを開いてください。

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
```

ここでは次の4点に注目してください。

- クラスプロパティとして `title` プロパティが定義されている
- `selector: 'app-root'` によって、コンポーネントは `<app-root>` 要素として定義されている
- コンポーネントのテンプレートは `./app.component.html` から読み込んでいる
- コンポーネントのスタイルは `./app.component.css` から読み込んでいる

次に `./app.component.html` ファイルを見てみましょう

```html
<h1>
  {{title}}
</h1>
```

ここで使われている、 `{{title}}` は、データをテキストとして表示するための**補間**構文です。

では、 `title` プロパティを変更してみましょう。

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello Angular!';
}
```

ソースコードを保存するとコンパイルが始まり、Webブラウザは自動的にページを再読込します。
表示されるテキストが変わっていることが確認できたら、次のチャプターに進みましょう！

[次へ進む](../ch-2/README.md)