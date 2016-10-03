# Chapter 4: 複数のコンポーネント

コンポーネントを分割し、アプリケーションのリファクタリングを行いましょう。

## ヒーロー詳細のコンポーネントを作る

今回は、ヒーローの詳細情報を表示するコンポーネントを作成します。
まずAngular-CLIを使ってコンポーネントのファイルを生成します。

```
$ ng g component hero-detail
```

コマンドを実行すると、次のファイルが生成されます。

```
src/app/hero-detail
├── hero-detail.component.css
├── hero-detail.component.html
├── hero-detail.component.spec.ts
└── hero-detail.component.ts
```

`src/app/hero-detail/hero-detail.component.ts` ファイルに `HeroDetailComponent` が宣言されています。 

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

### テンプレートを切り出す

`AppComponent` からエディター部分を切り取り、 `HeroDetailComponent` のテンプレートに貼り付けます。
このとき、 `selectedHero` を `hero` に書き換えておきます。

```html
<div *ngIf="hero">
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input type="text" [(ngModel)]="hero.name">
  </div>
</div>
```

### `hero` プロパティを追加する

テンプレートから呼び出す `hero` プロパティを追加します。

```ts
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
```

### `hero` プロパティを_入力_する

ヒーロー詳細のコンポーネントを作りましたが、ヒーローのデータを持っているのは `AppComponent` です。
`AppComponent` のテンプレートに `<app-hero-detail>` 要素を配置し、
**プロパティバインディング**構文を使って `hero` プロパティに選択したヒーローを渡します。

```html
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

プロパティバインディングを使うには、`hero` プロパティを `@Input` デコレーターで修飾する必要があります。

```ts
@Input() hero: Hero;
```

### コンポーネントを登録する

さて、ここで `src/app/app.module.ts` ファイルを見てみましょう。
今回作成した `HeroDetailComponent` は `@NgModule` デコレーターの `declarations` プロパティにセットされています。 
この配列は、アプリケーションのモジュールに属するすべてのコンポーネントやディレクティブ、パイプを登録するものです。
Angular-CLIのコマンドでコンポーネントを追加すると、自動的に `declarations` への登録も行われます。

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

コンポーネントの作り方とデータの渡し方を習得し、テンプレートを分割することができました。
次のチャプターでは**サービス**の作り方を学び、ヒーローのデータをコンポーネントの外から受け取るようにしてみましょう。

[次へ進む](../ch-5/README.md)