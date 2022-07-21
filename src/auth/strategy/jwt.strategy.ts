import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/model/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        config: ConfigService,
        @InjectRepository(User) private readonly repo: Repository<User>,
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: {sub: string, email}) {
        const user = await this.repo.findOne({
            where: {
                id: payload.sub
            }
        })
        delete user.hash
        return user
    }
}