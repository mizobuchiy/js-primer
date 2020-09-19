import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  /**
   *
   * @param {TodoListModel[]} [items] - Initial item list (default is an empty
   *     array)
   */
  constructor(items = []) {
    super();
    this.items = items;
  }

  /**
   * Returns the total number of TodoItems.
   * @return {number}
   */
  getTotalCount() {
    return this.items.length;
  }

  /**
   * Returns an array of TodoItems that can be displayed.
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    return this.items;
  }

  /**
   * Register the listener function to be called when the state of TodoList is
   * updated.
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }

  /**
   * Cancel the listener function registered with `onChange`.
   * @param {Function} listener
   */
  offChange(listener) {
    this.removeEventListener("change", listener);
  }

  /**
   * Called when the state changes. Call a registered listener function.
   */
  emitChange() {
    this.emit("change");
  }

  /**
   * Add TodoItem.
   * @param {TodoItemModel} TodoItem
   */
  addTodo(todoItem) {
    if (todoItem.isEmptyTitle()) {
      return;
    }
    this.items.push(todoItem);
    this.emitChange();
  }

  /**
   * Update the completed TodoItem with the specified id.
   * @param {{ id:number, completed: boolean }}
   */
  updateTodo({ id, completed }) {
    const todoItem = this.items.find((todo) => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * Delete TodoItem with specified id.
   * @param {{id: number}}
   */
  deleteTodo({ id }) {
    this.items = this.items.filter((todo) => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}
