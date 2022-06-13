import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import AddNewFriends from '../AddNewFriends';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../Store/index';

describe('AddNewFriends components test', () => {
  afterEach(cleanup);
  test('should render a list off all the other users on to the page', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        success: true,
        error: '',
      }),
    );
    render(
      <Provider store={store}>
        <AddNewFriends />
      </Provider>,
    );
    const addNewFriendsDocument = screen.getByTestId('addNewFriends-test');
    expect(addNewFriendsDocument).toBeInTheDocument();
  });
});
