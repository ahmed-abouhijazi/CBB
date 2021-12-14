// Multi threaded example of blockchain data processing
// WARNING ! THERE IS NO CPU LIMIT HERE !!
// Test with caution

// Declare Web3
var Web3 = require('web3');

// Setup HTTPS provider
var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/90bf3112f824446fa7b23ff4315a9468'));

// Setup Websocket provider
var web3s = new Web3('wss://mainnet.infura.io/ws/v3/90bf3112f824446fa7b23ff4315a9468');

// Setup multithreading
process.env.UV_THREADPOOL_SIZE = 12; // the default is 4 threads per process, here i rised it a bit due to the amount of transactions per block (300+)
const cluster = require('cluster');
//const numCPUs = require('os').cpus().length - 1;

// If the process is a master process 
if (cluster.isMaster) {

	// Subscribe to new blocks blockchain event
	var subscription = web3s.eth.subscribe('newBlockHeaders', function(error, result){
    	if (!error) {
        	//console.log("result : ",result);
        	return;
    	}
    console.error(error);
	
	}).on("connected", function(subscriptionId){

	    console.log("Sub ID: ",subscriptionId);

	}).on("data", function(blockHeader){
    	
    	//Now we have the block header
    	console.log("BLK H: ",blockHeader);
		    	
    	// Fork workers and set an env variable as blockheader number
		cluster.fork({blockHeader:blockHeader.number});

		cluster.on('exit', (worker, code, signal) => {
			console.log(`worker ${worker.process.pid} died`);
		});

	}).on("error", console.error);

}else{
	
	// Here the process is worker, process block data and transactions data
	console.log("BLK INFO : ",process.env.blockHeader);
	getBlock(process.env.blockHeader);

}

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
		console.log(block);

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
			console.log("Transaction : ",transaction);
		}
	}catch(e){
		console.log("TX Err : ", e);
	}

	process.exit(0);
}