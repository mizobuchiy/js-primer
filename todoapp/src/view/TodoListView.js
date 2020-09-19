import {element} from './html-util.js';
import {TodoItemView} from './TodoItemView.js';


export class TodoListView {
  /**
   * HTML element of the list corresponding to the array of TodoItemModel.
   * @param {TodoItemModel[]} todoItems
   * @param {function({id:string, completed: boolean})} onUpdateTodo Checkbox
   *     update event listener
   * @param {function(id:string)} onDeleteTodo Delete button click event
   *     listener
   * @returns {Element} HTML element of the list corresponding to the array of
   *     TodoItemModel
   */
  createElement(todoItems, {onUpdateTodo, onDeleteTodo}) {
    const todoListElement = element`<ul />`;
    todoItems.forEach(todoItem => {
      const todoItemView = new TodoItemView();
      const todoItemElement =
          todoItemView.createElement(todoItem, {onDeleteTodo, onUpdateTodo});
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
