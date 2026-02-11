import "@/assets/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

import { FC, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RouterConfig from "@/router/index";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
const theme = createTheme({
  direction: "rtl",
  // other theme properties
});

const App: FC = () => {
  // const token = localStorage.getItem('@iqmathUserInfo')
  // if (!token) {
  //   window.localStorage.setItem(
  //     '@iqmathUserInfo',
  //     '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaXNfc3RhZmYiOnRydWUsImlhdCI6MTc2NTQzMjY2NywiZXhwIjoxNzY3MTYwNjY3LCJpc3MiOiJZRVJfQUtTSVlBX0FQSSJ9.iGOY-S2-qKu05JWgg7YorxcecqzXkQH5n1pQTOgU6_Y","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaXNfc3RhZmYiOnRydWUsImlhdCI6MTc1OTQ4ODAwMSwiZXhwIjoxNzc1Mjk5MjAxLCJpc3MiOiJZRVJfQUtTSVlBX0FQSSJ9.iOLARBD4sgwk7r5_lPsPKKVJwm_Ehsp0LvbIffbIEkE","is_staff":true}'
  //   )
  // }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <RouterConfig />
        </Router>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
