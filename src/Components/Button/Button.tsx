import './Button.css';
import React, { useState } from 'react';

const Button: React.FC<{ content: string }> = ({ content }) => {
  const [sendFriendRequest, setSendFriendRequest] = useState<boolean>(false);
  const addFriendHandler = () => {
    setSendFriendRequest(!sendFriendRequest);
  };
  return (
    <button
      type="button"
      className={sendFriendRequest ? 'follow-btn friendReqSent' : 'follow-btn'}
      onClick={addFriendHandler}
    >
      {!sendFriendRequest ? content : 'Requested'}
    </button>
  );
};

export default Button;
