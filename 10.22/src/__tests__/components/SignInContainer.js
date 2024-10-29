import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const mockOnSubmit = jest.fn();
      const { getByTestId } = render(<SignInContainer onSubmit={mockOnSubmit} />);

      fireEvent.changeText(getByTestId('username'), 'testuser');
      fireEvent.changeText(getByTestId('password'), 'password');
      fireEvent.press(getByTestId('submitButton'));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({
          username: 'testuser',
          password: 'password',
        });
      });
    });
  });
});
