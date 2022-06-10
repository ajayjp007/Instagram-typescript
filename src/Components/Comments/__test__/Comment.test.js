import React from 'react';
import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
} from '@testing-library/react';
import Comments from '../Comments';
import '@testing-library/jest-dom';

describe('Comments component test', () => {
  afterEach(cleanup);

  const some = {
    username: 'somename',
    Comments: 'something',
    _id: 'something',
  };

  test('should render comments component', () => {
    render(<Comments comments={[some]} postId={'something'} />);
    const Comment = screen.getByTestId('comment-section-test');
    expect(Comment).toBeInTheDocument();
  });
});
