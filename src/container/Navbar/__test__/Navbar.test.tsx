import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../Store/index';

describe('Navbar component test', () => {
  afterEach(cleanup);
  test('should render navbar on to the screen', () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    const NavbarComponent = screen.getByTestId('navbar-test');
    expect(NavbarComponent).toBeInTheDocument();
  });

  test('Clicking on new post page takes you to new post page', () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    const newPostBtn = screen.getByTestId('new-post-page-btn');
    fireEvent.click(newPostBtn);
  });

  test('Clicking on profile takes you to profile page', () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    const profilePageBtn = screen.getByTestId('profile-page-btn-test-navbar');
    fireEvent.click(profilePageBtn);
  });

  test('Clicking on home icon takes you to home page', () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
    const homePageBtn = screen.getByTestId('home-page-btn-test-navbar');
    fireEvent.click(homePageBtn);
  });

  // test('search bar works properly', () => {
  //   render(
  //     <Provider store={store}>
  //       <Navbar />
  //     </Provider>,
  //   );
  //   const searchBar = screen.getByTestId('search-bar-test');
  //   fireEvent.input(searchBar);
  //   const searchBarDropdownClose = screen.getByTestId(
  //     'search-bar-close-navbar-test',
  //   );
  //   expect(searchBarDropdownClose).toHaveTextContent('Close');
  // });
});
