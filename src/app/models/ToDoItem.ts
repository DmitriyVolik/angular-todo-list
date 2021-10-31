/* ToDoItem model (Record / Data Class) */
export class ToDoItem {
  constructor(
    public id: number,
    public name: string,
    public isComplete: boolean
  ) {}
}
