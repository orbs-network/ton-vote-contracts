
// ---------------------------------------
// Registry
// ---------------------------------------
message DeployAndInitDao {
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

message SendDaoInit {
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

message SetDeployAndInitDaoFee {
    newDeployAndInitDaoFee: Int as uint64;
}

message SendToDaoSetFwdMsgFee {
    daoId: Int as uint32;
    newFwdMsgFee: Int as uint64;    
}

message SetRegistryAdmin {
    newAdmin: Address;
}

// ---------------------------------------
// Dao
// ---------------------------------------
message SetOwner {
    newOwner: Address;
}

message SetProposalOwner {
    newProposalOwner: Address;
}

message SetFwdMsgFee {
    newFwdMsgFee: Int as uint64;
}

message SetMetadata {
    newMetadata: Address;
}

message FwdMsg {
    fwdMsg: SendParameters;
}

message DaoInit {
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

struct DaoContractState {

    registry: Address;
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
    daoIndex: Int as uint32;    
    fwdMsgFee: Int as uint64;
}

// ---------------------------------------
// ProposalDeployer
// ---------------------------------------
message DeployAndInitProposal {
    body: Params;
}

message SendProposalInit {
    body: Params;
}

// ---------------------------------------
// Proposal
// ---------------------------------------
struct Params {
    proposalStartTime: Int as uint64;
    proposalEndTime: Int as uint64;
    proposalSnapshotTime: Int as uint64;
    votingSystem: String;
    votingPowerStrategies: String;
    title: String;
    description: String;
    quorum: String;
}

message ProposalInit {
    body: Params;
}

struct ProposalContractState {
    proposalDeployer: Address;
    id: Int as uint32;
    proposalStartTime: Int as uint64;
    proposalEndTime: Int as uint64;
    proposalSnapshotTime: Int as uint64;
    votingSystem: String;
    votingPowerStrategies: String;
    title: String;
    description: String;
    quorum: String;        
}

// ---------------------------------------
// Metadata
// ---------------------------------------
struct MetadataState {
    avatar: String;
    name: String;
    about: String;
    website: String;
    terms: String;
    telegram: String;
    github: String;
    jetton: Address;
    nft: Address;
    hide: Bool;    
}