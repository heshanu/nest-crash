/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Make config global
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        ssl: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Fixed path
        synchronize: config.get('NODE_ENV') !== 'production', // Auto-sync only in dev
        logging: config.get('NODE_ENV') === 'development',
        extra: {
          connectionLimit: 5,
          ssl: { 
            rejectUnauthorized: false
          }
        }
      })
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}