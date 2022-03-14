import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CreateToDoItem from "./components/CreateTodoItem";
import List from "./components/List";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";

const App = () => {
  const [themePreference, setThemePreference] = useState(
    localStorage.getItem("nw-fem-todo-app-color")
      ? localStorage.getItem("nw-fem-todo-app-color")
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light-mode"
      : "dark-mode"
  );
  localStorage.setItem("nw-fem-todo-app-color", themePreference);
  const [themeIcon, setThemeIcon] = useState(
    themePreference === "dark-mode" ? sunIcon : moonIcon
  );

  const appBody = document.querySelector("body");
  appBody.classList.add(localStorage.getItem("nw-fem-todo-app-color"));

  // Toggle Theme Function
  const toggleTheme = () => {
    if (appBody.classList.contains("dark-mode")) {
      appBody.classList.remove("dark-mode");
      appBody.classList.add("light-mode");
      setThemePreference("light-mode");
      setThemeIcon(moonIcon);
    } else {
      appBody.classList.remove("light-mode");
      appBody.classList.add("dark-mode");
      setThemePreference("dark-mode");
      setThemeIcon(sunIcon);
    }
    localStorage.setItem("nw-fem-todo-app-color", themePreference);
  };

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

  const [todoArray, setTodoArray] = useState(
    JSON.parse(localStorage.getItem("nw-fem-todolist"))
  );
  const [count, setCount] = useState(todoArray.length);
  const [displayedList, setDisplayedList] = useState(todoArray);

  // Create item
  const [todoText, setTodoText] = useState("");
  const handleTodoTextChange = (e) => {
    const inputText = e.target.value;
    setTodoText(inputText);
  };

  // Add to list function
  const addToList = (e) => {
    const itemID = uuidv4();
    const newItem = {
      id: itemID,
      todo: todoText,
      isChecked: false,
    };
    const updatedList = [...todoArray, newItem];
    setTodoArray(updatedList);
    setDisplayedList(updatedList);
    setCount(updatedList.length);
    setTodoText("");
    localStorage.setItem("nw-fem-todolist", JSON.stringify(updatedList));
    e.preventDefault();
  };

  // Delete from list function
  const deleteFromList = (taskID) => {
    const updatedList = todoArray.filter(
      (todo) => todoArray[todoArray.indexOf(todo)].id !== taskID
    );
    setTodoArray(updatedList);
    setDisplayedList(updatedList);
    setCount(updatedList.length);
    localStorage.setItem("nw-fem-todolist", JSON.stringify(updatedList));
  };

  // Clear Completed Items from list
  const clearCompletedItems = () => {
    const updatedList = todoArray.filter(
      (todo) => todoArray[todoArray.indexOf(todo)].isChecked === false
    );
    setTodoArray(updatedList);
    setDisplayedList(updatedList);
    setCount(updatedList.length);
    localStorage.setItem("nw-fem-todolist", JSON.stringify(updatedList));
  };

  // Filter list function
  const filterItems = (option) => {
    let listToDisplay;
    if (option === "Active") {
      listToDisplay = todoArray.filter(
        (todo) => todoArray[todoArray.indexOf(todo)].isChecked === false
      );
    } else if (option === "Completed") {
      listToDisplay = todoArray.filter(
        (todo) => todoArray[todoArray.indexOf(todo)].isChecked === true
      );
    } else {
      listToDisplay = todoArray;
    }
    setDisplayedList(listToDisplay);
    setCount(listToDisplay.length);
  };

  // Save Drag and Drop list order function
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const droppedItem = todoArray.find((todo) => todo.id === draggableId);
    const newTodoOrder = Array.from(todoArray);
    newTodoOrder.splice(source.index, 1);
    newTodoOrder.splice(destination.index, 0, droppedItem);
    setTodoArray(newTodoOrder);
    setDisplayedList(newTodoOrder);
    localStorage.setItem("nw-fem-todolist", JSON.stringify(newTodoOrder));
  };

  const updateTodoList = (newList) => {
    setTodoArray(newList);
    setDisplayedList(newList);
    localStorage.setItem("nw-fem-todolist", JSON.stringify(newList));
  };

  return (
    <div className="App">
      <Header toggleFunction={toggleTheme} themeIcon={themeIcon} />
      <CreateToDoItem
        submitFunction={addToList}
        todoText={todoText}
        handleChange={handleTodoTextChange}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <List
          todoList={displayedList}
          deleteFunction={deleteFromList}
          count={count}
          filterFunction={filterItems}
          clearFunction={clearCompletedItems}
          updateTodoList={updateTodoList}
          completeList={todoArray}
        />
      </DragDropContext>
      <Footer />
    </div>
  );
};

export default App;
