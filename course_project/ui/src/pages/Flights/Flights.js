import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Flight } from "../../components/Flight";
import { getAllFlights, allFlights } from "../../slices/flight";
import "./Flights.scss";

const Flights = (props) => {
  // const role = useSelector(userRole);
  const flights = useSelector(allFlights);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFlights({}));
  }, [dispatch]);

  const currentUser = useSelector((state) => state.auth.user.user);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  // if (role !== "admin") {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="flights">
      <h2 style={{ textAlign: "center" }}>Рейсы</h2>
      <div className="cards">
        {flights &&
          flights.map((item) => (
            <Flight flight={item} key={item.flightUid} link />
          ))}
      </div>
    </div>
  );
};

export { Flights };
