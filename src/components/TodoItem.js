import { useState, useEffect } from "react";

const TodoItem = (props) => {
  const localStorageID = props.todoItem;

  let currentState = false;
  if (localStorage.getItem(localStorageID) === null) {
    localStorage.setItem(localStorageID, currentState);
  } else {
    if (localStorage.getItem(localStorageID) === "true") {
      currentState = true;
    }
  }

  const [isChecked, setIsChecked] = useState(currentState);

  const [itemClassList, setItemClassList] = useState(
    isChecked ? "todo-item checked-item" : "todo-item"
  );

  const handleChange = (e) => {
    const selectedCheckbox = document.getElementById(e.target.id);
    if (selectedCheckbox.checked) {
      setIsChecked(true);
      setItemClassList("todo-item checked-item");
    } else {
      setIsChecked(false);
      setItemClassList("todo-item");
    }
  };

  useEffect(() => {
    localStorage.setItem(localStorageID, isChecked);
  }, [isChecked, localStorageID]);

  return (
    <div className="todo-list-item">
      <div className="checkbox-container">
        <input
          type="checkbox"
          name="todo-list"
          id={props.itemID}
          onChange={handleChange}
          checked={isChecked}
        />
        <span className="custom-checkbox"></span>
      </div>
      <div className="label-container">
        <label htmlFor={props.itemID} className={itemClassList}>
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
