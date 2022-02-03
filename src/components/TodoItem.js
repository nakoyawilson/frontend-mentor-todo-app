import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

const TodoItem = (props) => {
  const [isChecked, setIsChecked] = useState(props.itemIsChecked);
  const [arrayIndex, setArrayIndex] = useState(0);

  const itemList = JSON.parse(localStorage.getItem("nw-fem-todolist"));

  const handleChange = (e) => {
    setIsChecked(!isChecked);
    setArrayIndex(itemList.findIndex((item) => item.id === e.target.id));
  };

  const handleClick = (e) => {
    setIsChecked(!isChecked);
    setArrayIndex(
      itemList.findIndex((item) => item.id === e.target.previousSibling.id)
    );
  };

  useEffect(() => {
    if (itemList.length > 0) {
      itemList[arrayIndex].isChecked = isChecked;
    }
    localStorage.setItem("nw-fem-todolist", JSON.stringify(itemList));
  }, [isChecked, itemList, arrayIndex]);

  return (
    <Draggable draggableId={props.itemID} index={props.index}>
      {(provided) => (
        <div
          className="todo-list-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="todo-list"
              id={props.itemID}
              onChange={handleChange}
              checked={isChecked}
            />
            <span className="custom-checkbox" onClick={handleClick}></span>
          </div>
          <div className="label-container">
            <label
              htmlFor={props.itemID}
              className={isChecked ? "todo-item checked-item" : "todo-item"}
            >
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
      )}
    </Draggable>
  );
};

export default TodoItem;
