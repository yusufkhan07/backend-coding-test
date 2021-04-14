import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import * as https from 'https';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth';
import { UsersModule, User } from './users';
import { RolesModule } from './roles';
import { BlogsModule, Blog } from './blogs';

function initializeFirebaseAdmin(credentialsHttpsUrl: string) {
  return new Promise((resolve, reject) => {
    https
      .get(credentialsHttpsUrl, (resp) => {
        let data = '';
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          try {
            const credentials = JSON.parse(data);

            admin.initializeApp({
              credential: admin.credential.cert(credentials),
            });

            admin.firestore().settings({ ignoreUndefinedProperties: true });

            return resolve(void 0);
          } catch (err) {
            return reject(new Error('Unable to initialize firebase-admin'));
          }
        });
      })
      .on('error', (err) => {
        return reject('Unable to fetch firebase-admin credentials');
      });
  });
}

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres' as const,
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        password: configService.get<string>('DATABASE_PASS', 'postgres'),
        database: configService.get<string>('DATABASE', 'public'),
        username: configService.get<string>('DATABASE_USER', 'postgres'),
        entities: [User, Blog],
      }),
    }),
    RolesModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'firebase',
      inject: [ConfigService],
      useFactory: async (configService) => {
        return initializeFirebaseAdmin(
          configService.get('GOOGLE_APPLICATION_CREDENTIALS_S3_HTTPS_URL'),
        );
      },
    },
  ],
})
export class AppModule {}
