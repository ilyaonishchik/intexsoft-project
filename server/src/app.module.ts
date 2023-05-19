import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ImageModule } from './image/image.module';
import { CategoryModule } from './category/category.module';
import { ParameterModule } from './parameter/parameter.module';
import { ParameterCategoryModule } from './parameter-category/parameter-category.module';
import { ProductModule } from './product/product.module';
import { ProductImageModule } from './product-image/product-image.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule.forRoot(),
    UserModule,
    RoleModule,
    ImageModule,
    CategoryModule,
    ParameterModule,
    ParameterCategoryModule,
    ProductModule,
    ProductImageModule,
    CartModule,
    CartItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
