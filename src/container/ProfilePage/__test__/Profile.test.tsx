import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Profile from '../Profile';
import '@testing-library/jest-dom';
import store from '../../../Store/index';
import { Provider } from 'react-redux';

describe('Profile page test', () => {
  afterEach(cleanup);
  test('should render profile page', async () => {
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
});
