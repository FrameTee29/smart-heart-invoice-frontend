import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({ uri: "" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { client };
