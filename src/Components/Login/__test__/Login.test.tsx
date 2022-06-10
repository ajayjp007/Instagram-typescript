import React from 'react';
import Login from '../Login';
import * as ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';

describe('Login component test', () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<Login />, container);
  });
  afterEach(cleanup);

  it('Renders correctly intial document', () => {
    const inputs = container.querySelectorAll('input');
    expect(inputs).toHaveLength(2);
  });
});
