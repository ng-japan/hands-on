# Chapter 5: Service

We create a reusable service to manage our hero data calls

## Creating a Hero Service

Generate a service file:

```
$ ng g service hero
```

Generated files:

```
src/app
├── hero.service.spec.ts
├── hero.service.ts
```

Open `src/app/hero.service.ts` 

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {

  constructor() { }

}
```

### Getting Heroes

Add a getHeroes method _stub_.

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): void {} // stub
}
```

### Mock Heroes

Cut the `HEROES` array from `app.component.ts` and paste it to a new file in the app folder named `mock-heroes.ts`.

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

Update `heroes` property of `AppComponent`.

```ts
heroes: Hero[];
```

### Return Mocked Heroes

Import the mock `HEROES` and return it from the `getHeroes` method. 

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

## Use the Hero Service

Use the `HeroService` in other components starting with our `AppComponent`.

First, import the service.

```ts
import { HeroService } from './hero.service';
```

### Inject the HeroService

Add a constructor that also defines a private property.

```ts
constructor(private heroService: HeroService) { }
```

Open running app. Angular fail with an error

```
EXCEPTION: No provider for HeroService! (AppComponent -> HeroService)
```

Add to the `AppModule`'s providers metadata.

```ts
providers: [HeroService]
```

Call the service from `AppComponent`.

```ts
getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}
```

### `ngOnInit` Lifecycle hook

Angular will call it if we implement the Angular `ngOnInit` Lifecycle Hook.

Write an `ngOnInit` method with our initialization logic inside and leave it to Angular to call it at the right time. 

```ts
ngOnInit(): void {
  this.getHeroes();
}
```

## Async Services and Promises

When we do, we'll have to wait for the server to respond and we won't be able to block the UI while we wait, even if we want to (which we shouldn't) because the browser won't block.

We'll have to use some kind of asynchronous technique and that will change the signature of our getHeroes method.

We'll use Promises.

### The Hero Service makes a Promise

Update the `HeroService` with this Promise-returning `getHeroes` method.

```ts
getHeroes(): Promise<Hero[]> {
  return Promise.resolve(HEROES);
}
```

### Act on the Promise

Pass our callback function as an argument to the Promise's `then` method.

```ts
getHeroes(): void {
  this.heroService.getHeroes().then(heroes => this.heroes = heroes);
}
```

## Appendix: Simulate a slow connection

Add the following `getHeroesSlowly` method to the `HeroService`

```ts
getHeroesSlowly(): Promise<Hero[]> {
  return new Promise<Hero[]>(resolve =>
    setTimeout(resolve, 2000)) // delay 2 seconds
    .then(() => this.getHeroes());
}
```