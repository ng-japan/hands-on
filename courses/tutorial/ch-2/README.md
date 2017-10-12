# Chapter 2: ヒーローエディター

これからシンプルなヒーローエディターを作ります

## 「ヒーロー」を定義する

まずはヒーローを表すオブジェクトのインタフェースを定義します。
次のコマンドを実行して `Hero` インタフェース用のファイルを生成します。

```
$ ng g interface Hero
```

コマンドを実行すると、 `src/app/hero.ts` ファイルが生成されます。
最初は何もプロパティを持たない空のインタフェースです。

```ts
export interface Hero {
}
```

これからわたしたちが扱うヒーローは、 **id** と **name** を持つものとします。
`Hero`インタフェースにプロパティを追加しましょう

```ts
export interface Hero {
    id: number;
    name: string;
}
```

## 一人目のヒーロー

一人目のヒーローを、`AppComponent`クラスのプロパティとして宣言しましょう。

```ts
import { Component } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
```

変更したのは次の2点です。

- `title` プロパティを書き換えました
- `hero` プロパティを追加して、 _Windstorm_ を宣言しました.

## ヒーローを表示する

ヒーローを表示するために、 `AppComponent` のテンプレートを編集します。

```html
<h1>{{title}}</h1>

<h2>{{hero.name}} details!</h2>
<div><label>id: </label>{{hero.id}}</div>
```

補間構文 `{{}}` を使い、ヒーローの名前とIDを表示しています。

## ヒーローエディターを作成する

表示するだけでなく、ヒーローの名前を編集できるエディターにしましょう。

まず組み込みディレクティブを使うために `@NgModule` デコレータで `FormsModule` を読み込みます。

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

テンプレートにテキストボックスを追加し、組み込みの `ngModel` ディレクティブを使って `hero` プロパティのデータとテキストボックスのデータを**バインド**します。

```html
<h1>{{title}}</h1>
<h2>{{hero.name}} details!</h2>
<div><label>id: </label>{{hero.id}}</div>
<div>
  <label>name: </label>
  <input type="text" [(ngModel)]="hero.name">
</div>
```

テキストボックスのデータを書き換えると、同時に `{{hero.name}}` で表示しているテキストも変更されます。

これでヒーローエディターは完成です。次のチャプターに進みましょう！

[次へ進む](../ch-3/README.md)