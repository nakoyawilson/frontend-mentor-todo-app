import "./App.css";
import Header from "./components/Header";
import CreateToDoItem from "./components/CreateTodoItem";
import List from "./components/List";
import Footer from "./components/Footer";

const App = () => {
  const appBody = document.querySelector("body");

  const toggleTheme = () => {
    if (appBody.classList.contains("dark-mode")) {
      appBody.classList.remove("dark-mode");
      appBody.classList.add("light-mode");
    } else {
      appBody.classList.remove("light-mode");
      appBody.classList.add("dark-mode");
    }
  };

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    appBody.classList.add("light-mode");
  } else {
    appBody.classList.add("dark-mode");
  }

  const todoArray = [
    "Complete onine JavaScript course",
    "Jog around the park 3x",
    "10 minutes mediation",
    "Read for 1 hour",
    "Pick up groceries",
    "Complete Todo App on Frontend Mentor",
  ];

  const todoCount = todoArray.length;

  return (
    <div className="App">
      <Header toggleFunction={toggleTheme} />
      <CreateToDoItem />
      <List todoList={todoArray} count={todoCount} />
      <Footer />
    </div>
  );
};

export default App;
