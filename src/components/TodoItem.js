import { useState, useEffect, useCallback } from "react";

const TodoItem = (props) => {
  const [isChecked, setIsChecked] = useState(props.itemIsChecked);
  const [itemClassList, setItemClassList] = useState(
    isChecked ? "todo-item checked-item" : "todo-item"
  );

  const itemList = JSON.parse(localStorage.getItem("nw-fem-todolist"));

  const handleChange = (e) => {
    const selectedCheckbox = document.getElementById(e.target.id);
    const arrayIndex = itemList.findIndex((item) => item.id === e.target.id);
    if (selectedCheckbox.checked) {
      setIsChecked(true);
      setItemClassList("todo-item checked-item");
    } else {
      setIsChecked(false);
      setItemClassList("todo-item");
    }
    itemList[arrayIndex].isChecked = isChecked;
    localStorage.setItem("nw-fem-todolist", JSON.stringify(itemList));
  };

  useEffect(() => {
    console.log("test");
  }, [isChecked, itemClassList, itemList]);

  useCallback(handleChange, [isChecked, itemList]);

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
        <button onClick={() => props.deleteFunction(props.itemID)}>
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
