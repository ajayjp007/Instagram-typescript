import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
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

  test('see if clicking on request button changes the text from follow to following', () => {
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
    const followButton = screen.getByTestId('follow-btn-other-profile-test');
    fireEvent.click(followButton);
    expect(followButton).toHaveTextContent('Follow');
  });
});
