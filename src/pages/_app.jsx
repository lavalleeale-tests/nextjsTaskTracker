import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "next-auth/client";
import Head from "next/head";

const themes = {
  darkTheme: createMuiTheme({
    palette: {
      type: "dark",
    },
  }),
  lightTheme: createMuiTheme({
    palette: {
      type: "light",
    },
  }),
};
export default function MyApp({ Component, pageProps }) {
  return (
    <html>
      <Head>
        <title>Task Tracker</title>
      </Head>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={themes.darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </html>
  );
}
