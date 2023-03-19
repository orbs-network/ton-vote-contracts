
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
    proposalType: Int as uint8;
    votingPowerStrategy: Int as uint8;
}

message ProposalInit {
    body: Params;
}

message Comment {
    body: String;
}
