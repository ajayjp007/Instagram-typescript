import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Card from '../Card';
import '@testing-library/jest-dom';

describe('Card component test', () => {
  afterEach(cleanup);
  test('should render card component on to the screen', () => {
    const something: any = {
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
    render(<Card data={something} />);
    const buttonElement: any = screen.getByTestId('card-like-btn-test');
    fireEvent.click(
      buttonElement,
      (global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              status: 200,
              json: () => Promise.resolve({ success: true }),
            }),
        }),
      )),
    );
    expect(buttonElement).toHaveClass('liked-icon-btn-card');
  });

  test('comment section must be falsy until the button is clicked', () => {
    const commentSection = screen.queryByTestId('comment-section-card-test');
    expect(commentSection).toBeFalsy();
  });
});
