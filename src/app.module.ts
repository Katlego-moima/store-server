import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Onlinestore', { autoCreate: true }),ProductModule, AuthModule],
   
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}






