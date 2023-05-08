
// ---------------------------------------
// Registry
// ---------------------------------------
message CreateDao {
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

// ---------------------------------------
// Dao
// ---------------------------------------
message SetOwner {
    newOwner: Address;
}

message SetDeployDaoCost {
    newdeployDaoCost: Int as uint64;
}

message SendSetDeployDaoCostToDao {
    daoId: Int as uint32;
    newdeployDaoCost: Int as uint64;    
}

message SetDeployRegistryCost {
    newDeployRegistryCost: Int as uint64;
}

message SetRegistryAdmin {
    newAdmin: Address;
}

message SetProposalOwner {
    newProposalOwner: Address;
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

// ---------------------------------------
// ProposalDeployer
// ---------------------------------------
message CreateProposal {
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
}

message ProposalInit {
    body: Params;
}

message Comment {
    body: String;
}
