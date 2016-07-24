## はじめに
このハンズオンではAngular 2公式の[チュートリアル](https://angular.io/docs/ts/latest/quickstart.html)をベースに行います。
開発環境は[ハンズオン用のベースプロジェクト](https://github.com/ng-japan/ng2-hands-on-seed)を使用します。

Angularのバージョンは、作成時の最新版である2.0.0-rc.4を使用しています。

## 準備
わかるところまでやっておいてもらえるとスムーズに進行できて助かります。

### Node.jsのインストール

[Node.js](http://nodejs.org/)からお使いのOSに合わせたNode.jsをインストールしてください。

ターミナル(コマンドプロンプト)を開いて以下のコマンドが実行できればインストール成功です

```
node -v
```

### プロジェクトのダウンロード  

GitHubからクローンする方法

```
git clone git@github.com:ng-japan/ng2-hands-on-seed.git ng2-hands-on
```

Zipをダウンロードする方法

[Zipでダウンロード](https://github.com/ng-japan/ng2-hands-on-seed/archive/master.zip)

### プロジェクトのセットアップ  

ダウンロードしたプロジェクトのディレクトリで次のコマンドを実行します
 
```
cd ng2-hands-on/courses/quickstart
npm install
```

## 1. まずは肩慣らし
早速、Angular 2アプリの構成単位となるComponentを実装してみましょう。
新しくappディレクトリを作成し、その中に `app.component.ts` というファイルを追加してください。
.tsはTypeScriptファイルの拡張子です。
追加したファイルに以下のようなコードを実装してください。

```ts
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent { }
```

さて、`import`、`@Component(…)`、`export`、`class AppComponent {}`といきなり見慣れないコードが並んでいるかもしれません。
これらは、JavaScriptの新しい構文を先取りしたものになります。
`import`と`export`はモジュール関連の構文、`class`はクラス定義の構文です。
`@`から始まる部分はデコレータといって、ここでは`AppComponent`クラスに`Component`としての機能を付け加えるような役割をしています。

Angular 2の最小のコンポーネントはこれだけです。
`template`の中身を自分の好きな文字列やHTMLにしても大丈夫ですよ。

このComponentを画面に表示してみましょう。
appディレクトリに`main.ts`というファイルを追加します。
中身は以下の通りです。

```ts
import { bootstrap }    from '@angular/platform-browser-dynamic'
import { AppComponent } from './app.component'

bootstrap(AppComponent);
```

2行目で先ほど`app/app.component.ts`で定義した`AppComponent`を読み込んでいます。
そして、`bootstrap`という関数に`AppComponent`を与えています。
これで`AppComponent`を使う準備は整いました。

ここで、`index.html`の`body`は以下のようになっています。

```html
<body>
    <my-app>Loading...</my-app>
</body>
```

`<my-app></my-app>`という見慣れないタグがありますね。
これは`app/app.component.ts`で`selector: 'my-app'`と書いていた部分に対応します。
つまり、`<my-app></my-app>`と書いてある部分に`AppComponent`の内容が入ります。

それでは `npm start` コマンドを実行してアプリケーションを実行してみましょう。
ちゃんと`template`に書いた内容が表示されたでしょうか？

Angular 2の基本は、このようにComponentを作ることとComponentを使うことだけです。

## 2. Webアプリを作ろう

ここまでは簡単すぎましたか？
Angularの魅力をもっと知るために、ユーザーの入力があって、複数ページから構成されるようなWebアプリの実装に進みましょう。

まずは完成図を見てください。

https://angular.io/resources/live-examples/tutorial/ts/plnkr.html

これが、Angular 2を使って、全部で200行ぐらいのTypeScriptで実装されています。
順に実装していきましょう。

### 2-1. データバインディング

`app.component.ts`の内容を以下のように変更してください。

```ts
import { Component } from '@angular/core';

class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <div><input [(ngModel)]="hero.name" placeholder="name"></div>
    </div>
  `
})
export class AppComponent {
  public title = 'Tour of Heroes';
  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
```

また新しい構文がいくつか出てきました。

まず最初に`Hero`クラスを定義しています。
ここでは、`Hero`は数値型の`id`と文字列型の`name`を持つことを宣言しています。
型が出てきてTypeScriptらしくなってきました。
TypeScriptをコンパイルすると型のエラーがわかるので大規模な開発がやりやすくなります。

次に、`template`の文字列を`'`でも`"`でもなく、`` ` ``で囲っています。
これはテンプレートリテラルという構文です。
本来は、文字列の中に変数の値を埋め込むための構文ですが、テンプレートリテラルの中は自由に改行できるので、`template`のように複数行にわたる長い文字列を書くときには便利です。

前は`AppComponent`の中身が空でしたが、今回は`title`と`hero`というプロパティを持っています。
そして、テンプレートの中に`{{title}}`や`{{hero.name}}`といった記述があります。
`AppComponent`のプロパティがこれらの場所に展開されます。

`[(ngModel)]="hero.name"`も見慣れない記法ですよね。
ここでは`ngModel`という双方向バインディングのための組み込みDirectiveを利用しています。
双方向バインディングによって、フォームの値変更が即座にモデル(`AppComponent`のプロパティ)の値に反映され、表示文字列も変更されます。

双方向バインディングはAngular 1系でも売りの一つでした。
フレームワークを使わずに双方向バインディングを実装するとなると結構大変です。

### 2-2. テンプレートの繰り返しと条件分岐

次は、Heroを一つじゃなくてリスト表示し、なおかつクリックして選択したHeroの詳細情報を表示するようにしましょう。

`app/app.component.ts`を以下のように書き換えます。

```ts
import { Component } from '@angular/core';

class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
    <li [class.selected]="hero === selectedHero" *ngFor="let hero of heroes" (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
    </ul>
    <div *ngIf="selectedHero">
    <h2>{{selectedHero.name}} details!</h2>
    <div><label>id: </label>{{selectedHero.id}}</div>
    <div>
        <label>name: </label>
        <input [(ngModel)]="selectedHero.name" placeholder="name"/>
    </div>
    </div>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
  selectedHero: Hero;
  onSelect(hero: Hero) { this.selectedHero = hero; }
}

var HEROES: Hero[] = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];
```

`AppComponent`の中身も、`heroes`というリストを定義して、その中から一つのヒーローを選択するというロジックを追加しています。

`template`の中にも新しい要素がいくつか出ています。

まず、`*ngFor="let hero of heroes"`という部分は`heroes`リストの1件1件について、以下の要素を生成します。

```html
<li [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```

今、`heroes`が10個の要素を持っているので、10個の`li`要素が生成されます。

この中に[class.selected]="hero === selectedHero"と(click)="onSelect(hero)"という記述があります。 
一つ目は、hero === selectedHeroがtrueのときselectedというクラスが要素に追加されるようにしています。 
二つ目は、clickのイベント時にonSelect(hero)という処理が実行されるようにしています。

次に、`selectedHero`の詳細を表示する部分に`*ngIf="selectedHero"`という記述があります。
最初は`selectedHero`が`undefined`なので、Heroが選択されるまえは表示しないようにしています。
つまり、`selectedHero`が`true`として評価されるときだけ中身の要素が生成されます。
この詳細部分でHeroの名前を変更するとリストにも反映されることが確認できると思います。

このように、テンプレートにデータを結びつけることで画面の表現力を持たせています。

### 2-3. 子コンポーネント

さて、Componentの機能が増えてきて徐々に見通しがわるくなってきました。
一つ一つのComponentをシンプルに保つことは開発のメンテナンス性を高める上で重要です。
そこで、Heroの詳細を表示する機能をひとまとまりとしてComponentの分割を行ってみます。
このComponentを子Componentとして、親Componentである`AppComponent`から利用します。

まず、`Hero`クラスは子コンポーネントと親コンポーネントの両方で使用したいので、新たなファイルに移しましょう。
`app/hero.ts`を作り、以下のような中身にします。

```ts
export class Hero {
  id: number;
  name: string;
}
```

次に子Componentの実装です。
新たに`app/hero-detail.component.ts`を作り、内容を以下の通りにします。

```ts
import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
        <h2>{{hero.name}} details!</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="hero.name" placeholder="name"/>
        </div>
    </div>
`,
})
export class HeroDetailComponent {
  @Input() hero: Hero;
}
```

また、`app/app.component.ts`を以下のように修正します。

```ts
import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
    <li [class.selected]="hero === selectedHero" *ngFor="let hero of heroes" (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
  directives: [HeroDetailComponent]
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
  selectedHero: Hero;
  onSelect(hero: Hero) { this.selectedHero = hero; }
}

var HEROES: Hero[] = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];
```

`HeroDetailComponent`を`import`し、`directives`パラメータに与えることでテンプレートで使用可能にしています。
`HeroDetailComponent`の`hero`に`selectedHero`を与えています。
機能はそのままで、ちょっとスッキリしました。

### 2-4. Service

Componentは画面の表示に集中するべきです。
Componentから画面表示と関係の薄いロジックを切り離すことで、変更に強い開発ができるようになります。
Angular 2では、このようなロジックをServiceとして定義することができます。

Serviceとは具体的にどのようなものでしょうか。
実用的なWebアプリでは、サーバと通信をしてデータベースからデータの取得をしたりすると思います。
例えば、このようなデータ取得のロジックはServiceに切り出すことができます。

ただし、今回の例ではサーバやデータベースまでは用意しないので、どこからともなくデータを取得したことにしてくれるServiceを作ってみます。
このダミーデータを`app/mock-heroes.ts`に以下のように定義します。

```ts
import { Hero } from './hero';

