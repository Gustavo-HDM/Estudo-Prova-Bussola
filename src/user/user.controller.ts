import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }


    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto, 1);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: Partial<CreateUserDto>) {
        return this.userService.update(Number(id), dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(Number(id));
    }

}
