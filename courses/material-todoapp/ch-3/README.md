# Chapter 3: Todoの状態を更新しよう

リストの表示はできましたが、このままではTodoを完了できません。
画面上でTodoの状態を変えられるようにしましょう。

## チェックボックスと状態を同期する

Todoの完了状態を更新するのに、新しくチェックボックスを配置してみましょう。
チェックボックスやテキストボックスのような、ユーザーからの入力を受けるHTML要素と、コンポーネントの状態を同期するために使うのが
組み込みの`ngModel`ディレクティブです。

`ngModel`は、**双方向データバインディング**を提供するディレクティブです。
双方向データバインディングは、 `[(ngModel)]`のように2つ括弧を使って記述します。

`<li>`要素の中に`<input>`要素を追加し、チェックボックスの状態と`todo.completed`を同期します。

```html
  <li *ngFor="let todo of todoList" [class.completed]="todo.completed">
    <input type="checkbox" [(ngModel)]="todo.completed">
    {{ todo.title }}
  </li>
```

アプリケーションを動かして、チェックボックスをクリックしてみましょう。

## コンポーネントとして切り出す

ここまで`AppComponent`がすべての仕事をしていましたが、見通しを良くするために、
Todoの表示を個別のコンポーネントとして切り出してみましょう。

次のコマンドを実行して`TodoListComponent`を生成します。

```
$ ng g component TodoList
```

新たに`src/app/todo-list/`ディレクトリが作成され、その中に一連のソースコードが生成されています。
まずは`AppComponent`のテンプレートからTodoリスト部分のテンプレートを移植します。

```html
<ul>
  <li *ngFor="let todo of todoList" [class.completed]="todo.completed">
    <input type="checkbox" [(ngModel)]="todo.completed">
    {{ todo.title }}
  </li>
</ul>
```

忘れずにCSSも移植します。

次に、`TodoListComponent`に`todoList`プロパティを追加します。
`Todo`インターフェースをimportするのを忘れないようにしましょう。
ただし、ここでは`todoList`はimportしません。

```ts
import { Component, OnInit } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: Todo[];

  constructor() { }

  ngOnInit() {
  }

}
```

ここまでできたら、`AppComponent`のテンプレートに、`<app-todo-list>`コンポーネントを配置します。

```html
<h1>
  {{title}}
</h1>

<app-todo-list></app-todo-list>
```

当然ながら、このままでは`TodoListComponent`の`todoList`プロパティに値がないので、リストは何も表示されません。
今Todoリストのデータを持っているのは親である`AppComponent`なので、`AppComponent`から`TodoListComponent`にデータを渡します。

## 子コンポーネントにデータを渡す

というわけで、子のコンポーネントのプロパティにデータを渡す方法を学びましょう。
親から子にデータを渡すためには、まず子の側にデータを受け取る口を作っておく必要があります。
そのための機能が`Input`デコレーターです。

`Input`デコレーターは`@angular/core`モジュールからimportします。
プロパティに`Input`デコレーターを付与することで、そのプロパティが親から入力可能になります。

```ts
import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todoList: Todo[];

  constructor() { }

  ngOnInit() {
  }

}
```

受け取り口ができたら、あとは親からデータを渡します。
子のコンポーネントのプロパティにデータを渡すには、**プロパティバインディング**構文を使います。
`<app-todo-list>`要素に`[todoList]="todoList"`という属性を付与します。

```html
<h1>
  {{title}}
</h1>

<app-todo-list [todoList]="todoList"></app-todo-list>
```

Todoリスト部分を切り出して、`AppComponent`がシンプルになりました。次のチャプターに進みましょう！

[次へ進む](../ch-4/README.md)

## Appendix: CSSのスコープ化

ところで、Angularには自動的にCSSを_スコープ化_する機能があります。
つまり、コンポーネントのCSSは、外部に漏れ出さないということです。
試しに、`AppComponent`のテンプレート中で`completed`CSSクラスを使ってみましょう。
あるいは、`app.component.css`に新たにスタイルを追加して、それが`TodoListComponent`に影響しないことも確かめてみるとよいでしょう。