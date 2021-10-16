import React from "react";
import { useSelector } from "react-redux";
import { messageInfo } from "../../slices/message";
import "./Message.scss";

const Message = () => {
  const message = useSelector(messageInfo);
  return (
    <div>
      {message && (
        <div className="message">
          <div
            className="alert alert-dangeralert alert-danger alert-danger"
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export { Message };
