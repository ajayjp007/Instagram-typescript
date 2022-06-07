import './Button.css';
import React, { useState } from 'react';

const Button: React.FC<{ content: string; id: string }> = ({ content, id }) => {
  const [sendFriendRequest, setSendFriendRequest] = useState<boolean>(false);
  const addFriendHandler = (event: any) => {
    setSendFriendRequest(!sendFriendRequest);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      id: event.target.id,
      username: localStorage.getItem('userName'),
    });

    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:5000/api/users/add-new-friend', requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => error);
  };
  return (
    <button
      type="button"
      id={id}
      className={sendFriendRequest ? 'follow-btn friendReqSent' : 'follow-btn'}
      onClick={addFriendHandler}
    >
      {!sendFriendRequest ? content : 'Requested'}
    </button>
  );
};

export default Button;
