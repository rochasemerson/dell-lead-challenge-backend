import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/model/user.entity";
import { Repository } from "typeorm";

enum PostgresErrorCode {
    UniqueViolation = '23505',
    CheckViolation = '23514',
    NotNullViolation = '23502',
    ForeignKeyViolation = '23503'
  }

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

    async signup(dto: AuthDto) {
        try {
            const hash = await argon.hash(dto.password)
            const user = await this.repo.create({
                name: dto.name,
                email: dto.email,
                hash
            })
            this.repo.save(user)
    
            // delete user.hash
            return user
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new ForbiddenException('User with that email already exists');
            }
            throw new ForbiddenException('Something went wrong');
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.repo.findOne({
            where: {email: dto.email}
        })

        if (!user) throw new ForbiddenException('Credentials Incorrect')

        const pwMatches = await argon.verify(user.hash, dto.password)

        if (!pwMatches) throw new ForbiddenException('Password do not match')
            
        delete user.hash
        return user
    }
}