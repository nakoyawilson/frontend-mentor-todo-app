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
    <div className="list-container">
      <div id="todo-list">
        {props.todoList.map(createItem)}
        <div className="list-footer">
          <div>
            <span>
              <span id="number-items">{props.count}</span> items left
            </span>
          </div>
          <div>
            <span>Clear Completed</span>
          </div>
        </div>
      </div>
      <div className="filter-options">
        <ul className="options">
          <li className="filter-option">All</li>
          <li className="filter-option">Active</li>
          <li className="filter-option">Completed</li>
        </ul>
      </div>
      {props.count > 0 && (
        <p className="instructions">Drag and drop to reorder list</p>
      )}
    </div>
  );
};

export default List;
