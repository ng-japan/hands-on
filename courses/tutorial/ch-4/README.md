# Chapter 4: Multiple Components

We refactor the master/detail view into separate components

## Making a Hero Detail Component

Generate a component file:

```
$ ng g component hero-detail
```

Generated files:

```
src/app/hero-detail
├── hero-detail.component.css
├── hero-detail.component.html
├── hero-detail.component.spec.ts
└── hero-detail.component.ts
```

Open `src/app/hero-detail/hero-detail.component.ts` 

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

### HERO DETAIL TEMPLATE

Cut the Hero Detail content from AppComponent and paste it into the new template property of HeroDetailComponent.

```
<div *ngIf="selectedHero">
  <h2>{{selectedHero.name}} details!</h2>
  <div><label>id: </label>{{selectedHero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
  </div>
</div>
```

### ADD THE HERO PROPERTY

Add `hero` property to the component class;

```ts
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
```

### THE HERO PROPERTY IS AN INPUT

Update the AppComponent template so that it binds its selectedHero property to the hero property of our HeroDetailComponent.

```html
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

Annotate the `hero` property with the `@Input` decorator 

```ts
@Input() hero: Hero;
```

## Register Your Component

See `src/app/app.module.ts`.
`HeroDetailComponent` is Added to the `NgModule` decorator's `declarations` array. 
This array contains the list of all components, pipes, and directives that we created and that belong in our application's module.

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

