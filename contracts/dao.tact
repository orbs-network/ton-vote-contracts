import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./proposal";


contract Dao with Deployable {

    owner: Address;
    registry: Address;
    proposalOwner: Address;
    daoIndex: Int as uint32;    
    metadata: Address;

    init(registry: Address, daoIndex: Int) {
        self.registry = registry; 
        self.daoIndex = daoIndex;

        self.owner =  newAddress(0, 0x0);
        self.proposalOwner = newAddress(0, 0x0);
        self.metadata =  newAddress(0, 0x0);
    }
    
    receive(init: DaoInit) {
        require(self.owner == newAddress(0, 0x0), "Already initialized");
        require(sender() == self.registry, "Invalid sender");

        self.owner = init.owner;
        self.proposalOwner = init.proposalOwner;
        self.metadata = init.metadata;
    }

    receive(msg: SetOwner) {
        require(sender() == self.owner, "Invalid sender");
        self.owner = msg.newOwner;
    }

    receive(msg: SetProposalOwner) {
        require(sender() == self.owner, "Invalid sender");
        self.proposalOwner = msg.newProposalOwner;
    }

    receive(msg: SetMetadata) {
        require(sender() == self.owner, "Invalid sender");
        self.metadata = msg.newMetadata;
    }

    receive(msg: FwdMsg) {
        require(sender() == self.owner || sender() == self.proposalOwner, "Invalid sender");        
        send(msg.fwdMsg);
    }

    get fun registry(): Address {
        return self.registry;
    }

    get fun owner(): Address {
        return self.owner;
    }

    get fun proposalOwner(): Address {
        return self.proposalOwner;
    }

    get fun metadata(): Address {
        return self.metadata;
    }

    get fun daoIndex(): Int {
        return self.daoIndex;
    }
}