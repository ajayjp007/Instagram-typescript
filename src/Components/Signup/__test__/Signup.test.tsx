import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import SignUp from '../SignUp';
import '@testing-library/jest-dom';

describe('Sign up page test', () => {
  afterEach(cleanup);
  test('should render Sign up page', () => {
    render(<SignUp />);
    const SignUpElement = screen.getByTestId('Signup-elem');
    expect(SignUpElement).toBeInTheDocument();
  });

  test('warning messages should initially be falsy', () => {
    const displayWarning = screen.queryByTestId('warning-message-signup');
    expect(displayWarning).toBeFalsy();
  });

  test('terms and conditions messages should initially be truthy', () => {
    const termsAndConditionsWarning = screen.queryByTestId(
      'terms-conditions-message-test',
    );
    expect(termsAndConditionsWarning).toBeFalsy();
  });
});