export const HEROES: Hero[] = [
    {"id": 11, "name": "Mr. Nice"},
    {"id": 12, "name": "Narco"},
    {"id": 13, "name": "Bombasto"},
    {"id": 14, "name": "Celeritas"},
    {"id": 15, "name": "Magneta"},
    {"id": 16, "name": "RubberMan"},
    {"id": 17, "name": "Dynama"},
    {"id": 18, "name": "Dr IQ"},
    {"id": 19, "name": "Magma"},
    {"id": 20, "name": "Tornado"}
];
```

次にServiceの定義です。
`app/hero.service.ts`を作り、以下のような内容にします。

```ts
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {
  getHeroes() {
    return Promise.resolve(HEROES);
  }
  // See the "Take it slow" appendix
  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }
}
```

`@Injectable`デコレータをつけることで`HeroService`にServiceとしての役割をもたせます。

そして、`app/app.component.ts`の中身を以下のように修正して`HeroService`を利用します。

```ts
import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
    <li [class.selected]="hero === selectedHero" *ngFor="let hero of heroes" (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
  providers: [HeroService],
  directives: [HeroDetailComponent]
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private _heroService: HeroService) { }

  getHeroes() {
    this._heroService.getHeroes()
        .then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}
```

`providers`パラメータに`import`した`HeroService`を登録しています。

`constructor`で`AppComponent`が生成された時に`HeroService`のインスタンスを`private`なプロパティとして保持します。

また、`OnInit`というインタフェースを実装していることに気づいたかもしれません。
これはAngular 2の提供するComponent Lifecycle Hookの一つです。
ここでは、`AppComponent`がComponentとして初期化されるタイミングで`ngOnInit`メソッドが呼び出されます。
`ngOnInit`では`HeroService`を利用してHeroのリストを取得しています。

これによって、Heroの取得処理をServiceに切り離すことができました。

### 2-5. Routing

Componentの組み立て方はわかってきましたか？
それでは、複数のComponentを使って、複数ページから構成されるWebページを作ってみましょう。

![routing](https://angular.io/resources/images/devguide/toh/nav-diagram.png)

ここでは以下の手順に従って、複数の画面を作っていきます。

- `AppComponent`をアプリケーションの枠として作り直し、ナビゲーションにのみ用いるようにする
- 現在の`AppComponent`の機能を`HeroesComponent`として分離する
- ルートの設定を追加する
- 新しく`DashboardComponent`を作成する
- 作成した`DashboardComponent`をナビゲーションに組み込む

#### `AppComponent`の修正

まずは現在の`AppComponent`をリネームし、`HeroesComponent`としましょう。
ファイル名も、`app.component.ts`から`heroes.component.ts`に変更します。
さらに、`@Component`の`selector`も`my-heroes`に変更します。

**app/heroes.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  template: `
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
    <li [class.selected]="hero === selectedHero" *ngFor="let hero of heroes" (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private _heroService: HeroService) { }

  getHeroes() {
    this._heroService.getHeroes()
        .then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}
