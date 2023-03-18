import { TextField } from "@mui/material";
import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "../Authentication/Login.module.css";
import { login } from "../../store/Auth";
const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const Login = () => {
  const dispatchLogin = useDispatch();
  const navigate = useNavigate();

  const [formState, dispatch] = useReducer(formReducer, {
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formState.username,
        password: formState.password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      dispatchLogin(login(data));
      const email = data.email;
      const username = data.username;
      const token = data.token;
      const id = data.id;
      const roles = data.roles;
      localStorage.setItem("EMAIL", email);
      localStorage.setItem("TOKEN", token);
      localStorage.setItem("USERNAME", username);
      localStorage.setItem("ID", id);
      localStorage.setItem("ROLES", JSON.stringify(roles));
      navigate("/");
    } else {
      console.error("Login failed:", data);
    }
  };

  return (
    <div className={classes.LoginOuter}>
      <div className={classes.LoginInner}>
        <div className={classes.HeaderOuter}>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.InputerOuter}>
            <div>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                size="small"
                required
                value={formState.username}
                onChange={(e) =>
                  dispatch({
                    type: "SET_USERNAME",
                    payload: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={classes.InputerOuter}>
            <div>
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                size="small"
                required
                value={formState.password}
                onChange={(e) =>
                  dispatch({
                    type: "SET_PASSWORD",
                    payload: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={classes.ButtonOuter}>
            <div>
              <button className={classes.Button} type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
