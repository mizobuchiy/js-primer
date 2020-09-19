import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
  constructor({
    formElement,
    formInputElement,
    todoListContainerElement,
    todoCountElement,
  }) {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel([]);
    // bind to Element
    this.formElement = formElement;
    this.formInputElement = formInputElement;
    this.todoListContainerElement = todoListContainerElement;
    this.todoCountElement = todoCountElement;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * Listener function called when adding a Todo.
   * @param {string} title
   */
  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Listener function called when updating the state of Todo.
   * @param {{id:number,completed:boolean}}
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  /**
   * Listener function called when Todo is deleted.
   * @param {{id: number}}
   */
  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  /**
   * Listener function called when submitting a form.
   * @param {Event} event
   */
  handleSubmit(event) {
    event.preventDefault();
    const inputElement = this.formInputElement;
    this.handleAdd(inputElement.value);
    inputElement.value = "";
  }

  /**
   * Listener function called when TodoListView changes.
   */
  handleChange() {
    const todoCountElement = this.todoCountElement;
    const todoListContainerElement = this.todoListContainerElement;
    const todoItems = this.todoListModel.getTodoItems();
    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdate({ id, completed });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    render(todoListElement, todoListContainerElement);
    todoCountElement.textContent = `Number of Todo items: ${this.todoListModel.getTotalCount()}`;
  }

  /**
   * Function to register the association between application and DOM.
   */
  mount() {
    this.todoListModel.onChange(this.handleChange);
    this.formElement.addEventListener("submit", this.handleSubmit);
  }

  /**
   * Function to break the link between the app and the DOM.
   */
  unmount() {
    this.todoListModel.offChange(this.handleChange);
    this.formElement.removeEventListener("submit", this.handleSubmit);
  }
}
