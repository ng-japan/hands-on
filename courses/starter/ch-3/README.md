# Chapter 2: Many Heroes

## Create Our Heroes

Append into `src/app/app.component.ts` 

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

Assign to the component's property.

```ts
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
}
```

## Display All Heroes

Edit `src/app/app.component.html`

```html
<h2>My Heroes</h2>
<ul class="heroes">
  <li>
    <!-- each hero goes here -->
  </li>
</ul>
```

### List them up with `ngFor`

Modify `<li>` tag by adding `*ngFor` built-in directive.

```html
<li *ngFor="let hero of heroes">
```

Similar to `for-of` stetement in JavaScript.

```js
for (let hero of heroes) { 
}
```

Insert inner content to display data of the hero.

```html
<li *ngFor="let hero of heroes">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```

## Style Our Heroes

Edit `src/app/app.component.css`

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

## Select a Hero

Define new property, `selectedHero`, in `AppComponent`.

```ts
selectedHero: Hero;
```

### Handle `click` event

Add `(click)` handler to `<li>` tag.

```html
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```

Define `onSelect` method in the component.

```ts
onSelect(hero: Hero): void {
  this.selectedHero = hero;
}
```

### Editor for Selected Hero

Append editor view into `src/app/app.component.html`

```html

<h2>{{selectedHero.name}} details!</h2>
<div><label>id: </label>{{selectedHero.id}}</div>
<div>
    <label>name: </label>
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
</div>
```

Error happened. :/ 

```
TypeError: Cannot read property 'name' of undefined
```

### Hide the Editor if Empty 

Add a `div` tag as a container and set `ngIf` built-in directive on it.

```html
<div *ngIf="selectedHero">
  <h2>{{selectedHero.name}} details!</h2>
  <div><label>id: </label>{{selectedHero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
  </div>
</div>
```

## Style the Selected Hero

Add new CSS 

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

Apply `.selected` class if the hero is selected.

```html
<li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```
