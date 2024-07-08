import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Vendors from "./Vendors";
import { Provider } from "react-redux";
import { store } from "../../../Store/Store";
import { JSX } from 'react/jsx-runtime'

const renderWithProvider = (
  ui: string | number | boolean | JSX.Element | Iterable<ReactNode> | null | undefined,
) => {
  return render(<Provider store={store}>{ui}</Provider>)
}

describe("Vendors Component", () => {
  it("renders the component with header and search input", () => {
    renderWithProvider(<Vendors/>)
    expect(screen.getByText("Moormanage/Vendor")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("should renders the input components", () => {
    renderWithProvider(<Vendors/>)
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });


  it('renders headers correctly in DataTable', () => {
    renderWithProvider(<Vendors/>)
  
    const headers = [
      'ID',
      'Company Name',
      'Phone Number',
      'Email Address',
      'Inventory Items',
      'Actions',
    ];
  
    headers.forEach(headerText => {
      const headerElement = screen.getByText(headerText);
      expect(headerElement).toBeInTheDocument();
    });
  });
  
  it('renders "ADD NEW" button', () => {
    renderWithProvider(<Vendors/>)
    const addButton = screen.getByText('ADD NEW')
    expect(addButton).toBeInTheDocument()
  })






});
