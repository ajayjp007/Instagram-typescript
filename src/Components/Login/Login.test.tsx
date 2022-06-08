// import { render, screen, cleanup } from '@testing-library/react';
// import Login from './Login';
// import '@testing-library/jest-dom';

// test('should render Login page', () => {
//   render(<Login />);
//   const loginElement = screen.getByTestId('Login-elem');
//   expect(loginElement).toBeInTheDocument();
// });

// test('login failed message should be falsy at first', () => {
//   const loginWarning = screen.queryByTestId('login-failed-message');
//   expect(loginWarning).toBeFalsy();
// });
import Login from './Login';
import * as ReactDom from 'react-dom';
import React from 'react';

describe('Login component test', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDom.render(<Login />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it('Renders correctly intial document', () => {
    const inputs = container.querySelectorAll('input');
    expect(inputs).toHaveLength(2);
  });
});
