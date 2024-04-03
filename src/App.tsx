import React from "react";
import { useRoutes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
const App: React.FC = () => {
  const allPages = useRoutes(routes);
  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Poppins', sans-serif",
    },
  };

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StyledEngineProvider injectFirst>
            <Toaster toastOptions={toasterOptions} />
            <CssBaseline />
            {allPages}
            <ToastContainer
              hideProgressBar
              autoClose={2000}
              position="top-right"
            />
          </StyledEngineProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
};
export default App;
