import React from 'react';
import { useSelector } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';
import OtherProfile from '../OtherProfiles';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../Store/index';

describe('Other Profiles page test', () => {
  afterEach(cleanup);
  test('should render Others profile page', () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        json: () =>
          Promise.resolve({ success: false, error: 'Something bad happened' }),
      }),
    );
    render(
      <Provider store={store}>
        <OtherProfile />
      </Provider>,
    );
    const OtherProfileElement = screen.getByTestId('otherProfile-elem');
    expect(OtherProfileElement).toBeInTheDocument();
  });
});
