import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductDTO } from './dtos/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Get()
    findAll(): Promise<Product[]>{
        return this.productService.findAll();
    }

    @Get(':id')
    find(@Param('id') id): Promise<Product> {
        return this.productService.find(id);
    }

    @Post()
    createProduct(@Body() product: ProductDTO): Promise<Product> {
        return this.productService.Create(product);
    }

    @Put(':id')
    updateProduct(@Param('id') id, @Body() product: ProductDTO): Promise<Product> {
        return this.productService.update(id, product);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id, @Body() product: ProductDTO): Promise<Product> {
        return this.productService.delete(id, product);
    }

}