```

次に、`AppComponent`を新しく作ります。
`AppComponent`がもともと担っていた機能は`HeroesComponent`に移ったので、
`AppComponent`では`<my-heroes>`コンポーネントを配置するだけになります。
`<h1>`タグはアプリケーションのタイトルなので`HeroesComponent`のテンプレートから移動しましょう。

この時、 `HeroesComponent`の`providers`も`AppComponent`に移動しましょう。
DIされるクラスは`providers`ごとにインスタンス化されるので、
基本的には最上位の`AppComponent`の`providers`に書くようにします。

**app/app.component.ts**

```ts
import { Component }       from '@angular/core';
import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <my-heroes></my-heroes>
  `,
  directives: [HeroesComponent],
  providers: [
    HeroService
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
```

これで`AppComponent`の機能を`HeroesComponent`に分離することができました。

#### ルート設定

ここからいよいよルーティングを行っていきます。
ルーティングには、URLとそれに対応するコンポーネントを紐付けるため、
ルートの設定が必要です。
ルートの設定を記述するためのファイルを`app.routes.ts`として、appディレクトリ内に作成しましょう。

**app/app.routes.ts**

```ts
import { provideRouter, RouterConfig }  from '@angular/router';
import { HeroesComponent } from './heroes.component';

const routes: RouterConfig = [
  {
    path: 'heroes',
    component: HeroesComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
```

