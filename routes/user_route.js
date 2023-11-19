const {getUsers, login, createUser, updateUsers, deleteUser,getUseremailid ,getUserForPassword,UpdateUserPassword} = require("../controller/user");
const {getallbikes} = require("../controller/bike")
const {createOrder,getorders} = require("../controller/order");
const router = require("express").Router();

//router.get ("/",getUseremailid ) ;
router.post("/login", login);
//router.post("/", createUser);
router.post("/", createOrder);
router.patch("/", updateUsers);
router.delete("/", deleteUser)
router.post("/password",getUserForPassword )
router.post("/reset",UpdateUserPassword)

module.exports = router;