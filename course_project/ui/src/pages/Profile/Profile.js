import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userInfo } from "../../slices/auth";
import {
  getAllTickets,
  allTickets,
  deleteTicket,
  getMiles,
  getUserMiles,
} from "../../slices/ticket";
import "./Profile.scss";

const Profile = () => {
  const currentUser = useSelector(userInfo);
  const tickets = useSelector(allTickets);
  const miles = useSelector(getUserMiles);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTickets({}));
    dispatch(getMiles({}));
  }, [dispatch]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const Ticket = (item) => {
    if (!item.item.flight) return <div key="warning"></div>;
    const el = item.item;
    const flightTimestamp = el?.flight?.flightTimestamp?.split("T");

    const onTicketDeleteClick = (ticket) => {
      dispatch(
        deleteTicket({
          seatNo: ticket.seatNo,
          flightUid: ticket.flightUid,
          ticketUid: ticket.ticketUid,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(getAllTickets({}));
        });
    };

    return (
      <div className="card" key={el.flight.flightNumber}>
        <div style={{ display: "flex", alignflights: "center" }}>
          <h3>{el.flight.flightNumber}</h3>
          <h4 style={{ paddingLeft: "5px" }}>({el.flight.airline})</h4>
          <div style={{ paddingLeft: "200px" }}>
            Статус рейса: {el.flight.flightStatus}
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
              {el.flight.aitportDepartureData.airportName} (
              {el.flight.aitportDepartureData.airportLocation})
            </div>
            <div>
              Дата/время вылета: {flightTimestamp[0]}/
              {flightTimestamp[1].split(".")[0]}
            </div>
            <div>Время в пути: {el.flight.flightDuration}</div>
          </div>

          <div>
            <span style={{ fontSize: "18px" }}>Прилет:</span>
            <div>
              {el.flight.aitportArrivalData.airportName} (
              {el.flight.aitportArrivalData.airportLocation})
            </div>
          </div>
          <div>
            <p>Место: {el.seatNo}</p>
            <button onClick={() => onTicketDeleteClick(el)}>
              Вернуть билет
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="profile">
      <h2 style={{ textAlign: "center" }}>Баланс милей: {miles}</h2>
      <h3 style={{ textAlign: "center" }}>Купленные билеты</h3>
      <div className="cards">
        {tickets &&
          tickets.map((item) => <Ticket item={item} key={item.ticketUid} />)}
      </div>
    </div>
  );
};

export { Profile };
