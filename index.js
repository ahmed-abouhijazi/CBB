// Single threaded example of blockchain data processing

const {create} = require("./api/transactions/tx.service");
const express = require("express");
const app = express();
const pool = require("./config/database");

//declaring account number

let account = '0x1f029680c903f4e57279327eeea169dc81e540dfcfadb56600c';

// Declare Web3
var Web3 = require('web3');

// Setup HTTPS provider
var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/723214be2174443394c198a49ed60a41'));

// Setup Websocket provider
var web3s = new Web3('wss://mainnet.infura.io/ws/v3/723214be2174443394c198a49ed60a41');

// Subscribe to new blocks blockchain event
var subscription = web3s.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
        //console.log("result : ",result);

        return;
    }

    console.error(error);
})
.on("connected", function(subscriptionId){
    console.log("Sub ID: ",subscriptionId);
})
.on("data", function(blockHeader){
    //console.log("BLK H: ",blockHeader);

    // Process the block header and get transactions
    getBlock(blockHeader.number);
})
.on("error", console.error);


/*
// unsubscribes the subscription
subscription.unsubscribe(function(error, success){
    if (success) {
        console.log('Successfully unsubscribed!');
    }
});
*/

// Get the full block informations including transaction IDs
async function getBlock (header){
	
	try{
		block = await web3.eth.getBlock(header);
		//console.log(block);

		getTransactions(block.transactions);
	
	}catch(e){
		console.error(e);
	}
}

// Process transaction IDs and get the related informations for each transaction in each block
async function getTransactions(transactions){

	try{
	
		for(i in transactions){
			transaction = await web3.eth.getTransaction(transactions[i]);
			//console.log("Transaction : ",transaction);
			TransactionCheker(transaction);
		}
	}catch(e){
		console.log("TX Err : ", e);
	}
}


var counter = 0;
//Check if the account we are looking for is the receiver
async function TransactionCheker(tx){
	
	if (tx != null){
		//console.log(web3.eth.accounts[0]);
		// if (web3.eth.accounts[0] == tx.to){
			console.log(tx);
			if (counter<=3){
				counter++;
				let t ={address: tx.from,receiver: tx.to,value: web3.utils.fromWei(tx.value,'ether'),timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')};
				create(t);
		}
	}
}