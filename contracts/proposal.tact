import "@stdlib/deploy";

struct Params {
    proposal_start_time: Int as uint64;
    proposal_end_time: Int as uint64;
    proposal_snapshot_time: Int as uint64;
    proposal_type: Int as uint8;
    voting_power_strategy: Int as uint8;
}

message ProposalInit {
    body: Params;
}

message Comment {
    body: String;
}

contract Proposal with Deployable {

    owner: Address;
    index: Int as uint32;

    proposal_start_time: Int as uint64;
    proposal_end_time: Int as uint64;
    proposal_snapshot_time: Int as uint64;
    proposal_type: Int as uint8;
    voting_power_strategy: Int as uint8;

    init(owner: Address, index: Int) {
        self.owner = owner;
        self.index = index;

        self.proposal_start_time = 0;
        self.proposal_end_time = 0;
        self.proposal_snapshot_time = 0;
        self.proposal_type = 0;
        self.voting_power_strategy = 0;
    }

    receive(msg: ProposalInit) {
        require(self.proposal_start_time == 0 && self.proposal_end_time == 0 && self.proposal_snapshot_time == 0, "Already initialized");

        self.proposal_start_time = msg.body.proposal_start_time;
        self.proposal_end_time = msg.body.proposal_end_time;
        self.proposal_snapshot_time = msg.body.proposal_snapshot_time;
        self.proposal_type = msg.body.proposal_type;
        self.voting_power_strategy = msg.body.voting_power_strategy;
    }

    receive(msg: Comment) {
        require(now() > self.proposal_start_time, "not started");
        require(now() < self.proposal_end_time, "ended");
    }

    get fun owner(): Address {
        return self.owner;
    }

    get fun index(): Int {
        return self.index;
    }

}