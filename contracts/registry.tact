import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./dao";


contract Registry with Deployable {

    registryId: Int as uint16;
    nextDaoId: Int as uint32;
    admin: Address;
    deployCost: Int as uint64;

    init(registryId: Int, admin: Address) {
        self.registryId = registryId;
        self.admin = admin;
        self.nextDaoId = 0;
        self.deployCost = ton("1");
    }
    
    receive(createDao: CreateDao) {
        require(context().value >= self.deployCost, "Low message value");
        
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

    receive(msg: SetDeployCost) {
        require(sender() == self.admin, "Only admin can change deploy cost");
        self.deployCost = msg.newDeployCost;
    }

    receive(msg: SetRegistryAdmin) {
        require(sender() == self.admin, "Only admin can set new registry admin");
        self.admin = msg.newAdmin;
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

    get fun registryId(): Int {
        return self.registryId;
    }

    get fun admin(): Address {
        return self.admin;
    }

    get fun deployCost(): Int {
        return self.deployCost;
    }

}