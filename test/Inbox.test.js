const { doesNotMatch } = require('assert');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compiledContracts= require('../compile') ;

let accounts;
let inbox;
let contracts;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  contracts=JSON.parse( await compiledContracts()).contracts;

  // Use one of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(contracts['Inbox.sol'].Inbox.abi)
    .deploy({
      data: '0x'+contracts['Inbox.sol']['Inbox'].evm.bytecode.object,
      arguments: ['Hi there!']
    })
    .send({ from: accounts[0], gas: '1000000' });
    let g;
    g= false;

});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
  
});
