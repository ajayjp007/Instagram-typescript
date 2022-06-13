import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import SignUp from '../SignUp';
import '@testing-library/jest-dom';

describe('Sign up page test', () => {
  afterEach(cleanup);
  test('should render Sign up page', () => {
    render(<SignUp />);
    // const SignUpElement = screen.getByTestId('Signup-elem');
    // expect(SignUpElement).toBeInTheDocument();
  });

  test('on submitting the form the sign up should register the person as a new user', () => {
    render(<SignUp />);
    const signupForm = screen.getByTestId('signup-form-test');
    fireEvent.submit(
      signupForm,
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

  test('terms and conditions button class should change', () => {
    render(<SignUp />);
    const termsAndConditionsButton = screen.getByTestId(
      'terms-conditions-icon-btn-test',
    );
    fireEvent.click(termsAndConditionsButton);
    expect(termsAndConditionsButton).toHaveClass('icon-sign-up-terms');
  });
});
