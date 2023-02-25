import "./App.css";
import React from "react";
import HeaderComponent from "./components/ui/HeaderComponent/HeaderComponent";
import ToDoComponent from "./components/ToDo/ToDoComponent";
import { Provider } from "react-redux";
import store from "./store/index";

function App() {
  return (
    <div className="Main">
      <HeaderComponent />
      <Provider store={store}>
        <ToDoComponent />
      </Provider>
    </div>
  );
}
export default App;
