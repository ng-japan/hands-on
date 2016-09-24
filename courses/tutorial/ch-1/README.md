# Chapter 1: Introduction - Hello World

```
$ ng serve
```

Open `http://localhost:4200` 

## AppComponent

Look at `src/app/app.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
```

- Define `title` as an **instance property**
- Define `<app-root>` element by `selector: 'app-root'`
- Import template from `./app.component.html`
- Import style from `./app.component.css`

Look at `./app.component.html`

```html
<h1>
  {{title}}
</h1>
```

- `{{title}}`: **Interpolation** syntax to display data as text

Let's change the `title` value.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello Angular!';
}
```

After compilation, your browser will be reloaded automatically.
