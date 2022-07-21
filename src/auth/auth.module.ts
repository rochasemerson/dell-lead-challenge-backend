import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/model/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}