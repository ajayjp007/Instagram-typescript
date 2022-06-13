import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import NewPost from '../NewPost';
import '@testing-library/jest-dom';

describe('New post Page test cases', () => {
  afterEach(cleanup);
  test('should render New Post page', () => {
    // render(<NewPost />);
    // const NewPostElement = screen.getByTestId('NewPost-elem');
    // expect(NewPostElement).toBeInTheDocument();
  });

  test('button should fireoff an api call', async () => {
    // const newPostBtn = screen.getAllByTestId('newpost-test-btn');
    // const newPostBtn = screen.getByTestId('newpost-test-btn');
    // fireEvent.click(
    //   newPostBtn,
    //   await act(
    //     (global.fetch = jest.fn().mockImplementationOnce(() =>
    //       Promise.resolve({
    //         status: 400,
    //         json: () =>
    //           Promise.resolve({
    //             success: false,
    //             error: 'Something bad happened',
    //           }),
    //       }),
    //     )),
    //   ),
    // );
    // expect(newPostBtn).toHaveTextContent('Posting...');
  });
});

// test('progress bar should be falsy until the upload starts', () => {
//   const showProgressBar = screen.queryByTestId('progress-bar-new-post');
//   expect(showProgressBar).toBeFalsy();
// });
