
// ---------------------------------------
// Registry
// ---------------------------------------
message CreateDao {
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

message SendDaoInit {
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

message SetCreateDaoFee {
    newCreateDaoFee: Int as uint64;
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

// ---------------------------------------
// ProposalDeployer
// ---------------------------------------
message CreateProposal {
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
}

message ProposalInit {
    body: Params;
}
