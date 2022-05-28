import express, {Request, Response, NextFunction} from "express";
import { CreateVendorImput } from "../dto/vendor.dto";
import { Vendor } from "../models";


export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    //dekonstrukcja
    const {name, ownerName, foodType, pincode, address, phone, email, password} = <CreateVendorImput>req.body;

    //vendor zwroci promise
    const createdVendor = await Vendor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: password,
        salt:'',
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages:[],
    })

    return res.json({name, ownerName, foodType, pincode, address, phone, email, password})
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
    
}