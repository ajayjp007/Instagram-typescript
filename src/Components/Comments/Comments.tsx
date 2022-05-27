import React, { useState } from "react";
import "./Comments.css";

interface Props {
  comments: [{ username: string; Comment: string; _id: string }];
}
const Comments: React.FC<Props> = (props) => {
  const [deleteSuccessful, setDeleteSuccessfull] = useState<boolean>(false);
  const [postsData, setPostsData] = useState(props.comments);
  const [showPOpUp, setShowPopUp] = useState<boolean>(false);
  const [deleteCommentId, setDeleteCommentId] = useState<string>();
  const popUpHandler = (event: any | undefined) => {
    setShowPopUp(true);
    setDeleteCommentId(event.target.id);
    console.log(deleteCommentId);
  };
  const closePopUpHandler = () => {
    setShowPopUp(false);
  };
  const deleteCommentHandler = () => {
    //deletes the post fix!!!
    // let myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // const raw = JSON.stringify({
    //     "_id": deleteCommentId
    // });
    // const requestOptions: RequestInit = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };
    // fetch("http://localhost:5000/api/posts/delete-comments", requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //         console.log(result)
    //         setDeleteSuccessfull(true)
    //         setTimeout(() => {
    //             setShowPopUp(false)
    //         }, 1000)
    //     })
    //     .catch(error => console.log('error', error));
  };
  return (
    <div className="comment-container">
      {postsData.map((items) => {
        return (
          <div className="comments-line" key="comments">
            {items.username}
            <div className="comment-content-container">
              <p className="comments-content">{items.Comment}</p>
              <img
                onClick={popUpHandler}
                src="https://img.icons8.com/external-anggara-flat-anggara-putra/344/external-delete-interface-anggara-flat-anggara-putra-2.png"
                alt="delete"
                className="delete-comment-icon"
                id={items._id}
              />
            </div>
          </div>
        );
      })}
      ;
      {showPOpUp && (
        <div className="popup-message-main-container">
          <div className="popup-message-container">
            <p className="popup-message">
              Are you sure you want to delete the comment?
            </p>
            {deleteSuccessful && <p>Your comment was deleted.</p>}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
