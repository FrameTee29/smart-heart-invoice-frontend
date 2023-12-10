export interface Claim {
  id: string;
  _chainSelector: string;
  _beneficiary: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export interface ClaimResponse {
  claims: Claim[];
}
