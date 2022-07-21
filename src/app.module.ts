import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './model/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgresDB',
    database: 'lead_challenge',
    entities: [User],
    synchronize: true,
  }),
  ConfigModule.forRoot({
    isGlobal: true
  }),
    AuthModule,
    UserModule
  ]
})
export class AppModule { }
