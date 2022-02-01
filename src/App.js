import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import CreateToDoItem from "./components/CreateTodoItem";
import List from "./components/List";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";

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

  // Set initial array
  if (localStorage.getItem("nw-fem-todolist") === null) {
    // Create unique ids for list items
    const idArray = [];
    for (let i = 0; i < 6; i++) {
      const uniqueID = uuidv4();
      idArray.push(uniqueID);
    }
    const initialToDoList = [
      {
        id: idArray[0],
        todo: "Complete online JavaScript course",
        isChecked: false,
      },
      {
        id: idArray[1],
        todo: "Jog around the park 3x",
        isChecked: false,
      },
      {
        id: idArray[2],
        todo: "10 minutes meditation",
        isChecked: false,
      },
      {
        id: idArray[3],
        todo: "Read for 1 hour",
        isChecked: false,
      },
      {
        id: idArray[4],
        todo: "Pick up groceries",
        isChecked: false,
      },
      {
        id: idArray[5],
        todo: "Complete Todo App on Frontend Mentor",
        isChecked: false,
      },
    ];
    localStorage.setItem("nw-fem-todolist", JSON.stringify(initialToDoList));
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
    const itemID = uuidv4();
    const newItem = {
      id: itemID,
      todo: formInput.value,
      isChecked: false,
    };
    const updatedList = [...todoArray, newItem];
    setTodoArray(updatedList);
    localStorage.setItem("nw-fem-todolist", JSON.stringify(todoArray));
    formInput.value = "";
    e.preventDefault();
  };

  // Delete from list function
  const deleteFromList = (taskID) => {
    const updatedList = todoArray.filter(
      (todo) => todoArray[todoArray.indexOf(todo)].id !== taskID
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
      } else {
        active.push(todoArray[item.id]);
      }
    });
    setCompletedItemsList(completed);
    setActiveItemsList(active);
    let listToDisplay = [];
    if (option === "Active") {
      listToDisplay = todoArray.filter((todo) => {
        // console.log(activeItemsList.includes(todo));
        return activeItemsList.includes(todo);
      });
    } else if (option === "Completed") {
      listToDisplay = todoArray.filter((todo) => {
        // console.log(completedItemsList.includes(todo));
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

  useEffect(() => {
    // console.log(displayedList);
  }, [displayedList, activeItemsList, completedItemsList, todoArray]);

  return (
    <div className="App">
      <Header toggleFunction={toggleTheme} />
      <CreateToDoItem submitFunction={addToList} />
      <List
        todoList={todoArray}
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
