import "@stdlib/deploy";
import "./messages";


contract Proposal with Deployable {

    owner: Address;
    id: Int as uint32;

    proposalStartTime: Int as uint64;
    proposalEndTime: Int as uint64;
    proposalSnapshotTime: Int as uint64;
    proposalType: Int as uint8;
    votingPowerStrategy: Int as uint8;

    init(owner: Address, id: Int) {
        self.owner = owner;
        self.id = id;

        self.proposalStartTime = 0;
        self.proposalEndTime = 0;
        self.proposalSnapshotTime = 0;
        self.proposalType = 0;
        self.votingPowerStrategy = 0;
    }

    receive(msg: ProposalInit) {
        require(self.proposalStartTime == 0 && self.proposalEndTime == 0 && self.proposalSnapshotTime == 0, "Already initialized");
        require(sender() == self.owner, "Invalid sender");

        self.proposalStartTime = msg.body.proposalStartTime;
        self.proposalEndTime = msg.body.proposalEndTime;
        self.proposalSnapshotTime = msg.body.proposalSnapshotTime;
        self.proposalType = msg.body.proposalType;
        self.votingPowerStrategy = msg.body.votingPowerStrategy;
    }

    receive(msg: Comment) {
        require(now() > self.proposalStartTime, "not started");
        require(now() < self.proposalEndTime, "ended");
    }

    get fun owner(): Address {
        return self.owner;
    }

    get fun id(): Int {
        return self.id;
    }

    get fun proposalStartTime(): Int {
        return self.proposalStartTime;
    }

    get fun proposalEndTime(): Int {
        return self.proposalEndTime;
    }

    get fun proposalSnapshotTime(): Int {
        return self.proposalSnapshotTime;
    }

    get fun proposalType(): Int {
        return self.proposalType;
    }

    get fun votingPowerStrategy(): Int {
        return self.votingPowerStrategy;
    }

}