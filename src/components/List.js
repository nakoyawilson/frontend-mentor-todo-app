import { Droppable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";
import FilterOption from "./FilterOption";

const List = (props) => {
  const displayListItem = (item, index) => {
    return (
      <TodoItem
        key={item.id}
        todoItem={item.todo}
        itemID={item.id}
        itemIsChecked={item.isChecked}
        deleteFunction={props.deleteFunction}
        index={index}
        updateTodoList={props.updateTodoList}
        updateCount={props.updateCount}
        itemList={props.completeList}
      />
    );
  };

  return (
    <main className="list-container">
      <div id="todo-list">
        <Droppable droppableId="todo-list-1">
          {(provided) => (
            <div
              className="list-wrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.todoList.map(displayListItem)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="list-footer-wrapper">
          <div className="list-footer">
            <span>
              {props.count} {props.count === 1 ? "item" : "items"} left
            </span>
            <span className="clear" onClick={props.clearFunction}>
              Clear Completed
            </span>
          </div>
          <div className="filter-options">
            <FilterOption
              filterID="filter-all"
              filterLabel="All"
              isChecked={true}
              filterFunction={props.filterFunction}
            />
            <FilterOption
              filterID="filter-active"
              filterLabel="Active"
              isChecked={false}
              filterFunction={props.filterFunction}
            />
            <FilterOption
              filterID="filter-completed"
              filterLabel="Completed"
              isChecked={false}
              filterFunction={props.filterFunction}
            />
          </div>
        </div>
      </div>
      {props.count > 0 && (
        <p className="instructions">Drag and drop to reorder list</p>
      )}
    </main>
  );
};

export default List;
