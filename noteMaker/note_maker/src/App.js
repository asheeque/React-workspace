import "./App.css";
import React from "react";
import HeaderComponent from "./components/ui/HeaderComponent/HeaderComponent";
import ToDoComponent from "./components/ToDo/ToDoComponent";
import { Provider } from "react-redux";
import store from "./store/index";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Authentication/Login";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
    <div className="Main">
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <HeaderComponent />

          {
            <Routes>
              <Route path="/" element={<ToDoComponent />} />
              <Route path="/login" element={<Login />} />
              {/*<Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} /> */}
            </Routes>
          }
          {/* <ToDoComponent /> */}
        </LocalizationProvider>
      </Provider>
    </div>
  );
}
export default App;
