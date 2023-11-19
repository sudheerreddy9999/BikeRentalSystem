const pool = require("../config/database");

module.exports ={

getUsers: callBack=>{
    pool.query(
        `select id, first_name, last_name, mobile_no, email, user_name, password from user`,
        [],
        (error,results,feilds)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        }
    );

},
create: (data,callBack)=>{
    pool.query(
        `INSERT INTO user (first_name, last_name, mobile_no, email, user_name, password)
                 values(?,?,?,?,?,?)`,

                [
                    data.first_name,
                    data.last_name,
                    data.mobile_no,
                    data.email,
                    data.user_name,
                    data.password

                ],
                (error, results,feilds)=>{
                    if(error){
                      return  callBack(error);
                    }
                    return callBack(null,results);
                }
    );
},
getUserByUsername: (data, callBack)=>{
  pool.query(
        `select * from user where user_name = ? and password=?`,
        [data.user_name,data.password],
        (error ,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        }
    );
},
updateUser: (data,callBack)=>{
    pool.query(
        `update user set first_name=?,last_name=?,mobile_no=?,email=?, password=? where user_name=?`,

                [
                    
                    data.first_name,
                    data.last_name,
                    data.mobile_no,
                    data.email,
                    data.password,
                    data.user_name
                   

                ],
                (error, results,feilds)=>{
                    if(error){
                      return  callBack(error);
                    }
                    return callBack(null,results);
                }
    );
},

deleteUser: (data,callBack)=>{
    pool.query(
        `delete from user where user_name=?`,

                [
                    data.user_name
                ],
                (error, results,feilds)=>{
                    if(error){
                     callBack(error);
                    }
                    return callBack(null,results[0]);
                }
    );
},
getbyusernames: (user_name,callBack)=>{
    pool.query(
        `select id, first_name, last_name, mobile_no, user_name, email, password from user where user_name = ?`,
        [user_name],
        (error,results,feilds)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
},
getuserforpassword: (data,callBack)=>{
    console.log(data)
    pool.query(
        `select * from user where user_name = ? and email = ?`,
        [data.user_name,
            data.email
        ],
        (error,results,feilds)=>{
            if(error){
                return callBack(error);
            }
            console.log(results)
            return callBack(null, results[0]);
        }
    );
},
Updateuserpassword:(data,callBack)=>{
    pool.query(
        ` update user set password = ? where user_name = ?`,
            [
                data.password,
                data.user_name
            ],
            (error, results,feilds) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
    );
        }



};