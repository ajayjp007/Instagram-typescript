import React, { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/firebase";
import "./NewPost.css";
import { v4 } from "uuid";

const NewPost = () => {
  const [goBack, setGoBack] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const captionInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>();
  const [posting, setPosting] = useState<boolean>(false);
  useEffect(() => {
    if (!imageUrl) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(imageUrl);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
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
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          console.log("File available at", downloadURL);
          addPostHandler(downloadURL);
          setGoBack(true);
        });
      }
    );
    const addPostHandler = (downloadURL: string) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const username = localStorage.getItem("userName");
      const email = localStorage.getItem("emailId");
      const newDate = new Date();
      const date = newDate.getDate();
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();
      const uploadedDate = date + "/" + month + "/" + year;
      const raw = JSON.stringify({
        name: username,
        email: email,
        caption: captionInput.current?.value,
        imageURL: downloadURL,
        uploadedDate: uploadedDate,
        like: [],
        numberOfLikes: 0,
      });
      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("http://localhost:5000/api/posts/add-post", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    };
  };
  return (
    <form onSubmit={uploadImageHandler}>
      <div className="new-post-container">
        {goBack && <Navigate to="/home-page" />}
        <div className="new-post-header">
          Create a new post
          <img
            src="https://www.svgrepo.com/show/96948/close.svg"
            alt="Close button"
            id="close-newpost"
            onClick={closeNewPostHandler}
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
            {posting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewPost;
