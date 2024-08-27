import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  payment: {
    id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["succeeded", "pending", "failed"],
    },
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    default: "Not Process",
    enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
}, { timestamps: true });

// Add indexes for performance optimization
orderSchema.index({ buyer: 1 });
orderSchema.index({ status: 1 });

export default mongoose.model("Order", orderSchema);




// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//    products:[
//     {
//         type:mongoose.ObjectId,
//         ref:"Product",
//     }
//    ],
//    payment:{},
//    buyer:{
//     type:mongoose.ObjectId,
//     ref:"User",
//    },
//    status:{
//     type:String,
//     default:"Not Process",
//     enum:["Not Process","Processing","Shipped","Deleverd","Cancel"]
//    },
// },{timestamps:true})
// export default mongoose.model("Order",orderSchema)