const pool = require("../config/database")

module.exports = {
    getUserByAdminUsername: (data, callBack)=>{
        console.log(data)
  pool.query(
        `select * from admin where user_name = ? and password= ?`,
        [data.user_name,data.password],
        (error ,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        }
    );
}
}