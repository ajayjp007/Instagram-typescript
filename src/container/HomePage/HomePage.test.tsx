import { render, screen, cleanup, getByTestId } from '@testing-library/react';
import HomePage from './HomePage';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from 'src/Store';

test('should render home page', () => {
  render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );
  const HomePageComponent = screen.getByTestId('homepage-test');
  expect(HomePageComponent).toBeInTheDocument();
});
