# TACT Compilation Report
Contract: ProposalDeployer
BOC Size: 1319 bytes

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

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## DeployAndInitProposal
TLB: `deploy_and_init_proposal#9be57ef7 body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string} = DeployAndInitProposal`
Signature: `DeployAndInitProposal{body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string}}`

## SendProposalInit
TLB: `send_proposal_init#da72c6df body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string} = SendProposalInit`
Signature: `SendProposalInit{body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string}}`

## SendUpdateProposal
TLB: `send_update_proposal#1ed651ab proposalAddress:address updateParams:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string} hide:bool = SendUpdateProposal`
Signature: `SendUpdateProposal{proposalAddress:address,updateParams:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string},hide:bool}`

## Params
TLB: `_ proposalStartTime:uint64 proposalEndTime:uint64 proposalSnapshotTime:uint64 votingSystem:^string votingPowerStrategies:^string title:^string description:^string quorum:^string = Params`
Signature: `Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string}`

## ProposalInit
TLB: `proposal_init#cd517809 body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string} = ProposalInit`
Signature: `ProposalInit{body:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string}}`

## Vote
TLB: `vote#7c420ea2 comment:^string = Vote`
Signature: `Vote{comment:^string}`

## UpdateProposal
TLB: `update_proposal#1a445d79 updateParams:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string} hide:bool = UpdateProposal`
Signature: `UpdateProposal{updateParams:Params{proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string},hide:bool}`

## ProposalContractState
TLB: `_ proposalDeployer:address id:uint32 proposalStartTime:uint64 proposalEndTime:uint64 proposalSnapshotTime:uint64 votingSystem:^string votingPowerStrategies:^string title:^string description:^string quorum:^string hide:bool = ProposalContractState`
Signature: `ProposalContractState{proposalDeployer:address,id:uint32,proposalStartTime:uint64,proposalEndTime:uint64,proposalSnapshotTime:uint64,votingSystem:^string,votingPowerStrategies:^string,title:^string,description:^string,quorum:^string,hide:bool}`

# Get Methods
Total Get Methods: 3

## dao

## nextProposalId

## proposalAddr
Argument: index

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
8923: Update proposals is possible only before start time
13403: only dao can send create proposal message
50214: only dao can send update proposal message
52334: Incative proposal
61278: Propsal was not initialized yet