`@angular/router`パッケージでは、ルーティングは`RouteConfig`という型で定義します。
基本的には`RouteConfig`はpathとcomponentのセットの配列で、
今回はまず、`/heroes`というパスにアクセスされたときに`HeroesComponent`が表示されるようにします。

定義したルート設定は、`provideRouter`という関数に引数として渡し、その戻り値をProviderとして使用します。
ルーティングに関係するプロバイダはアプリケーションの起動時に必要となるので、
main.tsの`bootstrap`関数の第2引数に渡します。

**app/main.ts**

```ts
import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';

bootstrap(AppComponent, [
  appRouterProviders
]);
```

仕上げとして、ルーティングによってコンポーネントを切り替えるための場所を用意します。
`RouterOutlet`というコンポーネントが置かれた位置に、ルーティングによって選ばれたコンポーネントが読み込まれます。
`AppComponent`を次のように書き換えましょう。
テンプレート内で直接配置していた`HeroesComponent`を外し、
代わりに`ROUTER_DIRECTIVES`から提供される`<router-outlet>`と`routerLink`を使用します。

```ts
import { Component }       from '@angular/core';
import { HeroService }     from './hero.service';
import { ROUTER_DIRECTIVES } from '@angular/router';
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <a [routerLink]="['/heroes']">Heroes</a>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HeroService
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
```

さて、ブラウザでアプリケーションを開くと、最初はリンクだけが表示されます。
リンクをクリックして`/heroes`に移動すると、`HeroesComponent`が表示されるはずです。

#### ダッシュボードの追加

新しくダッシュボード画面を作りましょう。
まずは単純なコンポーネントを`dashboard.component.ts`として作成します

**app/dashboard.component.ts**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-dashboard',
  template: '<h3>My Dashboard</h3>'
})
export class DashboardComponent { }
```

そして、ルート設定に`DashboardComponent`用のルートを追加します。

```ts
{
    path: 'dashboard',
    component: DashboardComponent
},
```

また、パスがない状態でアクセスしたときに、`/dashboard`にリダイレクトするように設定します。

```ts
{
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
},
```

`AppComponent`のテンプレートにも、`/dashboard`用のリンクを追加しておきましょう。

```ts
  <h1>{{title}}</h1>
  <nav>
    <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
    <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
  </nav>
  <router-outlet></router-outlet>
```

`DashboardComponent`をルーティングで表示することができたので、内容を作っていきましょう。
ダッシュボードではトップ4人のヒーローが表示されるという仕様にします。

これまでコンポーネントのテンプレートはすべてtsファイル中に記述していましたが、
`DashboardComponent`では外部のHTMLファイルに分離してみましょう。
`app/dashboard.component.html`ファイルを作成し、次のテンプレートを記述します。

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

そして、`DashboardComponent`の`template`を`templateUrl`に書き換え、
HTMLファイルのパスを渡します。

```ts
  templateUrl: 'app/dashboard.component.html',
