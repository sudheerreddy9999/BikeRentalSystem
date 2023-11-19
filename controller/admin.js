const {getUserByAdminUsername} = require("../service/adminservice") 
const{getallbikes} = require("../controller/bike")

module.exports = {
    adminlogin: (req, res) => {
        const body = req.body;
        console.log(body)
        getUserByAdminUsername(body,(err, results)=>{
            if(err){
                console.log(err);
                return ;
            }

            if(!results) {
                return res.json({
                    success:0,
                    data:"invalid username or password"
                });
            }
            const result = body.password;
            if(result){
                results.password = result;
                return res.render("adminlandingpage.ejs")
                }
                
            else {
                return res.json({
                  success: 0,
                  data: "Invalid username or password"
                });
              } 
           });
        }
}