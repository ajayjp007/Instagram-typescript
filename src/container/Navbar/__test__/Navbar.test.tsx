import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
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

  test('search bar results at the start should be falsy', () => {
    const openSearchResults = screen.queryByTestId('search-bar-navbar');
    expect(openSearchResults).toBeFalsy();
  });
});
