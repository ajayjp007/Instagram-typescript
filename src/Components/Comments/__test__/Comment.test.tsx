import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Comments from '../Comments';
import '@testing-library/jest-dom';

describe('Comments component test', () => {
  afterAll(cleanup);
  const commentProps: any = {
    username: 'somename',
    Comments: 'something',
    _id: 'something',
  };

  test('should render the comments section', () => {});

  test('should delete comment', () => {
    render(<Comments comments={[commentProps]} postId={'something'} />);
    const deleteCommentButton: any = screen.getByTestId(
      'delete-comment-btn-test',
    );
    fireEvent.click(deleteCommentButton);
    const popUpSection = screen.getByTestId('delete-pop-up-message-test');
    const confirmDeleteButton = screen.getByTestId(
      'confirm-comment-delete-test',
    );
    fireEvent.click(
      confirmDeleteButton,
      (global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              success: true,
              error: '',
            }),
        }),
      )),
    );
    expect(popUpSection).toBeVisible();
  });
});
