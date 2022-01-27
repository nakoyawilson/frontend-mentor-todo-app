import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import CreateToDoItem from "./components/CreateTodoItem";
import List from "./components/List";
import Footer from "./components/Footer";

const App = () => {
  const appBody = document.querySelector("body");
  let themePreference = "";

  // Toggle Theme Function
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

  // Set initial color theme
  if (
    localStorage.getItem("nw-fem-todo-app-color") === null ||
    localStorage.getItem("nw-fem-todo-app-color") === ""
  ) {
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

  // Starter Todo List
  const initialArray = [
    "Complete online JavaScript course",
    "Jog around the park 3x",
    "10 minutes meditation",
    "Read for 1 hour",
    "Pick up groceries",
    "Complete Todo App on Frontend Mentor",
  ];

  // Set initial array
  if (localStorage.getItem("nw-fem-todolist") === null) {
    localStorage.setItem("nw-fem-todolist", JSON.stringify(initialArray));
  }
  const list = JSON.parse(localStorage.getItem("nw-fem-todolist"));
  const [todoArray, setTodoArray] = useState(list);
  const [count, setCount] = useState(todoArray.length);

  // Add to list function
  const addToList = (e) => {
    const formInput = document.querySelector(".create");
    const updatedList = [...todoArray, formInput.value];
    setTodoArray(updatedList);
    formInput.value = "";
    e.preventDefault();
  };

  // Delete from list function
  const deleteFromList = (taskID) => {
    const updatedList = todoArray.filter(
      (todo) => todoArray.indexOf(todo) !== taskID
    );
    setTodoArray(updatedList);
  };

  // Filter list function
  const filterItems = (option) => {
    const todoItems = document.querySelectorAll('input[type="checkbox"]');
    let activeCount = 0;
    let completedCount = 0;
    todoItems.forEach((item) => {
      if (item.checked) {
        completedCount++;
      } else {
        activeCount++;
      }
    });
    if (option === "Active") {
      setCount(activeCount);
    } else if (option === "Completed") {
      setCount(completedCount);
    } else if (option === "All") {
      setCount(todoArray.length);
    }
  };

  useEffect(() => {
    localStorage.setItem("nw-fem-todolist", JSON.stringify(todoArray));
  }, [todoArray]);

  useEffect(filterItems, [count, todoArray.length]);

  return (
    <div className="App">
      <Header toggleFunction={toggleTheme} />
      <CreateToDoItem submitFunction={addToList} />
      <List
        todoList={todoArray}
        deleteFunction={deleteFromList}
        count={count}
        filterFunction={filterItems}
      />
      <Footer />
    </div>
  );
};

export default App;
