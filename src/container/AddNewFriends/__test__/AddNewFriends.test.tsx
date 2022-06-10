import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import AddNewFriends from '../AddNewFriends';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../Store/index';

describe('AddNewFriends components test', () => {
  afterEach(cleanup);
  test('should render a list off all the other users on to the page', async () => {
    await act(
      (global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 400,
          json: () =>
            Promise.resolve({
              success: false,
              error: 'Something bad happened',
            }),
        }),
      )),
    );
    render(
      <Provider store={store}>
        <AddNewFriends />
      </Provider>,
    );
    const AddNewFriendsComponent = screen.getByTestId('addNewFriends-test');
    expect(AddNewFriendsComponent).toBeInTheDocument();
  });
});
