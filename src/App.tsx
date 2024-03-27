import React from "react";
import { useRoutes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  CssBaseline,
  StyledEngineProvider,
} from "@mui/material";
import routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";

const queryClient = new QueryClient();
const App: React.FC = () => {
  const allPages = useRoutes(routes);

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StyledEngineProvider injectFirst>
              <CssBaseline />
              {allPages}
          </StyledEngineProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
};
export default App;
