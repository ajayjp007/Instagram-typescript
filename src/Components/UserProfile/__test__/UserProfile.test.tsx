import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import UserProfile from '../UserProfile';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../Store/index';

describe('User Profile Test', () => {
  afterEach(cleanup);
  test('should render user profile page', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        json: () =>
          Promise.resolve({ success: false, error: 'Something bad happened' }),
      }),
    );
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>,
    );
    const UserProfileElement = screen.getByTestId('userprofile-elem');
    expect(UserProfileElement).toBeInTheDocument();
  });
});
