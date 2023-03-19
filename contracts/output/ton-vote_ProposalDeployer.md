# TACT Compilation Report
Contract: ProposalDeployer
BOC Size: 1385 bytes

# Types
Total Types: 11

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

## Params
TLB: `_ proposal_start_time:uint64 proposal_end_time:uint64 proposal_snapshot_time:uint64 proposal_type:uint8 voting_power_strategy:uint8 = Params`
Signature: `Params{proposal_start_time:uint64,proposal_end_time:uint64,proposal_snapshot_time:uint64,proposal_type:uint8,voting_power_strategy:uint8}`

## ProposalInit
TLB: `proposal_init#fee7435f body:Params{proposal_start_time:uint64,proposal_end_time:uint64,proposal_snapshot_time:uint64,proposal_type:uint8,voting_power_strategy:uint8} = ProposalInit`
Signature: `ProposalInit{body:Params{proposal_start_time:uint64,proposal_end_time:uint64,proposal_snapshot_time:uint64,proposal_type:uint8,voting_power_strategy:uint8}}`

## Comment
TLB: `comment#3480231d body:^string = Comment`
Signature: `Comment{body:^string}`

## CreateProposal
TLB: `create_proposal#07652b27 body:Params{proposal_start_time:uint64,proposal_end_time:uint64,proposal_snapshot_time:uint64,proposal_type:uint8,voting_power_strategy:uint8} = CreateProposal`
Signature: `CreateProposal{body:Params{proposal_start_time:uint64,proposal_end_time:uint64,proposal_snapshot_time:uint64,proposal_type:uint8,voting_power_strategy:uint8}}`

## SetOwner
TLB: `set_owner#c2b41d43 newOwner:address = SetOwner`
Signature: `SetOwner{newOwner:address}`

# Get Methods
Total Get Methods: 3

## owner

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
25952: ended
56772: not started