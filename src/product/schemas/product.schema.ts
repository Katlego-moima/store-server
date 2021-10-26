import * as mongoose from 'mongoose';


export const ProductSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    description: String,
    price: Number,
})