# TACT Compilation Report
Contract: Dao
BOC Size: 2290 bytes

# Types
Total Types: 20

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

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## CreateDao
TLB: `create_dao#1aa05e3d owner:address proposalOwner:address metadata:address = CreateDao`
Signature: `CreateDao{owner:address,proposalOwner:address,metadata:address}`

## SetCreateDaoFee
TLB: `set_create_dao_fee#ce971753 newCreateDaoFee:uint64 = SetCreateDaoFee`
Signature: `SetCreateDaoFee{newCreateDaoFee:uint64}`

## SendToDaoSetFwdMsgFee
TLB: `send_to_dao_set_fwd_msg_fee#5815bd86 daoId:uint32 newFwdMsgFee:uint64 = SendToDaoSetFwdMsgFee`
Signature: `SendToDaoSetFwdMsgFee{daoId:uint32,newFwdMsgFee:uint64}`

## SetRegistryAdmin
TLB: `set_registry_admin#c6d673ca newAdmin:address = SetRegistryAdmin`
Signature: `SetRegistryAdmin{newAdmin:address}`

## SetOwner
TLB: `set_owner#c2b41d43 newOwner:address = SetOwner`
Signature: `SetOwner{newOwner:address}`

## SetFwdMsgFee
TLB: `set_fwd_msg_fee#f4f3a602 newFwdMsgFee:uint64 = SetFwdMsgFee`
Signature: `SetFwdMsgFee{newFwdMsgFee:uint64}`

## SetProposalOwner
TLB: `set_proposal_owner#d0e3be76 newProposalOwner:address = SetProposalOwner`
Signature: `SetProposalOwner{newProposalOwner:address}`

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

## Params
TLB: `_ proposalStartTime:uint64 proposalEndTime:uint64 proposalSnapshotTime:uint64 votingSystem:^string votingPowerStrategies:^string title:^string description:^string = Params`
Signature: `Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string}`

## ProposalInit
TLB: `proposal_init#f39e3d52 body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string} = ProposalInit`
Signature: `ProposalInit{body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string}}`

## Comment
TLB: `comment#3480231d body:^string = Comment`
Signature: `Comment{body:^string}`

# Get Methods
Total Get Methods: 6

## registry

## owner

## proposalOwner

## metadata

## daoIndex

## fwdMsgFee

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
10109: Low message value
11226: Only admin can set new registry admin or on before creating daos
51893: Only registry can change fwd msg fee
52512: Only admin can set dao fwd msg fee
62925: Only admin can set create dao fee