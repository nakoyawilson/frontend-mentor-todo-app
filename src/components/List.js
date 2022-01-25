import TodoItem from "./TodoItem";

const List = (props) => {
  const createItem = (item) => {
    return (
      <TodoItem
        key={props.todoList.indexOf(item)}
        todoItem={item}
        itemID={props.todoList.indexOf(item)}
      />
    );
  };

  return (
    <div>
      <div id="todo-list">
        {props.todoList.map(createItem)}
        <p>
          <span id="number-items">{props.count}</span> items left All Active
          Completed Clear Completed
        </p>
      </div>
      {props.count > 0 && (
        <p className="instructions">Drag and drop to reorder list</p>
      )}
    </div>
  );
};

export default List;
