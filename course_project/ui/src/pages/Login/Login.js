import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Message } from "../../components/Message";
import { login, isUseLoggedIn } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import "./Login.scss";

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useSelector(isUseLoggedIn);
  // const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .then((res) => {
        console.log("(1)", res.error);
        if (!res.error) {
          props.history.push("/profile");
          window.location.reload();
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="login">
      <div className="card">
        <img
          src="./images/pushin__sign-in.jpeg"
          alt="profile-img"
          className="login__img"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <Field
                name="username"
                type="text"
                className="form-control"
                placeholder="Имя пользователя"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <Field
                name="password"
                type="password"
                className="form-control"
                placeholder="Пароль"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="login__btn" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Войти</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <Message />

      {/* {message && (
        <div className="message">
          <div
            className="alert alert-dangeralert alert-danger alert-danger"
            role="alert"
          >
            {message}
          </div>
        </div>
      )} */}
    </div>
  );
};

export { Login };