```

`HeroesComponent`と同様に、`HeroService`からヒーローのリストを取得するように書きなおせばとりあえず完成です。
ただし、ダッシュボードからヒーローをクリックした時の処理はまだ実装されていません。
ここには、ダッシュボードからヒーローの詳細画面への遷移の処理を書く必要があります。

```ts
import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }
  ngOnInit() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
  gotoDetail() { /* not implemented yet */}
}
```

#### 詳細画面

ヒーローの詳細はこれまで`<my-hero-detail>`コンポーネントを使っていましたが、
これはまだルーティングに組み込まれておらず、テンプレート中で呼び出すしかありません。
`HeroDetailComponent`も`/detail/11`のようなURLでアクセスできるようにしましょう。

```ts
{
    path: 'detail/:id',
    component: HeroDetailComponent
},
```

`:`で始まる部分は、パラメータとしてコンポーネント側で受け取ることができます。
ここではヒーローのIDをパラメータとして受け取り、そのIDを元に詳細を表示するヒーローを判別します。
`HeroDetailComponent`は`Hero`のオブジェクトを直接`Input`として受け取っていましたが、
ルーターからIDを受け取り、サービスからIDを元にヒーローを取得するように修正しましょう。

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
    selector: 'my-hero-detail',
    template: `
    <div *ngIf="hero">
        <h2>{{hero.name}} details!</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="hero.name" placeholder="name"/>
        </div>
    </div>
`,
})
export class HeroDetailComponent {
    hero: Hero;
    sub: any; // rxjs.Subscription
    
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
```

もちろん`HeroService`側にも`getHero(id)`というメソッドを追加します。

```ts
getHero(id: number) {
  return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.id === id));
}
```

詳細画面から戻るためのボタンも追加してみましょう。
ブラウザのHistoryAPIを使って前の画面に戻るためのメソッドを`HeroDetailComponent`に追加します。

```ts
goBack() {
  window.history.back();
}
```

`goBack`メソッドをテンプレートから呼び出しましょう。
また、`HeroDetailComponent`のテンプレートもHTMLファイルに分離してみましょう。

```html
<div *ngIf="hero">
  <h2>{{hero.name}} details!</h2>
  <div>
    <label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name" />
  </div>
  <button (click)="goBack()">Back</button>
</div>
```

最終的に`HeroDetailComponent`は次のようになります

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  hero: Hero;
  sub: any;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack() {
    window.history.back();
  }
}
```

#### ナビゲーション
ダッシュボードから詳細画面へ移動する処理を、テンプレートではなくコンポーネントの処理として書いてみましょう。
さっきまで何も実装されていなかった`DashboardComponent`の`gotoDetail`メソッドを次のようにします。

```ts
gotoDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
}
```

`this.router`を使うために、新しくimport文とコンストラクタ引数を追加しましょう

```ts
import { Router } from '@angular/router';

...

constructor(
  private router: Router,
  private heroService: HeroService) {
}
```

`router.navigate`メソッドは`routerLink`と同じように、ナビゲーションを実行することができます。

ダッシュボード画面でヒーローをクリックすると詳細画面へ移動するようになっているはずです。

#### `HeroesComponent`からの遷移

最後に、`HeroesComponent`からも詳細画面へ遷移できるようにしましょう。
これまでは同じ画面に`HeroDetailComponent`が表示されていましたが、
代わりに`/detail/:id`へ遷移するためのボタンを置くことにします。

`HeroesComponent`もテンプレートを`heroes.component.html`に分離し、
次のようにします。

```html
<h2>My Heroes</h2>
<ul class="heroes">
    <li [class.selected]="hero === selectedHero" *ngFor="let hero of heroes" (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
</ul>
<div *ngIf="selectedHero">
    <h2>
        {{selectedHero.name | uppercase}} is my hero
    </h2>
    <button (click)="gotoDetail()">View Details</button>
</div>
```

そしてコンポーネント側に`gotoDetail`メソッドを実装します。

```ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(
    private router: Router,
    private heroService: HeroService) { }
  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit() {
    this.getHeroes();
  }
  onSelect(hero: Hero) { this.selectedHero = hero; }
  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
```

これで当初の計画通り、3画面での移動が完成しました。

## おわりに

駆け足でしたが、現時点で公開されているAngular 2のチュートリアルを通しでやってみました。
Componentの扱いといった基本的なことや、Serviceの分離とRoutingなどの大規模開発に必要な要素は一通り押さえられたと思います。

もっと詳しく知りたい人は[Angular 2のサイト](https://angular.io)も読んでみてください。
公式のQuickStartには今回触れなかった項目がいくつかありますので、おさらいを兼ねてもう一度[QuickStart](https://angular.io/docs/ts/latest/tutorial/)をやってみると良いかもしれません。
