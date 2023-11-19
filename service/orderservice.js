const pool = require("../config/database");

module.exports ={
    uploadorder: (data,callBack)=>{
        const payment_status = "success";
        const verification = "pending"
        pool.query(
                `INSERT INTO orderdetails (bike_number, user_name, payment_status,bookingdate,rental_price,license_image,verification,useremail)
                 VALUES (?,?,?,?,?,?,?,?)`,
    
                    [
                        data.bodytext.bike_number,
                        data.bodytext.user_name,
                        payment_status,
                        data.bodytext.bookingdate,
                        data.bodytext.price,
                        data.image,
                        verification,
                        data.bodytext.outsideValue1

    
                    ],
                    (error, results,feilds)=>{
                        if(error){
                          return  callBack(error);
                        }
                        return callBack(null,results);
                    }
        );
    },
    getorder: callBack=>{
        pool.query(
            `select * from orderdetails`,
            [],
            (error,results,feilds)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    
    },
    getorderbyusernames: (user_name,callBack)=>{
        pool.query(
            `select * from orderdetails where user_name = ? `,
            [user_name],
            (error,results,feilds)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getorderforstatus: callBack=>{
        pool.query(
            `select * from orderdetails where verification= "pending"`,
            [],
            (error,results,feilds)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    
    },
    updateorderstatus: (data,callBack)=>{
        pool.query(
            `update orderdetails  set verification= ?  where orderid =?`,
                    [
                        data.verification,
                        data.orderid
                    ],
                    (error, results,feilds)=>{
                        if(error){
                          return  callBack(error);
                        }
                        return callBack(null,results);
                    }
        );
    }
}