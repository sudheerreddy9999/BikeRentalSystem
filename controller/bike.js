const { render } = require("ejs");
const {uploadbike,getbikes,getBike, updateBikeimage,deleteBike, getBikesToAdmin,adminUpdateBike,getBikeForUpdate, adminUpdatebikestatus, getbikesofnotavilable} = require("../service/bikeservice");


module.exports = {
 
    uploadallbike: (req, res) => {
        const body ={bodytext: req.body, image :req.file.buffer.toString('base64')};
        // image = req.body.bike_image
         //console.log("here is"+image);

        console.log(body.bodytext);
        uploadbike(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "databaseb connection error"

                });
            }
            console.log(results);
            return res.render("adminlandingpage.ejs");
        });
    },
    getallbikes: (req, res) => {
        getbikes((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results)
            return res.render("admincard.ejs",{
                items:results
            })
        });
    },
    getBikeByLocation: (req, res) => {
        const id = req.body.location;
        const outside ={username: req.body.username,email:req.body.outsideValue1}
        console.log(outside.username);
        console.log(outside.email);
        getBike(id, (err, results) => {
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
            return res.render("card.ejs",{
                items:results,
                itemusr:outside
            })
        });
    },
    updatebikesImage: (req, res) => {
        //const body = req.body;
        console.log(req.body)
        const body ={bodytext: req.body, image :req.file.buffer.toString('base64')};
        updateBikeimage(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.render("adminlandingpage.ejs")
            
        });
    },
    deleteBikes: (req, res) => {
        const data = req.body;
        deleteBike(data, (err, results) => {
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
    getBikeToAdmin: (req, res) => {
        const id = req.body.query;
        const bike_number = "ap32344";
        const array = [id,bike_number]
        const outside ={username: req.body.username,email:req.body.outsideValue1}
        console.log(outside.username);
        console.log(outside.email);
        getBikesToAdmin(array, (err, results) => {
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
            return res.render("adminSearchBike.ejs",{
                items:results,
                itemusr:outside
            })
        });
    },
    adminBikeUpdate: (req, res) => {
        const bike_number = req.body.bikenumber
        getBikeForUpdate(bike_number, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results);
             res.render("adminCardUpdate.ejs",{
                item:results
            });
            
        });
    },
    adminBikesUpdates: (req, res) => {
        const body = req.body;
        const bike_number = req.body.bikenumber
        adminUpdateBike(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results);
             res.render("adminlandingpage.ejs");
            
        });
    },
    adminUpdateBikeStatus: (req, res) => {
        const body = req.body;
        //const bike_number = req.body.bikenumber
        adminUpdatebikestatus(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results);
             res.render("adminlandingpage.ejs");
            
        });
    },
    getallbikesforupdate: (req, res) => {
        getbikesofnotavilable((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results)
            return res.render("adminupdatebikestatus.ejs",{
                items:results
            })
        });
    },

}