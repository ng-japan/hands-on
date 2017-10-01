# Chapter 6: ルーティング

Angularのコンポーネントルーターを使って、ビュー間の遷移について学びましょう

## アプリケーションをルーティングする

Tour of Heroesアプリケーションに新しく以下の要件が追加されました。

- _ダッシュボード_画面を追加する
- _ヒーロー一覧_と_ダッシュボード_の間で画面を遷移する
- ヒーローをクリックすると、選択したヒーローの詳細画面へ遷移する
- 特定のヒーローの詳細画面に_ディープリンク_できるようにする

すべての機能を実装すると、アプリケーションは次の図のような画面遷移を行うようになります。

![Routing \- ts](https://angular.io/generated/images/guide/toh/nav-diagram.png)

## `AppComponent` を分割する

まずは、ヒーロー一覧の表示を `AppComponent` から `HeroesComponent` に移動しましょう。

### `HeroesComponent` を作成する

次の手順にしたがって、現在の `AppComponent` の機能を 新しく作成する `HeroesComponent` に移します。

- `app.component.ts` ファイルを `src/app/heroes/heroes.component.ts` にリネームする (`.html` と `.css` も同様に)
- `AppComponent` クラスを `HeroesComponent` にリネームする
- `HeroesComponent` の `selector` を `app-root` から `app-heroes` に変更する

編集後の `heroes.component.ts` ファイルは次のようになります

```ts
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  // ...
}
```

### 新しい `AppComponent` を作成する

次に、画面遷移の起点となる新しい `AppComponent` を作成します。
`src/app/app.component.ts` ファイルを作成し、次のようにコンポーネントを作成しましょう。

```ts
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Tour of Heroes';
}
```

`src/app/app.component.html` ファイルも新しく作成し、次のようにテンプレートを記述します。

```html
<h1>{{title}}</h1>
<app-heroes></app-heroes>
```

`HeroesComponent` に切り出したヒーロー一覧を、 `<app-heroes>` タグで表示しています。

`AppComponent` を作成したら、 `AppModule` の `declarations` を更新して、必要なコンポーネントを登録します。

```ts
declarations: [
  AppComponent,
  HeroDetailComponent,
  HeroesComponent
],
```

## ルーティングを追加する

これでようやくルーティングを行う準備ができました。
自動的にヒーローたちを表示する代わりに、ユーザーがボタンをクリックすることで一覧画面へ遷移させましょう。
Angularのルーターは組み込みではない、オプショナルなモジュールです。
`RouterModule` というAngularモジュールから、複数のモジュールやディレクティブを提供しています。

まずはじめに、ルートの設定から行いましょう。

### ルートの設定

`src/app/app.routing.ts` ファイルを作成し、次のように一番最初のルートを定義しましょう。

```ts
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';

const appRoutes: Routes = [
    {
        path: 'heroes',
        component: HeroesComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
```

ルートの設定は、**path** と **component** をもつオブジェクトの配列で定義されます。
`path` はルーターがマッチさせるURLのパスを、 `component` はパスがマッチした時に用いられるコンポーネントを示しています。

このモジュールでは `RouterModule.forRoot` 関数を使って初期化したルーティングの定数をエクスポートしています。

### ルーターを導入する

定義したルーティングの定数を `AppModule` の `imports` 配列に追加して、ルーターを導入します。

```ts
imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  routing
],
```

### `RouterOutlet` を配置する

ルーティングを行うためには、ルーターがビューを切り替える場所を `<router-outlet>` 要素で教えてあげる必要があります。
`RouterOutlet` は `RouterModule` から提供されるディレクティブのひとつで、
ルーターは画面遷移のたびに、パスにマッチしたルートのコンポーネントを `<router-outlet>` 要素の直下に読み込んでくれます。

それではアプリケーションを起動して、アドレスバーに `localhost:4200/heroes` と入力してみましょう。
ルート設定にしたがい、ヒーロー一覧が表示されているはずです。

### `RouterLink` で遷移する

しかし毎回アドレスバーにパスを入力するわけにはいきません。
代わりに、 `HeroesComponent` へ遷移するためのアンカータグをテンプレートにを追加しましょう。

`AppComponent` のテンプレートを更新します。

```html
<h1>{{title}}</h1>
<a routerLink="/heroes">Heroes</a>
<router-outlet></router-outlet>
```

`routerLink` も `RouterModule` から提供されるディレクティブのひとつです。

## ダッシュボードを追加する

次はダッシュボードを作成しましょう。次のコマンドを実行します。

```
$ ng g component dashboard
```

コマンドを実行すると、 `src/app/dashboard/dashboard.component.ts` が生成されます。

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

機能を実装する前に、まずはルーティングに `DashboardComponent` を組み込むことからはじめましょう。

### ダッシュボードのルートを設定する

`HeroesComponent` と同じように、 `app.routing.ts` に `DashboardComponent` 用のルートを追加します。

```ts
{
  path: 'dashboard',
  component: DashboardComponent
},
```

#### `redirectTo`

さらに、ダッシュボードを初期の画面としたいので、 パスが空 (`/`) のときに `/dashboard` へリダイレクトするように設定を追加します。 

```ts
{
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
},
```

#### テンプレートにナビゲーションを追加する

`AppComponent` のテンプレートにダッシュボード用の `routerLink` を追加しましょう。

```ts
template: `
   <h1>{{title}}</h1>
   <nav>
     <a routerLink="/dashboard">Dashboard</a>
     <a routerLink="/heroes">Heroes</a>
   </nav>
   <router-outlet></router-outlet>
  `
```

## ダッシュボードに上位のヒーローを表示する

ダッシュボードは、上位4人のヒーローがひと目でわかるようなコンポーネントにしましょう。
テンプレートを次のように更新します。

```html
<h3>Top Heroes</h3>
<div class="grid grid-pad">
  <div *ngFor="let hero of heroes" (click)="gotoDetail(hero)" class="col-1-4">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </div>
</div>
```

`*ngFor` ディレクティブを使って、ヒーローを繰り返し表示しています。
ヒーローがクリックされたら、 `gotoDetail` メソッドが呼び出されるようにイベントバインディングも宣言しました。

### ダッシュボード用のヒーローを取得する

`dashboard.component.ts` ファイルに次の `import` 文を追加します。

```ts
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
```

そして `DashboardComponent` クラスを次のように実装します。

- `heroes` 配列をプロパティとしてもつ
- `HeroService` のインスタンスを `heroService` プロパティに注入する.
- `ngOnInit` ライフサイクルフックで、ヒーローのリストを取得する

上位4人のヒーローは、取得した配列をスライスして作成することにします。

```ts
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero): void { /* not implemented yet */ }
}
```

`gotoDetail` メソッドは宣言だけを行い、処理はのちほど追加します。
先にヒーロー詳細のルートを作成する必要があります。

## ヒーロー詳細へ遷移する

現在ヒーロー詳細は `HeroesComponent` の下部に配置されていますが、次の3つの経路から遷移できなければいけません。

- ダッシュボードからヒーローを選択する
- ヒーロー一覧からヒーローを選択する
- アドレスバーのURLに"ディープリンク" URLを入力する

これらを満たすために、ヒーロー詳細のルートを追加しましょう。

### パラメーター付きのルートを設定する

`HeroDetailComponent` へのルートを `app.routing.ts` に追加します。
この新しいルートは、どのヒーローを表示するかをコンポーネントに伝えるために、少し変わっています。 
コロン(`:`)がパスの中に含まれていますが、これはこの位置のパラメーターを `id` パラメーターとしてコンポーネントからアクセス可能にします。

```ts
{
  path: 'detail/:id',
  component: HeroDetailComponent
},
```

これですべてのルート設定がそろいました。

### `HeroDetailComponent` を改修する

`HeroDetailComponent` を書き直しましょう。まずは必要な `import` 文を追加します。

First, add the requisite imports:

```ts
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
```

そして、ルーターの状態を取得するための `ActivatedRoute` とヒーローのデータを取得するための `HeroService` をコンストラクタで注入します。

```ts
constructor(
  private heroService: HeroService,
  private route: ActivatedRoute) {
}
```

`ngOnInit` ライフサイクルフックの中で、`ActivatedRoute` から `id` パラメーターを抽出するために `params` を使い、
取得した `id` をもとに、 `HeroService` からヒーローのデータを取得します。

```ts
ngOnInit(): void {
  this.route.params.forEach((params: Params) => {
    let id = +params['id'];
    this.heroService.getHero(id)
      .then(hero => this.hero = hero);
  });
}
```

### `HeroService#getHero` メソッドを追加する

`HeroService` を開き、 `getHero` メソッドを追加します。
`getHero` メソッドは `getHeroes` メソッドで得たリストを `id` でフィルタリングします。

```ts
getHero(id: number): Promise<Hero> {
  return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.id === id));
}
```

### "戻る"手段を用意する

`goBack` メソッドを `HeroDetailComponent` に追加して、ブラウザの履歴をもとに前の画面に戻れるようにします。

```ts
goBack(): void {
  window.history.back();
}
```

`goBack` メソッドを呼び出すボタンは、テンプレートの下部に配置しましょう。

```html
<div *ngIf="hero">
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input type="text" [(ngModel)]="hero.name">
  </div>
  <button (click)="goBack()">Back</button>
</div>
```

## ダッシュボードからヒーローを選択する

`DashboardComponent` に戻り、書きかけだった `gotoDetail` メソッドに処理を追加しましょう。 

```ts
gotoDetail(hero: Hero): void {
  let link = ['/detail', hero.id];
  this.router.navigate(link);
}
```

`router` プロパティは、コンストラクタで `Router` サービスをインジェクトして取得します。

```ts
import { Router } from '@angular/router';
```

```ts
constructor(
  private router: Router,
  private heroService: HeroService) {
}
```

## `HeroesComponent` からヒーローを選択する

ダッシュボードと同じように `HeroesComponent` からもヒーロー詳細へ遷移します。
その前に、 `AppComponent` から移したままで、必要のない機能を削除します。

- タイトルを表示していた `<h1>` タグを削除する
- ヒーロー詳細を表示していた `<app-hero-detail>` タグを削除する

### 小さな詳細ビューを追加する

次のHTMLを `HeroesComponent` のテンプレートの下部に追加します。

```html
<div *ngIf="selectedHero">
  <h2>
    {{selectedHero.name | uppercase}} is my hero
  </h2>
  <button (click)="gotoDetail()">View Details</button>
</div>
```

次に、 `DashboardComponent` と同じように `gotoDetail` メソッドを実装します。

1. `Router` をインポートする
2. `router` プロパティに `Router` サービスを注入する
3. `gotoDetail` メソッドを実装し、 `router.navigate` メソッドを呼び出す

```ts
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
```

## おまけ: スタイルを整える

アプリケーションの機能は揃いましたが、見た目はイケてないですね。
デザイナーチームが提供するCSSを使ってスタイルを整えましょう。

### ダッシュボードのスタイル 

`dashboard.component.css` ファイルを更新します

```css
[class*='col-'] {
  float: left;
}
*, *:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
h3 {
  text-align: center; margin-bottom: 0;
}
[class*='col-'] {
  padding-right: 20px;
  padding-bottom: 20px;
}
[class*='col-']:last-of-type {
  padding-right: 0;
}
.grid {
  margin: 0;
}
.col-1-4 {
  width: 25%;
}
.module {
    padding: 20px;
    text-align: center;
    color: #eee;
    max-height: 120px;
    min-width: 120px;
    background-color: #607D8B;
    border-radius: 2px;
}
h4 {
  position: relative;
}
.module:hover {
  background-color: #EEE;
  cursor: pointer;
  color: #607d8b;
}
.grid-pad {
  padding: 10px 0;
}
.grid-pad > [class*='col-']:last-of-type {
  padding-right: 20px;
}
@media (max-width: 600px) {
    .module {
      font-size: 10px;
      max-height: 75px; }
}
@media (max-width: 1024px) {
    .grid {
      margin: 0;
    }
    .module {
      min-width: 60px;
    }
}
```

### ヒーロー詳細のスタイル

`hero-detail.component.css` を更新します

```css
label {
  display: inline-block;
  width: 3em;
  margin: .5em 0;
  color: #607D8B;
  font-weight: bold;
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: .4em;
}
button {
  margin-top: 20px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer; cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
button:disabled {
  background-color: #eee;
  color: #ccc; 
  cursor: auto;
}
```

### ナビゲーションリンクのスタイル

`app.component.css` ファイルを `app.component.ts` の隣に追加し、 次のCSSを記述します

```css
h1 {
  font-size: 1.2em;
  color: #999;
  margin-bottom: 0;
}
h2 {
  font-size: 2em;
  margin-top: 0;
  padding-top: 0;
}
nav a {
  padding: 5px 10px;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
  background-color: #eee;
  border-radius: 4px;
}
nav a:visited, a:link {
  color: #607D8B;
}
nav a:hover {
  color: #039be5;
  background-color: #CFD8DC;
}
nav a.active {
  color: #039be5;
}
```

作成したCSSファイルを、 `AppComponent` の `styleUrls` プロパティに追加します。

```ts
styleUrls: ['./app.component.css'],
```

### グローバルスタイル

`src/styles.css` も次のように記述します。

```css
/* Master Styles */
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
h2, h3 {
  color: #444;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
}
body {
  margin: 2em;
}
body, input[text], button {
  color: #888;
  font-family: Cambria, Georgia;
}
/* . . . */
/* everywhere else */
* {
  font-family: Arial, Helvetica, sans-serif;
}
```

これでTour of Heroesのチュートリアルは終了です。お疲れ様でした！

