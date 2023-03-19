import "@stdlib/deploy";
import "@stdlib/ownable";
import "./proposal";

message SetOwner {
    newOwner: Address;
}

message SetMetadata {
    newMetadata: Address;
}

message CreateNewProposalDeployer {
    newProposalDeployer: SendParameters;
}

message DaoInit {
    owner: Address;
    metadata: Address;
}

contract Dao with Deployable {

    owner: Address;
    daoIndex: Int as uint32;    
    metadata: Address;

    init(daoIndex: Int) {
        self.daoIndex = daoIndex;
        self.owner =  myAddress(); // TODO: FIXME set to zero address
        self.metadata =  myAddress(); // TODO: FIXME set to zero address
    }
    
    receive(init: DaoInit) {
        require(self.owner == myAddress(), "Invalid sender"); // TODO: FIXME set to zero address
        self.owner = init.owner;
        self.metadata = init.metadata;
    }

    receive(msg: SetOwner) {
        require(sender() == self.owner, "Invalid sender");
        self.owner = msg.newOwner;
    }

    receive(msg: SetMetadata) {
        require(sender() == self.owner, "Invalid sender");
        self.metadata = msg.newMetadata;
    }

    receive(msg: CreateNewProposalDeployer) {
        require(sender() == self.owner, "Invalid sender");
        send(msg.newProposalDeployer);
    }

    get fun owner(): Address {
        return self.owner;
    }

    get fun daoIndex(): Int {
        return self.daoIndex;
    }

}