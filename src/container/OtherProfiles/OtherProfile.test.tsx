import { render, screen, cleanup } from '@testing-library/react';
import OtherProfile from './OtherProfiles';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from 'src/Store';

test('should render Others profile page', () => {
  render(
    <Provider store={store}>
      <OtherProfile />
    </Provider>,
  );
  const OtherProfileElement = screen.getByTestId('otherProfile-elem');
  expect(OtherProfileElement).toBeInTheDocument();
});
