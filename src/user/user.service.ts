import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    create(dto: CreateUserDto, instructorId: number) {
        return this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: dto.password
            }
        })
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    update(id: number, dto: Partial<CreateUserDto>) {
        return this.prisma.user.update({
            where: { id },
            data: dto
        })
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id } })
    }
}