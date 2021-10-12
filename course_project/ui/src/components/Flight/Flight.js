import React from "react";
import { Link } from "react-router-dom";
import "./Flight.scss";

const Flight = (props) => {
  const { flight, link } = props;

  const flightTimestamp = flight.flightTimestamp.split("T");
  return (
    <Link
      to={`/flights/${flight.flightUid}`}
      className="card__link"
      aria-disabled={!link}
    >
      <div className="card">
        <div style={{ display: "flex", alignflights: "center" }}>
          <h3>{flight.flightNumber}</h3>
          <h4 style={{ paddingLeft: "5px" }}>({flight.airline})</h4>
          <div style={{ paddingLeft: "200px" }}>
            Статус рейса: {flight.flightStatus}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingTop: "10px",
          }}
        >
          <div>
            <span style={{ fontSize: "18px" }}>Вылет:</span>
            <div className="">
              {flight.aitportDepartureData.airportName} (
              {flight.aitportDepartureData.airportLocation})
            </div>
            <div>
              Дата/время вылета: {flightTimestamp[0]}/
              {flightTimestamp[1].split(".")[0]}
            </div>
            <div>Время в пути: {flight.flightDuration}</div>
          </div>

          <div>
            <span style={{ fontSize: "18px" }}>Прилет:</span>
            <div>
              {flight.aitportArrivalData.airportName} (
              {flight.aitportArrivalData.airportLocation})
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </Link>
  );
};

export { Flight };
