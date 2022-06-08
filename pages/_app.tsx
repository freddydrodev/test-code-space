import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import "../styles/globals.css";

const theme = createTheme({
  shape: { borderRadius: 0 },
  palette: { primary: { main: "#0e1666" }, secondary: { main: "#EF8352" } },
  typography: {
    fontWeightRegular: 300,
    fontFamily: [
      // "DM Sans",
      "Nunito Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    button: { fontWeight: 500, letterSpacing: 2 },
    h2: { fontWeight: 600, fontFamily: "DM Sans" },
    h3: { fontWeight: 900, fontSize: 45, fontFamily: "DM Sans" },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
