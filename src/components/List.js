import TodoItem from "./TodoItem";
import FilterOption from "./FilterOption";

const List = (props) => {
  const displayListItem = (item) => {
    return (
      <TodoItem
        key={item.id}
        todoItem={item.todo}
        itemID={item.id}
        itemIsChecked={item.isChecked}
        deleteFunction={props.deleteFunction}
      />
    );
  };

  return (
    <div className="list-container">
      <div id="todo-list">
        {props.todoList.map(displayListItem)}
        <div className="list-footer">
          <div>
            <span>
              {props.count} {props.count === 1 ? "item" : "items"} left
            </span>
          </div>
          <div>
            <span className="clear" onClick={props.clearFunction}>
              Clear Completed
            </span>
          </div>
        </div>
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
      {props.count > 0 && (
        <p className="instructions">Drag and drop to reorder list</p>
      )}
    </div>
  );
};

export default List;
