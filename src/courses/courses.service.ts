import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {

    constructor(private prisma: PrismaService) {}

    create(dto: CreateCourseDto, instructorId: number) {
        return this.prisma.course.create({
            data: {
                title: dto.title,
                description: dto.description,
                duration: dto.duration,
                isActive: dto.isActive ?? true,
                instructorId
            }
        })
    }

    findAll() {
        return this.prisma.course.findMany();
    }

    findOne(id: number) {
        return this.prisma.course.findUnique({
            where: { id }
        });
    }

    update(id: number, dto: Partial<CreateCourseDto>) {
        return this.prisma.course.update({
            where: { id },
            data: dto
        });
    }

    remove(id: number) {
        return this.prisma.course.delete({ where: { id } });
    }
}