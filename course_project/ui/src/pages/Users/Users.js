import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllUsers, allUsers, createUser } from "../../slices/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Users.scss";

const Users = () => {
  const currentUser = useSelector((state) => state.auth.user.user);
  const users = useSelector(allUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({}));
  }, [dispatch]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const initialValues = {
    name: "",
    password: "",
    userRole: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
    userRole: Yup.string().required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { name, password, userRole } = formValue;

    dispatch(createUser({ name, password, userRole }))
      .unwrap()
      .then(() => {
        dispatch(getAllUsers({}));
      });
  };

  const Ticket = (item) => {
    if (!item.item.name) return <div></div>;
    const el = item.item;

    return (
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{el.name}</h3>
          <div>Роль: {el.userRole}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="users">
      <h3 style={{ textAlign: "center" }}>Пользователи</h3>
      <div className="container">
        <div className="cards">
          {users &&
            users.map((item) => <Ticket item={item} key={item.userUid} />)}
        </div>
        <div className="register">
          <img
            src="./images/pushin__sign-in.jpeg"
            alt="profile-img"
            className="login__img"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              <div className="form-group">
                <Field
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Имя пользователя"
                />
                <ErrorMessage
                  name="name"
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
                <Field
                  name="userRole"
                  className="form-control"
                  placeholder="Пароль"
                />
                <ErrorMessage
                  name="userRole"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="login__btn">
                  <span>Зарегистрировать</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export { Users };
