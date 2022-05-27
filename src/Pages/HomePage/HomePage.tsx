import React from "react";
import "./HomePage.css";
import Card from "../../Components/UI/Card";
import Navbar from "../../Components/Navbar/Navbar";
import UserProfile from "../../Components/UserProfile/UserProfile";
import { useEffect } from "react";
import { loadPosts } from "../../Components/Store/postAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const HomePage = ({ loadPosts, posts }: any) => {
  useEffect(() => {
    if (posts.length === 0) {
      loadPosts();
    }
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="main-content-container">
        <div className="story-posts-container">
          {/* <StoryBox />     */}
          {posts.map((items: any, index: number) => {
            return <Card data={items} key={items + index} />;
          })}
        </div>
        <UserProfile />
      </div>
    </React.Fragment>
  );
};
HomePage.propTypes = {
  loadPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { loadPosts })(HomePage);
