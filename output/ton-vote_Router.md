# TACT Compilation Report
Contract: Router
BOC Size: 1069 bytes

# Types
Total Types: 23

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## RouteDeployAndInitDao
TLB: `route_deploy_and_init_dao#2c10ad33 prodMsgValue:uint64 devMsgValue:uint64 prodRegistry:address devRegistry:address owner:address proposalOwner:address metadata:address = RouteDeployAndInitDao`
Signature: `RouteDeployAndInitDao{prodMsgValue:uint64,devMsgValue:uint64,prodRegistry:address,devRegistry:address,owner:address,proposalOwner:address,metadata:address}`

## DeployAndInitDao
TLB: `deploy_and_init_dao#c95b9b64 owner:address proposalOwner:address metadata:address = DeployAndInitDao`
Signature: `DeployAndInitDao{owner:address,proposalOwner:address,metadata:address}`

## SendDaoInit
TLB: `send_dao_init#c8b94bbb owner:address proposalOwner:address metadata:address = SendDaoInit`
Signature: `SendDaoInit{owner:address,proposalOwner:address,metadata:address}`

## SetDeployAndInitDaoFee
TLB: `set_deploy_and_init_dao_fee#a8969119 newDeployAndInitDaoFee:uint64 = SetDeployAndInitDaoFee`
Signature: `SetDeployAndInitDaoFee{newDeployAndInitDaoFee:uint64}`

## SetNewDaoFwdMsgFee
TLB: `set_new_dao_fwd_msg_fee#03964bce newDaosfwdMsgFee:uint64 = SetNewDaoFwdMsgFee`
Signature: `SetNewDaoFwdMsgFee{newDaosfwdMsgFee:uint64}`

## SendToDaoSetFwdMsgFee
TLB: `send_to_dao_set_fwd_msg_fee#5815bd86 daoId:uint32 newFwdMsgFee:uint64 = SendToDaoSetFwdMsgFee`
Signature: `SendToDaoSetFwdMsgFee{daoId:uint32,newFwdMsgFee:uint64}`

## SetRegistryAdmin
TLB: `set_registry_admin#c6d673ca newAdmin:address = SetRegistryAdmin`
Signature: `SetRegistryAdmin{newAdmin:address}`

## RegistryContractState
TLB: `_ registryId:uint32 nextDaoId:uint32 admin:address deployAndInitDaoFee:uint64 newDaosfwdMsgFee:uint64 = RegistryContractState`
Signature: `RegistryContractState{registryId:uint32,nextDaoId:uint32,admin:address,deployAndInitDaoFee:uint64,newDaosfwdMsgFee:uint64}`

## SetOwner
TLB: `set_owner#c2b41d43 newOwner:address = SetOwner`
Signature: `SetOwner{newOwner:address}`

## SetProposalOwner
TLB: `set_proposal_owner#d0e3be76 newProposalOwner:address = SetProposalOwner`
Signature: `SetProposalOwner{newProposalOwner:address}`

## SetFwdMsgFee
TLB: `set_fwd_msg_fee#f4f3a602 newFwdMsgFee:uint64 = SetFwdMsgFee`
Signature: `SetFwdMsgFee{newFwdMsgFee:uint64}`

## SetMetadata
TLB: `set_metadata#da2f907f newMetadata:address = SetMetadata`
Signature: `SetMetadata{newMetadata:address}`

## FwdMsg
TLB: `fwd_msg#64c3c3e4 fwdMsg:SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell} = FwdMsg`
Signature: `FwdMsg{fwdMsg:SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}}`

## DaoInit
TLB: `dao_init#ecb876eb owner:address proposalOwner:address metadata:address fwdMsgFee:uint64 = DaoInit`
Signature: `DaoInit{owner:address,proposalOwner:address,metadata:address,fwdMsgFee:uint64}`

## DaoContractState
TLB: `_ registry:address owner:address proposalOwner:address metadata:address daoIndex:uint32 fwdMsgFee:uint64 = DaoContractState`
Signature: `DaoContractState{registry:address,owner:address,proposalOwner:address,metadata:address,daoIndex:uint32,fwdMsgFee:uint64}`

# Get Methods
Total Get Methods: 0

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
2977: Already initialized
4429: Invalid sender
4600: Only admin can set the create dao fee
8645: Only admin can set the dao fwd msg fee
23452: Only admin can set new registry admin
46336: Below min fee for create dao
51893: Only registry can change fwd msg fee
56012: Only admin can set the new dao fwd msg fee
60173: Below min fee for dao forward message