const pool = require("../../config/database");

module.exports = {
    //method to create new user
    create: (data,callBack)=> {
        pool.query(
            `insert into registration(first_name,last_name,gender,email,password,account_number,Wallet)
                        values(?,?,?,?,?,?,?)`,

            [
                data.first_name, 
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.account_number,
                data.Wallet
            ],
            (error , results,fields)=>{
                if(error){
                   return callBack(error);
                }
                return callBack(null,results);
            }     
        );
    },
    //Method to get all users
    getUsers: callBack => {
        pool.query(
            `select id,first_name,last_name,gender,email,account_number,Wallet from registration`,
            [],
            (err,results,fields) => {
                if (err) {
                   return callBack(err);
                }
                return callBack(null,results);
            }
        )
    },
    //method to get user by id
    getUsersById: (id, callBack) => {
        pool.query(
            `select id,first_name,last_name,gender,email,account_number,Wallet from registration where id=?`,
            [id],
            (err,results,fields) => {
                if (err) {
                   return callBack(err);
                }
                return callBack(null,results[0]);
            }
        )
    },
    //update user
    updateUser: (data,callBack)=> {
        pool.query(
            `update registration set first_name=?,last_name=?,gender=?,email=?,password=?,account_number=?,Wallet=? where id=?`,

            [
                data.first_name, 
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.account_number,
                data.Wallet,
                data.id
            ],
            (error , results,fields)=>{
                if(error){
                   return callBack(error);
                }
                return callBack(null,results);
            }     
        );
    },
    //delete user
    deletUser: (data,callBack)=> {
        pool.query(
            `delete from registration where id = ?`,

            [
                data.id
            ],
            (error , results,fields)=>{
                if(error){
                   return callBack(error);
                }
                return callBack(null,results);
            }     
        );
    }

};