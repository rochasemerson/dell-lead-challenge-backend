import { Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/model/user.entity';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('user')
    getUser(@GetUser() user: User) {
        return user
    }

    @Get('users/all')
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Delete('delete_user')
    deleteUser(@GetUser() user: User) {
        return this.userService.deleteUser(user.id)
    }

    @Patch('patch')
    editUser(@GetUser() user: User, @Body() dto: EditUserDto) {
        return this.userService.editUser(user.id, dto)
    }
}
