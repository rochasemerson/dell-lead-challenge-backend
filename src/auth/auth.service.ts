import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/model/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

enum PostgresErrorCode {
    UniqueViolation = '23505',
    CheckViolation = '23514',
    NotNullViolation = '23502',
    ForeignKeyViolation = '23503'
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
        private jwt: JwtService,
        private config: ConfigService
        ) {}

    async signup(dto: AuthDto) {
            const hash = await argon.hash(dto.password)
            const user = await this.repo.create({
                name: dto.name,
                email: dto.email,
                hash
            })
            this.repo.save(user)
                .catch((error) => {
                    if (error?.code === PostgresErrorCode.UniqueViolation) {
                        throw new ForbiddenException('User with that email already exists');
                    }
                    throw new ForbiddenException('Something went wrong');
                })
            return this.signToken(user.id, user.email)
    }

    async signin(dto: AuthDto) {
        const user = await this.repo.findOne({
            where: { email: dto.email }
        })

        if (!user) throw new ForbiddenException('Credentials Incorrect')

        const pwMatches = await argon.verify(user.hash, dto.password)

        if (!pwMatches) throw new ForbiddenException('Password do not match')

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: string, email: string) {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1440m',
            secret: secret
        })

        return {
            acess_token: token
        }
    }
}