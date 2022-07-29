import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>
    ) {}

    async getAllUsers() {
        const users = await this.repo.find()
        return users
    }

    async editUser(id: string, dto: EditUserDto) {
        await this.repo.update(
            id,
            dto
        )
        const newUser = await this.repo.findOne({
            where: {id: id}
        })
        delete newUser.hash
        return newUser
    }
    
    async deleteUser(id: string) {
        const user = await this.repo.delete({id})
    }
}
