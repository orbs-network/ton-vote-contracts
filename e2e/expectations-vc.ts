import { isValidTimeRef, isValidEthereumAddress } from './deep-matcher';

export const expectationVcManagement = {
  CurrentRefTime: isValidTimeRef,
  PageStartRefTime: isValidTimeRef,
  PageEndRefTime: isValidTimeRef,
  VirtualChains: {
    '1000000': {
      VirtualChainId: 1000000,
      GenesisRefTime: isValidTimeRef,
      CurrentTopology: [
        {
          EthAddress: '02ebe4663d6110aec8f816f9772a4087cc1a5ec7',
          OrbsAddress: 'ecfcccbc1e54852337298c7e90f5ecee79439e67',
          Ip: '2.235.228.102',
          Port: 10000,
          Name: 'Guardian3',
        },
        {
          EthAddress: '44ea9fbfebb3162a5778b30fb2ba2a66cc5291a8',
          OrbsAddress: '33a8534adfddd5a774fb4b245f25b9a54c931346',
          Ip: '68.234.159.191',
          Port: 10000,
          Name: 'Guardian4',
        },
        {
          EthAddress: '7d5b6545e3427374adeb96f4198c05812f7625b1',
          OrbsAddress: '605b47645c2ff7ffb9756a051048d006d2b1ef4a',
          Ip: '125.91.101.69',
          Port: 10000,
          Name: 'Guardian5',
        },
        {
          EthAddress: '94fda04016784d0348ec2ece7a9b24e3313885f0',
          OrbsAddress: '945dc264e11c09f8a518da6ce1bea493e0055b16',
          Ip: '148.253.160.64',
          Port: 10000,
          Name: 'Guardian2',
        },
        {
          EthAddress: '98b4d71c78789637364a70f696227ec89e35626c',
          OrbsAddress: 'b1985d8a332bfc903fd437489ea933792fbfa500',
          Ip: '152.180.215.28',
          Port: 10000,
          Name: 'Guardian1',
        },
      ],
      CommitteeEvents: [
        {
          RefTime: isValidTimeRef,
          Committee: [
            {
              OrbsAddress: 'b1985d8a332bfc903fd437489ea933792fbfa500',
              EthAddress: '98b4d71c78789637364a70f696227ec89e35626c',
              Weight: 10000,
              IdentityType: 0,
            },
          ],
        },
        {
          RefTime: isValidTimeRef,
          Committee: [
            {
              OrbsAddress: '945dc264e11c09f8a518da6ce1bea493e0055b16',
              EthAddress: '94fda04016784d0348ec2ece7a9b24e3313885f0',
              Weight: 20000,
              IdentityType: 0,
            },
            {
              OrbsAddress: 'b1985d8a332bfc903fd437489ea933792fbfa500',
              EthAddress: '98b4d71c78789637364a70f696227ec89e35626c',
              Weight: 15000,
              IdentityType: 0,
            },
          ],
        },
        {
          RefTime: isValidTimeRef,
          Committee: [
            {
              OrbsAddress: '33a8534adfddd5a774fb4b245f25b9a54c931346',
              EthAddress: '44ea9fbfebb3162a5778b30fb2ba2a66cc5291a8',
              Weight: 40000,
              IdentityType: 0,
            },
            {
              OrbsAddress: '945dc264e11c09f8a518da6ce1bea493e0055b16',
              EthAddress: '94fda04016784d0348ec2ece7a9b24e3313885f0',
              Weight: 30000,
              IdentityType: 0,
            },
          ],
        },
      ],
      SubscriptionEvents: [
        {
          RefTime: isValidTimeRef,
          Data: {
            Status: 'active',
            Tier: 'defaultTier',
            RolloutGroup: 'main',
            IdentityType: 0,
            GenesisRefTime: isValidTimeRef,
            Owner: isValidEthereumAddress,
            Name: 'vc1',
            Rate: '1000',
          },
        },
        {
          RefTime: isValidTimeRef,
          Data: {
            Status: 'expired',
            Tier: 'defaultTier',
            RolloutGroup: 'main',
            IdentityType: 0,
            GenesisRefTime: isValidTimeRef,
            Owner: isValidEthereumAddress,
            Name: 'vc1',
            Rate: '1000',
          },
        },
        {
          RefTime: isValidTimeRef,
          Data: {
            Status: 'active',
            Tier: 'defaultTier',
            RolloutGroup: 'main',
            IdentityType: 0,
            GenesisRefTime: isValidTimeRef,
            Owner: isValidEthereumAddress,
            Name: 'vc1',
            Rate: '1000',
          },
        },
        {
          RefTime: isValidTimeRef,
          Data: {
            Status: 'expired',
            Tier: 'defaultTier',
            RolloutGroup: 'main',
            IdentityType: 0,
            GenesisRefTime: isValidTimeRef,
            Owner: isValidEthereumAddress,
            Name: 'vc1',
            Rate: '1000',
          },
        },
      ],
      ProtocolVersionEvents: [
        {
          RefTime: isValidTimeRef,
          Data: {
            Version: 1,
          },
        },
        {
          RefTime: isValidTimeRef,
          Data: {
            Version: 19,
          },
        },
      ],
    },
  },
};

