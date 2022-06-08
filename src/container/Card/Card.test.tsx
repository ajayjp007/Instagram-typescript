import { render, screen, cleanup } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from 'src/Store';

test('should render card where all the posts will be rendered', () => {
  render(
    <Provider store={store}>
      <Card data={} />
    </Provider>,
  );
  const CardComponent = screen.getByTestId('card-test');
  expect(CardComponent).toBeInTheDocument();
});
