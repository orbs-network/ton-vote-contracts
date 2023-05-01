import "@stdlib/deploy";
import "./messages";


contract Proposal with Deployable {

    owner: Address;
    id: Int as uint32;
    proposalStartTime: Int as uint64;
    proposalEndTime: Int as uint64;
    proposalSnapshotTime: Int as uint64;
    votingSystem: String;
    votingPowerStrategy: Int as uint8;
    title: String;
    description: String;
    jetton: Address;
    nft: Address;
    
    init(owner: Address, id: Int) {
        // require(context().value >= ton("0.1"), "Low message value"); // TODO: FIXME change to 1 ton
        self.owner = owner;
        self.id = id;

        self.proposalStartTime = 0;
        self.proposalEndTime = 0;
        self.proposalSnapshotTime = 0;
        self.votingSystem = "";
        self.votingPowerStrategy = 0;
        self.title = "";
        self.description = "";
        self.jetton =  newAddress(0, 0x0);
        self.nft =  newAddress(0, 0x0);
    }

    receive(msg: ProposalInit) {
        require(self.proposalStartTime == 0 && self.proposalEndTime == 0 && self.proposalSnapshotTime == 0, "Already initialized");
        require(sender() == self.owner, "Invalid sender");

        self.proposalStartTime = msg.body.proposalStartTime;
        self.proposalEndTime = msg.body.proposalEndTime;
        self.proposalSnapshotTime = msg.body.proposalSnapshotTime;
        self.votingSystem = msg.body.votingSystem;
        self.votingPowerStrategy = msg.body.votingPowerStrategy;
        self.title = msg.body.title;
        self.description = msg.body.description;
        self.jetton = msg.body.jetton;
        self.nft = msg.body.nft;
    }

    receive(msg: Comment) {
        require(now() > self.proposalStartTime, "Not started");
        require(now() < self.proposalEndTime, "Ended");
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

    get fun votingSystem(): String {
        return self.votingSystem;
    }

    get fun votingPowerStrategy(): Int {
        return self.votingPowerStrategy;
    }

    get fun title(): String {
        return self.title;
    }

    get fun description(): String {
        return self.description;
    }

    get fun jetton(): Address {
        return self.jetton;
    }

    get fun nft(): Address {
        return self.nft;
    }

}