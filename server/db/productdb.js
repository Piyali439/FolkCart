const mongoose=require("mongoose")
const ps=mongoose.Schema(
    {
    
      pname:String,
      pprice:Number,
      description:String,
      pimage:String,
      // pdetails:String,
      stock: Number, 
      category: String,
     }
)

module.exports=mongoose.model("Product",ps);