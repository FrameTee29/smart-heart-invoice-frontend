// * Rainbow kit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai, avalancheFuji } from "wagmi/chains";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, polygonMumbai, avalancheFuji],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Smart Heart Invoice",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

interface RainbowKitConfigProvider {
  children: React.ReactNode;
}

const WrapRainbowKitProvider = ({ children }: RainbowKitConfigProvider) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WrapRainbowKitProvider;
