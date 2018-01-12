# Chapter 5: マテリアルデザインのライブラリを使おう

機能は揃いましたが見た目がシンプルなので、マテリアルデザインにリニューアルしてみましょう。
今回は、Angular MaterialというAngular公式のライブラリを使います。

## Angular Materialをインストールする

次のコマンドを実行して、Angular Materialをインストールします。

```
$ npm install --save @angular/material @angular/cdk
```

インストールしたら、Angular Materialが提供するテーマCSSを、`src/styles.css`で読み込みます。

```css
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
```

## 必要なモジュールを読み込む

Angular Materialの機能を使うには、`@angular/materal`が提供する各種モジュールを読み込む必要があります。
`src/app/app.module.ts`を開き、`NgModule`デコレーターの`imports`に
`BrowserAnimationsModule`,`MatFormFieldModule`,`MatInputModule`,`MatButtonModule`,`MatCheckboxModule`,`MatListModule`,`MatToolbarModule`
を追加します。

また、`@angular/materal`のいくつかのモジュールは、AngularのAnimationモジュールに依存しているので、
`@angular/platform-browser/animations`が提供する`BrowserAnimationsModule`もimportします。

```ts
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatListModule, MatToolbarModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoFormComponent} from './todo-form/todo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

これで準備完了です。

## テキストボックスとボタンを置き換える

それでは順番にAngular Materialが提供するコンポーネントに置き換えていきます。
まずは`TodoFormComponent`のテキストボックスとボタンです。

`<input>`要素に対応するのは、`<mat-form-field>`コンポーネントと、`matInput`ディレクティブです。
`<input>`要素を`<mat-form-field>`要素に囲み、`matInput`属性を`<input>`要素に追加します。
また、`placeholder`属性を設定すると、ラベルとしても機能してくれます。

```html
<mat-form-field>
  <input matInput [(ngModel)]="title" placeholder="Title">
</mat-form-field>
```

次はボタンです。こちらは、`<button>`要素に`mat-button`属性と`color`属性を付与するだけです。

```html
<button mat-button color="primary" (click)="create()">create</button>
```

`mat-raised-button`属性にすれば、浮き上がってさらに目立つボタンになります。

```html
<button mat-raised-button color="primary" (click)="create()">Create</button>
```

## Todoリストを置き換える

`<ul>`要素と`<li>`要素は、それぞれ`<mat-list>`要素と`<mat-list-item>`要素に置き換えます。

```html
<mat-list>
  <mat-list-item *ngFor="let todo of todoList" [class.completed]="todo.completed">
    <input type="checkbox" [(ngModel)]="todo.completed">
    {{ todo.title }}
  </mat-list-item>
</mat-list>
```

チェックボックスは`<mat-checkbox>`要素に置き換えます。
この時、`<mat-checkbox>`要素の内側に`{{todo.title}}`を移動します。

```html
<mat-checkbox [(ngModel)]="todo.completed">{{ todo.title }}</mat-checkbox>
```

いい感じの見た目になってきましたね。次が最後のひと押しです。

## ツールバーを作る

最後に、今までただ`<h1>`要素で表示していたタイトルを、マテリアルデザインのツールバーにしてみましょう。
ツールバーは`<mat-toolbar>`要素を使います。タイトル部分は`<span>`要素に変更し、テーマの_primary_カラーを使うように指定します。

```html
<mat-toolbar color="primary">
  <span>{{title}}</span>
</mat-toolbar>
```

あっという間に素敵なアプリケーションに生まれ変わりました。
これでこのハンズオンは終了です。お疲れ様でした！

## もっと知りたい人は

今回のハンズオンで使ったのは、Angularが提供する機能のごく一部です。
もっと深く知りたい人は、以下のドキュメントを参考にすると良いでしょう。

- [Angular Docs](https://angular.io/docs/ts/latest/)
- [Angular CLI](https://github.com/angular/angular-cli)
- [Angular Material](https://material.angular.io)
