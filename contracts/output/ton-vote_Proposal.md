# TACT Compilation Report
Contract: Proposal
BOC Size: 1453 bytes

# Types
Total Types: 16

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

## SetOwner
TLB: `set_owner#c2b41d43 newOwner:address = SetOwner`
Signature: `SetOwner{newOwner:address}`

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
TLB: `create_proposal#130b83db body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,proposalType:uint8,votingPowerStrategy:uint8} = CreateProposal`
Signature: `CreateProposal{body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,proposalType:uint8,votingPowerStrategy:uint8}}`

## Params
TLB: `_ proposalStartTime:uint64 proposalEndTime:uint64 proposalSnapshotTime:uint64 proposalType:uint8 votingPowerStrategy:uint8 = Params`
Signature: `Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,proposalType:uint8,votingPowerStrategy:uint8}`

## ProposalInit
TLB: `proposal_init#84cdbd77 body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,proposalType:uint8,votingPowerStrategy:uint8} = ProposalInit`
Signature: `ProposalInit{body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,proposalType:uint8,votingPowerStrategy:uint8}}`

## Comment
TLB: `comment#3480231d body:^string = Comment`
Signature: `Comment{body:^string}`

# Get Methods
Total Get Methods: 7

## owner

## id

## proposalStartTime

## proposalEndTime

## proposalSnapshotTime

## proposalType

## votingPowerStrategy

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
8704: already initialized
25952: ended
56772: not started
63162: low message value