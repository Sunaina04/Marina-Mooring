import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTechnication from './AddTechnician';
import AddTechnician from './AddTechnician';

describe('AddTechnication Component', () => {
  beforeEach(() => {
    render(<AddTechnication />);
  });

  it('renders AddTechnication component correctly', () => {
    expect(screen.getByText('Add Technician')).toBeInTheDocument();
    expect(screen.getByText('Technician Name')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Technician ID')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

//   it('updates input fields correctly', async () => {
//     const technicianNameInput = screen.getByLabelText('Technician Name');
//     const emailAddressInput = screen.getByLabelText('Email Address');
//     const technicianIdInput = screen.getByLabelText('Technician ID');
//     const phoneInput = screen.getByLabelText('Phone');
//     const streetInput = screen.getByPlaceholderText('Street/house');
//     const sectorInput = screen.getByPlaceholderText('Sector/Block');
//     const pincodeInput = screen.getByPlaceholderText('Pincode');
//     const noteTextarea = screen.getByRole('textbox', { name: 'Note' });

//     fireEvent.change(technicianNameInput, { target: { value: 'John Doe' } });
//     fireEvent.change(emailAddressInput, { target: { value: 'john.doe@example.com' } });
//     fireEvent.change(technicianIdInput, { target: { value: 'T12345' } });
//     fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
//     fireEvent.change(streetInput, { target: { value: '123 Main St' } });
//     fireEvent.change(sectorInput, { target: { value: 'Sector 5' } });
//     fireEvent.change(pincodeInput, { target: { value: '12345' } });
//     fireEvent.change(noteTextarea, { target: { value: 'This is a test note' } });

//     expect(technicianNameInput).toHaveValue('John Doe');
//     expect(emailAddressInput).toHaveValue('john.doe@example.com');
//     expect(technicianIdInput).toHaveValue('T12345');
//     expect(phoneInput).toHaveValue('123-456-7890');
//     expect(streetInput).toHaveValue('123 Main St');
//     expect(sectorInput).toHaveValue('Sector 5');
//     expect(pincodeInput).toHaveValue('12345');
//     expect(noteTextarea).toHaveValue('This is a test note');
//   });

//   it('selects dropdown options correctly', async () => {
//     const stateDropdown = screen.getByRole('combobox', { name: 'State' });
//     const countryDropdown = screen.getByRole('combobox', { name: 'Country' });

//     fireEvent.change(stateDropdown, { target: { value: 'New York' } });
//     fireEvent.change(countryDropdown, { target: { value: 'New York' } });

//     expect(stateDropdown).toHaveValue('New York');
//     expect(countryDropdown).toHaveValue('New York');
//   });

  
// test('displays toast message on Save button click', async () => {
//     render(<AddTechnician />);
  
//     // Click the Save button
//     fireEvent.click(screen.getByText('Save'));
  
//     // Wait for toast message to appear
//     await waitFor(() => {
//       expect(screen.getByText('Saved successfully')).toBeInTheDocument();
//     });
//   });
});
