import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./dao";


contract Registry with Deployable {

    registryId: Int as uint16;
    nextDaoId: Int as uint32;
    admin: Address;
    deployRegistryCost: Int as uint64;

    init(registryId: Int) {
        self.registryId = registryId;
        self.nextDaoId = 0;
        self.admin = newAddress(0, 0x0);
        self.deployRegistryCost = ton("1");
    }
    
    receive(createDao: CreateDao) {
        require(context().value >= self.deployRegistryCost, "Low message value");
        
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

    receive(msg: SetDeployRegistryCost) {
        require(sender() == self.admin, "Only admin can change deploy registry cost");
        self.deployRegistryCost = msg.newDeployRegistryCost;
    }

    receive(msg: SendSetDeployDaoCostToDao) {
        require(sender() == self.admin, "Only admin can change deploy dao cost");

        let init: StateInit = self.getDaoStateInit(msg.daoId);
        let daoAddress: Address = contractAddress(init);

        send(SendParameters{
            to: daoAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: SetDeployDaoCost{newdeployDaoCost: msg.newdeployDaoCost}.toCell()
        });

    }

    receive(msg: SetRegistryAdmin) {
        // only admin can set new admin. admin is also able to burn the address by setting it to 0x0. 
        // since the contract is initialied with admin = 0x0 we permit updating the admin address when nextDaoId is 0.  
        require(sender() == self.admin || self.nextDaoId == 0, "Only admin can set new registry admin or on before creating daos");
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

    get fun deployRegistryCost(): Int {
        return self.deployRegistryCost;
    }

}