# Chapter 5: マテリアルデザインのライブラリを使おう

機能は揃いましたが見た目がシンプルなので、マテリアルデザインにリニューアルしてみましょう。
今回は、Angular MaterialというAngular公式のライブラリを使います。

## Angular Materialをインストールする

次のコマンドを実行して、Angular Materialをインストールします。

```
$ npm i -S @angular/material
```

インストールしたら、Angular Materialが提供するテーマCSSを、`src/styles.css`で読み込みます。

```css
@import '~@angular/material/core/theming/prebuilt/indigo-pink.css';
```

## MaterialModuleを読み込む

Angular Materialの機能を使うには、`@angular/materal`が提供する`MaterialModule`を読み込む必要があります。
`src/app/app.module.ts`を開き、`NgModule`デコレーターの`imports`に`MaterialModule.forRoot()`を追加します。

```ts
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

これで準備完了です。

## テキストボックスとボタンを置き換える

それでは順番にAngular Materialが提供するコンポーネントに置き換えていきます。
まずは`TodoFormComponent`のテキストボックスとボタンです。

`<input>`要素に対応するのは、`<md-input-container>`コンポーネントと、`mdInput`ディレクティブです。
`<input>`要素を`<md-input-container>`要素に囲み、`mdInput`属性を`<input>`要素に追加します。
また、`placeholder`属性を設定すると、ラベルとしても機能してくれます。

```html
<md-input-container>
    <input mdInput type="text" [(ngModel)]="title" placeholder="Title">
</md-input-container>
```

次はボタンです。こちらは、`<button>`要素に`md-button`属性を付与するだけです。

```html
<button md-button (click)="create()">Create</button>
```

## Todoリストを置き換える

`<ul>`要素と`<li>`要素は、それぞれ`<md-list>`要素と`<md-list-item>`要素に置き換えます。

```html
<md-list>
  <md-list-item *ngFor="let todo of todoList" [class.completed]="todo.completed">
    <input type="checkbox" [(ngModel)]="todo.completed">
    {{ todo.title }}
  </md-list-item>
</md-list>
```

チェックボックスは`<md-checkbox>`要素に置き換えます。
この時、`<md-checkbox>`要素の内側に`{{todo.title}}`を移動します。

```html
<md-checkbox [(ngModel)]="todo.completed">{{ todo.title }}</md-checkbox>
```

いい感じの見た目になってきましたね。次が最後のひと押しです。

## ツールバーを作る

最後に、今までただ`<h1>`要素で表示していたタイトルを、マテリアルデザインのツールバーにしてみましょう。
ツールバーは`<md-toolbar>`要素を使います。タイトル部分は`<span>`要素に変更し、テーマの_primary_カラーを使うように指定します。

```html
<md-toolbar color="primary">
  <span>{{title}}</span>
</md-toolbar>
```

あっという間に素敵なアプリケーションに生まれ変わりました。
これでこのハンズオンは終了です。お疲れ様でした！

## もっと知りたい人は

今回のハンズオンで使ったのは、Angularが提供する機能のごく一部です。
もっと深く知りたい人は、以下のドキュメントを参考にすると良いでしょう。

- [Angular Docs](https://angular.io/docs/ts/latest/)
- [Angular CLI](https://github.com/angular/angular-cli)
- [Angular Material](https://material.angular.io)
