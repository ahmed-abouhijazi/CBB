const pool = require("../../config/database");

module.exports = {
    //method to create new user
    create: (data)=> {
        console.log(data);
        pool.query(
            `insert into transactions(address,receiver,value,timestamp)
                        values(?,?,?,?)`,

            [
                data.address, 
                data.receiver,
                data.value,
                data.timestamp,
            ],
            (error , results,fields)=>{
                if(error){
                   return console.log(error);
                }
                return console.log(null,results);
            }     
        );
    },
    //Method to get all transactions
    getTx: callBack => {
        pool.query(
            `select * from transactions`,
            [],
            (err,results,fields) => {
                if (err) {
                   return callBack(err);
                }
                return callBack(null,results);
            }
        )
    },
   
};