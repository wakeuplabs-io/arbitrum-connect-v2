import { CustomArbitrumNetwork } from '@/hooks/use-arbitrum-networks';

const OUR_ORBIT = {
  'parent-chain-node-url': 'https://sepolia-rollup.arbitrum.io/rpc',
  adminProxy: '0xe847708D16B8F34aD2595422414E3C0eD2Bd5f81',
  batchPoster: '0xA52078d1FEa0783900A72D0E3DEACDdbe535B623',
  bridge: '0x9079816621B094389C940acb382331d5A3b6424F',
  chainId: 24802239149,
  chainName: 'My Arbitrum L3 Chain',
  chainOwner: '0x9c28de87e236461DCe72d12e9d922EEa31284de5',
  challengeManager: '0xF7c0b7741Ad71d68e33FC2F12Fb981D7fceFE8bb',
  deployedAtBlockNumber: 101101355,
  inbox: '0x5f8FA47BdB016916AE9134B155A86442410645c6',
  infrastructureFeeCollector: '0x9c28de87e236461DCe72d12e9d922EEa31284de5',
  minL2BaseFee: 100000000,
  nativeToken: '0x0000000000000000000000000000000000000000',
  networkFeeReceiver: '0x9c28de87e236461DCe72d12e9d922EEa31284de5',
  outbox: '0x044b686C13966729B20B558710ee8f99EFF93e60',
  parentChainId: 421614,
  rollup: '0x7A08988fF97D55Cde8AFF6964A21eF29886777A1',
  rollupEventInbox: '0x24e4F39Cb027b6470EA17b879cB3b1543ebD1f7C',
  sequencerInbox: '0x1fd74A0204724AEbF2507c37e156619B7cC95687',
  staker: '0x5cFb3b787B1BD5547D13cf62656c04C883317c50',
  upgradeExecutor: '0xe87c871e03E4fc9FCE2906c6f06321AFBaf2057C',
  utils: '0x7C100c97a54e2D309a194752Df2f66922A802be3',
  validatorUtils: '0x7C100c97a54e2D309a194752Df2f66922A802be3',
  validatorWalletCreator: '0xFAd2C6Cb969Ab7B18d78BD63e512b650bb70B570',
};

export const ourCustomNetwork: CustomArbitrumNetwork = {
  chainId: OUR_ORBIT.chainId,
  name: OUR_ORBIT.chainName,
  isCustom: true,
  parentChainId: OUR_ORBIT.parentChainId,
  ethBridge: {
    bridge: OUR_ORBIT.bridge,
    inbox: OUR_ORBIT.inbox,
    sequencerInbox: OUR_ORBIT.sequencerInbox,
    outbox: OUR_ORBIT.outbox,
    rollup: OUR_ORBIT.rollup,
    // CHECK: what is this
    // classicOutboxes: {
    //   '0x667e23ABd27E623c11d4CC00ca3EC4d0bD63337a': 0,
    //   '0x760723CD2e632826c38Fef8CD438A4CC7E7E1A40': 30,
    // },
  },
  confirmPeriodBlocks: 6,
  isTestnet: true,
};
