import { gql } from "@apollo/client";

const getClaims = gql`
  query Claims($first: Int) {
    claims(first: $first, orderDirection: asc) {
      id
      _chainSelector
      _beneficiary
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

const claimQuery = { getClaims };

export default claimQuery;
