const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const compiled= async ()=> solc.compile(
    JSON.stringify({
        "language": 'Solidity',
        "sources": {
            'Inbox.sol': {
                "content": source
            }
        },
        settings: {
            outputSelection: {
              '*': {
                '*': ['*']
              }
            }
          }
    }));

module.exports=compiled;