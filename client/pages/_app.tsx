import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Toaster />
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  );
}
