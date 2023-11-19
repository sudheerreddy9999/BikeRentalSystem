const pool = require("../config/database");
const buffer = require('buffer');

module.exports ={
    uploadbike: (data,callBack)=>{
        pool.query(
                `INSERT INTO bike ( bike_name, bike_image, price, bike_condition, availability, location, bike_number)
                 VALUES (?,?,?,?,?,?,?)`,
    
                    [
                        data.bodytext.bike_name,
                        data.image,
                        data.bodytext.price,
                        data.bodytext.condition,
                        data.bodytext.avilability,
                        data.bodytext.location,
                        data.bodytext.bike_number
    
                    ],
                    (error, results,feilds)=>{
                        if(error){
                          return  callBack(error);
                        }
                        return callBack(null,results);
                    }
        );
    },
    getbikes: callBack=>{
        pool.query(
            `select * from bike`,
            [],
            (error,results,feilds)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    
    }  ,
    getBike: (location,callBack)=>{
        pool.query(
            `select  bike_name, bike_image, price, bike_condition, availability, location, bike_number from bike where location = ? and availability = "y"`,
            [location],
            (error,results,feilds)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    },
    updateBikeimage: (data,callBack)=>{
        pool.query(
            `update bike set bike_image=? where bike_number = ?`,
                    [
                        data.image,
                        data.bodytext.bike_number
                       
    
                    ],
                    (error, results,feilds)=>{
                        if(error){
                          return  callBack(error);
                        }
                        return callBack(null,results);
                    }
        );
    },
    deleteBike: (data,callBack)=>{
        pool.query(
            `delete from bike where bike_number=?`,
    
                    [
                        data.bikenumber
                    ],
                    (error, results,feilds)=>{
                        if(error){
                         callBack(error);
                        }
                        return callBack(null,results[0]);
                    }
        );
    },
    getBikesToAdmin: (array,callBack)=>{
        console.log(array[0]);
        console.log(array[1]);
        pool.query(
            `select  bike_name, bike_image, price, bike_condition, availability, location, bike_number from bike where location = ? or  bike_number = ? `,
            [
                array[0],
                array[1]
            ],
            (error,results,feilds)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    },
    adminUpdateBike: (data,callBack)=>{
        pool.query(
            `update bike set bike_name=?, price=?,bike_condition=?, availability=?  where bike_number=?`,
                    [
                        data.bike_name,
                        data.price,
                        data.condition,
                        data.avilability,
                        data.bike_number
                    ],
                    (error, results,feilds)=>{
                        if(error){
                          return  callBack(error);
                        }
                        return callBack(null,results);
                    }
        );
    },
    getBikeForUpdate: (bike_number,callBack)=>{
        pool.query(
            `select  bike_name, bike_image, price, bike_condition, availability, location, bike_number from bike where bike_number = ?`,
            [bike_number],
            (error,results,feilds)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    },
    Updatebikestatus:(data)=>{
        console.log(data)
        pool.query(
            ` update bike set availability = "N" where bike_number = ?`,
                [
                    data
                ],

        );
            },
            adminUpdatebikestatus: (data,callBack)=>{
                pool.query(
                    `update bike set availability= "Y"  where bike_number=?`,
                            [
                                data.bike_number
                            ],
                            (error, results,feilds)=>{
                                if(error){
                                  return  callBack(error);
                                }
                                return callBack(null,results);
                            }
                );
            },
            getbikesofnotavilable: callBack=>{
                pool.query(
                    `select * from bike where availability = "N"`,
                    [],
                    (error,results,feilds)=>{
                        if(error){
                            return callBack(error);
                        }
                        return callBack(null, results);
                    }
                );
            
            },
            Updatebikestatusrejected:(data)=>{
                console.log(data)
                pool.query(
                    ` update bike set availability = "Y" where bike_number = ?`,
                        [
                            data
                        ],
        
                );
                    }
}