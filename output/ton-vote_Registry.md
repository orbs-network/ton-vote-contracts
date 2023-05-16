# TACT Compilation Report
Contract: Registry
BOC Size: 1695 bytes

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

## DeployAndInitDao
TLB: `deploy_and_init_dao#c95b9b64 owner:address proposalOwner:address metadata:address = DeployAndInitDao`
Signature: `DeployAndInitDao{owner:address,proposalOwner:address,metadata:address}`

## SendDaoInit
TLB: `send_dao_init#c8b94bbb owner:address proposalOwner:address metadata:address = SendDaoInit`
Signature: `SendDaoInit{owner:address,proposalOwner:address,metadata:address}`

## SetDeployAndInitDaoFee
TLB: `set_deploy_and_init_dao_fee#a8969119 newDeployAndInitDaoFee:uint64 = SetDeployAndInitDaoFee`
Signature: `SetDeployAndInitDaoFee{newDeployAndInitDaoFee:uint64}`

## SendToDaoSetFwdMsgFee
TLB: `send_to_dao_set_fwd_msg_fee#5815bd86 daoId:uint32 newFwdMsgFee:uint64 = SendToDaoSetFwdMsgFee`
Signature: `SendToDaoSetFwdMsgFee{daoId:uint32,newFwdMsgFee:uint64}`

## SetRegistryAdmin
TLB: `set_registry_admin#c6d673ca newAdmin:address = SetRegistryAdmin`
Signature: `SetRegistryAdmin{newAdmin:address}`

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
TLB: `dao_init#1a83442d owner:address proposalOwner:address metadata:address = DaoInit`
Signature: `DaoInit{owner:address,proposalOwner:address,metadata:address}`

## CreateProposal
TLB: `create_proposal#2ab84bd1 body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string} = CreateProposal`
Signature: `CreateProposal{body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string}}`

## SendProposalInit
TLB: `send_proposal_init#d67a8c1a body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string} = SendProposalInit`
Signature: `SendProposalInit{body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string}}`

## Params
TLB: `_ proposalStartTime:uint64 proposalEndTime:uint64 proposalSnapshotTime:uint64 votingSystem:^string votingPowerStrategies:^string title:^string description:^string = Params`
Signature: `Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string}`

## ProposalInit
TLB: `proposal_init#f39e3d52 body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string} = ProposalInit`
Signature: `ProposalInit{body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string}}`

# Get Methods
Total Get Methods: 5

## nextDaoId

## daoAddress
Argument: daoId

## registryId

## admin

## deployAndInitDaoFee

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
23452: Only admin can set new registry admin
46336: Below min fee for create dao
51893: Only registry can change fwd msg fee
52512: Only admin can set dao fwd msg fee
60173: Below min fee for dao forward message
62925: Only admin can set create dao fee