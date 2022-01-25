const TodoItem = (props) => {
  return (
    <div className="todo-list-item">
      <div className="checkbox-container">
        <input type="checkbox" name="todo-list" id={props.itemID} />
        <span className="custom-checkbox"></span>
      </div>
      <div className="label-container">
        <label htmlFor={props.itemID} className="todo-item">
          {props.todoItem}
        </label>
      </div>
      <div className="delete-container">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path
              fill="#494C6B"
              fillRule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
