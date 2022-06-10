import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
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
    const PostComponent = screen.getByTestId('Posts-renderer');
    expect(PostComponent).toBeInTheDocument();
  });

  test('open particular post should be falsy', () => {
    const openPost = screen.queryByTestId('open-post-test-profile');
    expect(openPost).toBeFalsy();
  });
});
