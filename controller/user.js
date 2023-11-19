const { render } = require("ejs");
const {getUsers, getUserByUsername, create, updateUser,deleteUser,getbyusernames,getuserforpassword, Updateuserpassword} = require("../service/userservice");
const {sendOtpEmail} = require('../emailhelper/emailotp');
const {sendEmailforsignup} = require("../emailhelper/signupemail");
function otp(){
    const random=  Math.floor(Math.random()*9000+1000);
    return random;
}
let array = [];

module.exports = {
    getUsers: (req, res) => {
        
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results)
            return res.render("users.ejs",{
                items:results
            })
        });
    },
    createUser: (req, res) => {
        const body = req.body;
        console.log(body);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.render("signup.ejs")
            }
            console.log(results);
            sendEmailforsignup(body.email,body.user_name,body.first_name,body.password)
            return res.render("login.ejs")
        });
    },
    updateUsers: (req, res) => {
        console.log(array)
        const body = req.body;
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.render("adminlandingpage.ejs")
            
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                return res.json({
                    user_id: data.id,
                    message: "Record Not Found "
                });
            }
            return res.render("adminlandingpage.ejs")
        });
    },
    login: (req, res) => {
        const body = req.body;
        console.log(body);
        getUserByUsername(body,(err, results)=>{
            console.log(results);
            if(err){
                console.log(err);
                return ;
            }

            if(!results) {
                return res.render("login.ejs")
            }
            const result = body.password;
            if(result){
                results.password = result;
                  return res.render("landingpage.ejs",{
                    item:results
                });
                }
                
            else {
                return res.json({
                  success: 0,
                  data: "Invalid username or password"
                });
              } 
           });
        },
        getByUsername: (req, res) => {
            const user_name = req.body.user_name;
            const body = req.body; 
            console.log(body);
            getbyusernames(user_name, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Record not Found"
                    });
                }
                console.log(body.price)
                console.log(results.email)
                res.render("payment.ejs",{
                    item:results,
                    bike:body
                });
            });
        },
        getUserForUpdate: (req, res) => {
            const user_name = req.body.user_name;
            const body = req.body; 
            console.log(body);
            getbyusernames(user_name, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Record not Found"
                    });
                }
                console.log(results)
                res.render("updateUser.ejs",{
                    item:results
                });
            });
        },
        getUserForPassword: (req, res) => {
            const body = req.body; 
            array.shift();
            console.log(body);
            let value = otp();
            array.push(value);
            console.log(array);
            getuserforpassword(body , (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Record not Found"
                    });
                }
                //console.log(results)
                sendOtpEmail(body.email, array)
                return res.render("otpVerify.ejs",{
                        item:results})
            });
        },
        UpdateUserPassword : (req,res) => {
            const body = req.body;
            console.log(array)
            if(body.otp == array[0]){
                array.shift();
                Updateuserpassword(body,(err, results)=> {
                    if(err){
                        console.log(err)
                        return;
                    }
                    if (!results){
                        return res.json({
                            success: 0,
                            message: "Record not Found"
                        });
                    }
                    console.log(array)
                        return res.render("login.ejs") ; 

                });
            }else{
                array.shift();
                  
            }
        }
            
        
};