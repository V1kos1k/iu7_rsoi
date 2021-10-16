import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, userInfo } from "../../slices/auth";
import EventBus from "../../common/EventBus";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = (props) => {
  const currentUser = useSelector(userInfo);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <header className="header">
      <Link to={"/"} className="header__nav-link">
        <img className="header__img" src="./images/pushin.png" alt="" />
      </Link>

      {currentUser ? (
        <div className="link-group">
          <Link to={"/flights"} className="header__nav-link">
            Рейсы
          </Link>
          <Link to={"/airports"} className="header__nav-link">
            Аэропорты
          </Link>
          {currentUser.role === "admin" && (
            <div className="nav-link__group">
              <Link to={"/users"} className="header__nav-link">
                Пользователи
              </Link>
              <Link to={"/statistics"} className="header__nav-link">
                Статистика
              </Link>
            </div>
          )}
          <div className="user">
            <Link to={"/profile"} className="header__nav-link">
              {currentUser.username}
            </Link>
            <a href="/login" className="header__nav-link" onClick={logOut}>
              LogOut
            </a>
          </div>
        </div>
      ) : (
        <Link to={"/login"} className="header__nav-link">
          Login
        </Link>
      )}
    </header>
  );
};

export { Header };
