export type PublicKey = string;

export interface Config {
  network?: "mainnet" | "testnet";
}

export interface DaoMetadata {
  daoId: string | null;
  adminAddress: string;
  tokens: Token[];
  name: string;
  logoUri: string;
  tonDomain: string;
  website?: string;
  telegram?: string;
  limitProposers?: PublicKey[];
  theme?: string;
  hidden?: boolean;
  adminSignature?: string;
}

export interface Proposal {
  daoId: string;
  proposalId: string;
  strategyId: string;
  timestamp: number;
  duration: number;
  description: string;
  choices: Choice[];
  votingType:
    | "single"
    | "approval"
    | "quadratic"
    | "ranked"
    | "weighted"
    | "basic";
  snapshotLogicalTime: number;
  snapshotStateRoot: string;
  minimumQuorum?: number;
  proposer: PublicKey;
  proposerSignature?: string;
}

export interface Vote {
  daoId: string;
  proposalId: string;
  timestamp: number;
  selection: Selection[];
  voter: PublicKey;
  voterSignature?: string;
}

export interface Result {
  daoId: string;
  proposalId: string;
  timestamp: number;
  percentage: { [choiceId: string]: number };
  validatorSignatures: { [validatorPublicKey: string]: string };
}

export interface Strategy {
  strategyId: string;
  description: string;
  codeUri?: string;
}

interface Token {
  type: "jetton" | "nft";
  contractAddress: string;
}

interface Choice {
  choiceId: string;
  description: string;
}

interface Selection {
  choiceId: string;
  weight: number;
}

interface Balance {
  token: Token;
  balance: string;
  properties?: { [field: string]: string }[];
}

interface VoteSnapshot {
  vote: Vote;
  balances: Balance[];
  balanceMerkleProofs: string[];
}

interface EndedProposal {
  proposal: Proposal;
  result: Result;
}

interface Validator {
  networkAddress: string;
  publicKey: PublicKey;
}

// unstable

interface BlockUri {
  type: "ipfs" | "tonstorage";
  uri: string;
}

interface AllDaosBlock {
  blockUri: BlockUri;
  timestamp: number;
  latestActivityBlockUri: { [daoId: string]: BlockUri };
}

interface DaoActivityBlock {
  blockUri: BlockUri;
  timestamp: number;
  daoId: string;
  proposals: Proposal[];
  votes: VoteSnapshot[];
  results: Result[];
}
