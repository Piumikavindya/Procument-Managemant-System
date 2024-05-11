import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import AddUsers from './AddUsers';

// Mocking the Breadcrumb component
jest.mock('../../../components/Breadcrumb', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => null),
}));



describe('AddUsers component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AddUsers />
      </MemoryRouter>
    );
  });

  test('form inputs can be filled', async () => {
    render(
      <MemoryRouter>
        <AddUsers />
      </MemoryRouter>
    );

     // Find form inputs by their labels or placeholders
  const roleInput = screen.getByLabelText(/Role/i);
  const departmentInput = screen.getByLabelText(/Department/i);
  const firstNameInput = screen.getByLabelText(/First name/i);
  const lastNameInput = screen.getByLabelText(/Last name/i);
  const emailInput = screen.getByLabelText(/Email Address/i);
  const employeeNumberInput = screen.getByLabelText(/Employee Number/i);
  const usernameInput = screen.getByLabelText(/User Name/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  // Simulate user input by changing the input values
  fireEvent.change(roleInput, { target: { value: 'admin' } });
  fireEvent.change(departmentInput, { target: { value: 'DCEE' } });
  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
  fireEvent.change(employeeNumberInput, { target: { value: '123456' } });
  fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  });

  test('submitting the form calls handleSaveCreateUsers function', async () => {
    const mockHandleSaveCreateUsers = jest.fn();

    render(
      <MemoryRouter>
        <AddUsers handleSaveCreateUsers={mockHandleSaveCreateUsers} />
      </MemoryRouter>
    );

  
    const roleInput = screen.getByLabelText(/Role/i);
    const departmentInput = screen.getByLabelText(/Department/i);
    const firstNameInput = screen.getByLabelText(/First name/i);
    const lastNameInput = screen.getByLabelText(/Last name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const employeeNumberInput = screen.getByLabelText(/Employee Number/i);
    const usernameInput = screen.getByLabelText(/User Name/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(roleInput, { target: { value: 'admin' } });
    fireEvent.change(departmentInput, { target: { value: 'DCEE' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(employeeNumberInput, { target: { value: '123456' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

  

  });



    test('renders placeholders and labels correctly', () => {
      render(
        <MemoryRouter> {/* Wrap your component in MemoryRouter */}
          <AddUsers />
        </MemoryRouter>
      );

      expect(screen.getByPlaceholderText('Enter your first name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter the last name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter the email address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter the employee name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter the user name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter the password')).toBeInTheDocument();
    });
  

});
