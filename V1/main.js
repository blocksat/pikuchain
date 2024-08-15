const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2017", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

// instance of our blockchain
let pikaCoin = new Blockchain();
pikaCoin.addBlock(new Block(1, "10/04/2017", { amount: 4 }));
pikaCoin.addBlock(new Block(2, "04/07/2017", { amount: 9 }));

console.log(JSON.stringify(pikaCoin, null, 4));
/**
 * output
 * 
 {
    "chain": [
        {
            "index": 0,
            "timestamp": "01/01/2017",
            "data": "Genesis Block",  
            "previousHash": "0",      
            "hash": "2091e5c7e53b2da0bbd7610d1298a2d2ba4091668e8afbc1cadac49c75607ca7"
        },
        {
            "index": 1,
            "timestamp": "10/04/2017",
            "data": {
                "amount": 4
            },
            "previousHash": "2091e5c7e53b2da0bbd7610d1298a2d2ba4091668e8afbc1cadac49c75607ca7",
            "hash": "2ffd51e4276c531c91ebbf4eb20cede214e6ccbc44b39dcbb5fbce30b2a68ea2"
        },
        {
            "index": 2,
            "timestamp": "04/07/2017",
            "data": {
                "amount": 9
            },
            "previousHash": "2ffd51e4276c531c91ebbf4eb20cede214e6ccbc44b39dcbb5fbce30b2a68ea2",
            "hash": "4a4e2bc1014eab0462deddc0a768205c69843a9048f0afc1e381bdfa5191af78"
        }
    ]
}
 */