import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./reducers/NotificationContext";
import store from "./store";
import { LoginContextProvider } from "./reducers/LoginContext";
// import { BlogContextProvider } from "./reducers/blogContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* <BlogContextProvider> */}
      <LoginContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </LoginContextProvider>
      {/* </BlogContextProvider> */}
    </QueryClientProvider>
  </Provider>
);
