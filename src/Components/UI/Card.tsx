import React, { useRef, useState } from "react";
import Comments from "../Comments/Comments";
import "./Card.css";

interface Props {
  data: {
    _id: string;
    name: string;
    caption: string;
    imageURL: string;
    email: string;
    like: [];
    uploadedDate: string;
    comment: [{ username: string; Comment: string; _id: string }];
    numberOfLikes: number;
  };
}
const Card: React.FC<Props> = (props) => {
  const [liked, setIsLiked] = useState<boolean>(false);
  const [postSaved, setPostIsSaved] = useState<boolean>(false);
  const [moreOptions, setMoreOptions] = useState<boolean>(false);
  const [commentPosted, setCommentPosted] = useState<boolean>(false);
  const [openComments, setOpenComment] = useState<boolean>(false);
  const [previousLikes, setPreviousLikes] = useState<number>(0);
  const inputComment = useRef<HTMLInputElement>(null);
  const closeModalHandler = () => {
    setMoreOptions(false);
  };
  const likeHandler = () => {
    setIsLiked(!liked);
    !liked
      ? setPreviousLikes((likes) => previousLikes + 1)
      : setPreviousLikes((likes) => previousLikes - 1);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      id: props.data._id,
      like: {
        username: localStorage.getItem("userName"),
        peopleWhoLiked: previousLikes,
      },
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:5000/api/posts/add-likes", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const savePostHandler = () => {
    setPostIsSaved(!postSaved);
  };
  const moreOptionsHandler = () => {
    setMoreOptions(true);
  };
  const postCommentsHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputComment.current?.value.trim().length === 0) {
      return;
    }
    setCommentPosted(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      id: props.data._id,
      comment: {
        username: localStorage.getItem("userName"),
        Comment: inputComment.current?.value,
      },
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/posts/add-new-comments", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setTimeout(() => {
      inputComment.current!.value = "";
      setCommentPosted(false);
    }, 3000);
  };
  const openCommentsHandler = () => {
    setOpenComment(!openComments);
  };
  return (
    <div className="card-container">
      <div className="Card-header-container">
        <div className="user-details-container">
          <img
            src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png"
            className="profile-picture"
            alt=""
          />
          <span className="other-profile-username">{props.data.name}</span>
        </div>
        <img
          src="https://www.svgrepo.com/show/395488/options.svg"
          onClick={moreOptionsHandler}
          className="more-options"
          alt="More Options"
        />
      </div>
      {moreOptions && (
        <div className="modal-container">
          <div className="modal">
            <div className="modal-header">
              <p>Options</p>
            </div>
            <div className="modal-body">
              <span className="modal-options">Report Post</span>
              <span className="modal-options">Unfollow</span>
              <span className="modal-options">Remove Tag</span>
              <span className="modal-options">Block user</span>
            </div>
            <span className="modal-footer-content" onClick={closeModalHandler}>
              <img
                src="https://www.svgrepo.com/show/273966/close.svg"
                alt="Close button"
                className="close-btn-icon"
              />
              Close
            </span>
          </div>
        </div>
      )}
      <img className="post-image" src={props.data.imageURL} alt="" />
      <div className="post-details">
        <span className="save-like-posts-container">
          <span className="like-share-comment">
            <img
              src={
                !liked
                  ? "https://cdn-icons-png.flaticon.com/128/711/711349.png"
                  : "https://cdn-icons-png.flaticon.com/128/833/833472.png"
              }
              onClick={likeHandler}
              alt="Like"
              className="like-share-comment-icons"
            />
            <img
              src="https://cdn-icons.flaticon.com/png/512/5948/premium/5948565.png?token=exp=1653123995~hmac=3847735317965d582303390dd775b7e5"
              alt="Comment"
              className="like-share-comment-icons"
              onClick={openCommentsHandler}
            />
            <img
              src="https://cdn-icons.flaticon.com/png/128/5728/premium/5728145.png?token=exp=1653022315~hmac=139002fb55b6446a81c94a46f4abb5a0"
              alt="Share"
              className="like-share-comment-icons"
            />
          </span>
          <img
            src={
              postSaved
                ? "https://cdn-icons.flaticon.com/png/128/5197/premium/5197986.png?token=exp=1653022524~hmac=3a555a1efce2abd36e3a676e0e212e89"
                : "https://cdn-icons-png.flaticon.com/128/7220/7220126.png"
            }
            onClick={savePostHandler}
            className="save-posts-icon"
            alt="Save Post"
          />
        </span>
        <div className="card-footer">
          <p className="usernames-card-footer">Likes {previousLikes}</p>
          <p>
            <span className="usernames-card-footer">{props.data.name}</span>
            {props.data.caption}
          </p>
          <p
            className="grey-color-text-card-bottom"
            onClick={openCommentsHandler}
          >
            View all comments
          </p>
          <p className="grey-color-text-card-bottom">
            Posted on {props.data.uploadedDate}
          </p>
        </div>
        {openComments && <Comments comments={props.data.comment} />}
      </div>
      <form className="add-comments-container" onSubmit={postCommentsHandler}>
        <img
          src="https://www.svgrepo.com/show/282764/happy-emoji.svg"
          className="emoji"
          alt="emoji"
        />
        <input
          type="text"
          className="comments-input"
          placeholder="Add a comment..."
          ref={inputComment}
        />
        <button className="post-btn" type="submit">
          {commentPosted ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default Card;
