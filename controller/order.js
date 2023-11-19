const { render } = require("ejs");
const {getorder,uploadorder,getorderbyusernames,updateorderstatus, getorderforstatus} = require("../service/orderservice");
const {Updatebikestatus,Updatebikestatusrejected} = require("../service/bikeservice");
const {sendEmail} = require("../emailhelper/email");
const {sendEmailforapproval} = require("../emailhelper/orderapprovalemail");
const {sendEmailforrejected} = require("../emailhelper/orderrejectedemail");


module.exports = {

    getorders: (req, res) => {
        getorder((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            const body = req.body;
            console.log(body)
            return res.render("adminOrders.ejs",{
                items:results,
                value: body
            })
        });
    },
    createOrder: (req, res) => {
        //const body = req.body;
        //console.log(body);
        image = req.file
         console.log("here is"+image);
        const body ={bodytext: req.body, image :req.file.buffer.toString('base64')};
        uploadorder(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "databaseb connection error"

                });
            }
            Updatebikestatus(body.bodytext.bike_number);
            console.log(results);
            sendEmail(body.bodytext.outsideValue1,body.bodytext.bike_number,body.bodytext.user_name,body.bodytext.price,body.bodytext.bookingdate)
            res.render("success.ejs",{
                items:results,
                item:body.bodytext
            });
        });
    },
    getorderbyusername: (req, res) => {
        const user_name = req.body.user_name;
        const body = req.body; 
        const user = {user_name:req.body.user_name}
        console.log(body);
        console.log("hello" +user.user_name)
        const dup = {    orderid: "",
            bike_number: '',
            payment_status: '',
            bookingdate: '',
            rental_price: ''
          }

        getorderbyusernames(user_name, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results)
            if (results == []) {
                return res.render("order.ejs",{
                items:dup,
                itemu: user
            })
            }
            console.log(results)
            res.render("orders.ejs",{
                items:results,
                itemu: user
            });
        });
    },
    getordersforadmin: (req, res) => {
        getorderforstatus((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            const body = req.body;
            console.log(body)
            return res.render("bookingapproval.ejs",{
                items:results,
                value: body
            })
        });
    },
    updateOrderStatus: (req, res) => {
        const body = req.body;
        console.log(body)
        updateorderstatus(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }if (body.verification=="Rejected"){
                Updatebikestatusrejected(body.bike_number);
                sendEmailforrejected(body.useremail,body.orderid)
                return res.render("adminlandingpage.ejs")
            }else{
            sendEmailforapproval(body.useremail,body.orderid)
            return res.render("adminlandingpage.ejs")
            }
            
        });
    }

}