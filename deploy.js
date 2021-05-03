const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledContracts = require('./compile');

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
})

const provider = new HDWalletProvider(
  'sketch leopard denial friend caution bracket focus rack cook slam use carry sad street hurt',
  'https://rinkeby.infura.io/v3/2589a8e8b107472d8212b4ccef75f5f4'
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    let contracts = JSON.parse(await compiledContracts()).contracts;
    var datetime = new Date();
    console.log(datetime)
    const result = await new web3.eth.Contract(contracts['Inbox.sol'].Inbox.abi)
      .deploy({
        data: '0x'+contracts['Inbox.sol']['Inbox'].evm.bytecode.object,
        arguments: ['Hi there!']
      })
      .send({
        gas: '10000000',
        from: accounts[0]
      });

    console.log('Contract deployed to', result.options.address);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
deploy();