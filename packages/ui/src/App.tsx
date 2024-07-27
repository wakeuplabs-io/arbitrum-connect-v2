import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import "./App.css";
// import ArbitrumPoc from "./ArbitrumPoc";
import ArbitrumPoc from "./ArbitrumPoc";
import config from "./lib/wagmiConfig";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          showRecentTransactions
          coolMode
          theme={lightTheme({ borderRadius: "medium" })}
        >
          <div className="flex flex-col w-full grow min-h-screen  bg-cover text-primary">
            {/* <Topbar /> */}
            <ArbitrumPoc />
            {/* <Transaction /> */}
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
