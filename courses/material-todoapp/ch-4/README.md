# Chapter 4: Todo作成フォームを作ろう

新たに入力フォームを作り、新しいTodoを作成できるようにしましょう。

## TodoFormComponentを作成する

今回ははじめからコンポーネントを分けて作ってみましょう。
次のコマンドで`TodoFormComponent`を作成します。

```
$ ng g component TodoForm
```

そして`<app-todo-form>`要素を`AppComponent`のテンプレートに追加します。

```html
<h1>
  {{title}}
</h1>

<app-todo-form></app-todo-form>
<app-todo-list [todoList]="todoList"></app-todo-list>
```

`todo-form works!`と表示されれば準備完了です。フォームの中身を作りましょう。

## ボタンのクリックイベントを受け取る

Todo作成フォームと言っても、必要なのはテキストボックスとボタンだけです。
まずは簡単に`<input>`要素と`<button>`要素を配置しましょう。

```html
<input type="text"> 
<button>Create</button>
```

次に、ボタンのクリックイベントを取得します。
HTML要素からイベントを取得するには**イベントバインディング**構文を使います。
クリックイベントを取得するには、`(click)`属性を`<button>`要素に追加して、右辺にコンポーネントのメソッドを指定します。

```html
<button (click)="create()">Create</button>
```

`TodoFormComponent`に`create()`メソッドを追加しましょう。今はデバッグ用にアラートダイアログの表示だけを行います。

```ts
export class TodoFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  create() {
    alert("create!");
  }

}
```

## テキストボックスと双方向データバインディングする

`<input>`要素のテキストをコンポーネントの中で使うために、先ほど使った`ngModel`を再び使います。
`TodoFormComponent`に`title`プロパティを追加し、`ngModel`の双方向データバインディングの対象にします。


```html
<input type="text" [(ngModel)]="title"> 
```

バインディングが成功したことがわかるように、`create()`メソッドで表示するアラートで`title`プロパティを表示してみましょう。

```ts
export class TodoFormComponent implements OnInit {

  title: string;

  constructor() { }

  ngOnInit() {
  }

  create() {
    alert(this.title);
  }

}
```

## Todoを作成してリストに追加する

最後に、`create()`メソッドをきちんと実装し、Todoリストに追加されるようにしましょう。
しかし、`TodoFormComponent`はTodoリストを持っていません。
リストに新しいTodoを追加するには、`AppComponent`に新しいTodoの作成をお願いする必要があります。
つまり、今度は**子から親へ**のデータを送るため、**イベント**を発火します。

親から子へデータを渡すときは`Input`デコレーターを使いましたが、子から親にイベントを発火するには`Output`デコレーターを使います。
今回は`submit`というイベントを定義します。
イベントの定義は、`EventEmitter`型のプロパティに、`Output`デコレーターを付与します。
`EventEmitter`ではイベントとして渡すデータの型をジェネリクスで指定します。

```ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  title: string;

  @Output() submit = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  create() {
    alert(this.title);
  }

}

```

イベントを発火するには、`EventEmitter`クラスの`emit()`メソッドを呼び出します。
`create()`メソッドで、新しいTodoの作成と、イベントの発火を行いましょう。

```ts
create() {
    if (this.title) {
        const todo: Todo = { title: this.title, completed: false };
        this.submit.emit(todo);
        this.title = '';
    }
}
```

あとは、親の`AppComponent`で`submit`イベントを受け取って、リストに追加するだけです。
イベントの受け取り方はボタンのクリックイベントと同じです。
しかし今回は`emit()`メソッドの引数が必要なので、`$event`という特殊な変数を使ってそれを受け取ります。

```html
<app-todo-form (submit)="addTodo($event)"></app-todo-form>
```

`AppComponent`に`addTodo()`メソッドを追加すれば、Todoアプリケーションの機能は完成です。

```ts
addTodo(todo: Todo) {
    this.todoList.unshift(todo);
}
```

ついにTodoアプリケーションが完成しました！しかし少し見た目がシンプルすぎますね。
次のチャプターに進み、マテリアルデザインのアプリケーションに生まれ変わらせましょう！

[次へ進む](../ch-5/README.md)
