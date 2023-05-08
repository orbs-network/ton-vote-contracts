import "@stdlib/deploy";
import "./messages";


contract Proposal with Deployable {

    parent: Address;
    id: Int as uint32;
    proposalStartTime: Int as uint64;
    proposalEndTime: Int as uint64;
    proposalSnapshotTime: Int as uint64;
    votingSystem: String;
    votingPowerStrategies: String;
    title: String;
    description: String;
    
    init(parent: Address, id: Int) {
        self.parent = parent;
        self.id = id;

        self.proposalStartTime = 0;
        self.proposalEndTime = 0;
        self.proposalSnapshotTime = 0;
        self.votingSystem = "";
        self.votingPowerStrategies = "";
        self.title = "";
        self.description = "";
    }

    receive(msg: ProposalInit) {
        require(self.proposalStartTime == 0 && self.proposalEndTime == 0 && self.proposalSnapshotTime == 0, "Already initialized");
        require(sender() == self.parent, "Invalid sender");

        self.proposalStartTime = msg.body.proposalStartTime;
        self.proposalEndTime = msg.body.proposalEndTime;
        self.proposalSnapshotTime = msg.body.proposalSnapshotTime;
        self.votingSystem = msg.body.votingSystem;
        self.votingPowerStrategies = msg.body.votingPowerStrategies;
        self.title = msg.body.title;
        self.description = msg.body.description;
    }

    get fun parent(): Address {
        return self.parent;
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

    get fun votingSystem(): String {
        return self.votingSystem;
    }

    get fun votingPowerStrategies(): String {
        return self.votingPowerStrategies;
    }

    get fun title(): String {
        return self.title;
    }

    get fun description(): String {
        return self.description;
    }

}