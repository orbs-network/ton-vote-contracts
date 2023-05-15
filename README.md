# Ton.vote contract

[TON.Vote](https://github.com/orbs-network/ton-vote) is a completely decentralized, on-chain DAO governance platform designed exclusively for the TON ecosystem.

To create a new space or a new proposal for existing projects, developers can utilize our user interface (UI) available at ton.vote. It is completely free to use, and you only need to cover the transaction costs when sending data to the blockchain.


To create a new space or a new proposal for exisiting projects anyone can utilize our UI available at [ton.vote](https://ton.vote/).It is completely free to use, and you only need to cover the transaction costs when sending data to the blockchain.

This repository is dedicated to the [Ton.vote Contracts](https://github.com/orbs-network/ton-vote-contracts/tree/45d0524067ef8d1b475cf1d3bb1aa3f495156e4e/contracts), providing in-depth information about their design considerations and implementation details. The contracts serve as a crucial component of the Ton.vote project, storing essential data about spaces and proposals.

Currently, the voting mechanism requires on-chain transactions with minimal gas fees. Our future roadmap includes the integration of off-chain signatures, eliminating the need for gas fees during the voting process.

Within this repository, you will find comprehensive documentation and resources related to the contracts. Feel free to explore, contribute, and dive into the technical aspects of the Ton.vote Contracts as we continue to advance decentralized decision-making.

# Architecture
The contracts in the Ton.vote project follow the general architecture depicted below:
<img src="https://github.com/orbs-network/ton-vote-contracts/blob/f77261d1580b299e3e55da97d02ee7776b2d3a72/assets/contracts-architecture.png" width=900 />

The architecture consists of five types of contracts:

1. Registry: The root contract serves as the main entry point for creating new DAOs. Each DAO is assigned a unique index within the registry. This contract handles the creation and management of DAOs.

2. DAO: The DAO contract stores essential information about a specific DAO, such as its owners and metadata. DAO owners utilize this contract to create new proposals within their respective DAOs.

3. Metadata: The Metadata contract is responsible for storing the metadata associated with a DAO, including details such as the logo, description, social media links, and more. By utilizing a separate contract for metadata, we ensure the ability to upgrade and modify the metadata independently from the DAO contract. This approach allows for seamless updates to the metadata contract without affecting the core functionality of the DAO contract. Updating the DAO contract with the new metadata contract address is the only step needed during the upgrade process. This separation of concerns enables efficient management and customization of the DAO's metadata while maintaining the stability and integrity of the DAO contract.

4. Proposal Deployer: The proposal deployer contract manages the versioning and deployment of proposals. It keeps track of the number of deployed proposals and enables smooth upgrades without modifying the DAO contract. Upgrades only require updating the client that interacts with the proposal deployer contract.

5. Proposal: The proposal contract holds the code and information related to a specific proposal. It includes details such as the proposal title, description, start and end times, snapshot time, voting system, and voting power strategies. Voting results are calculated off-chain, and for more information, you can refer to the [Ton.vote Contracts SDK repository](https://github.com/orbs-network/ton-vote-contracts-sdk).

For more details about the eacxh contract see the contracts section below.

## Mitigate vector attacks

### DDOS Attack
To safeguard against potential spamming and mitigate the impact on the UI and cache server, it is common practice to implement a minimum fee mechanism. In this case, a minimum fee of 1 TON is set for creating new DAOs or proposals. The admin owner has control over this fee and can modify it as needed. This approach helps maintain a balance between accessibility and preventing abuse by requiring a reasonable fee for DAO and proposal creation.

### Registry Creation Without Setting Admin Role
The admin role within the system holds the responsibility of adjusting the fees. During the setup process, it is the responsibility of the registry deployer to define the admin role. To prevent race conditions when setting up the admin role, it is advisable to include the SetRegistryAdmin action within the Deploy message. This ensures that the admin role is set sequentially by the validator during the deployment process.

In the event that a malicious entity attempts to set the admin role before the legitimate deployer, a mitigating measure is available. It is possible to deploy an alternative registry with a different registryId, thereby circumventing any interference caused by the malicious actor.

### Creating DAOs not from Registry 
A malicious actor wants to baypass the minimum required fee of 1 TON and decides to create DAOs not from the registry. 
In this case he will pay the gas for deploying the new contract but only the registry is able to send DaoInit message to this contract. When a new dao is created the default owners are set to zero address so it is not possible to change the contract state before daoInit. 
Note that when the registry sends a deploy+init message, if the DAO is already deployed, the deploy part of the message will be ignored by the validator. Only the init message will be executed.
Another option is to create a new dao with init param of a different registry, in this case it is not relevant at all to Ton.vote platform as the registry are generating different daos address and will not know this dao at all.

### DAO Spam Attacks
In this scenario, some users may intentionally pay the minimum fees to create new DAOs with the intention of spamming our UI and creating a negative user experience. To tackle this issue, we can implement a tighter verification process for DAOs, including elements such as Ton DNS, website verification, and GitHub verification. By requiring these verifications, we can ensure the legitimacy and authenticity of DAOs on our platform. Additionally, we can utilize advanced filtering techniques to identify and filter out any bad actors or malicious entities that attempt to abuse the system. This approach helps maintain a trusted and secure environment for users, promoting a positive experience and safeguarding against potential spam or fraudulent activity.

### Proposal Owner's FwdMsg to Metadata Contract
Both the owner and the proposal owner possess the ability to send FwdMsg to any address, which serves as a design pattern facilitating future upgrades of the proposal contract. However, this design pattern presents a potential attack vector where the proposal owner may send FwdMsg to the metadata contract, which ideally should be controlled solely by the owner.
At present, the metadata contract does not support set messages, although this functionality might be added in the future. If such an enhancement occurs, it becomes imperative for the metadata contract to validate the owner's authorization before accepting any internal message. This validation step ensures that only authorized parties can interact with the metadata contract, preventing potential unauthorized access and maintaining the desired level of control over the contract's operations.

### Malicious Deployment of Proposal-Deployer Contract
A malicious actor may attempt to deploy a proposal-deployer contract for undeployed DAOs in order to gain unauthorized ownership of proposal creation. However, only the DAO has the authorization to create proposals, and only the DAO owner or proposal owners can send CreateProposal messages to the proposal-deployer. This safeguards against unauthorized access and maintains the integrity of the proposal creation process.

### Malicious Deployment of Proposal Contract
A malicious actor may try to deploy a proposal contract without the necessary authorization. However, only the proposal-deployer contract holds the capability to send ProposalInit messages. The authority over ProposalInit messages is controlled by the DAO owner and the proposal owner. Therefore, in this scenario, the attacker would only have paid for the deployment gas and would not be able to initiate proposals without the proper authorization.


## Registry contract 

### Admin role
In order to handle DDoS attacks, it is a common practice in on-chain platforms to require a minimum fee when sending transactions to the platform's contracts. In the Ton.vote project, there is a minimum fee requirement of 1 TON for creating a DAO and creating a proposal. These fees are covered by the space owner, and they do not impact the voters participating in the platform.

The Ton.vote architecture includes an admin role specifically assigned to the registry contract. This admin role has the authority to set the minimum fee for creating a DAO and creating a new proposal. Regular assessment of the fee requirement allows for adjustments in the future to effectively mitigate DDoS attacks. Additionally, the admin has the capability to transfer ownership to another admin, providing flexibility and administrative control.

### Supported messages
1. `Deploy` - The deploy message is used to create a new registry which is the root of the Ton.vote project. The init message includes a registryId parameter, which allows for the deployment of different registries. This feature is primarily utilized during development, where registryId = 0 is used for production and registryId = 1 is used for development purposes. <br><br>
When invoking the init message, a new DAO is created with a default admin address set to zero. It is important to update the admin address after the registry creation process. Additionally, the initial fee for creating a DAO is set to 1 TON, and the number of deployed DAOs is initially set to 0.

2. `CreateDao` - The CreateDao message is employed to deploy a new DAO. This transaction requires a minimum fee of 1 TON. Upon successful execution, the newly deployed DAO will be assigned a dedicated index, and the total count of DAOs in the registry will be updated accordingly. 
3. `SetCreateDaoFee` - This message is used by the registry admin to set the `createDaoFee` to prevent DDOS atatcks.
4. `SendToDaoSetFwdMsgFee` - This meesage is used by the registry admin to set the `fwdMsgFee` of the dao which is essential the fee for creating a new proposal. This message sends another message to the dao which will set its `fwdMsgFee`.  
5. `SetRegistryAdmin` - Sets the registry `admin` and acts as a transfer ownership to another admin. It should be called after init to set the initial admin. To burn the admin key, you can set it to the zero address of the masterchain. This action effectively renders the admin key unusable and removes any associated administrative privileges.


## Dao contract

### fwdMsgFee
The DAO acts as a mediator for forwarding messages to the proposal-deployer responsible for deploying proposals. The fwdMsgFee serves as a mechanism to address potential DDOS attacks, as discussed in the [DDOS Attack ](https://github.com/orbs-network/ton-vote-contracts#ddos-attack) section. The registry admin retains the authority to set this fee for each DAO, providing control over the associated costs and helping safeguard against malicious activities.

### Supported messages
1. `Deploy` - The deploy message is used to create a new dao for a specific registry with daoIndex. A new dao should be created by sending `CreateDao` message to the registry. 
2. `DaoInit`- After creating the DAO, a DaoInit message is sent to initialize it with the DAO owner, proposal owner, and metadata. This message is exclusive to the registry that created the DAO. The registry utilizes the Deploy message along with DaoInit when responding to the CreateDao message.
3. `SetOwner` - Utilized by the current owner of the DAO to designate a new owner. It allows the current owner to transfer ownership rights to another owner. The owner is authorized to trnasfer ownership to another owner, set the proposal-owner, set the DAO metadata or send FwdMsg.
4. `SetProposalOwner` - Utilized by the current owner of the DAO to designate a new proposal-owner. It allows the current owner to transfer ownership rights of the proposal-owner to another owner. The proposal-owner is authorized to send FwdMsg which is used to create new proposals.
5. `SetMetadata` - Employed to assign a new Metadata contract to a DAO. The Metadata contract stores essential information about the DAO, while the DAO itself only retains the address of this contract. This architectural design facilitates the upgrade of the Metadata contract while maintaining the integrity and accessibility of the DAO's metadata.
6. `SetFwdMsgFee` - Allows the registry admin to modify the fee associated with forwarding messages. This fee adjustment is implemented to enhance the handling of Distributed Denial of Service (DDoS) attacks. By adjusting the fwdMsg fee, the registry admin can help mitigate the impact of such attacks and ensure the smooth operation of the system.
7. `FwdMsg` - Enables either the owner or the proposal owner to forward messages. This functionality is utilized to create the proposal deployer if it hasn't been deployed yet and to generate new proposals as needed. By utilizing FwdMsg, the owner or proposal owner can manage the deployment and creation of proposals within the system.


## Proposal Deployer
The Proposal Deployer maintains the version of the proposal. It receives messages from the DAO and generates new proposals in response to the 'CreateProposal' message. This contract also keeps track of the total number of proposals deployed under its specific version. Each version of the contract includes all the proposals associated with it.

### Supported messages
1. `Deploy` - The Deploy message is utilized to establish a new proposal-deployer for a specific DAO. The creation of a new proposal-deployer should be initiated by the owner or the proposal-owner of the DAO by sending a FwdMsg to this contract. Typically, this contract will be created during the first proposal creation and should include both Deploy and CreateProposal mesages.
2. `CreateProposal` - The CreateProposal message is used to create a new proposal. This message can only be dispatched from the DAO contract by either the owner or the proposal-owner.

## Proposal 
The proposal contract encapsulates information about the proposal such as the start time, end time, snapshot time, proposal title and description, voting system, and voting power strategies.

* Voting System - The voting system outlines the proposal choices and how the voting power is distributed among these options. For instance, it can allow for all the voting power to be allocated to one choice, or for the voting power to be distributed across different options based on weight.

* Voting Power Strategy - The voting power strategy defines how a user's vote influences the final proposal results. Different strategies may be required for different proposals based on the specific requirements of each project. In the next version of Ton.vote, we plan to provide users with the ability to submit their own strategies. Voting power strategies can be complex, but we aim to offer as much flexibility as possible to cater to diverse project requirements.

### Supported messages
1. `Deploy` - The Deploy message is sent from the proposal-deployer with proposal-deployer address and the proposal id which is a running index managed by the proposal-deployer.
2. `ProposalInit` - The ProposalInit message can only be dispatched from the proposal-deployer (originating from the DAO contract by the owner or the proposal-owner). It encompasses all the metadata of the proposal. Once the proposal parameters are set, they are immutable. This rule is in place to ensure that proposal owners cannot alter the proposal after submission, thereby preventing potential distortion or undue influence on the results.

# Gas Analysis
* Metadata - The deployer sends 0.05 TON and receives back the remaining coins. The typical deployment cost is approximately 0.02 TON, and around 0.03 TON is refunded to the deployer.
* CreateDao - The creation of a new DAO incurs a minimum fee of 1 TON. The gas required for the transaction is about 0.045 TON, and the remaining coins are transferred to the DAO contract. These coins cannot be withdrawn by the owner or any other entity.
* CreateProposal - This operation requires 1 TON and will typically cost around 0.125 TON as this message traverses through four contracts - deployer -> dao -> proposal-deployer -> proposal. The remainder of the coins will be transferred to the Proposal contract and cannot be withdrawn by the owner or any other entity.


# Contribution Guidelines
We appreciate your help in improving the TON.Vote platform. If you've encountered a bug or have an idea for a new feature, please open a new issue or pull request on our [GitHub repository](https://github.com/orbs-network/ton-vote-contracts/issues).

When opening an issue, please provide as much detail as possible about the bug or feature request, including steps to reproduce the issue and any relevant logs or screenshots.

# Related Repositories
- Ton.Vote UI: https://github.com/orbs-network/ton-vote
- Ton.Vote Contracts SDK: https://github.com/orbs-network/ton-vote-contracts-sdk
- Ton.Vote Cache Server: https://github.com/orbs-network/ton-vote-cache

