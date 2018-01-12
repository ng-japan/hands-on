# Chapter 1: Hello World!

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
  title = 'app';
}
```

ここでは次の4点に注目してください。

- クラスプロパティとして `title` プロパティが定義されている
- `selector: 'app-root'` によって、コンポーネントは `<app-root>` 要素として定義されている
- コンポーネントのテンプレートは `./app.component.html` から読み込んでいる
- コンポーネントのスタイルは `./app.component.css` から読み込んでいる

次に `./app.component.html` ファイルを見てみましょう

```html
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>
<h2>Here are some links to help you start: </h2>
<ul>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
  </li>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://github.com/angular/angular-cli/wiki">CLI Documentation</a></h2>
  </li>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
  </li>
</ul>

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
表示されるテキストが変わっていることが確認できたら、`./app.component.html` ファイルを以下のように変更して、シンプルにしましょう。

```html
<h1>
  {{title}}
</h1>

```

htmlを保存したタイミングでもコンパイルが始まり、自動的にページが再読込されます。
ページがシンプルになったことを確認したら、次のチャプターに進みましょう！

[次へ進む](../ch-2/README.md)
