import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth';
import { UsersModule } from './users';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        password: configService.get<string>('DATABASE_PASS', 'postgres'),
        database: configService.get<string>('DATABASE', 'public'),
        username: configService.get<string>('DATABASE_USER', 'postgres'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(
        this.configService.get('GOOGLE_APPLICATION_CREDENTIALS'),
      ),
    });
  }
}
