import React from 'react';
import Login from '../Login';
import * as ReactDOM from 'react-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

describe('Login component test', () => {
  afterEach(cleanup);
  test('Renders the login page', () => {
    render(<Login />);
    const loginDocument = screen.getByTestId('login-test-elem');
    const inputs = loginDocument.querySelectorAll('input');
    expect(inputs).toHaveLength(2);
  });

  test('On click should fire an api call', () => {
    render(<Login />);
    const loginButton = screen.getByTestId('form-submit-login-test');
    fireEvent.submit(
      loginButton,
      (global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () => {
            Promise.resolve({
              sucess: true,
              error: '',
            });
          },
        }),
      )),
    );
  });
});
