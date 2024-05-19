import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import AddItems from './Additems'

// Mocking the Breadcrumb component
jest.mock('../../../components/Breadcrumb', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => null),
}));



describe('AddUsers component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AddItems />
      </MemoryRouter>
    );
  });

  test('form inputs can be filled', async () => {
    render(
      <MemoryRouter>
        <AddItems />
      </MemoryRouter>
    );

     // Find form inputs by their labels or placeholders
  const AssetsClassInput = screen.getByLabelText(/Assets Class/i);
  const AssetsSubClassInput = screen.getByLabelText(/Assets Sub Class/i);
  const ItemName = screen.getByLabelText(/Item Name/i);
  
  // Simulate user input by changing the input values
  fireEvent.change(AssetsClassInput, { target: { value: 'Inventory' } });
  fireEvent.change(AssetsSubClassInput, { target: { value: 'Electronics' } });
  fireEvent.change(ItemName, { target: { value: 'Diodes' } });
  
  });


  test('submitting the form calls handleSaveCreateUsers function', async () => {
    const mockHandleSaveItem = jest.fn();

    render(
      <MemoryRouter>
        <AddItems handleSaveItem={mockHandleSaveItem} />
      </MemoryRouter>
    );

   // Find form inputs by their labels or placeholders
  const AssetsClassInput = screen.getByLabelText(/Assets Class/i);
  const AssetsSubClassInput = screen.getByLabelText(/Assets Sub Class/i);
  const ItemName = screen.getByLabelText(/Item Name/i);
  
  // Simulate user input by changing the input values
  fireEvent.change(AssetsClassInput, { target: { value: 'Inventory' } });
  fireEvent.change(AssetsSubClassInput, { target: { value: 'Electronics' } });
  fireEvent.change(ItemName, { target: { value: 'Diodes' } });
  });



  test('renders placeholders correctly', () => {
    render(
      <MemoryRouter> {/* Wrap your component in MemoryRouter */}
        <AddItems />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Enter the Assets Sub Class')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter the Item Name')).toBeInTheDocument();
    
  });
  

});
