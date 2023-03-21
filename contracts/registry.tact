import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./dao";


contract Registry with Deployable {

    nextDaoId: Int as uint32;    

    init() {
        self.nextDaoId = 0;
    }
    
    receive(createDao: CreateDao) {
        require(context().value >= ton("0.1"), "Low message value"); // TODO: FIXME change to 1 ton
        // TODO: context().value -= ton("1") --> decrease message value
        
        let init: StateInit = self.getDaoStateInit(self.nextDaoId);
        let daoAddress: Address = contractAddress(init);

        send(SendParameters{
            to: daoAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: DaoInit{owner: createDao.owner, proposalOwner: createDao.proposalOwner, metadata: createDao.metadata}.toCell(),
            code: init.code,
            data: init.data
        });

        self.nextDaoId = self.nextDaoId + 1;
    }

    fun getDaoStateInit(daoIndex: Int): StateInit {
        return initOf Dao(myAddress(), daoIndex);
    }

    get fun nextDaoId(): Int {
        return self.nextDaoId;
    }

    get fun daoAddress(daoId: Int): Address {
        let init: StateInit = self.getDaoStateInit(daoId);
        return contractAddress(init);
    }
}