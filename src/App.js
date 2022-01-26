import "./App.css";
import Header from "./components/Header";
import CreateToDoItem from "./components/CreateTodoItem";
import List from "./components/List";
import Footer from "./components/Footer";

const App = () => {
  const appBody = document.querySelector("body");
  let themePreference = "";

  const toggleTheme = () => {
    if (appBody.classList.contains("dark-mode")) {
      appBody.classList.remove("dark-mode");
      appBody.classList.add("light-mode");
      themePreference = "light-mode";
    } else {
      appBody.classList.remove("light-mode");
      appBody.classList.add("dark-mode");
      themePreference = "dark-mode";
    }
    localStorage.setItem("nw-fem-todo-app-color", themePreference);
  };

  if (localStorage.getItem("nw-fem-todo-app-color") === null) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      themePreference = "light-mode";
    } else {
      themePreference = "dark-mode";
    }
    localStorage.setItem("nw-fem-todo-app-color", themePreference);
  }
  appBody.classList.add(localStorage.getItem("nw-fem-todo-app-color"));

  const initialArray = [
    "Complete online JavaScript course",
    "Jog around the park 3x",
    "10 minutes meditation",
    "Read for 1 hour",
    "Pick up groceries",
    "Complete Todo App on Frontend Mentor",
  ];

  if (localStorage.getItem("nw-fem-todolist") === null) {
    localStorage.setItem("nw-fem-todolist", JSON.stringify(initialArray));
  }
  const todoArray = JSON.parse(localStorage.getItem("nw-fem-todolist"));

  let todoCount = todoArray.length;

  const addToList = () => {
    const formInput = document.querySelector(".create").value;
    todoArray.push(formInput);
    localStorage.setItem("nw-fem-todolist", JSON.stringify(todoArray));
  };

  return (
    <div className="App">
      <Header toggleFunction={toggleTheme} />
      <CreateToDoItem submitFunction={addToList} />
      <List todoList={todoArray} count={todoCount} />
      <Footer />
    </div>
  );
};

export default App;
