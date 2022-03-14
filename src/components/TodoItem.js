import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import deleteIcon from "../images/icon-cross.svg";

const TodoItem = (props) => {
  const [isChecked, setIsChecked] = useState(props.itemIsChecked);
  const [arrayIndex, setArrayIndex] = useState(props.index);

  const itemList = props.itemList;

  const handleChange = (e) => {
    setIsChecked(!isChecked);
    setArrayIndex(itemList.findIndex((item) => item.id === e.target.id));
    itemList[arrayIndex].isChecked = !isChecked;
    props.updateTodoList(itemList);
    props.updateCount(itemList);
  };

  const handleClick = (e) => {
    setIsChecked(!isChecked);
    setArrayIndex(
      itemList.findIndex((item) => item.id === e.target.previousSibling.id)
    );
    itemList[arrayIndex].isChecked = !isChecked;
    props.updateTodoList(itemList);
    props.updateCount(itemList);
  };

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
          <div
            className="delete-container"
            onClick={() => props.deleteFunction(props.itemID)}
            aria-label="Delete item"
          >
            <img src={deleteIcon} alt="" />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
