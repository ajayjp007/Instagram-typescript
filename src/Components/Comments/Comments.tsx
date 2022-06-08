import React, { useState } from 'react';
import './Comments.css';

interface Props {
  comments: [{ username: string; Comment: string; _id: string }];
  postId: string;
}
const Comments: React.FC<Props> = (props) => {
  const [deleteSuccessful, setDeleteSuccessfull] = useState<boolean>(false);
  const [showPOpUp, setShowPopUp] = useState<boolean>(false);
  const [deleteCommentId, setDeleteCommentId] = useState<string>();
  const popUpHandler = (event: any | undefined) => {
    setShowPopUp(true);
    setDeleteCommentId(event.target.id);
  };
  const closePopUpHandler = () => {
    setShowPopUp(false);
  };
  const deleteCommentHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      id: deleteCommentId,
      postId: props.postId,
    });
    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch('http://localhost:5000/api/posts/delete-comments', requestOptions)
      .then((response) => response.text())
      .then(() => {
        setDeleteSuccessfull(true);
        setTimeout(() => {
          setShowPopUp(false);
        }, 1000);
      })
      .catch((error) => error);
  };
  return (
    <div className="comment-container">
      {props.comments.map((items) => {
        return (
          <div
            className="comments-line"
            key={Math.floor(Math.random() * 100000)}
          >
            {items.username}
            <div className="comment-content-container">
              <p className="comments-content">{items.Comment}</p>
              <button
                type="button"
                aria-label="Delete comment"
                onClick={popUpHandler}
                className="delete-comment-icon"
                id={items._id}
              />
            </div>
          </div>
        );
      })}
      {showPOpUp && (
        <div className="popup-message-main-container">
          <div className="popup-message-container">
            {!deleteSuccessful && (
              <p className="popup-message">
                Are you sure you want to delete the comment?
              </p>
            )}
            {deleteSuccessful && <p>Your comment was deleted.</p>}
            {!deleteSuccessful && (
              <div className="popup-btns-container">
                <button
                  className="pop-up-btns confirm"
                  onClick={deleteCommentHandler}
                  type="button"
                >
                  Yes
                </button>
                <button
                  className="pop-up-btns"
                  onClick={closePopUpHandler}
                  type="button"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
