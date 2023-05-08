import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./proposal";


contract ProposalDeployer with Deployable {

    parent: Address; // parent is Dao contract (cannot be changed)
    nextProposalId: Int as uint32;

    init(parent: Address) {
        self.parent = parent;
        self.nextProposalId = 0;
    }

    receive(msg: CreateProposal) {
        require(sender() == self.parent, "Invalid sender");

        // Create message
        let init: StateInit = self.getProposalStateInit(self.nextProposalId);
        let proposalAddress: Address = contractAddress(init);

        send(SendParameters{
            to: proposalAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: ProposalInit{body: msg.body}.toCell(),
            code: init.code,
            data: init.data
        });

        self.nextProposalId = self.nextProposalId + 1;
    }

    fun getProposalStateInit(index: Int): StateInit {
        return initOf Proposal(myAddress(), index);
    }

    get fun parent(): Address {
        return self.parent;
    }

    get fun nextProposalId(): Int {
        return self.nextProposalId;
    }

    get fun proposalAddr(index: Int): Address {
        let init: StateInit = self.getProposalStateInit(index);
        return contractAddress(init);
    }
}