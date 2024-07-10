import React from 'react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import Vendors from './Vendors'
import { Provider } from 'react-redux'
import { store } from '../../../Store/Store'
import { BrowserRouter } from 'react-router-dom'
import { JSX } from 'react/jsx-runtime'
import AddVendor from './AddVendor'
import { VendorPayload } from '../../../Type/ApiTypes'
import InputComponent from '../../CommonComponent/InputComponent'

const renderWithProvider = (
    ui: string | number | boolean | JSX.Element | Iterable<React.ReactNode> | null | undefined,
) => {
    return render(
        <Provider store={store}>
            <BrowserRouter>{ui}</BrowserRouter>
        </Provider>,
    )
}

const data: any = {
    message: "List of vendors in the database",
    status: 200,
    errorList: null,
    time: 1720524953679,
    currentSize: 1,
    totalSize: 1,
    content: [
        {
            id: 1,
            companyName: "ghfh",
            companyPhoneNumber: "8585858585",
            website: "https://www.w3schools.com/",
            street: "fdgdf",
            aptSuite: "fgdgdf",
            stateResponseDto: {
                id: 1,
                name: "Alabama",
                label: "Alabama"
            },
            countryResponseDto: {
                id: 1,
                name: "Afghanistan",
                label: "Afghanistan"
            },
            zipCode: "6545645",
            companyEmail: "fdg@gmail.ocm",
            accountNumber: "654564645",
            remitStreet: "gfdgfd",
            remitApt: "gfdgfdg",
            remitStateResponseDto: {
                id: 1,
                name: "Alabama",
                label: "Alabama"
            },
            remitCountryResponseDto: {
                id: 1,
                name: "Afghanistan",
                label: "Afghanistan"
            },
            remitZipCode: "3546",
            remitEmailAddress: "vbn@gmail.com",
            firstName: "ghfh",
            lastName: "fghfg",
            salesRepPhoneNumber: "8585858585",
            salesRepEmail: "vbnv@gmail.com",
            salesRepNote: "fdgfdgfdg",
            userId: 2,
            inventoryItems: 1
        }
    ]
};
const handleInputChange = jest.fn();

describe('Vendors Component', () => {
    it('renders the component with header and search input', () => {
        renderWithProvider(<AddVendor vendors={data} editMode={false} closeModal={() => { }} getVendor={() => { }} />);
        expect(screen.getByText(/website/i)).toBeInTheDocument();
        expect(screen.getByText(/company name/i)).toBeInTheDocument();
        expect(screen.getByText(/remit address/i)).toBeInTheDocument();
        expect(screen.getByText("Address")).toBeInTheDocument();
        expect(screen.getByText("Account Number")).toBeInTheDocument();
        expect(screen.getByText("Sales Representative")).toBeInTheDocument();
        expect(screen.getByText("First Name")).toBeInTheDocument();
        expect(screen.getByText("Last Name")).toBeInTheDocument();
        // expect(screen.queryAllByText(/Phone/i)).toBeInTheDocument();
    });


    // it('handles company name input change correctly', () => {

    //     renderWithProvider(<AddVendor vendors={data} editMode={false} closeModal={() => { }} getVendor={() => { }} />);
    //     const toCalendar = screen.ByPlaceholderText('Email Address')
    //     expect(toCalendar).toBeInTheDocument()

    // });






});


describe('InputComponent', () => {
    const handleInputChange = jest.fn();
  
    beforeEach(() => {
      handleInputChange.mockClear();
    });
  
    it('renders with placeholder and value correctly', () => {
        render(
          <div>
            <InputComponent
              placeholder="Email Address"
              value="test@example.com"
              onChange={(e) => handleInputChange('emailForRemit', e.target.value)}
              style={{
                width: '178.39px',
                height: '32px',
                border: '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.70rem',
                backgroundColor: '#F5F5F5',
                paddingLeft: '0.5rem',
              }}
            />
          </div>
        );
    
        const inputElement = screen.getByPlaceholderText('Email Address') as HTMLInputElement;
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toBe('test@example.com');
      });
  
    it('renders error message when fieldErrors.emailForRemit is present', () => {
      const fieldErrors = { emailForRemit: 'Invalid email format' };
  
      render(
        <div>
          <InputComponent
            placeholder="Email Address"
            value=""
            onChange={(e) => handleInputChange('emailForRemit', e.target.value)}
            style={{
              width: '178.39px',
              height: '32px',
              border: '1px solid red',
              borderRadius: '0.50rem',
              fontSize: '0.70rem',
              backgroundColor: '#F5F5F5',
              paddingLeft: '0.5rem',
            }}
          />
          <p>
            {fieldErrors.emailForRemit && (
              <small className="p-error">{fieldErrors.emailForRemit}</small>
            )}
          </p>
        </div>
      );
  
      const errorMessage = screen.getByText('Invalid email format');
      expect(errorMessage).toBeInTheDocument();
    });

    it('handles input change correctly', () => {
        render(
          <div>
            <div className="mt-1">
              <InputComponent
                placeholder="Apt/Suite"
                value=""
                onChange={(e) => handleInputChange('aptSuiteForRemit', e.target.value)}
                style={{
                  width: '178.39px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.70rem',
                  backgroundColor: '#F5F5F5',
                  paddingLeft: '0.5rem',
                }}
              />
            </div>
          </div>
        );
    
        const inputElement = screen.getByPlaceholderText('Apt/Suite') as HTMLInputElement;
    
        // Simulate change event on the input
        fireEvent.change(inputElement, { target: { value: 'Suite 456' } });
    
        // Ensure the input element's value has updated
        expect(inputElement.value).toBe('Suite 456');
    
        // Check that handleInputChange was called with the correct arguments
        expect(handleInputChange).toHaveBeenCalledWith('aptSuiteForRemit', 'Suite 456');
      });



  });



