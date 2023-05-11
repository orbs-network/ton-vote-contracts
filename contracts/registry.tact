import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./dao";


contract Registry with Deployable {

    registryId: Int as uint32;
    nextDaoId: Int as uint32;
    admin: Address;
    createDaoFee: Int as uint64;

    init(registryId: Int) {
        self.registryId = registryId;
        self.nextDaoId = 0;
        self.admin = newAddress(0, 0x0);
        self.createDaoFee = ton("1");
    }
    
    receive(createDao: CreateDao) {
        require(context().value >= self.createDaoFee, "Low message value");
        
        let init: StateInit = self.getDaoStateInit(self.nextDaoId);
        let daoAddress: Address = contractAddress(init);

        send(SendParameters{
            to: daoAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: DaoInit{owner: createDao.owner, proposalOwner: createDao.proposalOwner, metadata: createDao.metadata}.toCell(),
            code: init.code,
            data: init.data
        });

        self.nextDaoId = self.nextDaoId + 1;
    }

    receive(msg: SetCreateDaoFee) {
        require(sender() == self.admin, "Only admin can set create dao fee");
        self.createDaoFee = msg.newCreateDaoFee;
    }

    receive(msg: SendToDaoSetFwdMsgFee) {
        require(sender() == self.admin, "Only admin can set dao fwd msg fee");

        let init: StateInit = self.getDaoStateInit(msg.daoId);
        let daoAddress: Address = contractAddress(init);

        send(SendParameters{
            to: daoAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: SetFwdMsgFee{newFwdMsgFee: msg.newFwdMsgFee}.toCell()
        });

    }

    receive(msg: SetRegistryAdmin) {
        // to burn the admin set it to newAddress(-1, 0x0)
        require(sender() == self.admin || self.admin == newAddress(0, 0x0), "Only admin can set new registry admin");
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

    get fun createDaoFee(): Int {
        return self.createDaoFee;
    }

}