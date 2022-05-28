import express, {Request, Response, NextFunction} from "express";
import { CreateVendor, GetVendors, GetVendorById } from "../controllers";

const router = express.Router();

router.post('/vendor', CreateVendor)
router.get('/vendors', GetVendors)
router.get('/vendors/:id', GetVendorById)

router.get('/', (req, res) => {
    res.json({message: 'hello admin'})
})

export {router as AdminRoute};