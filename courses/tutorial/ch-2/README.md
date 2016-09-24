# Chapter 2: The Hero Editor

## Declare Hero Interface

```
$ ng g interface Hero
```

The command generates `src/app/hero.ts`.

```ts
export interface Hero {
}
```

Our hero has his **id** and **name**. Update the interface.

```ts
export interface Hero {
    id: number;
    name: string;
}
```

## Define Our First Hero

Edit `src/app/app.component.ts`

```ts
import { Component } from '@angular/core';

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

- Change `title`
- Add `hero` property and define _Windstorm_ hero.

## Display Hero

Edit `src/app/app.component.html`.

```html
<h1>{{title}}</h1>

<h2>{{hero.name}} details!</h2>
<div><label>id: </label>{{hero.id}}</div>
```

## Hero Editor

Edit `src/app/app.component.html`.

```html
<h1>{{title}}</h1>
<h2>{{hero.name}} details!</h2>
<div><label>id: </label>{{hero.id}}</div>
<div>
  <label>name: </label>
  <input [(ngModel)]="hero.name" placeholder="name">
</div>
```



