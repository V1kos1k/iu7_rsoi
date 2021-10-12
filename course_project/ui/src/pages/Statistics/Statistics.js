import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getStatistics, allStatistics } from "../../slices/flight";
import "./Statistics.scss";

const Statistics = () => {
  const currentUser = useSelector((state) => state.auth.user.user);
  const statistics = useSelector(allStatistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics({}));
  }, [dispatch]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const ResponseNumberOfTicketsPurchased = (item) => {
    return (
      <div className="card">
        <h3>Пользователь {item.item.userUid}</h3>
        <h4 style={{ paddingLeft: "5px", paddingTop: "15px" }}>
          купил {item.item.ticketCount} билетов
        </h4>
      </div>
    );
  };

  const ResponseNumberOfTicketsPurchasedForTheFlight = (item) => {
    return (
      <div className="card">
        <h3>На рейс {item.item.flightUid}</h3>
        <h4 style={{ paddingLeft: "5px", paddingTop: "15px" }}>
          куплено {item.item.ticketCount} билетов
        </h4>
      </div>
    );
  };

  return (
    <div className="statistics">
      <h3 style={{ textAlign: "center" }}>Статистика</h3>
      <div className="container">
        <div className="cards">
          По пользователям
          {statistics?.responseNumberOfTicketsPurchased &&
            statistics.responseNumberOfTicketsPurchased[1].map((item) => (
              <ResponseNumberOfTicketsPurchased
                item={item}
                key={item.userUid}
              />
            ))}
        </div>
        <div className="cards">
          По рейсам
          {statistics?.responseNumberOfTicketsPurchasedForTheFlight &&
            statistics.responseNumberOfTicketsPurchasedForTheFlight[1].map(
              (item) => (
                <ResponseNumberOfTicketsPurchasedForTheFlight
                  item={item}
                  key={item.userUid}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};

export { Statistics };
