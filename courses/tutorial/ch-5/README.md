# Chapter 5: サービス

ヒーローのデータを管理するために、再利用可能な**サービス**を作りましょう。

## `HeroService` を作成する

前回と同様、まずはサービスを生成するコマンドを実行します。

```
$ ng g service hero
```

コマンドを実行すると、次のファイルが生成されます。

```
src/app
├── hero.service.spec.ts
├── hero.service.ts
```

`src/app/hero.service.ts` ファイルに `HeroService` が宣言されています。 

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {

  constructor() { }

}
```

### ヒーローを取得する

まずは生成されたサービスのインタフェースを決めましょう。
`HeroService` に `getHeroes` メソッドを追加します。

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): void {} // スタブ
}
```

### ヒーローのモックを作成する

`src/app/app.component.ts` から `HEROES` 配列を切り取り、 新しく `src/app/mock-heroes.ts` ファイルを作って貼り付けます。 

```ts
import { Hero } from './hero';

export const HEROES: Hero[] = [
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

`AppComponent` の `heroes` プロパティは宣言するだけにしておきます。

```ts
heroes: Hero[];
```

### モックのヒーローを返す

`src/app/hero.service.ts` ファイルに `import` 文を追加し、
さきほど作った `getHeroes` メソッドから、 `HEROES` を返すようにします。


```ts
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Hero[] {
    return HEROES;
  }
}
```

## `HeroService` を使う

`AppComponent` をはじめ、他のコンポーネントからも `HeroService` が使えるようにしましょう。

まず最初に、サービスを読み込みます。

```ts
import { HeroService } from './hero.service';
```

### `HeroService` を**注入**する

`HeroService` のインスタンスを手に入れるために、 `AppComponent` にコンストラクタを追加し、
プライベートプロパティを宣言します。

```ts
constructor(private heroService: HeroService) { }
```

サービスをコンポーネントのコンストラクタ引数に加えることで、Angularが生成したインスタンスをコンポーネントに渡してくれます。
アプリケーションを起動してみましょう。ただし、エラーを起こして止まっているはずです。

```
EXCEPTION: No provider for HeroService! (AppComponent -> HeroService)
```

今のままでは、Angularは `HeroService` 型のインスタンスを作る_レシピ_を知りません。
インスタンスのレシピを登録するには、 `AppModule` の `providers` にサービスを追加します。

```ts
providers: [HeroService]
```

サービスを登録したら、AppComponentに `getHeroes` メソッドを追加し、サービスからヒーローを取得しましょう。

```ts
// app.component.ts
getHeroes() {
  this.heroes = this.heroService.getHeroes();
}
```

追加した `getHeroes` メソッドは、コンポーネントの初期化のタイミングで呼び出す必要があります。
そのタイミングを用意してくれるのが `ngOnInit` ライフサイクルフックです

### `ngOnInit` ライフサイクルフック

コンポーネントに `ngOnInit` ライフサイクルフックが実装してあれば、 Angularが呼び出してくれます。
`ngOnInit` メソッドはコンポーネントの初期化のための正しいタイミングで呼び出されます。

```ts
ngOnInit(): void {
  this.getHeroes();
}
```

## 非同期的なサービスとPromise

現実的に考えると、ヒーローのデータはサーバーのデータベースに保存されていて、Webブラウザからリクエストを送り、レスポンスを待つ必要があります。
非同期的にヒーローを取得するように、 `getHeroes` メソッドのシグネチャーを、**Promise**を使うように変えましょう。

### Promiseを生成する

`HeroService` を編集し、 `getHeroes` メソッドがPromiseを返すようにします。

```ts
getHeroes(): Promise<Hero[]> {
  return Promise.resolve(HEROES);
}
```

### Promiseを扱う

コンポーネントは受け取ったPromiseの `then` メソッドに、コールバック関数を渡します。

```ts
getHeroes(): void {
  this.heroService.getHeroes().then(heroes => this.heroes = heroes);
}
```

これでヒーローのデータはコンポーネントから切り出され、どこでも再利用できるようになりました。

[次へ進む](../ch-6/README.md)

## おまけ: 遅い回線をシミュレートする

Promiseを使った非同期処理になったとはいえ、即座に値を返すので実感がありません。
あえて遅れて値を返して、遅い回線をシミュレートしてみましょう。

`HeroService` に次のような `getHeroesSlowly` メソッドを追加します

```ts
getHeroesSlowly(): Promise<Hero[]> {
  return new Promise<Hero[]>(resolve =>
    setTimeout(resolve, 2000)) // 2秒待つ
    .then(() => this.getHeroes());
}
```

コンポーネント側で、このメソッドを使ってみましょう。