import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Vendors from "./Vendors";
import { Provider } from "react-redux";
import { store } from "../../../store/store";

describe("Vendors Component", () => {
  it("renders the component with header and search input", () => {
    render(
      <Provider store={store}>
        <Vendors />
      </Provider>
    );
    expect(screen.getByText("Moormanage/Vendor")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("should renders the input components", () => {
    render(
      <Provider store={store}>
        <Vendors />
      </Provider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
