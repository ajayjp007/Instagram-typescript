import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import HomePage from '../HomePage';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../Store/index';

describe('Home Page test', () => {
  afterEach(cleanup);
  test('should render home page', async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
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
    const HomePageComponent = screen.getByTestId('homepage-test');
    expect(HomePageComponent).toBeInTheDocument();
  });
});
