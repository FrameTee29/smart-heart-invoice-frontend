import "@/styles/global.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { StoreProvider } from "easy-peasy";
import { ApolloProvider } from "@apollo/client";
import { Router, useRouter } from "next/router";
import ProgressBar from "@badrap/bar-of-progress";

import store from "@/store";

import AuthProvider from "@/provider/AuthProvider";
import WrapRainbowKitProvider from "@/provider/WrapRainbowKitProvider";
import { Toaster } from "@/components/ui/toast/toaster";
import ApolloClientByChainId from "@/utils/Apollo/ApolloClient";
import { useChainId } from "wagmi";

const progress = new ProgressBar({
  size: 4,
  className: "bar-of-progress",
  delay: 100,
});

export default function App({ Component, pageProps }: AppProps) {
  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routeChangeComplete", progress.finish);
  Router.events.on("routeChangeError", progress.finish);

  const router = useRouter();

  const chainId = useChainId();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {});
    return () => {
      router.events.off("routeChangeComplete", () => {});
    };
  }, [router.events]);

  return (
    <StoreProvider store={store}>
      <ApolloProvider client={ApolloClientByChainId(chainId)}>
        <WrapRainbowKitProvider>
          <AuthProvider>
            <Component {...pageProps} />
            <Toaster />
          </AuthProvider>
        </WrapRainbowKitProvider>
      </ApolloProvider>
    </StoreProvider>
  );
}
