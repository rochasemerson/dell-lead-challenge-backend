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
        const users = await this.repo.find({
            order: {
                name: 'ASC'
            }
        })
    }

    async editUser(id: string, dto: EditUserDto) {
        const user = await this.repo.update(
            id,
            dto
        )
    }
    
    async deleteUser(userId: string) {
        const user = await this.repo.delete({
            id: userId
        })
    }
}