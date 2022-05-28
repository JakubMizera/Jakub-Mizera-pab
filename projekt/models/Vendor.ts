 import { timeStamp } from 'console';
import mongoose, {Schema, Document, Model} from 'mongoose'

 interface VendorDoc extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
    // foods: any;

 }

 const VendorSchema = new Schema({
     name: {Type: String, required: true},
     ownerName: {Type: String, required: true},
     foodType: {Type: [String]},
     pincode: {Type: String, required: true},
     address: {Type: String},
     phone: {Type: String, required: true},
     email: {Type: String, required: true},
     password: {Type: String, required: true},
     salt: {Type: String, required: true},
     serviceAvailable: {Type: Boolean},
     coverImages: {Type: [String]},
     rating: {Type: Number},
    //  foods: [{
    //      type: mongoose.SchemaTypes.ObjectId,
    //      ref: "food"
    //  }]
 }, 
 {timestamps: true}
 )
//model tworzony z vendor schema
 const Vendor = mongoose.model<VendorDoc>("vendor", VendorSchema)

 export {Vendor}