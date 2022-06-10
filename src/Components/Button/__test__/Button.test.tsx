import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Button from '../Button';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

describe('Button component test', () => {
  afterEach(cleanup);
  test('should render button component', async () => {
    render(<Button content="follow" id="some-random-id" />);
    const buttonElement = screen.getByTestId('Button-1');
    fireEvent.click(
      buttonElement,
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
    expect(buttonElement).toHaveTextContent('Requested');
  });

  test('should render button text properly', () => {
    const { getByTestId } = render(
      <Button content="follow" id="some-random-id" />,
    );
    expect(getByTestId('Button-1')).toHaveTextContent('follow');
  });

  test('matches snapshot', () => {
    const ButtonSnapshot = renderer
      .create(<Button content="follow" id="some-random-id" />)
      .toJSON();
    expect(ButtonSnapshot).toMatchSnapshot();
  });
});
