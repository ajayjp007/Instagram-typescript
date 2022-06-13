import React, { useEffect, Fragment } from 'react';
import './HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import Navbar from '../Navbar/Navbar';
import UserProfile from '../../Components/UserProfile/UserProfile';

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.posts.posts);
  useEffect(() => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const requestOptions: any = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      const fetchData = async () => {
        await fetch(
          'http://localhost:5000/api/posts/get-all-posts',
          requestOptions,
        )
          .then((response) => response.json())
          .then((result) => {
            dispatch({ type: 'POST-LOADED', payload: result.posts });
          })
          .catch((error) => error);
      };
      fetchData().catch();
    } catch (err) {
      // handle errors
    }
  }, []);
  return (
    <Fragment key={Math.floor(Math.random() * 100000)}>
      <Navbar />
      <div className="main-content-container" data-testid="homepage-test">
        <div className="story-posts-container">
          {posts.map((items: any) => {
            return (
              <Card data={items} key={Math.floor(Math.random() * 1000000)} />
            );
          })}
        </div>
        <UserProfile />
      </div>
    </Fragment>
  );
};

export default HomePage;
