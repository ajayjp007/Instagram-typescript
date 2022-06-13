import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Card from '../Card';
import '@testing-library/jest-dom';

describe('Card component test', () => {
  afterEach(cleanup);
  beforeEach(() => {
    const cardProps: any = {
      _id: 'something',
      name: 'something',
      caption: 'some caption',
      imageURL: 'some url',
      email: 'jane@gmail.com',
      like: [],
      uploadedDate: 'someday',
      comment: [
        {
          username: 'some username',
          Comment: 'some random comment',
          _id: 'some id',
        },
      ],
      numberOfLikes: 0,
    };
    render(<Card data={cardProps} />);
  });

  test('should render card component on to the screen', () => {
    const cardProps: any = {
      _id: 'something',
      name: 'something',
      caption: 'some caption',
      imageURL: 'some url',
      email: 'jane@gmail.com',
      like: [],
      uploadedDate: 'someday',
      comment: [
        {
          username: 'some username',
          Comment: 'some random comment',
          _id: 'some id',
        },
      ],
      numberOfLikes: 0,
    };
    render(<Card data={cardProps} />);
  });

  test('likes button works properly', () => {
    const buttonElement = screen.getByTestId('card-like-btn-test');
    fireEvent.click(
      buttonElement,
      (global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          success: true,
          error: '',
        }),
      )),
    );
    expect(buttonElement).toHaveClass('liked-icon-btn-card');
  });

  test('comment section must be falsy until the button is clicked', () => {
    const commentSection = screen.queryByTestId('comment-section-card-test');
    expect(commentSection).toBeFalsy();
  });

  test('post comment button changes text after click', () => {
    const postCommentButton = screen.getByTestId('post-btn-card-bottom-test');
    fireEvent.click(postCommentButton);
    expect(postCommentButton).toHaveTextContent('Post');
  });

  test('if modal works properly', () => {
    const moreOptionsButton = screen.getByTestId('more-options-test-card');
    fireEvent.click(moreOptionsButton);
    const closeModalButton = screen.getByTestId('close-modal-button-test');
    const modal = screen.getByTestId('modal-card-test');
    fireEvent.click(closeModalButton);
    expect(modal).not.toBeVisible();
  });

  test('open comments button works properly', () => {
    const openCommentsButton = screen.getByTestId('open-comments-button-test');
    fireEvent.click(openCommentsButton);
  });

  test('save post button test', () => {
    const savePostButton = screen.getByTestId('post-save-button-test');
    fireEvent.click(savePostButton);
    expect(savePostButton).toHaveClass('saved-posts-icon-btn');
  });
});
