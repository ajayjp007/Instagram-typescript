import React, { useRef, useState } from 'react';
import Comments from '../../Components/Comments/Comments';
import './Card.css';

interface Props {
  data: {
    _id: string;
    name: string;
    caption: string;
    imageURL: string;
    email: string;
    like: Array<string>;
    uploadedDate: string;
    comment: [{ username: string; Comment: string; _id: string }];
    numberOfLikes: number;
  };
}

const Card = (props: Props) => {
  const currentUser: any = localStorage.getItem('userName');
  const checkIfLikesIncludesUser = props.data.like.includes(currentUser);
  const [liked, setIsLiked] = useState<boolean>(checkIfLikesIncludesUser);
  const [postSaved, setPostIsSaved] = useState<boolean>(false);
  const [moreOptions, setMoreOptions] = useState<boolean>(false);
  const [commentPosted, setCommentPosted] = useState<boolean>(false);
  const [openComments, setOpenComment] = useState<boolean>(false);
  const inputCommentRef = useRef<HTMLInputElement>(null);
  const [numOfLikes, setNumOfLikes] = useState<number>(props.data.like.length);

  const closeModalHandler = () => {
    setMoreOptions(false);
  };
  const likeHandler = () => {
    setIsLiked(!liked);
    if (liked) {
      setNumOfLikes(numOfLikes - 1);
    } else {
      setNumOfLikes(numOfLikes + 1);
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      username: localStorage.getItem('userName'),
      _id: props.data._id,
    });
    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch('http://localhost:5000/api/posts/add-likes', requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => error);
  };
  const savePostHandler = () => {
    setPostIsSaved(!postSaved);
  };
  const moreOptionsHandler = () => {
    setMoreOptions(true);
  };
  const postCommentsHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputCommentRef.current?.value.trim().length === 0) {
      return;
    }
    setCommentPosted(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      id: props.data._id,
      comment: {
        username: localStorage.getItem('userName'),
        Comment: inputCommentRef.current?.value,
      },
    });
    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch('http://localhost:5000/api/posts/add-new-comments', requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => error);

    setTimeout(() => {
      inputCommentRef.current!.value = '';
      setCommentPosted(false);
    }, 3000);
  };
  const openCommentsHandler = () => {
    setOpenComment(!openComments);
  };

  return (
    <div className="card-container" data-testid="card-test">
      <div className="Card-header-container">
        <div className="user-details-container">
          <img
            src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png"
            className="profile-picture"
            alt=""
          />
          <span className="other-profile-username">{props.data.name}</span>
        </div>
        <button
          aria-label="options"
          type="button"
          data-testid="more-options-test-card"
          onClick={moreOptionsHandler}
          className="more-options"
        />
      </div>
      {moreOptions && (
        <div className="modal-container" data-testid="modal-card-test">
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
            <button
              type="button"
              className="modal-footer-content"
              onClick={closeModalHandler}
            >
              <img
                src="https://www.svgrepo.com/show/273966/close.svg"
                className="close-btn-icon"
                alt="close"
              />
              Close
            </button>
          </div>
        </div>
      )}
      <img className="post-image" src={props.data.imageURL} alt="" />
      <div className="post-details">
        <span className="save-like-posts-container">
          <span className="like-share-comment">
            <button
              aria-label="like"
              type="button"
              data-testid="card-like-btn-test"
              onClick={likeHandler}
              className={!liked ? 'like-icons-btn-card' : 'liked-icon-btn-card'}
            />
            <button
              aria-label="comment"
              type="button"
              className="comment-icon-btn-card"
              onClick={openCommentsHandler}
            />
            <button
              type="button"
              className="share-icon-btn-card"
              aria-label="share"
            />
          </span>
          <button
            aria-label="save post"
            type="button"
            onClick={savePostHandler}
            className={
              !postSaved ? 'save-posts-icon-btn' : 'saved-posts-icon-btn'
            }
          />
        </span>
        <div className="card-footer">
          <p className="usernames-card-footer">{`Likes ${numOfLikes}`}</p>
          <p>
            <span className="usernames-card-footer">{props.data.name}</span>
            {` ${props.data.caption}`}
          </p>
          <button
            type="button"
            className="grey-color-text-card-bottom"
            onClick={openCommentsHandler}
          >
            View all comments
          </button>
          <p className="grey-color-text-card-bottom">
            {`Posted on ${props.data.uploadedDate}`}
          </p>
        </div>
        {openComments && (
          <Comments comments={props.data.comment} postId={props.data._id} />
        )}
      </div>
      <form className="add-comments-container" onSubmit={postCommentsHandler}>
        <input
          type="text"
          className="comments-input"
          placeholder="Add a comment..."
          ref={inputCommentRef}
        />
        <button className="post-btn" type="submit">
          {commentPosted ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default Card;
