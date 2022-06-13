import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Posts from '../Posts';
import '@testing-library/jest-dom';

describe('Render posts on the profile page', () => {
  afterEach(cleanup);
  test('should render posts in profile and other profile pages', () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ success: true, error: '' }),
      }),
    );
    render(<Posts />);
    const PostComponent = screen.getByTestId('posts-document-test');
    expect(PostComponent).toBeInTheDocument();
  });

  test('No posts yet paragraph', () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ success: true, error: '' }),
      }),
    );
    render(<Posts />);
    const text = screen.getByTestId('no-posts-yet-test');
    expect(text).toHaveTextContent('No Posts Yet.');
  });

  // test('open particular post should display the post', () => {
  //   (global.fetch = jest.fn().mockImplementationOnce(() =>
  //     Promise.resolve({
  //       status: 200,
  //       json: () => Promise.resolve({ success: true, error: '' }),
  //     }),
  //   )),
  //     render(<Posts />);
  //   const openPostBtn = screen.getByTestId('open-post-btn-test');
  //   fireEvent.click(openPostBtn);
  //   const post = screen.getByTestId('open-post-test-profile');
  //   expect(post).toBeVisible();
  // });
});
