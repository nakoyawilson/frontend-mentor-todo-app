const CreateToDoItem = (props) => {
  return (
    <div className="create-item-container">
      <div className="checkbox-container">
        <span className="custom-checkbox"></span>
      </div>
      <form
        onSubmit={props.submitFunction}
        className="create-item-form"
        autoComplete="off"
      >
        <label htmlFor="create-todo" className="visually-hidden">
          Create a new todo
        </label>
        <input
          type="text"
          placeholder="Create a new todo..."
          id="create-todo"
          className="create"
          value={props.todoText}
          onChange={props.handleChange}
        />
        <button type="submit" className="visually-hidden">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateToDoItem;
