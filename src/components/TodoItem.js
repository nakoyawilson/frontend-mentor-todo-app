const TodoItem = (props) => {
  return (
    <div className="todo-list-item">
      <input type="checkbox" name="todo-list" id={props.itemID} />
      <label htmlFor={props.itemID} className="todo-item">
        {props.todoItem}
      </label>
      <span className="custom-checkbox"></span>
    </div>
  );
};

export default TodoItem;
