import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly ProductModel: Model<Product>){}

    async findAll(): Promise<Product[]>{
        return await this.ProductModel.find();
    }

    async find(id: string): Promise<Product>{
        return await this.ProductModel.findOne({ _id: id });
    }

    async Create(product: Product): Promise<Product>{
        const newProduct = new this.ProductModel(product);
        return await newProduct.save();

    }

    async update(id: string, product: Product): Promise<Product>{
        
        return await this.ProductModel.findByIdAndUpdate(id, product, { new: true});
    }

    async delete(id: string, product: Product): Promise<Product>{
        return await this.ProductModel.findByIdAndRemove(id);
    }

}