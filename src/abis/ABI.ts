export const ABI = {
  invoiceFactory: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_invoiceFunction",
          type: "address",
        },
        {
          internalType: "uint64",
          name: "_chainSelector",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "_invoiceCCIP",
          type: "address",
        },
        {
          internalType: "address",
          name: "_addminWallet",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "chainSelector",
          type: "uint64",
        },
      ],
      name: "ChainNotAllowed",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
      ],
      name: "TokenNotAllowed",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "_chainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "_invoiceNumber",
          type: "string",
        },
      ],
      name: "Pay",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "_sourceChainSelector",
          type: "uint64",
        },
        {
          internalType: "bool",
          name: "allowed",
          type: "bool",
        },
      ],
      name: "allowlistChain",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          internalType: "bool",
          name: "allowed",
          type: "bool",
        },
      ],
      name: "allowlistToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      name: "allowlistedChains",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "allowlistedTokens",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "chainSelector",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "_destinationChainSelector",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "_beneficiary",
          type: "address",
        },
      ],
      name: "claim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "claimByUpkeep",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "_chainSelector",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "uint64",
          name: "subscriptionId",
          type: "uint64",
        },
        {
          internalType: "string[]",
          name: "args",
          type: "string[]",
        },
        {
          internalType: "address",
          name: "_receiver",
          type: "address",
        },
      ],
      name: "pay",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "tokens",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  invoiceFunction: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_router",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "_donID",
          type: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "EmptyArgs",
      type: "error",
    },
    {
      inputs: [],
      name: "EmptySource",
      type: "error",
    },
    {
      inputs: [],
      name: "NoInlineSecrets",
      type: "error",
    },
    {
      inputs: [],
      name: "OnlyRouterCanFulfill",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
      ],
      name: "UnexpectedRequestID",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "OwnershipTransferRequested",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
      ],
      name: "RequestFulfilled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
      ],
      name: "RequestSent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "string",
          name: "character",
          type: "string",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "response",
          type: "bytes",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "err",
          type: "bytes",
        },
      ],
      name: "Response",
      type: "event",
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "character",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "response",
          type: "bytes",
        },
        {
          internalType: "bytes",
          name: "err",
          type: "bytes",
        },
      ],
      name: "handleOracleFulfillment",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "s_lastError",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "s_lastRequestId",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "s_lastResponse",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "subscriptionId",
          type: "uint64",
        },
        {
          internalType: "string[]",
          name: "args",
          type: "string[]",
        },
      ],
      name: "sendRequest",
      outputs: [
        {
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  invoiceUnkeep: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "updateInterval",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_invoiceFactory",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "checkUpkeep",
      outputs: [
        {
          internalType: "bool",
          name: "upkeepNeeded",
          type: "bool",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "counter",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "interval",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "invoiceFactory",
      outputs: [
        {
          internalType: "contract IInvoiceFactory",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lastTimeStamp",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "performUpkeep",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_interval",
          type: "uint256",
        },
      ],
      name: "setInterval",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  invoiceCCIP: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_router",
          type: "address",
        },
        {
          internalType: "address",
          name: "_link",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "destinationChainSelector",
          type: "uint64",
        },
      ],
      name: "DestinationChainNotAllowlisted",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "target",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "FailedToWithdrawEth",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "currentBalance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "calculatedFees",
          type: "uint256",
        },
      ],
      name: "NotEnoughBalance",
      type: "error",
    },
    {
      inputs: [],
      name: "NothingToWithdraw",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "OwnershipTransferRequested",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "messageId",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "uint64",
          name: "destinationChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "feeToken",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "fees",
          type: "uint256",
        },
      ],
      name: "TokensTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "_destinationChainSelector",
          type: "uint64",
        },
        {
          internalType: "bool",
          name: "allowed",
          type: "bool",
        },
      ],
      name: "allowlistDestinationChain",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      name: "allowlistedChains",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "_destinationChainSelector",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "_receiver",
          type: "address",
        },
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transferTokensPayLINK",
      outputs: [
        {
          internalType: "bytes32",
          name: "messageId",
          type: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "_destinationChainSelector",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "_receiver",
          type: "address",
        },
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transferTokensPayNative",
      outputs: [
        {
          internalType: "bytes32",
          name: "messageId",
          type: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_beneficiary",
          type: "address",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_beneficiary",
          type: "address",
        },
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
      ],
      name: "withdrawToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
  ERC20: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

export const invoiceFactoryABI = {
  pay: [
    {
      inputs: [
        {
          internalType: "uint64",
          name: "_destinationChainSelector",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "_receiver",
          type: "address",
        },
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "uint64",
          name: "subscriptionId",
          type: "uint64",
        },
        {
          internalType: "string[]",
          name: "args",
          type: "string[]",
        },
      ],
      name: "pay",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

export const ERC20ABI = {
  allowance: [
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  approve: [
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  balanceOf: [
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
