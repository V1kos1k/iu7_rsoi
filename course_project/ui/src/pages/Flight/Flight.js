import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Flight as FlightCard } from "../../components/Flight";
import { getFlight, currentFlight, buyTicket } from "../../slices/flight";
import "./Flight.scss";

const Flight = (props) => {
  const flight = useSelector(currentFlight);

  const dispatch = useDispatch();

  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    console.log(window.location.href.split("/")[4]);
    setIsRedirect(false);

    dispatch(getFlight({ flightUid: window.location.href.split("/")[4] }));
  }, [dispatch]);

  const onBuyTicketClick = (seat) => {
    console.log(seat);
    if (seat.seatStatus === "occupied") return;

    dispatch(buyTicket({ seatNo: seat.seatNo, flightUid: seat.flightUid }))
      .unwrap()
      .then(() => {
        console.log("(1000)");
        props.history.push("/profile");
        // window.location.reload();
        // setIsRedirect(true);
      })
      .catch(() => {
        console.log("......больно.....");
      });
  };

  const currentUser = useSelector((state) => state.auth.user.user);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="flight">
      {isRedirect && <Redirect to="/profile" />}
      {flight && (
        <>
          <h2 style={{ textAlign: "center" }}>
            Рейс {flight.flight.flightNumber}
          </h2>
          <div className="flight-info">
            <FlightCard flight={flight.flight} />
            <div className="additional-info">
              <div>Модель самолета: {flight.plane.planeModel}</div>
              <div>Код самолета: {flight.flight.planeCode}</div>

              <div>
                Количество свободных мест: {flight.flight.flightFreeSeatsCount}
              </div>
              <div>Цена: {flight.flight.price}</div>
              <div>Мили: {flight.flight.flightMiles}</div>
            </div>
            <div className="seats">
              <h3 style={{ textAlign: "center" }}>Места</h3>

              <div className="seats-card__grid">
                {flight.seats.map((item) => {
                  return (
                    <div
                      className="seats-card"
                      key={item.seatNo}
                      onClick={() => onBuyTicketClick(item)}
                    >
                      <div className={item.seatStatus}>
                        <div>{item.seatNo}</div>
                        <div>
                          {item.seatStatus === "free" ? "Свободно" : "Занято"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { Flight };
