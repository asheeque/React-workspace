import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classes from "./HeaderComponent.module.css";
import { logout } from "../../../store/Auth";
import { useEffect, useState } from "react";
import { login } from "../../../store/Auth";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authData.isLoggedIn);
  }, [authData]);
  const onLogout = () => {
    console.log("hi", authData);
    localStorage.clear();

    dispatch(logout());
    navigate("/login");
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const USERNAME = localStorage.getItem("USERNAME");
    if (USERNAME) {
      const TOKEN = localStorage.getItem("TOKEN");
      const ID = localStorage.getItem("ID");
      const ROLES = localStorage.getItem("ROLES");
      const EMAIL = localStorage.getItem("EMAIL");

      const data = {
        email: EMAIL,
        username: USERNAME,
        token: TOKEN,
        id: ID,
        roles: JSON.parse(ROLES),
      };
      dispatch(login(data));
    //   console.log(data, "USSS");
    }
  }, [dispatch]);

  return (
    <div className={classes.HeaderOuterWrapper}>
      <nav className={classes.NavWrapper}>
        <div>
          {!!authData.isLoggedIn && (
            <Link to="/" className={classes.HeaderLink}>
              Hi {Capitalize(authData?.username)}
            </Link>
          )}
          {!authData.isLoggedIn && (
            <Link to="/login" className={classes.HeaderLink}>
              To Do App
            </Link>
          )}
        </div>
        {/* {!authData.isLoggedIn && (
          <div>
            <Link to="/login" className={classes.HeaderLink}>
              Login
            </Link>
          </div>
        )} */}

        {!!isLoggedIn && (
          <div>
            <button className={classes.LogoutButton} onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default HeaderComponent;
