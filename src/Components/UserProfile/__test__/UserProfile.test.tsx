import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import UserProfile from '../UserProfile';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../Store/index';

describe('User Profile Test', () => {
  afterEach(cleanup);
  test('should render user profile page', () => {
    render(<UserProfile />);
    const userProfilePage = screen.getByTestId('userprofile-elem');
    expect(userProfilePage).toBeInTheDocument();
  });
});
