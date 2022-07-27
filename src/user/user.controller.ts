import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
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

    @Get('all')
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Delete('delete')
    deleteUser(@GetUser() user: User) {
        return this.userService.deleteUser(user.id)
    }

    @HttpCode(HttpStatus.OK)
    @Patch('patch')
    editUser(@GetUser() user: User, @Body() dto: EditUserDto) {
        return this.userService.editUser(user.id, dto)
    }
}
