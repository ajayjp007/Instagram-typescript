import { render, screen, cleanup } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom';

test('should render button component', () => {
  render(<Button content="follow" id="some-random-id" />);
  const buttonElement = screen.getByTestId('Button-1');
  expect(buttonElement).toBeInTheDocument();
});
