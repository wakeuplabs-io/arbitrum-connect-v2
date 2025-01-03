import { ArbitrumNetwork, getArbitrumNetworks, registerCustomArbitrumNetwork } from '@arbitrum/sdk';
import { useEffect, useState } from 'react';

export interface CustomArbitrumNetwork extends ArbitrumNetwork {
  isTestnet?: boolean;
}

interface ReturnType {
  networks: CustomArbitrumNetwork[];
  addNetwork: (network: CustomArbitrumNetwork) => void;
  fromNetwork: CustomArbitrumNetwork;
  setFromNetwork: (network: CustomArbitrumNetwork) => void;
  toNetwork: CustomArbitrumNetwork;
  setToNetwork: (network: CustomArbitrumNetwork) => void;
}

export function useArbitrumNetworks(): ReturnType {
  const [networks, setNetworks] = useState<CustomArbitrumNetwork[]>(getArbitrumNetworks());
  const [fromNetwork, setFromNetwork] = useState(networks[0]);
  const [toNetwork, setToNetwork] = useState(networks[0]);

  useEffect(() => {
    const newToNetwork = networks.find((network) => network.chainId === fromNetwork.parentChainId);

    if (newToNetwork) {
      setToNetwork(newToNetwork);
    }
  }, [fromNetwork]);

  function addNetwork(network: CustomArbitrumNetwork) {
    registerCustomArbitrumNetwork(network, { throwIfAlreadyRegistered: true });
    setNetworks(getArbitrumNetworks());
  }

  return {
    networks,
    addNetwork,
    fromNetwork,
    setFromNetwork,
    toNetwork,
    setToNetwork,
  };
}
