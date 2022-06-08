import { render, screen, cleanup } from '@testing-library/react';
import Profile from './Profile';
import '@testing-library/jest-dom';
import store from 'src/Store';
import { Provider } from 'react-redux';

test('should render Sign up page', () => {
  render(
    <Provider store={store}>
      <Profile />
    </Provider>,
  );
  const ProfileElement = screen.getByTestId('Profile-elem');
  expect(ProfileElement).toBeInTheDocument();
});
