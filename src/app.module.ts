import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://katlego:katlego@cluster0.0sytv.mongodb.net/Onlinestore?retryWrites=true&w=majority', { autoCreate: true }),
  ProductModule,
  UsersModule,
  AuthModule],
   
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}





