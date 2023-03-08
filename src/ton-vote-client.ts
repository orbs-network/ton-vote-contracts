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
  adminSignature: string;
  badge?: "verified" | "warning";
}

export interface Proposal {
  daoId: string;
  proposalId: string | null;
  strategyId: string;
  timestamp: number; // TODO: FIXME rename to end timestamp
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
  proposerSignature: string;
}

export interface Vote {
  daoId: string;
  proposalId: string;
  timestamp: number;
  selection: Selection[];
  voter: PublicKey;
  voterSignature: string;
  votingPower?: string;
}

export interface Result {
  daoId: string;
  proposalId: string;
  timestamp: number;
  percentage: { [choiceId: string]: number };
  validatorSignatures?: { [validatorPublicKey: string]: string };
}

export interface Strategy {
  strategyId: string;
  description: string;
  codeUri?: string;
}

export interface Selection {
  choiceId: string;
  weight: number;
}

interface Token {
  type: "jetton" | "nft";
  contractAddress: string;
}

interface Choice {
  choiceId: string;
  description: string;
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

// @ts-ignore
interface EndedProposal {
  proposal: Proposal;
  result: Result;
}

// @ts-ignore
interface Validator {
  networkAddress: string;
  publicKey: PublicKey;
}

// unstable

interface BlockUri {
  type: "ipfs" | "tonstorage";
  uri: string;
}

// @ts-ignore
interface AllDaosBlock {
  blockUri: BlockUri;
  timestamp: number;
  latestActivityBlockUri: { [daoId: string]: BlockUri };
}

// @ts-ignore
interface DaoActivityBlock {
  blockUri: BlockUri;
  timestamp: number;
  daoId: string;
  proposals: Proposal[];
  votes: VoteSnapshot[];
  results: Result[];
}
