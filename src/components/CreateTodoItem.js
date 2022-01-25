const CreateToDoItem = () => {
  return (
    <div className="create-item-container">
      <form>
        <label htmlFor="create-todo" className="visually-hidden">
          Create a new todo
        </label>
        <input
          type="text"
          placeholder="Create a new todo..."
          id="create-todo"
          className="create"
        />
        <button type="submit" className="visually-hidden">
          Create
        </button>
        <span className="custom-checkbox"></span>
      </form>
    </div>
  );
};

export default CreateToDoItem;
