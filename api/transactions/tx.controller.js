const {create,getTx} = require("./tx.service");

module.exports = {
    createTx: (req,res)=>{
        const body = req.body;
        create(body);
    },

    getTx:(req,res)=>{
        getTx((err,results)=>{
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
    
   
}