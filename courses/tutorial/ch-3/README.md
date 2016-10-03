# Chapter 3: たくさんのヒーロー

ヒーローが1人では物足りないですね。
たくさんのヒーローを作り、ヒーローの一覧と詳細を表示するページを作りましょう。

## ヒーローのリストを作る

まずはヒーローを増やしましょう。 `src/app/app.component.ts` ファイルに次の変数を追加します。 

```ts
const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```

宣言した配列を `AppComponent` の `heroes` プロパティに代入しましょう。

```ts
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
}
```

## ヒーローの一覧を表示する

`AppComponent` のテンプレートを、一覧表示のために準備しましょう。

```html
<h2>My Heroes</h2>
<ul class="heroes">
  <li>
    <!-- 各ヒーローを表示する -->
  </li>
</ul>
```

### `ngFor`

配列の各要素を繰り返し表示するために、 組み込みの `*ngFor` ディレクティブを `<li>` 要素に付与します。

```html
<li *ngFor="let hero of heroes">
```

`*ngFor` ディレクティブの右辺には、JavaScriptの `for-of` に似た文を書きます。

```js
for (let hero of heroes) { 
}
```

あとはヒーローの情報を表示するための、内側の要素を挿入するだけです。

```html
<li *ngFor="let hero of heroes">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```

## 見た目を整える

`src/app/app.component.css` ファイルに次のスタイルシートを記入します

```css
.heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
}

.heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
}

.heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
}

.heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
}
```

それらしい見た目になりましたね。

## ヒーローを選択する

一覧画面ができたので、リストから選択したヒーローをエディターで編集できるようにしましょう。

まずは `AppComponent` に新しく `selectedHero` プロパティを追加します。

```ts
selectedHero: Hero;
```

### `click` イベントをハンドルする

ヒーローが選択されたことを知るために、 `<li>` 要素のクリックイベントを利用します。

テンプレート中でイベントハンドラを設定するには、 **イベントバインディング** 構文 `(event)` を使います。

```html
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```

イベントバインディングを使うと `()` で囲った名前のイベントのコールバックを、右辺の関数で受け取ることができます。
コンポーネントに `onSelect` メソッドを追加しましょう。
選択されたヒーローを `selectedHero` プロパティに代入します。

```ts
onSelect(hero: Hero): void {
  this.selectedHero = hero;
}
```

### 選択されたヒーローを表示する

前のチャプターで作成したヒーローエディターを、 `selectedHero` のために書き直して、テンプレートに追加します。

```html
<h2>{{selectedHero.name}} details!</h2>
<div><label>id: </label>{{selectedHero.id}}</div>
<div>
    <label>name: </label>
    <input type="text" [(ngModel)]="selectedHero.name">
</div>
```

ここでアプリケーションを見てみましょう。エラーが起きていますね？

```
TypeError: Cannot read property 'name' of undefined
```

`selectedHero` プロパティはヒーローが選択されるまで値を持っていないので、 `selectedHero.name` プロパティを参照できません。

### 非選択時にエディターを隠す 

エラーを解決するために、ヒーローが非選択のときはエディターを表示しないようにしましょう。
エディターのコンテナーとして `<div>` 要素を追加し、組み込みの `*ngIf` ディレクティブをセットします。

```html
<div *ngIf="selectedHero">
  <h2>{{selectedHero.name}} details!</h2>
  <div><label>id: </label>{{selectedHero.id}}</div>
  <div>
    <label>name: </label>
    <input type="text" [(ngModel)]="selectedHero.name">
  </div>
</div>
```

`*ngIf` の右辺の式が _truthy_ であるときだけ、内側のテンプレートが評価されます。 

## 選択されたヒーローのスタイルを変える

選択されたヒーローの `<li>` 要素に、自動的に `selected` クラスが付与されるようにしましょう。
状態によってクラスを動的に付与したり除去したりするには、**クラスバインディング** 構文 `[class.**]` を使います。 

```html
<li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```

選択されたヒーローのためにCSSを追加しましょう。

```css
.selected {
    background-color: #CFD8DC !important;
    color: white;
}

.heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
}
```

これでヒーローの一覧と詳細を表示するページが完成しました。

次のチャプターでは、大きくなってきた `AppComponent` をリファクタリングし、複数のコンポーネントで組み立ててみましょう。

[次へ進む](../ch-4/README.md)