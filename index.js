const express = require('express');
const app = express();
const userRouter = require("./routes/user_route");
const bodyParser = require('body-parser');
const { login, createUser, getByUsername, getUsers, getUserForUpdate, updateUsers, deleteUser, getUserForPassword, UpdateUserPassword } = require("./controller/user");
const { uploadallbike, getallbikes, getBikeByLocation, getBikeToAdmin, adminBikeUpdate, adminBikesUpdates, deleteBikes, updatebikesImage, getallbikesforupdate, adminUpdateBikeStatus } = require("./controller/bike");
const { createOrder, getorders, getorderbyusername, getordersforadmin,updateOrderStatus } = require("./controller/order")
const { adminlogin } = require("./controller/admin");
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//#user

app.get("/", (req, res) => {
    res.render("home.ejs",)
});

app.post("/submit", (req, res) => {
    console.log(req.body.button);
    if (req.body.button === 'home') {
        res.render("home.ejs")
    } if (req.body.button === 'signup') {
        res.render("signup.ejs")
    } if (req.body.button === 'myHome') {
        res.render("login.ejs")
    }
    else {
        res.render("login.ejs")
    }

});

app.post("/login", login)

app.post("/signin", createUser);

app.post("/orders", getorderbyusername)

app.post("/landing", (req, res) => {
    const body = req.body;
    const results = { user_name: body.username };

    console.log(body);
    return res.render("landingpage.ejs", {
        item: results
    })
})

app.post("/card", getBikeByLocation)

app.post("/payment", getByUsername)

app.post("/success", upload.single('avatar1'), createOrder)

app.post("/tohome", (req, res) => {
    const body = req.body;
    console.log(body)
    res.render("landingpage.ejs", {
        item: body
    })
})

app.post("/logout", (req, res) => {
    res.render("home.ejs");
});

app.post("/forgotPassword", (req, res) => {
    res.render("forgotVerification.ejs")
})

app.post("/VerifyEmail", getUserForPassword);

app.post("/otpVerify", UpdateUserPassword)

//#admin

app.get("/adminlogin", (req, res) => {
    res.render("adminlogin.ejs",)
});

app.post("/adminloginto", adminlogin)

app.post("/adminOrders", getorders)

app.post("/cards", getallbikes)

app.post('/profile', upload.single('avatar'), uploadallbike)

app.post("/getBikeforstatus", getallbikesforupdate)

app.post("/orderforapproval", getordersforadmin)

app.post("/orderstatus", updateOrderStatus)

app.post("/updateBikestatus", adminUpdateBikeStatus)

app.post("/getBike", (req, res) => {
    res.render("searchBike.ejs");
})

app.post("/search", getBikeToAdmin);
app.post("/updateBike", adminBikeUpdate)
app.post("/updateBikeRoute", adminBikesUpdates)

app.post("/bikeupload", (req, res) => {
    console.log(req.body)
    if (req.body.button === 'uploadbike') {
        res.render("cardupload.ejs")
    }
    else {
        res.render("adminlandingpage.ejs")
    }
})

app.post("/updateUser", getUserForUpdate);
app.post("/deleteUser", deleteUser)

app.post("/adminlandingpage", (req, res) => {
    console.log(req.body);
    if (req.body.button === 'home') {
        res.render("adminlandingpage.ejs")
    }
})

app.post("/delete", deleteBikes)

app.post("/getUsers", getUsers);

app.post('/uploadimg', upload.single('avatar'), updatebikesImage)

app.post("/update", updateUsers);

app.post("/Adminlogout", (req, res) => {
    res.render("adminlogin.ejs")
})
 // For Testing Purpose
app.use(express.json());
app.use("/api/users", userRouter);

app.listen(8080, () => {
    console.log("server started and running:", 8080);
});