import { render, screen, cleanup, getByTestId } from '@testing-library/react';
import AddNewFriends from './AddNewFriends';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from 'src/Store';

test('should render a list off all the other users on to the page', () => {
  render(
    <Provider store={store}>
      <AddNewFriends />
    </Provider>,
  );
  const AddNewFriendsComponent = screen.getByTestId('addNewFriends-test');
  expect(AddNewFriendsComponent).toBeInTheDocument();
});
