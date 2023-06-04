import "./proposal-messages";

// ---------------------------------------
// ProposalDeployer
// ---------------------------------------
message DeployAndInitProposal {
    body: Params;
}

message SendProposalInit {
    body: Params;
}

message FwdUpdateProposal {
    proposalAddress: Address;
    title: String;
    description: String;
}
