import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Profile from '../Profile';
import '@testing-library/jest-dom';
import store from '../../../Store/index';
import { Provider } from 'react-redux';

describe('Profile page test', () => {
  afterEach(cleanup);
  test('should render profile page', () => {
    (global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            success: true,
            error: '',
          }),
      }),
    )),
      render(
        <Provider store={store}>
          <Profile />
        </Provider>,
      );
    const ProfileElement = screen.getByTestId('Profile-elem');
    expect(ProfileElement).toBeInTheDocument();
  });

  test('settings button works properly', () => {
    (global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            success: true,
            error: '',
          }),
      }),
    )),
      render(
        <Provider store={store}>
          <Profile />
        </Provider>,
      );
    const settingsButton = screen.getByTestId('settings-button-profile-test');
    fireEvent.click(settingsButton);
  });
  test('Logout button works properly', () => {
    (global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            success: true,
            error: '',
          }),
      }),
    )),
      render(
        <Provider store={store}>
          <Profile />
        </Provider>,
      );
    const logOutBtn = screen.getByTestId('logout-button-test');
    fireEvent.click(logOutBtn);
  });
});
