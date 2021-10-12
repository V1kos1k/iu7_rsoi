import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllAirports, allAirports } from "../../slices/airports";
import "./Airports.scss";

const Airports = () => {
  const currentUser = useSelector((state) => state.auth.user.user);
  const airports = useSelector(allAirports);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAirports({}));
  }, [dispatch]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const Airport = (item) => {
    console.log(item.item.airportUid);

    return (
      <div className="card">
        <h3>{item.item.airportName}</h3>
        <h4 style={{ paddingLeft: "5px", paddingTop: "15px" }}>
          Город: ({item.item.airportLocation})
        </h4>
        <div>Адрес: {item.item.airportAddress}</div>

        <div>Веб-адрес: {item.item.airportWebadress}</div>
        <div style={{ paddingTop: "7px" }}>
          Основная информация: {item.item.airportInfo}
        </div>
      </div>
    );
  };

  return (
    <div className="airports">
      <h3 style={{ textAlign: "center" }}>Аэропорты</h3>
      <div className="cards">
        {airports?.airports &&
          airports.airports.map((item) => (
            <Airport item={item} key={item.airportUid} />
          ))}
      </div>
    </div>
  );
};

export { Airports };
