const exp=require("express")
const router=exp.Router();
const pc=require("../controller/product_controller")
const auth = require("../middleware/auth");


router.post("/add", auth, pc.addproduct);
router.get("/sel/:id", pc.getproductbyid);
router.get("/sel", pc.selproduct);
router.delete("/del/:id", auth, pc.delproduct);
//router.post("/edit", auth, pc.editproduct);
router.post("/upd", auth, pc.updproduct);
module.exports=router;
