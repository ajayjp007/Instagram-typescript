import { render, screen, cleanup } from '@testing-library/react';
import NewPost from './NewPost';
import '@testing-library/jest-dom';

test('should render New Post page', () => {
  render(<NewPost />);
  const NewPostElement = screen.getByTestId('NewPost-elem');
  expect(NewPostElement).toBeInTheDocument();
});

// test('progress bar should be falsy until the upload starts', () => {
//   const showProgressBar = screen.queryByTestId('progress-bar-new-post');
//   expect(showProgressBar).toBeFalsy();
// });
