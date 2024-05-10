import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResetPassword from './ResetPassword';

describe('ResetPassword Component', () => {
  test('renders ResetPassword component correctly', () => {
    render(<ResetPassword />);
  
    const resetPasswordComponent = screen.getByTestId('reset-password');
    expect(resetPasswordComponent).toBeInTheDocument();

    // Check if input fields are rendered
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    expect(newPasswordInput).toBeInTheDocument();
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    expect(confirmPasswordInput).toBeInTheDocument();

    // Check if Confirm and Back buttons are rendered
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    expect(confirmButton).toBeInTheDocument();
    const backButton = screen.getByRole('button', { name: 'Back' });
    expect(backButton).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    render(<ResetPassword />);
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

    // Simulate input change in newPassword input
    userEvent.type(newPasswordInput, 'newPassword123');
    expect(newPasswordInput).toHaveValue('newPassword123');

    // Simulate input change in confirmPassword input
    userEvent.type(confirmPasswordInput, 'newPassword123');
    expect(confirmPasswordInput).toHaveValue('newPassword123');
  });

  test('handles password reset correctly', () => {
    // Mock the useResetPasswordMutation hook
    const mockResetPasswordMutation = jest.fn();
    jest.mock('../../Services/Authentication/AuthApi', () => ({
      useResetPasswordMutation: () => [mockResetPasswordMutation],
    }));

    render(<ResetPassword />);
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });

    // Enter passwords in the input fields
    userEvent.type(newPasswordInput, 'newPassword123');
    userEvent.type(confirmPasswordInput, 'newPassword123');

    // Click the Confirm button
    fireEvent.click(confirmButton);

    // Expect the mock function to be called with the correct payload
    expect(mockResetPasswordMutation).toHaveBeenCalledWith({
      payload: {
        newPassword: 'newPassword123',
        confirmPassword: 'newPassword123',
      },
      token: undefined, // Provide mock token if needed
    });
  });

  test('navigates back to login page when Back button is clicked', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(<ResetPassword />);
    const backButton = screen.getByRole('button', { name: 'Back' });

    // Click the Back button
    fireEvent.click(backButton);

    // Expect the navigate function to be called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/Login');
  });
});
