# Chapter 6: Routing

We add the Angular Component Router and learn to navigate among the views

We received new requirements for our Tour of Heroes application:

- Add a Dashboard view.
- Navigate between the Heroes and Dashboard views.
- Clicking on a hero in either view navigates to a detail view of the selected hero.
- Clicking a deep link in an email opens the detail view for a particular hero.
- When we’re done, users will be able to navigate the app like this:

When we’re done, users will be able to navigate the app like this:

![Routing \- ts](https://angular.io/resources/images/devguide/toh/nav-diagram.png)

## Splitting the AppComponent

Display of Heroes out of `AppComponent` and into its own `HeroesComponent`.

### HeroesComponent

- `app.component.ts` file to `heroes/heroes.component.ts` (also `.html` and `.css`)
- `AppComponent` class to `HeroesComponent`
- Selector `app-root` to `app-heroes`

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

### Create New `AppComponent`

Create new `app.component.ts` file 

```ts
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <app-heroes></app-heroes>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
}
```

Update `AppModule`'s `declarations`

```ts
declarations: [
  AppComponent,
  HeroDetailComponent,
  HeroesComponent
],
```

## Add Routing

We're ready to take the next step. Instead of displaying heroes automatically, we'd like to show them after the user clicks a button. In other words, we'd like to navigate to the list of heroes.

We'll need the Angular Component Router.

The Angular router is an external, optional Angular NgModule called RouterModule. The router is a combination of multiple provided services (RouterModule), multiple directives (RouterOutlet, RouterLink, RouterLinkActive), and a configuration (Routes). We'll configure our routes first.

### Configure routes

Define our first route as a route to the heroes component at `src/app.routing.ts` file

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

Export a routing constant initialized using the RouterModule.forRoot method applied to our array of routes.

```ts
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
```

### Make the router available

Import the routing constant from app.routing.ts and add it the imports array of AppModule.

```ts
imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  routing
],
```

### Router Outlet

We have to tell it where by adding a `<router-outlet>` element to the bottom of the template. 
`RouterOutlet` is one of the directives provided by the `RouterModule`. 
The router displays each component immediately below the `<router-outlet>` as we navigate through the application.

### Router Links

We don't really expect users to paste a route URL into the address bar. 
We add an anchor tag to the template which, when clicked, triggers navigation to the `HeroesComponent`.

Update the template of `AppComponent`

```ts
template: `
   <h1>{{title}}</h1>
   <a routerLink="/heroes">Heroes</a>
   <router-outlet></router-outlet>
  `
```

## Add a Dashboard

Create a placeholder `DashboardComponent` that gives us something to navigate to and from.

```
$ ng g component dashboard
```

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

### Configure the dashboard route

Import the dashboard component and add the following route definition to the `Routes` array of definitions.

```ts
{
  path: 'dashboard',
  component: DashboardComponent
},
```

#### redirectTo

We want the app to show the dashboard when it starts and we want to see a nice URL in the browser address bar that says `/dashboard`.
 Remember that the browser launches with `/` in the address bar.

We can use a redirect route to make this happen. Add the following to our array of route definitions:

```ts
{
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
},
```

#### ADD NAVIGATION TO THE TEMPLATE

Add a dashboard navigation link to the template, just above the _Heroes_ link.

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

## Dashboard Top Heroes

Update `DashboardComponent`'s template

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

### Get heroes

Open `dashboard.component.ts` and add the requisite `import` statements.

```ts
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
```

Implement the `DashboardComponent` class like this:

- Define a `heroes` array property.
- Inject the `HeroService` in the constructor and hold it in a private `heroService` field.
- Call the service to get heroes inside the Angular `ngOnInit` lifecycle hook.

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

## Navigate to Hero Details

- from the _Dashboard to a selected hero.
- from the _Heroes list to a selected hero.
- from a "deep link" URL pasted into the browser address bar.

### Configure a Route with a Parameter

Add a route to the `HeroDetailComponent` in `app.routing.ts` where our other routes are configured.

The new route is a bit unusual in that we must tell the `HeroDetailComponent` which hero to show. 
We didn't have to tell the `HeroesComponent` or the `DashboardComponent` anything.

```ts
{
  path: 'detail/:id',
  component: HeroDetailComponent
},
```

### Revise the `HeroDetailComponent`

Rewrite the `HeroDetailComponent`

First, add the requisite imports:

```ts
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
```

Let's have the `ActivatedRoute` service and the `HeroService` injected into the constructor, saving their values in private fields:

```ts
constructor(
  private heroService: HeroService,
  private route: ActivatedRoute) {
}
```

Inside the `ngOnInit` lifecycle hook, we use the params observable to extract the `id` parameter value from the `ActivatedRoute` service and use the `HeroService` to fetch the hero with that `id`.

```ts
ngOnInit(): void {
  this.route.params.forEach((params: Params) => {
    let id = +params['id'];
    this.heroService.getHero(id)
      .then(hero => this.hero = hero);
  });
}
```

### Add `HeroService#getHero`

Open `HeroService` and add a `getHero` method that filters the heroes list from `getHeroes` by `id`:

```ts
getHero(id: number): Promise<Hero> {
  return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.id === id));
}
```

### Find our way back

Add a `goBack` method that navigates backward one step in the browser's history stack.

```ts
goBack(): void {
  window.history.back();
}
```

Add to the bottom of the component template.

```html
<div *ngIf="hero">
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name"/>
  </div>
  <button (click)="goBack()">Back</button>
</div>
```

## Select a Dashboard Hero

Rewrite the `gotoDetail` method of the `DashboardComponent`. 

```ts
gotoDetail(hero: Hero): void {
  let link = ['/detail', hero.id];
  this.router.navigate(link);
}
```

Import the `router` reference and inject it in the constructor (along with the `HeroService`):

```ts
import { Router } from '@angular/router';
```

```ts
constructor(
  private router: Router,
  private heroService: HeroService) {
}
```

## Select a Hero in the HeroesComponent

Do something similar in the `HeroesComponent`.

- Delete the `<h1>` at the top (forgot about it during the `AppComponent`-to-`HeroesComponent` conversion).
- Delete the last line of the template with the `<my-hero-detail>` tags.

### Add the mini-detail

Add the following HTML fragment at the bottom of the template where the `<my-hero-detail>` used to be:

```html
<div *ngIf="selectedHero">
  <h2>
    {{selectedHero.name | uppercase}} is my hero
  </h2>
  <button (click)="gotoDetail()">View Details</button>
</div>
```

Update the component class along the same lines as the dashboard:

1. Import the `Router`
2. Inject the `router` in the constructor (along with the `HeroService`)
3. Implement the `gotoDetail` method by calling the `router.navigate` method

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

## Appendix: Styling the App

The app is functional but pretty ugly. Our creative designer team provided some CSS files to make it look better.

### A Dashboard with Style 

Update `dashboard.component.css`

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

### Stylish Hero Details

Update `hero-detail.component.css`

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

### Style the Navigation Links

Add a `app.component.css` file to the `app` folder with the following content.

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

Set the `AppComponent`’s `styleUrls` property to this CSS file.

```ts
styleUrls: ['./app.component.css'],
```

### Global application styles

Update `src/styles.css`

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

**Finished**
