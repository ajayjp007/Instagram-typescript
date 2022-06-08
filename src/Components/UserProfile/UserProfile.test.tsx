import { render, screen, cleanup } from '@testing-library/react';
import UserProfile from './UserProfile';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from 'src/Store';

test('should render user profile page', () => {
  render(
    <Provider store={store}>
      <UserProfile />
    </Provider>,
  );
  const UserProfileElement = screen.getByTestId('userprofile-elem');
  expect(UserProfileElement).toBeInTheDocument();
});
