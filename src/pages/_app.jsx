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
    <html lang="en">
      <Head>
        <meta name="theme-color" content="#303030" />
        <title>Task Tracker</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="NextJS web app test" />
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
