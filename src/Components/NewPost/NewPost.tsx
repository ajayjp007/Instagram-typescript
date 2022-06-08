import React, { useRef, useState, useEffect, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../../Firebase/firebase';
import './NewPost.css';

const NewPost = () => {
  const [goBack, setGoBack] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const captionInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>();
  const [posting, setPosting] = useState<boolean>(false);
  const [uploadFailed, setUploadFailed] = useState<boolean>(false);
  const [postingProgress, setPostingProgress] = useState<number>(0);

  const addPostHandler = (downloadURL: string) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const username = localStorage.getItem('userName');
    const email = localStorage.getItem('emailId');
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const uploadedDate = `${date} / ${month} / ${year}`;
    const raw = JSON.stringify({
      name: username,
      email,
      caption: captionInput.current?.value,
      imageURL: downloadURL,
      uploadedDate,
      like: [],
      numberOfLikes: 0,
    });
    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch('http://localhost:5000/api/posts/add-post', requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => error);
  };

  // preview method createObjectUrl has been depriciated so make the necessary changes later

  useEffect(() => {
    if (!imageUrl) {
      setPreview(undefined);
    }
    // const objectUrl = URL.createObjectURL(imageUrl);
    // setPreview(objectUrl);
    // return () => URL.revokeObjectURL(objectUrl);
  }, [imageUrl]);
  const closeNewPostHandler = () => {
    setGoBack(true);
  };
  const uploadImageHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (imageUrl === null) {
      return;
    }
    setPosting(true);
    const storageRef = ref(storage, `images/${imageUrl + v4()} `);
    const uploadTask = uploadBytesResumable(storageRef, imageUrl);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setPostingProgress(progress * 100);
      },
      (error) => {
        if (error) {
          setUploadFailed(true);
        }
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          addPostHandler(downloadURL);
          setGoBack(true);
        });
      },
    );
  };
  return (
    <Fragment key={Math.floor(Math.random() * 10000)}>
      <form onSubmit={uploadImageHandler} data-testid="NewPost-elem">
        <div className="new-post-container">
          {goBack && <Navigate to="/home-page" />}
          <div className="new-post-header">
            Create a new post
            <button
              id="close-newpost"
              onClick={closeNewPostHandler}
              type="button"
              aria-label="Close button"
            />
          </div>
          {imageUrl === null ? (
            <span className="drop-image-here">
              Drop Your image here
              <img
                src="https://cdn0.iconfinder.com/data/icons/household-thinline-icons-set/139/DropOff-Outline-512.png"
                className="preview-image"
                alt="preview"
              />
            </span>
          ) : (
            <img src={preview} className="preview-image" alt="preview" />
          )}
          <input
            type="file"
            className="custom-file-input"
            accept=".png, .jpg, .jpeg video/mp4,video/x-m4v,video/*"
            onChange={(event: any) => {
              setImageUrl(event.target.files![0]);
            }}
          />
          <div className="caption-container">
            <input
              type="text"
              placeholder="Caption"
              className="caption-input"
              ref={captionInput}
            />
            <button className="post-btn-newpost" type="submit">
              {posting ? 'Posting...' : 'Post'}
            </button>
            {uploadFailed && <p>Upload Failed Please Try Again.</p>}
          </div>
        </div>
        {posting && (
          <div
            className="progress-bar-container"
            data-testid="progress-bar-new-post"
          >
            <div
              className="progress-bar"
              style={{ width: `${postingProgress}%` }}
            >
              {postingProgress}
            </div>
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default NewPost;
