import { render, screen } from '@testing-library/react';
import Posts from './Posts';
import '@testing-library/jest-dom';

test('should render Sign up page', () => {
  render(<Posts />);
  const PostComponent = screen.getByTestId('Posts-renderer');
  expect(PostComponent).toBeInTheDocument();
});

test('open particular post should be falsy', () => {
  const openPost = screen.queryByTestId('open-post-test-profile');
  expect(openPost).toBeFalsy();
});
