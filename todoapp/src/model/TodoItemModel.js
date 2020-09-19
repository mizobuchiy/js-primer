// Variables that manage unique IDs
let todoIdx = 0;

export class TodoItemModel {
  /**
   * `title`: Todo item title
   * `completed`: true if the Todo item is complete, false otherwise
   * @param {{ title: string, completed: boolean }}
   */
  constructor({ title, completed }) {
    // id is automatically a serial number and is different for each instance
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }

  /**
   * Returns true if the title is an empty string
   * @returns {boolean}
   */
  isEmptyTitle() {
    return this.title.length === 0;
  }
}
