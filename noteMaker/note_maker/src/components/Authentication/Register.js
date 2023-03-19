import { TextField } from "@mui/material";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "../Authentication/Register.module.css";
import { login } from "../../store/Auth";
import { registerUser } from "../../services/AuthApiService";

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

const Register = () => {
  const navigate = useNavigate();

  const dispatchLogin = useDispatch()
  const [formState, dispatch] = useReducer(formReducer, {
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formState.username.trim() === "" ||
      formState.password.trim() === "" ||
      formState.email.trim() === ""
    ) {
      return;
    }

    const body = {
      username: formState.username,
      password: formState.password,
      email: formState.email,
      role: ["ROLE_USER"],
    };
    const response = await registerUser(body)

    if (response) {

      dispatchLogin(login(response));
      const email = response.email;
      const username = response.username;
      const token = response.token;
      const id = response.id;
      const roles = response.roles;
      localStorage.setItem("EMAIL", email);
      localStorage.setItem("TOKEN", token);
      localStorage.setItem("USERNAME", username);
      localStorage.setItem("ID", id);
      localStorage.setItem("ROLES", JSON.stringify(roles));
      navigate("/");
    } else {
      console.error("Login failed:");
    }
  };

  return (
    <div className={classes.LoginOuter}>
      <div className={classes.LoginInner}>
        <div className={classes.HeaderOuter}>
          <h1>Register</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.InputerOuter}>
            <div>
              <TextField
                id="outlined-basic1"
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
                id="outlined-basic2"
                label="Email"
                type="email"
                variant="outlined"
                size="small"
                required
                value={formState.email}
                onChange={(e) =>
                  dispatch({
                    type: "SET_EMAIL",
                    payload: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={classes.InputerOuter}>
            <div>
              <TextField
                id="outlined-basic3"
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
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
