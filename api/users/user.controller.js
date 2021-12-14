const {create,
    getUsers,
    getUsersById,
    updateUser,
    deletUser} = require("./user.service");
const { genSaltSync,hashSync} = require("bcrypt");

module.exports = {
    createUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message:"Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        });
    },
    getUsersById:(req,res)=>{
        const id = req.params.id;
        getUsersById(id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            } 
            if(!results){
                return res.json({
                    success:0,
                    message:"Records not Fount"
                });
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    //controller get all users
    getUsers:(req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Records not Fount"
                });
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    //controller update users
    updateUser:(req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"failed to update user"
                });
            }
            return res.json({
                success:1,
                message:"update successfully"
            });
        });
    },
    //controller to delete a user
    deletUser:(req,res) => {
        const data = req.body;
        deletUser(data,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Records not Fount"
                });
            }
            return res.json({
                success:1,
                message:"user deleted succfully"
            });
        });
    },
}