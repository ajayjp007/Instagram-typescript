import "./Button.css";
import React, { useState } from "react";

const Button: React.FC<{ content: string }> = (props) => {
  const [sendFriendRequest, setSendFriendRequest] = useState<boolean>(false);
  const addFriendHandler = () => {
    setSendFriendRequest(!sendFriendRequest);
  };
  return (
    <button
      type="button"
      className={sendFriendRequest ? "follow-btn friendReqSent" : "follow-btn"}
      onClick={addFriendHandler}
    >
      {!sendFriendRequest ? props.content : "Requested"}
    </button>
  );
};

export default Button;
