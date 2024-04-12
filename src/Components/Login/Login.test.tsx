import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

const Label = "Login";
const typeEmail = "email";
const typePass = "password";

describe("Login Page testCases", () => {
  it("should render InputText component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginForm
            Label={Label}
            typeEmail={typeEmail}
            typePass={typePass}
            showSinUp={false}
          />
        </Provider>
      </BrowserRouter>
    );

    const inputText = screen.getByRole("textbox");
    expect(inputText).toBeInTheDocument();
  });

  it("should render one InputText component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginForm
            Label={Label}
            typeEmail={typeEmail}
            typePass={typePass}
            showSinUp={false}
          />
        </Provider>
      </BrowserRouter>
    );

    const inputText = screen.getAllByRole("textbox");
    expect(inputText.length).toBe(1);
  });

  it("should render Button component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginForm
            Label={Label}
            typeEmail={typeEmail}
            typePass={typePass}
            showSinUp={false}
          />
        </Provider>
      </BrowserRouter>
    );

    const inputText = screen.getByRole("button");
    expect(inputText).toBeInTheDocument();
  });

  it("should render one button component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginForm
            Label={Label}
            typeEmail={typeEmail}
            typePass={typePass}
            showSinUp={false}
          />
        </Provider>
      </BrowserRouter>
    );

    const inputText = screen.getAllByRole("button");
    expect(inputText.length).toBe(1);
  });

  it("should render button text ", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginForm
            Label={Label}
            typeEmail={typeEmail}
            typePass={typePass}
            showSinUp={false}
          />
        </Provider>
      </BrowserRouter>
    );

    const buttonText = screen.getByText("Login");
    expect(buttonText).toBeInTheDocument();
  });

  it("should render img tag ", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginForm
            Label={Label}
            typeEmail={typeEmail}
            typePass={typePass}
            showSinUp={false}
          />
        </Provider>
      </BrowserRouter>
    );

    const imgeTag = screen.getByRole("img");
    expect(imgeTag).toBeInTheDocument();
  });

  it("should render one img ", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginForm
            Label={Label}
            typeEmail={typeEmail}
            typePass={typePass}
            showSinUp={false}
          />
        </Provider>
      </BrowserRouter>
    );

    const inputText = screen.getAllByRole("img");
    expect(inputText.length).toBe(1);
  });

  it("allows users to enter username and password", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm
            Label={Label}
            typeEmail={typeEmail}
            typePass={typePass}
            showSinUp={false}
          />
        </BrowserRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText("Enter Your username");
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("testpassword");
  });
});
