import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

import { chainList } from "@/constants/chain.constant";

const ApolloClientByChainId = (chainId: number) => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: chainList[chainId].subGraphUrl }),
    cache: new InMemoryCache(),
  });

  return client;
};

export default ApolloClientByChainId;
