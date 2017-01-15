# Chapter 2: Todoリストを作ろう

このハンズオンではTodoタスクの管理アプリケーションを作成します。
アプリケーションでもっとも重要で、基本になるのはTodoリストを表示することです。

## 「Todo」を定義する

Todoリストを表示するには、当然ながら表示するためのTodoリストが必要です。
もっといえば、Todoリストを作るためには **Todo** というものの定義が必要ですね。
最初に行うのは、わたしたちにとっての **Todo** をコードで表現することです。

あるデータのモデルを定義するのに、TypeScriptでは普通、 **インターフェース** や **クラス** を使います。
今回は、 `Todo` インターフェースを定義し、それを今後扱うTodoというデータの型として利用しましょう。

次のコマンドを実行して `Todo` インタフェース用のファイルを生成します。

```
$ ng g interface Todo
```

コマンドを実行すると、 `src/app/todo.ts` ファイルが生成されます。
最初は何もプロパティを持たない空のインタフェースです。

```ts
export interface Todo {
}
```

これからわたしたちが扱うTodoは、 **title** と **completed** というプロパティを持つものとします。
`Todo`インタフェースにプロパティを追加しましょう

```ts
export interface Todo {
    title: string;
    completed: boolean;
}
```

これでTodoが定義できたので、次はTodoのリストを作ってみましょう。

## Todoリストを作る

TypeScript的に言えば、「Todo型の配列を宣言」する作業です。
まずは新しく `src/app/todo-list.ts` ファイルを作成します。

作成したファイルで、`todoList`変数を宣言し、外部に向けて**export**します。
作成するTodoの値は好きな文字列でかまいません。

このとき、先ほど定義した`Todo`インターフェースを**import**して、リストの型として利用することで、
リストの中身のオブジェクトの型が間違っていることを検知できます。

```ts
import { Todo } from './todo';

export const todoList: Todo[] = [
    {
        title: 'Get started Angular',
        completed: false,
    },
    {
        title: 'Write an article',
        completed: false,
    },
    {
        title: 'Get the Hikarie',
        completed: true,
    },
];
```

これでTodoリストを表示するためのデータが完成しました。いよいよ表示させる段階です。

## Todoリストを表示する

`AppComponent`のテンプレート中でTodoリストを表示するために、まずは`AppComponent`クラスに`todoList`プロパティを作成します。
さらに、先ほど作った`src/app/todo-list.ts`から`todoList`変数をimportし、プロパティにセットします。

```ts
import { todoList } from './todo-list'; 

export class AppComponent {
  todoList = todoList;
}
```

次に、テンプレートに`todoList`を表示するための記述を追加します。
配列の要素を繰り返し表示するには、`ngFor`という組み込みのディレクティブ（テンプレートを拡張する機能）を使います。
繰り返しの単位となるHTML要素に `*ngFor="let todo of todoList"`と記述して、その内側で`todo`変数を使います。

```html
<ul>
  <li *ngFor="let todo of todoList">
    {{ todo.title }}
  </li>
</ul>
```

`*ngFor` ディレクティブの右辺には、JavaScriptの `for-of` に似た文を書きます。

```js
for (let todo of todoList) { 
}
```

ようやくTodoリストらしくなってきました。

## 完了済みのTodoにスタイルを適用する

さて、今のままではTodoが完了しているかわからないので、`completed`プロパティの値に応じて、CSSを使ってスタイルを変えてみましょう。
今回は、完了しているTodoの`<li>`要素に`completed`クラスを付与します。
状態によってクラスを動的に付与したり除去したりするには、**クラスバインディング** 構文 `[class.**]` を使います。 
クラスバインディングは、右辺の式の結果の真偽によって、クラスを付与したり除去したりしてくれます。

`<li>`要素に`[class.completed]="todo.completed"` という属性を追加してください。

```html
<li *ngFor="let todo of todoList" [class.completed]="todo.completed">
```

次に`src/app/app.component.css`を編集して、`completed`クラスにスタイルを付与します。
今回は `text-decoration: line-through` を付与して取り消し線をつけてみましょう。

```css
.completed {
    text-decoration: line-through;
}
```

まだ見た目はシンプルですがTodoリストの表示ができました。次のチャプターに進みましょう！

[次へ進む](../ch-3/README.md)