export const expectationHistoricVcManagement = {
  CurrentRefTime: isValidTimeRef,
  PageStartRefTime: 0,
  PageEndRefTime: isValidTimeRef,
  VirtualChains: {
    '1000000': {
      VirtualChainId: 1000000,
      GenesisRefTime: isValidTimeRef,
      CurrentTopology: [
        {
          EthAddress: '02ebe4663d6110aec8f816f9772a4087cc1a5ec7',
          OrbsAddress: 'ecfcccbc1e54852337298c7e90f5ecee79439e67',
          Ip: '2.235.228.102',
          Port: 10000,
          Name: 'Guardian3',
        },
        {
          EthAddress: '44ea9fbfebb3162a5778b30fb2ba2a66cc5291a8',
          OrbsAddress: '33a8534adfddd5a774fb4b245f25b9a54c931346',
          Ip: '68.234.159.191',
          Port: 10000,
          Name: 'Guardian4',
        },
        {
          EthAddress: '7d5b6545e3427374adeb96f4198c05812f7625b1',
          OrbsAddress: '605b47645c2ff7ffb9756a051048d006d2b1ef4a',
          Ip: '125.91.101.69',
          Port: 10000,
          Name: 'Guardian5',
        },
        {
          EthAddress: '94fda04016784d0348ec2ece7a9b24e3313885f0',
          OrbsAddress: '945dc264e11c09f8a518da6ce1bea493e0055b16',
          Ip: '148.253.160.64',
          Port: 10000,
          Name: 'Guardian2',
        },
        {
          EthAddress: '98b4d71c78789637364a70f696227ec89e35626c',
          OrbsAddress: 'b1985d8a332bfc903fd437489ea933792fbfa500',
          Ip: '152.180.215.28',
          Port: 10000,
          Name: 'Guardian1',
        },
      ],
      CommitteeEvents: [
        {
          RefTime: isValidTimeRef,
          Committee: [
            {
              OrbsAddress: 'b1985d8a332bfc903fd437489ea933792fbfa500',
              EthAddress: '98b4d71c78789637364a70f696227ec89e35626c',
              Weight: 10000,
              IdentityType: 0,
            },
          ],
        },
        {
          RefTime: isValidTimeRef,
          Committee: [
            {
              OrbsAddress: '945dc264e11c09f8a518da6ce1bea493e0055b16',
              EthAddress: '94fda04016784d0348ec2ece7a9b24e3313885f0',
              Weight: 20000,
              IdentityType: 0,
            },
            {
              OrbsAddress: 'b1985d8a332bfc903fd437489ea933792fbfa500',
              EthAddress: '98b4d71c78789637364a70f696227ec89e35626c',
              Weight: 15000,
              IdentityType: 0,
            },
          ],
        },
        {
          RefTime: isValidTimeRef,
          Committee: [
            {
              OrbsAddress: '33a8534adfddd5a774fb4b245f25b9a54c931346',
              EthAddress: '44ea9fbfebb3162a5778b30fb2ba2a66cc5291a8',
              Weight: 40000,
              IdentityType: 0,
            },
            {
              OrbsAddress: '945dc264e11c09f8a518da6ce1bea493e0055b16',
              EthAddress: '94fda04016784d0348ec2ece7a9b24e3313885f0',
              Weight: 30000,
              IdentityType: 0,
            },
          ],
        },
      ],
      SubscriptionEvents: [
        {
          RefTime: isValidTimeRef,
          Data: {
            Status: 'active',
            Tier: 'defaultTier',
            RolloutGroup: 'main',
            IdentityType: 0,
            GenesisRefTime: isValidTimeRef,
            Owner: isValidEthereumAddress,
            Name: 'vc1',
            Rate: '1000',
          },
        },
        {
          RefTime: isValidTimeRef,
          Data: {
            Status: 'expired',
            Tier: 'defaultTier',
            RolloutGroup: 'main',
            IdentityType: 0,
            GenesisRefTime: isValidTimeRef,
            Owner: isValidEthereumAddress,
            Name: 'vc1',
            Rate: '1000',
          },
        },
        {
          RefTime: isValidTimeRef,
          Data: {
            Status: 'active',
            Tier: 'defaultTier',
            RolloutGroup: 'main',
            IdentityType: 0,
            GenesisRefTime: isValidTimeRef,
            Owner: isValidEthereumAddress,
            Name: 'vc1',
            Rate: '1000',
          },
        },
        {
          RefTime: isValidTimeRef,
          Data: {
            Status: 'expired',
            Tier: 'defaultTier',
            RolloutGroup: 'main',
            IdentityType: 0,
            GenesisRefTime: isValidTimeRef,
            Owner: isValidEthereumAddress,
            Name: 'vc1',
            Rate: '1000',
          },
        },
      ],
      ProtocolVersionEvents: [
        {
          RefTime: isValidTimeRef,
          Data: {
            Version: 1,
          },
        },
        {
          RefTime: isValidTimeRef,
          Data: {
            Version: 19,
          },
        },
      ],
    },
  },
};
