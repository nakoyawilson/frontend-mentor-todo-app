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
  const [displayedList, setDisplayedList] = useState(todoArray);
  const [completedItemsList, setCompletedItemsList] = useState([]);
  const [activeItemsList, setActiveItemsList] = useState([]);

  // Add to list function
  const addToList = (e) => {
    const formInput = document.querySelector(".create");
    const updatedList = [...todoArray, formInput.value];
    setTodoArray(updatedList);
    localStorage.setItem("nw-fem-todolist", JSON.stringify(todoArray));
    formInput.value = "";
    e.preventDefault();
  };

  // Delete from list function
  const deleteFromList = (taskID) => {
    const updatedList = todoArray.filter(
      (todo) => todoArray.indexOf(todo) !== taskID
    );
    setTodoArray(updatedList);
    localStorage.setItem("nw-fem-todolist", JSON.stringify(todoArray));
  };

  // Filter list function
  const filterItems = (option) => {
    const todoItems = document.querySelectorAll('input[type="checkbox"]');
    let active = [];
    let completed = [];
    todoItems.forEach((item) => {
      if (item.checked) {
        completed.push(todoArray[item.id]);
      } else if (!item.checked) {
        active.push(todoArray[item.id]);
      }
    });
    setCompletedItemsList(completed);
    setActiveItemsList(active);
    let listToDisplay = [];
    if (option === "Active") {
      listToDisplay = todoArray.filter((todo) => {
        return activeItemsList.includes(todo);
      });
      console.log(listToDisplay);
    } else if (option === "Completed") {
      listToDisplay = todoArray.filter((todo) => {
        return completedItemsList.includes(todo);
      });
    } else {
      listToDisplay = todoArray;
    }
    setDisplayedList(listToDisplay);
    setCount(listToDisplay.length);
  };

  useEffect(() => {
    localStorage.setItem("nw-fem-todolist", JSON.stringify(todoArray));
  }, [displayedList, todoArray]);

  return (
    <div className="App">
      <Header toggleFunction={toggleTheme} />
      <CreateToDoItem submitFunction={addToList} />
      <List
        todoList={displayedList}
        deleteFunction={deleteFromList}
        count={count}
        filterFunction={filterItems}
        totalList={todoArray}
      />
      <Footer />
    </div>
  );
};

export default App;
