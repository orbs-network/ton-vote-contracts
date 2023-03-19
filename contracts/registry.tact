import "@stdlib/deploy";
import "@stdlib/ownable";
import "./dao";

message CreateDao {
    owner: Address;
    metadata: Address;
}

contract Registry with Deployable {

    nextDaoId: Int as uint32;    

    init() {
        self.nextDaoId = 0;
    }
    
    receive(createDao: CreateDao) {
        // Create message
        let init: StateInit = self.getDaoStateInit(self.nextDaoId);
        let daoAddress: Address = contractAddress(init);

        send(SendParameters{
            to: daoAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: DaoInit{owner: createDao.owner, metadata: createDao.metadata}.toCell(),
            code: init.code,
            data: init.data
        });

        self.nextDaoId = self.nextDaoId + 1;
    }

    fun getDaoStateInit(daoIndex: Int): StateInit {
        return initOf Dao(daoIndex);
    }

    get fun nextDaoId(): Int {
        return self.nextDaoId;
    }

    get fun daoAddress(daoId: Int): Address {
        let init: StateInit = self.getDaoStateInit(daoId);
        return contractAddress(init);
    }
}